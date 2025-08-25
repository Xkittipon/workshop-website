import moment from "moment/min/moment-with-locales";

export const dateFormat = (date) => {
  if (!(date instanceof Date) && isNaN(Date.parse(date))) return date;
  return moment(date).locale("en").format("LL");
};
