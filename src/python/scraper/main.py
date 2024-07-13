from videos.search import SearchScraper
from videos.fresh import FreshScraper

scraper = FreshScraper()
res = scraper.fresh(page=5)

#searcher = SearchScraper()
#res = searcher.search(k="poronga")
print(res)