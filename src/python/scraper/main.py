from .xvideos import XVideos
def main():
    xvideos = XVideos()
    print(xvideos.fresh(page=1)) 
    print(xvideos.search(page=1, k="example")) 
    print(xvideos.get_verified(page=1)) 

if __name__ == "__main__":
    main()
