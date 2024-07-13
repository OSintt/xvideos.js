from .base.video_scraper import VideoScraper
from .base.parser import parse_response
class SearchScraper(VideoScraper):
    def search(
        self, page: int = 1, k: str = "", sort: str = "relevance", durf: str = "allduration", datef: str = "all", quality: str = "all"
    ) -> str:
        params = {
            'p': page,
            'k': k,
            'sort': sort,
            'durf': durf,
            'datef': datef,
            'quality': quality
        }
        data = self.scrape('search', params)
        return parse_response(page, data, is_fresh=False)

