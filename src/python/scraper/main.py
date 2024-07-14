from .xvideos import XVideosScraper
def main():
    scraper = XVideosScraper()
    print(scraper.fresh(page=1)) 
    print(scraper.search(page=1, k="example")) 
    print(scraper.get_verified(page=1)) 

if __name__ == "__main__":
    main()
