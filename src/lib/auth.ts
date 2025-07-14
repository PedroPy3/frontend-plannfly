
export function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
}

export function getClienteUuidFromToken(): string | null {
  const token = getCookie('token');
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.clienteUuid || payload.customerId || null;
  } catch {
    return null;
  }
}
