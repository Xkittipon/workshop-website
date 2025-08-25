import numeral from "numeral";

export const numberFormat = (num) => {
  if (typeof num !== "number") return num;
  return numeral(num).format("0,0");
};
