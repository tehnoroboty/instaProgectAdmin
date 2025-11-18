export function getBasicAuthCredentials(): { email: string; password: string } | null {
  const base64 = localStorage.getItem('authorization')

  if (!base64) {
    return null
  }

  try {
    const decoded = atob(base64)
    const [email, password] = decoded.split(':')

    return { email, password }
  } catch {
    return null
  }
}
