from .base import VideoScraper, parse_response

class FreshScraper(VideoScraper):
    def fresh(self, page: int = 1) -> str:
        if page == 0:
            endpoint = "fresh"
        else:
            endpoint = 'fresh_p'
        data = self.scrape(endpoint, {'page': page} if page else None)
        return parse_response(page, data, is_fresh=True)