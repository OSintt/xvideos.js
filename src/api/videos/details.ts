import DetailsParser from "api/utils/detailsParser";
class DetailsScraper {
    parser: DetailsParser;
    constructor() {
        this.parser = new DetailsParser();
    }
  details(url: string) {
    return this.parser.scrape(url);
  }
  async downloadHigh(url: string, filename: string): Promise<string> {
    const video: VideoDetails = await this.parser.scrape(url);
    const highUrl = video.files.high;
    return this.parser.downloadVideo(highUrl, filename);
  }
  async downloadLow(url: string, filename: string): Promise<string> {
    const video: VideoDetails = await this.parser.scrape(url);
    const highUrl = video.files.low;
    return this.parser.downloadVideo(highUrl, filename);
  }
}

export default DetailsScraper;
