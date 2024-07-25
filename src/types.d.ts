interface Endpoints {
    base_url: string;
    endpoints: {
        fresh_p: string;
        fresh: string;
        search: string;
        verified: string;
        verified_men: string;
        verified_gay: string;
        verified_trans: string;
        verified_p: string;
        verified_men_p: string;
        verified_gay_p: string;
        verified_trans_p: string;
    };
}

interface SearchParams {
    page?: number;
    k?: string;
    sort?: string;
    durf?: string;
    datef?: string;
    quality?: string;
    premium?: boolean;
}

interface Video {
    url: string;
    path: string;
    title: string;
    duration: string;
    profile: {
      name: string;
      url: string;
    };
    views: string;
}

interface Pagination {
    page: number;
    pages: number[];
    last_page: number;
    has_next: boolean;
    next: number | null;
    has_previous: boolean;
    previous: number | null;
    results_count: number;
  }