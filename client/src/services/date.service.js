export const gernerateTime = () => {
  const date = new Date();
  const utcPlus8 = new Date(date.getTime() + 8 * 60 * 60 * 1000);
  const year = utcPlus8.getUTCFullYear();
  const month = String(utcPlus8.getUTCMonth() + 1).padStart(2, "0");
  const day = String(utcPlus8.getUTCDate()).padStart(2, "0");
  const hours = String(utcPlus8.getUTCHours()).padStart(2, "0");
  const minutes = String(utcPlus8.getUTCMinutes()).padStart(2, "0");
  const seconds = String(utcPlus8.getUTCSeconds()).padStart(2, "0");

  return `${year}${month}${day}${hours}${minutes}${seconds}`;
};
