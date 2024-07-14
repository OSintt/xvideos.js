from videos import FreshScraper, SearchScraper, VerifiedScraper

class XVideosScraper():
    def __init__(self):
        self.__fresh_scraper = FreshScraper()
        self.__search_scraper = SearchScraper()
        self.__verified_scraper = VerifiedScraper()
    
    def fresh(self, page=1):
        return self.__fresh_scraper.fresh(page)
    
    def search(self, page=1, k="", sort="relevance", durf="allduration", datef="all", quality="all", premium=False):
        return self.__search_scraper.search(page, k, sort, durf, datef, quality, premium)
    
    def get_verified(self, page=1):
        return self.__verified_scraper.get_verified(page)
        