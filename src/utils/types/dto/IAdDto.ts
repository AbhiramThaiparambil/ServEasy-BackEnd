export interface ILocationDTO {
  type: "Point";
  coordinates: number[];
  address?: string | null;
}


export interface IAdDTO {
  _id: string;
  serviceId: string;
  providerId: string;
  caption: string;
  description: string;
  startDate?: Date | null;
  endDate?: Date | null;
  targetLocation?: ILocationDTO | null; 
  createdAt: Date;
  updatedAt: Date;
    status?: "active" |"block" |"expired"

}
