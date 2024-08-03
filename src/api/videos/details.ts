import DetailsParser from "api/utils/detailsParser";
class DetailsScraper {
  parser: DetailsParser;
  private cache: Map<string, VideoDetails>;
  constructor() {
    this.parser = new DetailsParser();
    this.cache = new Map<string, VideoDetails>();
  }
  private async getDetails(url: string): Promise<VideoDetails> {
    if (this.cache.has(url)) {
      return this.cache.get(url)!;
    }
    const details = await this.parser.scrape(url);
    this.cache.set(url, details);
    return details;
  }
  details(url: string) {
    return this.getDetails(url);
  }
  public async downloadHigh(url: string, filename: string): Promise<string> {
    const video = await this.getDetails(url);
    const highUrl = video.files.high;
    return this.parser.downloadVideo(highUrl, filename);
  }

  public async downloadLow(url: string, filename: string): Promise<string> {
    const video = await this.getDetails(url);
    const lowUrl = video.files.low;
    return this.parser.downloadVideo(lowUrl, filename);
  }

  public async downloadImage(url: string, filename: string): Promise<string> {
    const video = await this.getDetails(url);
    const imageUrl = video.image;
    return this.parser.downloadImage(imageUrl, filename);
  }
}

export default DetailsScraper;
