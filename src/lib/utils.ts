export const validateURL = (url: string | null) => {
  if (!url) return false

  try {
    const validURL = new URL(url)
    return validURL
  } catch (error) {
    return false
  }
}
