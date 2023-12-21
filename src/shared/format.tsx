import dayjs from "dayjs";

// 数据库保存的金额以分为单位
export const amountFormat = (amount: number) => {
  return (amount / 100).toFixed(2);
};

// 日期
export const dateFormat = (date: string) => {
  return dayjs(date).format("YYYY-MM-DD HH:MM:ss");
};
