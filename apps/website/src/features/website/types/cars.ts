export interface CarOffer {
  id: number;
  brand: string;
  model: string;
  generation: string;
  version: string;
  productionYear: number;
  mileage: number;
  enginePowerKW: number;
  engineCapacity: number;
  bodyType: string;
  bodyTypeText: string;
  fuelType: string;
  fuelTypeText: string;
  price: number;
  currency: string;
  city: string;
  voivodeship: string;
  webUrl: string;
  offerShareUrl: string;
  loanInstallment?: number;
  tags?: string[];
}

export interface CarPhoto {
  id: number;
  offerId: number;
  sortNumber: number;
  url: string;
  miniatureUrl: string;
  webpUrl: string;
  webpMiniatureUrl: string;
}

export interface CarListing {
  dealer: {
    id: string;
    description: string;
    companyName: string;
    domainAlias: string;
    logoUrl: string;
    logoWebpUrl: string;
    type: string;
    whatsAppAvailable: boolean;
  };
  offer: CarOffer;
  photoList: CarPhoto[];
  statistics?: {
    viewCount?: number;
    phoneViews?: number;
  };
}

export interface AutoplacResponse {
  categories: string[];
  offerList: CarListing[];
}
