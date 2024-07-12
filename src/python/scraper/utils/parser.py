from bs4 import BeautifulSoup
from pagination_function import (
    create_has_next_function,
    create_has_previous_function,
    create_next_function,
    create_previous_function,
    create_refresh_function
)
from videos.base.base import base

def parse_video(video):
    title = video.find('p:not(.metadata) a')['title']
    path = video.find('.thumb > a')['href']
    url = f"{base['BASE_URL']}{path}"
    views = video.find('p.metadata > span > span:not(.duration)').text
    duration = video.find('p.metadata > span.bg > span.duration').text
    profile_element = video.find('p.metadata > span > a')
    profile = {
        'name': profile_element.text,
        'url': f"{base['BASE_URL']}{profile_element['href']}"
    }
    return {
        'url': url,
        'path': path,
        'title': title,
        'duration': duration,
        'profile': profile,
        'views': views
    }

def get_videos(soup):
    return [parse_video(video) for video in soup.select('#content > .mozaique > .thumb-block')]

def get_pages(soup):
    return [
        int(page.text) - 1 for page in soup.select('.pagination > ul > li > a')
        if page.text.isdigit()
    ]

def parse_response(page, data, load_module_function):
    soup = BeautifulSoup(data, 'html.parser')
    videos = get_videos(soup)
    pagination = {
        'page': page,
        'pages': get_pages(soup)
    }
    return {
        'videos': videos,
        'pagination': pagination,
        'refresh': create_refresh_function(pagination, load_module_function),
        'has_next': create_has_next_function(pagination),
        'next': create_next_function(pagination, load_module_function),
        'has_previous': create_has_previous_function(pagination),
        'previous': create_previous_function(pagination, load_module_function)
    }
