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
  daysDifference = (dateString) => {
    // 輸入為YYYYMMDD string
    const inputYear = parseInt(dateString.substring(0, 4), 10);
    const inputMonth = parseInt(dateString.substring(4, 6), 10) - 1; // 月份從0開始
    const inputDay = parseInt(dateString.substring(6, 8), 10);

    const inputDate = new Date(Date.UTC(inputYear, inputMonth, inputDay));
    // 獲取當前日期，utc+8
    const today = new Date();
    const utcOffset = 8 * 60;
    const utc8Date = new Date(
      today.getTime() + (today.getTimezoneOffset() + utcOffset) * 60 * 1000
    );
    // 只保留日期部分，忽略時間部分
    const utc8Midnight = new Date(
      Date.UTC(
        utc8Date.getUTCFullYear(),
        utc8Date.getUTCMonth(),
        utc8Date.getUTCDate()
      )
    );

    // 計算兩個日期的差(以天為單位)
    const timeDifference = inputDate.getTime() - utc8Midnight.getTime();
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    return daysDifference;
    // 輸出為與今天相差了幾天 時區utc+8 - 若是20240702 輸出就是-1
  };
}

const dateService = new DateService();
export default dateService;
