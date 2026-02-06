export interface CreateSlotRequestDTO {
  serviceId: string;
  startTime: Date;
  endTime: Date;
  booked?: boolean;
}
