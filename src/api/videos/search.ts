import VideoScraper from "api/videoScraper";
import Parser from "api/utils/parser";

class SearchScraper extends VideoScraper {
  private parser: Parser;
  constructor(isFresh: boolean = false) {
    super();
    this.parser = new Parser(isFresh);
  }
  async search(
    k: string,
    page: number = 1,
    params: MoreSearchParams
  ): Promise<{ videos: Video[]; pagination: Pagination }> {
    const newParams = {
      p: page,
      k: k,
      sort: params.sort,
      durf: params.durf,
      datef: params.datef,
      quality: params.quality,
      premium: params.premium ? 1 : 0,
    };
    const data = await this.scrape("search", newParams);
    return this.parser.parseResponse(page, data);
  }
}

export default SearchScraper;
