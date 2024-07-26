import axios from "axios";
import { load } from "cheerio";
import { URL, URLSearchParams } from "url";
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
    try {
      params = new URLSearchParams(params);
      let fullUrl = new URL(endpoint, this.base_url).toString();
      fullUrl += '?'+params.toString();
      const response = await axios.get(fullUrl);
      return load(response.data).html();
    } catch (err) {
      throw new Error("Ocurrió un error " + err);
    }
  }
}

export default BaseScraper;
