from .videos import FreshScraper, SearchScraper, VerifiedScraper

    
def page_validator(func):
    def wrapper(self, page, *args, **kwargs):
        if page <= 0:
            raise ValueError("Page must be an integer greater than 0")
        page -= 1
        return func(self, page, *args, **kwargs)
    return wrapper

SAFE_MAX_NUMBER_VERIFIED = 254
SAFE_MAX_NUMBER_FRESH = 20000
class XVideosScraper():
    def __init__(self):
        self.__fresh_scraper = FreshScraper()
        self.__search_scraper = SearchScraper()
        self.__verified_scraper = VerifiedScraper()

    @page_validator
    def fresh(self, page=1):
        if page >= SAFE_MAX_NUMBER_FRESH: raise ValueError(f"Page parameter must be under {SAFE_MAX_NUMBER_FRESH}")
        return self.__fresh_scraper.fresh(page)

    @page_validator
    def search(self, page=1, k="", sort="relevance", durf="allduration", datef="all", quality="all", premium=False):
        return self.__search_scraper.search(page, k, sort, durf, datef, quality, premium)

    @page_validator
    def get_verified(self, page=1):
        if page >= SAFE_MAX_NUMBER_VERIFIED: raise ValueError(f"Page parameter must be under {SAFE_MAX_NUMBER_VERIFIED}")
        return self.__verified_scraper.get_verified(page)


        