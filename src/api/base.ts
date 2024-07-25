import axios from "axios";
import { load } from "cheerio";
import { URL } from "url";
import config from "./config/config";

abstract class BaseScraper {
  base_url: string;

  constructor() {
    this.base_url = config.getBaseUrl();
  }
  abstract scrape(
    endpoint: string,
    params: Record<string, any>,
  ): Promise<string>;
  async getSoup(endpoint: string, params: Record<string, any>): Promise<any> {
    const fullUrl = new URL(endpoint, this.base_url).toString();
    console.log(fullUrl);
    const response = await axios.get(fullUrl, { params });
    return load(response.data);
  }
}

export default BaseScraper;
