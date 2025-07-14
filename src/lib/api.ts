function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
}


export const api = {
  get: async (path: string) => {
    const token = getCookie('token');
    const res = await fetch(`http://localhost:3000${path}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error(`Erro ${res.status}`);
    return res.json();
  },

  post: async (path: string, body: any) => {
    const res = await fetch(`http://localhost:3000${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) throw new Error(`Erro ${res.status}`);
    return res.json();
  },
};
