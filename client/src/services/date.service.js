class DateService {
  gernerateTime = () => {
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
  // return 要將updateDate的值 +- 多少
  daysAgo = (daysAgo) => {
    const today = new Date();
    let targetDate = new Date(today);
    targetDate.setDate(today.getDate() + daysAgo);
    // format targetDate to MMDD
    const month = (targetDate.getMonth() + 1).toString().padStart(2, "0");
    const day = targetDate.getDate().toString().padStart(2, "0");
    const date = month + day;
    return date;
  };

  // 選取的日期與今天的天數差
  daysDifference = () => {
    return;
  };
}

const dateService = new DateService();
export default dateService;
