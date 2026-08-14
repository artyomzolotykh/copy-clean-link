export const cleanUrl = (value) => {
  const url = new URL(value)
  const removedParameters = [...url.searchParams.keys()]

  url.search = ''

  return {
    url: url.toString(),
    removedParameters
  }
}
