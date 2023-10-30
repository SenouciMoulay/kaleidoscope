interface Format {
    name: string;
    hash: string;
    ext: string;
    mime: string;
    path: string | null;
    width: number;
    height: number;
    size: number;
    url: string;
  }
  
  interface PlanAttributes {
    id: number;
    name: string;
    alternativeText?: string;
    caption?: string;
    width: number;
    height: number;
    formats: {
      thumbnail: Format;
      medium: Format;
      small: Format;
      large: Format;
    };
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string | null;
    provider: string;
    provider_metadata: any | null;
    createdAt: string;
    updatedAt: string;
  }
  
  interface PlanData {
    id: number;
    attributes: PlanAttributes;
  }
  
  interface FilmDataAttributes {
    title: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  }
  
  interface FilmData {
    id: number;
    attributes: FilmDataAttributes;
  }
  
  interface Film {
    data: FilmData;
  }
  
  interface Attributes {
    id: number;
    title: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    plans: {
      data: PlanData[];
    };
    film: Film;
  }
  
  export interface ResponseApi {
    data: {
      id: number;
      attributes: Attributes;
    }[];
    meta: {
      pagination: {
        page: number;
        pageSize: number;
        pageCount: number;
        total: number;
      };
    };
  }