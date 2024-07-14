from bs4 import BeautifulSoup
import re
from .config import config

def get_videos(soup):
    return [parse_video(video) for video in soup.select('#content > .mozaique > .thumb-block') if parse_video(video) is not None]

def get_pages(soup, is_fresh):
    pages = set()
    for page in soup.select('.pagination > ul > li > a'):
        text = page.text.strip()
        if text.isdigit():
            page_number = int(text)
            pages.add(page_number - 1 if is_fresh else page_number)
    
    last_page = soup.select_one('.last-page')
    if last_page:
        text = last_page.text.strip()
        if text.isdigit():
            last_page_number = int(text)
            pages.add(last_page_number - 1 if is_fresh else last_page_number)

    return sorted(pages)

def parse_response(page, data, is_fresh=False):
    soup = BeautifulSoup(data, 'html.parser')
    videos = get_videos(soup)
    results_count = extract_results_count(soup, is_fresh)
    pages = get_pages(soup, is_fresh)
    last_page = pages[-1]
    
    if not is_fresh:
        last_page = 149 if int(results_count) >= 4029 else (results_count // 27) + 1
    
    pagination = {
        'page': page + 1,
        'pages': pages,
        'last_page': last_page
    }
    
    return {
        'videos': videos,
        'pagination': pagination,
        'has_next': page < last_page,
        'next': page + 1 if page < last_page else None,
        'has_previous': page > min(pages),
        'previous': page - 1 if page > min(pages) else None,
        'results_count': results_count,
    }

def extract_results_count(soup, is_fresh=False):
    results_span = soup.select_one('h2.page-title .sub')
    if results_span:
        results_text = results_span.text.strip()
        match = re.search(r'\(([\d.,]+)', results_text)
        if match:
            results_count = int(match.group(1).replace('.', '').replace(',', ''))
        else:
            results_count = "Unknown"
    else:
        results_count = "Unknown"
    
    if is_fresh:
        results_count = 27 * 20000
    
    return results_count

def extract_title(video):
    title_element = video.select_one('.title a')
    if not title_element:
        raise ValueError("Title element not found")
    return title_element.get('title')

def extract_path_and_url(video):
    path_element = video.select_one('.thumb > a')
    if not path_element:
        raise ValueError("Path element not found")
    path = path_element.get('href')
    url = f"{config.get_base_url()}{path}"
    return path, url

def extract_duration(video):
    duration_element = video.select_one('.metadata .duration')
    return duration_element.text.strip() if duration_element else "Unknown"

def extract_profile(video):
    profile_element = video.select_one('.metadata span a')
    return {
        'name': profile_element.text.strip() if profile_element else "Unknown",
        'url': f"{config.get_base_url()}{profile_element.get('href')}" if profile_element else "Unknown"
    }

def extract_views(video):
    views = "Unknown"
    metadata = video.select_one('.metadata')
    if metadata:
        sprfluous_spans = metadata.find_all('span', class_='sprfluous')
        if len(sprfluous_spans) >= 2:
            views_text = sprfluous_spans[0].find_next_sibling(text=True)
            if views_text:
                views = views_text.strip().split()[0]
    return views

def parse_video(video):
    try:
        title = extract_title(video)
        path, url = extract_path_and_url(video)
        duration = extract_duration(video)
        profile = extract_profile(video)
        views = extract_views(video)
        return {
            'url': url,
            'path': path,
            'title': title,
            'duration': duration,
            'profile': profile,
            'views': views,
        }
    except ValueError as e:
        print(f"Error parsing video: {e}")
        return None
