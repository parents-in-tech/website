import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const token = import.meta.env.GITHUB_TOKEN;
  const org = 'parents-in-tech';
  const url = `https://api.github.com/orgs/${org}/repos`;

  const res = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/vnd.github+json',
    },
  });

  if (!res.ok) {
    const error = await res.json();
    return new Response(JSON.stringify({ error }), { status: res.status });
  }

  const data = await res.json();
  return new Response(JSON.stringify(data), { status: 200 });
};
