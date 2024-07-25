const endpoints: Endpoints = {
  base_url: "https://www.xvideos.com",
  endpoints: {
    fresh_p: "/new/{page}",
    fresh: "/",
    search: "/",
    verified: "/verified/videos/{page}",
    verified_men: "/verified-men/videos/{page}",
    verified_gay: "/verified-gay/videos/{page}",
    verified_trans: "/verified-trans/videos/{page}",
    verified_p: "/verified/videos",
    verified_men_p: "/verified-men/videos",
    verified_gay_p: "/verified-gay/videos",
    verified_trans_p: "/verified-trans/videos",
  },
};

class Config {
  base_url: string;
  endpoints: { [key: string]: string };
  constructor(endpoints: Endpoints) {
    this.base_url = endpoints.base_url;
    this.endpoints = endpoints.endpoints;
  }
  getBaseUrl(): string {
    return this.base_url;
  }
  getEndpoint(endpointName: string, page: number = 0): string | undefined {
    const endpoint: string = this.endpoints[endpointName];
    if (endpoint) {
      return endpoint.replace("{page}", page.toString());
    }
    return undefined;
  }
}

export default new Config(endpoints);
