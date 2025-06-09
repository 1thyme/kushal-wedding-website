export interface Event {
  name: string;
  date: string;
  time: string;
  location: {
    name: string;
    address: string;
    mapLink: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    embedUrl?: string;
  };
  dressCode: string;
  notes?: string;
}

export interface Photo {
  id: string;
  url: string;
  event: string;
  uploadedBy?: string;
  caption?: string;
  timestamp: string;
}

export interface ContactPerson {
  name: string;
  phone: string;
  email: string;
  role: string;
}

export interface WeddingData {
  brideFirstName: string;
  brideLastName: string;
  groomFirstName: string;
  groomLastName: string;
  weddingDate: string;
  weddingHashtag?: string;
  events: {
    haldi: Event;
    mehndi: Event;
    sangeet: Event;
    wedding: Event;
    reception: Event;
  };
  contacts: ContactPerson[];
  whatsappGroup?: string;
  telegramChannel?: string;
} 