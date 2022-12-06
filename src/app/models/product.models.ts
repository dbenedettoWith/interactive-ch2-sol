export interface Product {
  id: string;
  name: string;
  inStock?: boolean;
  available?: boolean;
  publisherInfo?: Partial<PublisherInfo>;
}

export interface PublisherInfo {
  id: string;
  publisherName: string;
  phoneNumber: string;
}
