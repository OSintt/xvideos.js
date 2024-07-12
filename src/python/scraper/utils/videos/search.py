from .base.video_scraper import VideoScraper

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
        return self.scrape('search', params)

