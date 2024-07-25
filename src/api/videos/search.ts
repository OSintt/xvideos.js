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
    sort: string = "relevance", 
    durf: string = "allduration", 
    datef: string = "all", 
    quality: string = "all", 
    premium: Boolean = false,
  ): Promise<{ videos: Video[]; pagination: Pagination }> {
    const params = {
      p: page,
      k: k,
      sort: sort,
      durf: durf,
      datef: datef,
      quality: quality,
      premium: premium ? 1 : 0,
    };
    const data = await this.scrape("search", params);
    return this.parser.parseResponse(page, data);
  }
}

export default SearchScraper;
