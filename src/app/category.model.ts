export interface Category {
  $key?: string;
  name: string;
}

export interface News {
  $key?: string;
  image: string;
  description: string;
}

export interface Event {
  $key?: string;
  eventName: string;
  description: string;
  location: string;
  date: string;
}