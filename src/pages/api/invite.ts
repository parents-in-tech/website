import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request, redirect }) => {
  try {
    const body = await request.formData();
    const identifier = body.get('identifier');
    
    if (!identifier || typeof identifier !== 'string' || identifier.trim() === '') {
      return redirect('/invite?error=missing-identifier');
    }

    const token = import.meta.env.GITHUB_TOKEN;
    if (!token) {
      console.error('GITHUB_TOKEN environment variable is not set');
      return redirect('/invite?error=server-config');
    }

    const org = 'parents-in-tech';
    const url = `https://api.github.com/orgs/${org}/invitations`;

    const payload: Record<string, string> = {};
    const trimmedIdentifier = identifier.trim();
    
    if (trimmedIdentifier.includes('@')) {
      payload.email = trimmedIdentifier;
    } else {
      // For username, we need to get the user ID first
      const userUrl = `https://api.github.com/users/${trimmedIdentifier}`;
      const userRes = await fetch(userUrl, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/vnd.github+json',
          'X-GitHub-Api-Version': '2022-11-28',
        },
      });

      if (!userRes.ok) {
        console.error('Failed to fetch user:', await userRes.text());
        return redirect('/invite?error=user-not-found');
      }

      const userData = await userRes.json();
      payload.invitee_id = String(userData.id);
    }

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      console.error('GitHub API error:', res.status, errorData);
      
      // Handle specific GitHub API errors
      if (res.status === 422) {
        // Check if it's specifically about existing membership
        const errors = errorData.errors || [];
        
        const membershipError = errors.find((err: any) => 
          err.message?.includes('already a part of this organization') ||
          err.message?.includes('already a member') ||
          err.message?.includes('pending invitation')
        );
        
        if (membershipError) {
          // Let's check if they actually are a member or have a pending invitation
          try {
            // Check membership status
            const memberUrl = `https://api.github.com/orgs/${org}/members/${trimmedIdentifier}`;
            const memberRes = await fetch(memberUrl, {
              headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/vnd.github+json',
                'X-GitHub-Api-Version': '2022-11-28',
              },
            });
            
            if (memberRes.status === 200) {
              return redirect('/invite?error=already-member');
            } else if (memberRes.status === 404) {
              // Not a public member, check pending invitations
              const invitationsUrl = `https://api.github.com/orgs/${org}/invitations`;
              const invitationsRes = await fetch(invitationsUrl, {
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Accept': 'application/vnd.github+json',
                  'X-GitHub-Api-Version': '2022-11-28',
                },
              });
              
              if (invitationsRes.ok) {
                const invitations = await invitationsRes.json();
                const hasPendingInvite = invitations.some((inv: any) => 
                  inv.email === trimmedIdentifier || 
                  inv.login === trimmedIdentifier
                );
                
                if (hasPendingInvite) {
                  return redirect('/invite?error=pending-invitation');
                }
              }
            }
          } catch (checkError) {
            console.error('Error checking membership:', checkError);
          }
          
          return redirect('/invite?error=membership-conflict');
        }
        
        return redirect('/invite?error=validation-failed');
      } else if (res.status === 403) {
        const errorText = JSON.stringify(errorData);
        if (errorText.includes('admin to create an invitation')) {
          return redirect('/invite?error=need-org-admin');
        }
        return redirect('/invite?error=permission-denied');
      } else {
        return redirect('/invite?error=github-api');
      }
    }

    return redirect('/invite?success=true');
    
  } catch (error) {
    console.error('Unexpected error in invite API:', error);
    return redirect('/invite?error=unexpected');
  }
};
