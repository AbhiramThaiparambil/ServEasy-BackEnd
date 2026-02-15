export interface ISlot {
  _id?: string;
  serviceId: string;
  startTime: Date;
  endTime: Date;
  booked: boolean;
  createdAt?: Date;
}
