import SearchScraper from "api/videos/search";
import VerifiedScraper from "api/videos/verified";

const xvideos = new SearchScraper();

async function s() {
    const p = await xvideos.search("tetas");
    console.log(p.videos[0].profile);
};

s();
