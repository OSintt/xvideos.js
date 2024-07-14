# xvideos-py
A powerful Python library to scrape xvideos.com.

## 💻 Installation

```bash
$ pip install xvideos-py
```

## 🍑 Usage

### 🍒 Importing the Library

```python
from xvideos import XVideos
```

### 🍒 Retrieve Fresh Videos

```python
xvideos = XVideos()

# Retrieve fresh videos from the first page
fresh = xvideos.fresh(page=1)

# Log details of the retrieved videos
print(fresh['videos'])  # List of video objects with properties like url, path, title, duration, profile, views
print(fresh['pagination']['pages'])  # List of available page numbers
```

### 🍒 Retrieve Verified Videos

```python
# Retrieve verified videos from the first page
verified = xvideos.get_verified(page=1)

# Log details of the retrieved videos
print(verified['videos'])  # List of verified video objects with properties like url, path, title, duration, profile, views
print(verified['pagination'])  # List of available page numbers
```

### 🍒 Search Videos

```python
# Search for videos with a specific keyword
search_results = xvideos.search(page=1, k="example", sort="relevance")

# Log details of the search results
print(search_results['videos'])  # List of video objects with properties based on the search parameters
print(search_results['pagination'])  # List of available page numbers
```

#### 🍐 Params explanation

| Parameter | Default        | Options                                                                                  |
|-----------|----------------|------------------------------------------------------------------------------------------|
| `page`    | `1`            | (any positive integer)                                                                   |
| `k`       | `""`           | (any search keyword)                                                                     |
| `sort`    | `"relevance"`  | `"uploaddate"`, `"rating"`, `"length"`, `"views"`, `"random"`                            |
| `datef`   | `"all"`        | `"today"`, `"week"`, `"month"`, `"3month"`, `"6month"`, `"all"`                         |
| `durf`    | `"allduration"`| `"1-3min"`, `"3-10min"`, `"10min_more"`, `"10-20min"`, `"20min_more"`, `"allduration"` |
| `quality` | `"all"`        | `"hd"`, `"1080P"`, `"all"`                                                                |
| `pewmium` | `False`        | `False`, `True`                                                                |
## 🍑 Development

### 🍒 Running Tests

To run tests, you can use `pytest`. Ensure you have it installed in your development environment.

```bash
$ pytest
```

### 🐼 @me

You can find me on twitter as 🐤 <a href="https://twitter.com/osinthappyemo">@osinthappyemo</a>
or on instagram as 🍢 <a href="https://instagram.com/osintxv">@osintxv</a>
