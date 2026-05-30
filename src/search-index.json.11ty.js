class SearchIndex {
  data() {
    return {
      permalink: "/search-index.json",
      eleventyExcludeFromCollections: true,
    };
  }

  render({ collections }) {
    const pages = collections.all
      .filter((p) => p.data.title && p.data.group && p.data.keywords)
      .map((p) => ({
        title: p.data.title,
        group: p.data.group,
        url: p.url,
        keywords: p.data.keywords,
      }));
    return JSON.stringify(pages, null, 2);
  }
}

module.exports = SearchIndex;
