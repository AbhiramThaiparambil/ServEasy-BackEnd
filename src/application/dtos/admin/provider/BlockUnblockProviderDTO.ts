
export interface BlockUnblockProviderDTO {
    serviceProviderId: string;
    action?: boolean; // Optional if implicit or strictly toggle, but defining 'action' usually implies true/false
}
