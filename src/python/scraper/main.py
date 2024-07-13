from videos.search import SearchScraper
from videos.fresh import FreshScraper

scraper = FreshScraper()
res = scraper.fresh()

#searcher = SearchScraper()
#res = searcher.search(k="tetas")
print(res['pagination'])