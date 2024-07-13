import json
import os

class Config:
    def __init__(self, config_file: str):
        with open(config_file, 'r') as file:
            config_data = json.load(file)
        
        self.base_url = config_data['base_url']
        self.endpoints = config_data['endpoints']

    def get_base_url(self):
        return self.base_url

    def get_endpoint(self, endpoint_name: str, page: int = None) -> str:
        endpoint = self.endpoints.get(endpoint_name, '')
        if page is not None:
            return endpoint.format(page=page)
        return endpoint

config = Config(os.path.join(os.path.dirname(__file__), 'config.json'))

