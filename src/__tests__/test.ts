import XVideos from "../xvideos";

let scraper: XVideos;

beforeEach(() => {
  scraper = new XVideos();
});

test("fresh", async () => {
  const result = await scraper.fresh(2);
  expect(result).toHaveProperty("pagination");
});

test("search", async () => {
  const result = await scraper.search("example", 2, { sort: "relevance" });
  expect(result).toHaveProperty("pagination");
});

test("getVerified", async () => {
  const result = await scraper.getVerified("women", 2);
  expect(result).toHaveProperty("videos");
  expect(result.videos.length).toBeGreaterThan(0);
});

test("fresh with negative page", async () => {
  await expect(scraper.fresh(-1)).rejects.toThrow(
    "Page must be an integer greater than 0",
  );
});

test("search with negative page", async () => {
  await expect(
    scraper.search("example", -1, { sort: "relevance" }),
  ).rejects.toThrow("Page must be an integer greater than 0");
});

test("getVerified with negative page", async () => {
  await expect(scraper.getVerified("women", -1)).rejects.toThrow(
    "Page must be an integer greater than 0",
  );
});

test("search with empty string params", async () => {
  await expect(scraper.search("", 1)).rejects.toThrow();
});

test("fresh with large page", async () => {
  await expect(scraper.fresh(99999)).rejects.toThrow();
});

test("search with large page", async () => {
  const result = await scraper.search("example", 99999, { sort: "relevance" });
  expect(result).toHaveProperty("pagination");
});

test("getVerified with large page", async () => {
  await expect(scraper.getVerified("women", 99999)).rejects.toThrow();
});

test("search without page", async () => {
  const result = await scraper.search("example", 1, { sort: "relevance" });
  expect(result).toHaveProperty("pagination");
});

test("details with invalid URL", async () => {
  const invalidUrl = "https://invalidsite.com/video";
  await expect(scraper.details(invalidUrl)).rejects.toThrow();
});

test("details with valid URL", async () => {
  const validUrl =
    "https://www.xvideos.com/video.udefpih987f/mi_madrastra_perdio_apuesta_en_final_argentina_vs_colombia_y_me_lo_chupa";
  const details = await scraper.details(validUrl);
  expect(details).toHaveProperty("title");
  expect(details).toHaveProperty("url");
  expect(details).toHaveProperty("views");
  expect(details).toHaveProperty("image");
});
