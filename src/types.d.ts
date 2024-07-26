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

interface VideoDetails {
  title: string | undefined;
  url: string;
  duration: number | undefined;
  image: string | undefined;
  views: string | undefined;
  videoType: string | undefined;
  mainUploader: MainUploader;
  models: Model[];
  tags: string[];
  likePercentage: string | undefined;
  dislikePercentage: string | undefined;
  commentsCount: number | undefined;
  files: Files;
}

interface Files {
  low: string | undefined;
  high: string | undefined;
  HLS: string | undefined;
  thumb: string | undefined;
  thumb69: string | undefined;
  thumbSlide: string | undefined;
  thumbSlideBig: string | undefined;
}
interface MainUploader {
  name: string;
  profileUrl: string;
}

interface Model extends MainUploader {
  id: string;
}

type VerifiedType = "women" | "men" | "gay" | "trans";
type SortType = "relevance" | "uploaddate" | "rating" | "length" | "views" | "random";
type DatefType = "today" | "week" | "month" | "3month" | "6month" | "all";
type DurfType = "1-3min" | "3-10min" | "10min_more" | "10-20min" | "20min_more" | "allduration";
type QualityType = "hd" | "1080P" | "all";

interface SearchParams {
  k?: string;
  page?: number;
  params?: MoreSearchParams;
}

interface MoreSearchParams {
  sort?: SortType;
  datef?: DatefType;
  durf?: DurfType;
  quality?: QualityType;
  premium?: boolean;
}