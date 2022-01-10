export function findUserId() {
  const url = window.location.href;
  var matches = url.match(/(\/[\w+-]+)/g);
  
  return matches[1].replace("/", "")
}
