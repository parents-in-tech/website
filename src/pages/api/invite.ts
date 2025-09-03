import type { APIRoute } from 'astro';
import { Octokit } from 'octokit';

export const POST: APIRoute = async ({ request, redirect }) => {
  const org = 'parents-in-tech';

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

    const octokit = new Octokit({ auth: token });
    const trimmedIdentifier = identifier.trim();
    
    // Determine if it's an email or username
    let payload: { email?: string; invitee_id?: number } = {};
    
    if (trimmedIdentifier.includes('@')) {
      // It's an email address
      payload.email = trimmedIdentifier;
    } else {
      // It's a username, get the user ID
      try {
        const userRes = await octokit.request('GET /users/{username}', {
          username: trimmedIdentifier,
          headers: {
            'X-GitHub-Api-Version': '2022-11-28'
          }
        });
        payload.invitee_id = userRes.data.id;
      } catch (error: any) {
        if (error.status === 404) {
          console.error(`User not found: ${trimmedIdentifier}`);
          return redirect('/invite?error=user-not-found');
        }
        throw error; // Re-throw other errors
      }
    }

    // Create the organization invitation
    try {
      await octokit.request('POST /orgs/{org}/invitations', {
        org,
        ...payload,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        }
      });
    } catch (error: any) {
      console.error('GitHub API error during invitation:', error.status, error.response?.data);

      if (error.status === 422) {
        const errorMessage = error.response?.data?.errors?.[0]?.message || '';
        const isMembershipError = errorMessage.includes('already a part of this organization') ||
                                  errorMessage.includes('already a member') ||
                                  errorMessage.includes('pending invitation');

        if (isMembershipError) {
          // Check if they are already a member
          try {
            await octokit.request('GET /orgs/{org}/members/{username}', {
              org,
              username: trimmedIdentifier,
              headers: {
                'X-GitHub-Api-Version': '2022-11-28'
              }
            });
            // If the above doesn't throw, they are a member
            return redirect('/invite?error=already-member');
          } catch (memberError: any) {
            if (memberError.status === 404) {
              // Not a member, check for pending invitations
              try {
                const invitationsRes = await octokit.request('GET /orgs/{org}/invitations', {
                  org,
                  headers: {
                    'X-GitHub-Api-Version': '2022-11-28'
                  }
                });
                const hasPendingInvite = invitationsRes.data.some((inv: any) =>
                  inv.email === trimmedIdentifier || inv.login === trimmedIdentifier
                );
                if (hasPendingInvite) {
                  return redirect('/invite?error=pending-invitation');
                }
              } catch (invitationError: any) {
                console.error('Error checking for pending invitations:', invitationError);
              }
            } else {
               console.error('Error checking membership:', memberError);
            }
          }
          // If checks are inconclusive but there was a 422, redirect
          return redirect('/invite?error=membership-conflict');
        }
        return redirect('/invite?error=validation-failed');
      } else if (error.status === 403) {
        const errorText = JSON.stringify(error.response?.data || {});
        if (errorText.includes('admin to create an invitation')) {
          return redirect('/invite?error=need-org-admin');
        }
        return redirect('/invite?error=permission-denied');
      }

      return redirect('/invite?error=github-api');
    }

    return redirect('/invite?success=true');
    
  } catch (error: any) {
    console.error('Unexpected error in invite API:', error);
    return redirect('/invite?error=unexpected');
  }
};
