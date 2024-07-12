from utils.videos.search import SearchScraper

scraper = SearchScraper()
result = scraper.search(page=1, k="pene", durf='1-3min')
print(result)