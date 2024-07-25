import BaseScraper from "./base";
import config from "./config/config";

abstract class VideoScraper extends BaseScraper {
  scrape(endpointName: string, params: Record<string, any>): Promise<string> {
    const page: number | null = params.page;
    const endpoint = config.getEndpoint(endpointName, page);
    if (!endpoint) throw new Error("Invalid endpoint " + endpointName);
    console.log(endpoint);
    const soup = this.getSoup(endpoint, params);
    return soup;
  }
}

export default VideoScraper;
