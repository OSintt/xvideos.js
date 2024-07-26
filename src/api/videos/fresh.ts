import VideoScraper from "api/videoScraper";
import Parser from "api/utils/parser";

class FreshScraper extends VideoScraper {
  private parser: Parser;
  private endpoint: string;
  constructor(isFresh: boolean = true) {
    super();
    this.parser = new Parser(isFresh);
    this.endpoint = "fresh_p";
  }
  async fresh(
    page: number,
  ): Promise<{ videos: Video[]; pagination: Pagination }> {
    if (page == 0) {
      this.endpoint = "fresh";
    }
    const data = await this.scrape(this.endpoint, { page });
    return this.parser.parseResponse(page, data);
  }
}

export default FreshScraper;