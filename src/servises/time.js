export const firebaseTimestampToString = (fbTs) => {
  if (!fbTs) return null;

  const dateTs = new Date(fbTs.toMillis());

  return `${dateTs?.toLocaleDateString(
    "sv-SE"
  )}  on ${dateTs?.toLocaleTimeString("sv-SE").slice(0, 5)}`;
};
