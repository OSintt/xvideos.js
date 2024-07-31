import cheerio from "cheerio";
import config from "../config/config";

class Parser {
  private isFresh: boolean;
  constructor(isFresh: boolean = false) {
    this.isFresh = isFresh;
  }
  public parseResponse(
    page: number,
    data: string,
  ): { videos: Video[]; pagination: Pagination } {
    const $ = cheerio.load(data);
    const videos = this.getVideos($);
    const resultsCount = this.extractResultsCount($);
    const pages = this.getPages($);
    let lastPage = pages.at(-1);
    if (!this.isFresh) {
      lastPage = resultsCount >= 4029 ? 149 : Math.ceil(resultsCount / 27);
    }
    const pagination: Pagination = {
      page: page + 1,
      pages,
      last_page: lastPage,
      has_next: page < lastPage,
      next: page < lastPage ? page + 1 : null,
      has_previous: page > Math.min(...pages),
      previous: page > Math.min(...pages) ? page - 1 : null,
      results_count: resultsCount,
    };
    return { videos, pagination };
  }
  private getVideos($: cheerio.Root): Video[] {
    const videos: Video[] = [];
    $("#content .mozaique .thumb-block").each((_, element) => {
      const video = this.parseVideo($(element));
      if (video) videos.push(video);
    });
    return videos;
  }

  private getPages($: cheerio.Root): number[] {
    const pages = new Set<number>();
    $(".pagination ul li a").each((_, element) => {
      const text = $(element).text().trim();
      if (!isNaN(parseInt(text))) {
        const pageNumber = parseInt(text);
        pages.add(this.isFresh ? pageNumber - 1 : pageNumber);
      }
    });
    return Array.from(pages).sort((a, b) => a - b);
  }

  private extractResultsCount($: cheerio.Root): number {
    if (this.isFresh) return 27 * 20000;
    const resultsSpan = $("h2.page-title .sub");
    if (resultsSpan.length) {
      const resultsText = resultsSpan.text().trim();
      const match = resultsText.match(/\(([\d.,]+)/);
      if (match) {
        return parseInt(match[1].replace(/[.,]/g, ""));
      }
    }
    throw new Error("No results found");
  }
  private extractTitle(video: cheerio.Cheerio): string {
    const titleElement = video.find(".title a");
    if (!titleElement.length) throw new Error("Title element not found");
    return titleElement.attr("title") || "";
  }

  private extractPathAndUrl(video: cheerio.Cheerio): {
    path: string;
    url: string;
  } {
    const pathElement = video.find(".thumb > a");
    if (!pathElement.length) throw new Error("Path element not found");
    const path = pathElement.attr("href") || "";
    const url = `${config.getBaseUrl()}${path}`;
    return { path, url };
  }

  private extractDuration(video: cheerio.Cheerio): string {
    const durationElement = video.find(".metadata .duration");
    return durationElement.length ? durationElement.text().trim() : "Unknown";
  }

  private extractProfile(video: cheerio.Cheerio): {
    name: string;
    url: string;
  } {
    const profileElement = video.find(".metadata span a");
    return {
      name: profileElement.length ? profileElement.text().trim() : "Unknown",
      url: profileElement.length
        ? `${config.getBaseUrl()}${profileElement.attr("href")}`
        : "Unknown",
    };
  }
  private extractViews(video: cheerio.Cheerio): string {
    let views = "Unknown";
    const metadata = video.find(".metadata");
    if (metadata.length) {
      const sprfluousSpans = metadata.find("span.sprfluous");
      if (sprfluousSpans.length >= 2) {
        const viewsText = sprfluousSpans[0].next.data.trim();
        return viewsText;
      }
    }
    return views;
  }

  private parseVideo(video: cheerio.Cheerio): Video | null {
    try {
      const title = this.extractTitle(video);
      const { path, url } = this.extractPathAndUrl(video);
      const duration = this.extractDuration(video);
      const profile = this.extractProfile(video);
      const views = this.extractViews(video);
      return {
        url,
        path,
        title,
        duration,
        profile,
        views,
      };
    } catch (e) {
      return null;
    }
  }
}

export default Parser;
