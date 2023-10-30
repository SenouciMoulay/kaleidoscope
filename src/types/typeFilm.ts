export interface responseApiFilm {
    id: number;
    attributes: {
      title: string;
      createdAt: Date;
      updatedAt: Date;
      publishedAt: Date;
      image: Image;
      filmPlans: FilmPlan[];
      artist: Artist;
    };
  }
  
  interface Image {
    data: {
      id: number;
      attributes: {
        name: string;
        alternativeText?: string;
        caption?: string;
        width: number;
        height: number;
        formats: {
          thumbnail: {
            name: string;
            hash: string;
            ext: string;
            mime: string;
            path?: string;
            width: number;
            height: number;
            size: number;
            url: string;
          };
          medium: {
            name: string;
            hash: string;
            ext: string;
            mime: string;
            path?: string;
            width: number;
            height: number;
            size: number;
            url: string;
          };
          small: {
            name: string;
            hash: string;
            ext: string;
            mime: string;
            path?: string;
            width: number;
            height: number;
            size: number;
            url: string;
          };
          large: {
            name: string;
            hash: string;
            ext: string;
            mime: string;
            path?: string;
            width: number;
            height: number;
            size: number;
            url: string;
          };
        };
      };
    };
  }
  
  interface FilmPlan {
    id: number;
    attributes: {
      title: string;
      createdAt: Date;
      updatedAt: Date;
      publishedAt: Date;
    };
  }
  
  interface Artist {
    id: number;
    attributes: {
      name: string;
      createdAt: Date;
      updatedAt: Date;
      publishedAt: Date;
    };
  }
  