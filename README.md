# xvideos

A [Node.js](https://nodejs.org) library for the [xvideos.com](https://www.xvideos.com) API.

## Installation

```bash
$ npm install xvideos.js
$ pnpm install xvideos.js
$ yarn add xvideos.js
```

## Usage

```javascript
import { XVideos }from 'xvideos.js';
const xvideos = new XVideos();
//-- Inside an async function --//

// Retrieve fresh videos from the first page
const fresh = await xvideos.fresh(1);
// Log details of the retrieved videos 
console.log(fresh.videos); // Array of video objects with properties like url, path, title, duration, profile, views
console.log(fresh.pagination.page); // Current page number
console.log(fresh.pagination.pages); // Array of available page numbers
console.log(fresh.hasNext()); // Check if there is a next page
console.log(fresh.hasPrevious()); // Check if there is a previous page

// Retrieve detailed information about a specific video
const detail = await xvideos.details(fresh.videos[0].url);
// Log details of the specific video
console.log(detail); // Detailed video object with properties like title, duration, image, videoType, views, files
```

## API

### Retrieve [Fresh Videos](https://www.xvideos.com/)

```javascript
// Retrieve fresh videos from the first page
const freshList = await xvideos.fresh(1);

// Check if there is a next page of results
console.log(freshList.hasNext()); // Outputs: true or false

// Check if there is a previous page of results
console.log(freshList.hasPrevious()); // Outputs: true or false

// Retrieve the next page of fresh videos if available
const nextVideos = await freshList.next();

// Retrieve the previous page of fresh videos if available
const previousVideos = await freshList.previous();
```

### Retrieve [Verified Videos](https://www.xvideos.com/verified/videos)

```javascript
// Retrieve verified videos from the first page
const verifiedList = await xvideos.getVerified("women", 1); // Argument 'type' can be either "women", "men", "gay", or "trans"

// Check if there is a next page of results
console.log(verifiedList.hasNext()); // Outputs: true or false

// Check if there is a previous page of results
console.log(verifiedList.hasPrevious()); // Outputs: true or false

// Refresh the current page of results to get updated data
const refreshedVideos = await verifiedList.refresh();

// Retrieve the next page of verified videos if available
const nextVideos = await verifiedList.next();

// Retrieve the previous page of verified videos if available
const previousVideos = await verifiedList.previous();
```

### Retrieve [Video Details](https://www.xvideos.com/video.udefpih987f/mi_madrastra_perdio_apuesta_en_final_argentina_vs_colombia_y_me_lo_chupa)

```javascript
// Retrieve detailed information about a specific video using its URL
const details = await xvideos.videos.details({ url: 'https://www.xvideos.com/video.udefpih987f/mi_madrastra_perdio_apuesta_en_final_argentina_vs_colombia_y_me_lo_chupa' });

// Log detailed information about the video
console.log(details); // Detailed video object with properties like title, duration, image, videoType, views, files
```

### Filter [Videos](https://www.xvideos.com/?k=threesome)

```javascript
// Search for videos using a keyword, and optionally specify a page number
const videos = await xvideos.videos.search('threesome', 5);
// Example with a specific page number
// const videos = await xvideos.videos.search({ k: 'public', page: 5 });

// Check if there is a next page of results
console.log(videos.hasNext()); // Outputs: true or false

// Check if there is a previous page of results
console.log(videos.hasPrevious()); // Outputs: true or false

// Refresh the current page of results to get updated data
const refreshedVideos = await videos.refresh();

// Retrieve the next page of videos if available
const nextVideos = await videos.next();

// Retrieve the previous page of videos if available
const previousVideos = await videos.previous();

// Search for videos with specific parameters
const videos = await xvideos.search("threesome", 5, {
  sort: 'rating',
  datef: 'week',
  durf: '3-10min',
  quality: 'hd'
});

// Log the search results
console.log(videos); // Array of video objects with properties based on the search parameters
```

#### Params explanation

| Parameter | Default        | Options                                                                                  |
|-----------|----------------|------------------------------------------------------------------------------------------|
| `sort`    | `"relevance"`  | `"uploaddate"`, `"rating"`, `"length"`, `"views"`, `"random"`                            |
| `datef`   | `"all"`        | `"today"`, `"week"`, `"month"`, `"3month"`, `"6month"`, `"all"`                         |
| `durf`    | `"allduration"`| `"1-3min"`, `"3-10min"`, `"10min_more"`, `"10-20min"`, `"20min_more"`, `"allduration"` |
| `quality` | `"all"`        | `"hd"`, `"1080P"`, `"all"`                                                                |
| `premium` | `false`        | `true`, `false`                                                                |



---
### 🐼 @me

You can find me on twitter as 🐤 <a href="https://twitter.com/osinthappyemo">@osinthappyemo</a>
or on instagram as 🍢 <a href="https://instagram.com/osintxv">@osintxv</a>
