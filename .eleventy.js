module.exports = function (eleventyConfig) {
  // Output .html files at their original paths (e.g. /roadmap.html not /roadmap/)
  eleventyConfig.addGlobalData("eleventyComputed", {
    permalink(data) {
      // Let templates that set their own permalink win (e.g. search-index.json.11ty.js)
      if (data.permalink) return data.permalink;
      return data.page.filePathStem + ".html";
    },
  });

  eleventyConfig.addPassthroughCopy("src/style.css");
  eleventyConfig.addPassthroughCopy("src/theme.js");
  eleventyConfig.addPassthroughCopy("src/search.js");
  eleventyConfig.addPassthroughCopy("src/_redirects");
  eleventyConfig.addPassthroughCopy("src/llms.txt");
  eleventyConfig.addPassthroughCopy("src/llms-full.txt");

  return {
    dir: {
      input: "src",
      output: "_site",
      layouts: "_layouts",
      data: "_data",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["html", "njk", "md", "11ty.js"],
  };
};
