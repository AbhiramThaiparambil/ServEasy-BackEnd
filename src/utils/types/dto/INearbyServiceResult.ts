import { Types } from "mongoose";

export interface INearbyServiceFilters {
  category?: string;
  experience?: number;
  priceSort?: "gtToLow" | "lowTogt";
  searchQuery?: string;
}

export interface INearbyServiceResult {
  _id: Types.ObjectId;
  serviceProviderName?: string;
  profileImage?: string;
  category?: string;
  experience?: number;
  serviceName: string;
  description: string;
  serviceType: string;
  location: {
    type: "Point";
    coordinates: [number, number];
  };
  estimatedPrice: number;
  serviceImage?: string;
  createdAt: Date;
  distance?: number;
}

export interface INearbyServicePagination {
  services: INearbyServiceResult[];
  nextCursor: string | null;
}
