import SearchScraper from "api/videos/search";
import VerifiedScraper from "api/videos/verified";

const xvideos = new VerifiedScraper();

async function s() {
    const p = await xvideos.getVerified();
    console.log(p);
};

s();
