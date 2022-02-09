
export function findUserId() {
  const url = window.location.href;
  const matches = url.match(/(\/[\w+-]+)/g);
  if (matches.length > 1) {
    return matches[1].replace("/", "");
  }
  return null;
}
