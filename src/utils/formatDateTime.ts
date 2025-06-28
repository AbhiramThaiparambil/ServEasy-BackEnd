import dayjs from "dayjs";

export const formatDateTime = (dateTime: string | Date): string => {
  return dayjs(dateTime).format("MMMM D, YYYY [at] h:mm A");
};
