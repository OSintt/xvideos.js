from .base import BaseScraper
from .config.config import config

class VideoScraper(BaseScraper):
    def scrape(self, endpoint_name: str, params: dict = None) -> str:
        endpoint = config.get_endpoint(endpoint_name)
        if not endpoint:
            raise ValueError(f"Endpoint '{endpoint_name}' not found in configuration.")
        
        soup = self.get_soup(endpoint, params)
        return soup.prettify()
    
    
