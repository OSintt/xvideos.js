from .base import VideoScraper, parse_response

class VerifiedScraper(VideoScraper):
    def get_verified(self, page: int = 1, type="women") -> str:
        page -= 1
        if type == "women":
            endpoint = "verified"
        elif type == "men":
            endpoint = "verified_men"
        elif type == "gay":
            endpoint = f'verified_gay'
        elif type == "trans":
            endpoint = f'verified_trans'
        else:
            raise ValueError("Endpoint must be either women, men, gay or trans")
        data = self.scrape(endpoint, {'page': page} if page else None)
        return parse_response(page, data, is_fresh=True)