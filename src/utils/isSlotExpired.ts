import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

import { ISlot } from "../domain/entities/ISlot";

export function isSlotExpired(slot: ISlot): boolean {
  if (slot.booked) return true;

  const now = dayjs();
  const slotDay = slot.createdAt ? dayjs(slot.createdAt) : now;

  const slotStart = dayjs(
    `${slotDay.format("YYYY-MM-DD")} ${slot.startTime}`,
    "YYYY-MM-DD hh:mm A"
  );

  return now.isAfter(slotStart);
}
