import VideoScraper from "api/videoScraper";
import Parser from "api/utils/parser";

class VerifiedScraper extends VideoScraper {
  private parser: Parser;
  private endpoint: string;
  constructor(isFresh: boolean = true) {
    super();
    this.parser = new Parser(isFresh);
    this.endpoint = "verified";
  }
  async getVerified(type: string = "women", page: number = 1) {
    const types = ["women", "men", "gay", "trans"];
    page -= 1;
    if (!types.includes(type)) throw new Error("Invalid type: " + type);
    if (type !== "women") {
      this.endpoint += `_${type}`;
    }
    if (page <= 0) {
      this.endpoint += "_p";
    }
    const data = await this.scrape(this.endpoint, { page });
    return this.parser.parseResponse(page, data);
  }
}

export default VerifiedScraper;
