import {
  SearchScraper,
  FreshScraper,
  VerifiedScraper,
  DetailsScraper,
} from "api/videos";
import { pageValidator, urlValidator } from "api/utils/validators";

class XVideos {
  private SearchScraper: SearchScraper;
  private FreshScraper: FreshScraper;
  private VerifiedScraper: VerifiedScraper;
  private DetailsScraper: DetailsScraper;

  constructor() {
    this.SearchScraper = new SearchScraper();
    this.FreshScraper = new FreshScraper();
    this.VerifiedScraper = new VerifiedScraper();
    this.DetailsScraper = new DetailsScraper();
  }
  @pageValidator
  async fresh(page: number = 1): Promise<{
    videos: Video[];
    pagination: Pagination;
  }> {
    if (page >= 20000) throw new Error("Page parameter must be under 20000");
    return this.FreshScraper.fresh(page);
  }
  @pageValidator
  async getVerified(
    type: VerifiedType = "women",
    page: number = 1,
  ): Promise<{
    videos: Video[];
    pagination: Pagination;
  }> {
    return this.VerifiedScraper.getVerified(type, page);
  }
  @pageValidator
  async search(
    k: string,
    page: number = 1,
    params: MoreSearchParams = {
      sort: "relevance",
      durf: "allduration",
      datef: "all",
      quality: "all",
      premium: false,
    },
  ): Promise<{
    videos: Video[];
    pagination: Pagination;
  }> {
    const { sort, durf, datef, quality, premium } = params;
    return this.SearchScraper.search(k, page, {
      sort,
      durf,
      datef,
      quality,
      premium,
    });
  }
  @urlValidator
  async details(videoUrl: string) {
    return this.DetailsScraper.details(videoUrl);
  }
  @urlValidator
  async downloadHigh(url: string, filename: string): Promise<string> {
    return this.DetailsScraper.downloadHigh(url, filename);
  }
  @urlValidator
  async downloadLow(url: string, filename: string): Promise<string> {
    return this.DetailsScraper.downloadLow(url, filename);
  }
}

export default XVideos;
