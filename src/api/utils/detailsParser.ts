import cheerio from "cheerio";
import puppeteer, { Browser } from "puppeteer";
import fs from "fs";
import axios from "axios";
interface PuppeteerConfig {
  headless: boolean;
  slow_mo: number;
  args: string[];
}

class DetailsParser {
  private $: cheerio.Root;
  private puppeteerConfig: PuppeteerConfig;
  constructor() {
    this.puppeteerConfig = {
      headless: true,
      slow_mo: 50,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    };
  }

  private async setup(url: string) {
    const browser: Browser | undefined = await puppeteer.launch(
      this.puppeteerConfig,
    );
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });
    const html = await page.content();
    this.$ = cheerio.load(html);
  }
  private async getMeta($: cheerio.Root) {
    const title = $('meta[property="og:title"]').attr("content");
    const duration = parseInt(
      $('meta[property="og:duration"]').attr("content"),
    );
    const image = $('meta[property="og:image"]').attr("content");
    const videoType = $('meta[property="og:type"]').attr("content");
    const descriptionMeta = $('meta[name="description"]').attr("content");
    const description = descriptionMeta ? descriptionMeta : null;
    return { title, duration, image, videoType, description };
  }

  private async getViews($: cheerio.Root) {
    const viewsElement = $("#v-views strong.mobile-hide").text();
    const views = viewsElement ? viewsElement.trim() : null;
    return views;
  }

  private async getLikes(
    $: cheerio.Root,
  ): Promise<{ likePercentage: string; dislikePercentage: string }> {
    const likePercentageElement = $(
      ".vote-action-good .rating-good-perc",
    ).text();
    const likePercentage = likePercentageElement
      ? likePercentageElement.trim()
      : null;
    const dislikePercentageElement = $(
      ".vote-action-bad .rating-bad-perc",
    ).text();
    const dislikePercentage = dislikePercentageElement
      ? dislikePercentageElement.trim()
      : null;
    return { likePercentage, dislikePercentage };
  }

  private async getComments($: cheerio.Root): Promise<number> {
    const commentsButton = $(".comments .badge").text();
    const commentsCount = commentsButton ? commentsButton.trim() : null;
    return parseInt(commentsCount);
  }

  private async getFiles($: cheerio.Root): Promise<Files> {
    const videoScript = $("#video-player-bg > script:nth-child(6)").html();
    const files = {
      low: this.extractFileUrl(
        videoScript,
        /html5player\.setVideoUrlLow\('(.*?)'\);/,
      ),
      high: this.extractFileUrl(
        videoScript,
        /html5player\.setVideoUrlHigh\('(.*?)'\);/,
      ),
      HLS: this.extractFileUrl(
        videoScript,
        /html5player\.setVideoHLS\('(.*?)'\);/,
      ),
      thumb: this.extractFileUrl(
        videoScript,
        /html5player\.setThumbUrl\('(.*?)'\);/,
      ),
      thumb69: this.extractFileUrl(
        videoScript,
        /html5player\.setThumbUrl169\('(.*?)'\);/,
      ),
      thumbSlide: this.extractFileUrl(
        videoScript,
        /html5player\.setThumbSlide\('(.*?)'\);/,
      ),
      thumbSlideBig: this.extractFileUrl(
        videoScript,
        /html5player\.setThumbSlideBig\('(.*?)'\);/,
      ),
    };
    return files;
  }

  private async getModels($: cheerio.Root): Promise<Model[]> {
    const models = $(".model");
    const modelData: Array<{ name: string; profileUrl: string; id: string }> =
      [];
    models.each((_, model) => {
      const profileUrl = $(model).find("a").attr("href");
      const name = $(model).find(".name").text();
      const id = $(model).find("a").data("id");
      modelData.push({ name, profileUrl, id });
    });
    return modelData;
  }

  private async getMainUploader($: cheerio.Root): Promise<MainUploader> {
    const model = $("li.main-uploader");
    const profileUrl = $(model).find("a").attr("href");
    const name = $(model).find(".name").text().trim();
    return { name, profileUrl };
  }

  private async getTags($: cheerio.Root): Promise<string[]> {
    const tags = $(".is-keyword");
    const tagList: string[] = [];
    tags.each((_, tag) => {
      tagList.push($(tag).text());
    });
    return tagList;
  }

  public async scrape(url: string): Promise<VideoDetails> {
    await this.setup(url);
    const meta = await this.getMeta(this.$);
    const views = await this.getViews(this.$);
    const likes = await this.getLikes(this.$);
    const comments = await this.getComments(this.$);
    const files = await this.getFiles(this.$);
    const models = await this.getModels(this.$);
    const tags = await this.getTags(this.$);
    const mainUploader = await this.getMainUploader(this.$);
    return {
      ...meta,
      url,
      views,
      files,
      mainUploader,
      models,
      tags,
      likePercentage: likes.likePercentage,
      dislikePercentage: likes.dislikePercentage,
      commentsCount: comments,
    };
  }

  private extractFileUrl(scriptContent: string | null, pattern: RegExp): string | null {
    if (!scriptContent) return null;
    const match = scriptContent.match(pattern);
    return match ? match[1] : null;
  }

  public async downloadVideo(url: string, filename: string): Promise<string | null> {
    if (!filename.endsWith(".mp4")) filename += ".mp4";
    const directory = filename.substring(0, filename.lastIndexOf("/"));
    if (directory && !fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }
    const response = await axios.get(url, { responseType: "stream" });
    if (response.status === 200) {
      const writer = fs.createWriteStream(filename);
      response.data.pipe(writer);
      return new Promise((resolve, reject) => {
        writer.on("finish", () => resolve(filename));
        writer.on("error", reject);
      });
    } else {
      return null;
    }
  }
}

export default DetailsParser;
