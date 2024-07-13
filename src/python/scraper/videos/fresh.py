from .base.video_scraper import VideoScraper
from .base.parser import parse_response

class FreshScraper(VideoScraper):
    def fresh(self, page: int = 1) -> str:
        if page == 1:
            endpoint = "fresh"
        else:
            endpoint = 'fresh_p'
        data = self.scrape(endpoint, {'page': page - 1} if page else None)
        return parse_response(page, data, self.scrape, is_fresh=True)