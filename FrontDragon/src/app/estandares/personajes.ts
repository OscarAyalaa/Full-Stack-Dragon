export interface Personajes {
    id: number;
    name: string;
    ki: string;
    maxKi: string;
    race: string;
    gender: string;
    description: string;
    image: string;
    affiliation: string;
    deletedAt: string | null;
}

export interface PaginationMeta {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  }
  
  export interface PaginationLinks {
    first: string;
    previous: string | null;
    next: string | null;
    last: string;
  }
  
  export interface CharacterResponse {
    items: Personajes[];
    meta: PaginationMeta;
    links: PaginationLinks;
  }
