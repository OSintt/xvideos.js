from xvideos import XVideosScraper
def main():
    scraper = XVideosScraper()
    print(scraper.fresh(page=2)['pagination'])  # Llama al scraper FreshScraper
    print(scraper.search(page=2, k="example", sort="relevance")['pagination'])  # Llama al scraper SearchScraper
    print(scraper.get_verified(page=2)['videos'][0]['title'])  # Llama al scraper VerifiedScraper
    print(scraper.get_verified(page=1)['videos'][0]['title'])  # Llama al scraper VerifiedScraper

if __name__ == "__main__":
    main()
