import type { APIRoute } from 'astro';
import { Octokit } from 'octokit';

export const GET: APIRoute = async () => {
  const token = import.meta.env.GITHUB_TOKEN;
  const octokit = new Octokit({ auth: token });
  const org = 'parents-in-tech';

  try {
    const response = await octokit.request('GET /orgs/{org}/repos', {
      org: org,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    });

    return new Response(JSON.stringify(response.data), { status: 200 });
  } catch (error: any) {
    console.error('Error fetching repos from GitHub:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: error.status || 500 });
  }
};
