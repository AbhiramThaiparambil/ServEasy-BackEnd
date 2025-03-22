export interface IServiceType {
    id?: string; 
    serviceName: string;
    serviceDescription: string;
  }

  
  
  export interface ICategory {
    // id?: string; // Optional ID for category
    category?: string;
    isHidden?:boolean
    typeService?: IServiceType[];
    createdAt?: Date;
    updatedAt?: Date;
  }
  