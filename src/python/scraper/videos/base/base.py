from bs4 import BeautifulSoup;
import requests
from abc import ABC, abstractmethod
from .config import config
class BaseScraper():
    def __init__(self):
        self.base_url = config.get_base_url()
    @abstractmethod
    def scrape(self, endpoint: str, params: dict) -> str:
        pass
    def get_soup(self, endpoint: str, params: dict) -> BeautifulSoup:
        response = requests.get(f"{self.base_url}{endpoint}", params=params)
        print(response.url)
        return BeautifulSoup(response.text, 'html.parser')