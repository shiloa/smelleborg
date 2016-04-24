var transform = function(webcloudOutput) {
  var transform = {
    "func://amazon.com/cloudSearch2-showProductById2Adi123": function(webcloudOutput) {
      
        
      var funcParamsCallback = function(url) {
        try {
          return { "url": url };
        } catch (e) {
          print(e);
          return {};
        }
      };
      
      var parsers = {          "expires": function(str) {
            try {
              return '2016-04-11T17:31:22Z';
            } catch(e) {}
            return str;
          },
          "creativeWork_qxyMoreInfo": function(str) {
            try {
              return 'bobo';
            } catch(e) {}
            return str;
          }
      };

      var results = [];

      for (var i = 0; i < webcloudOutput.length ; i++) {

        var data = webcloudOutput[i];
        var cloudFunc = "func://amazon.com/cloudSearch2-showProductById2Adi123";

        var func = "func://amazon.com/showProductById2";

        var doc = parseDocument(data.content);

        var params = {};
        for (var key in data) {
          if (keysToExclude.indexOf(key) < 0) {
            params[key] = data[key];
          }
        }

        var output = {
          "displayContent": {}
        };

        
        addComputedValue(output.displayContent, "@vertical", ["//div[contains(@class, 'sx-table-detail')]/div[contains(@class, 'a-section a-spacing-micro')]/div[contains(@class, 'a-row a-size-small a-color-secondary')]"], parsers, doc);
        addComputedValue(output.displayContent, "creativeWork_author", ["//div[contains(@class, 'sx-table-detail')]/div[contains(@class, 'a-section a-spacing-micro')]/div[contains(@class, 'a-row a-size-small a-color-secondary')]"], parsers, doc);
        addComputedValue(output.displayContent, "creativeWork_description", ["//div[contains(@class, 'sx-table-detail')]/div[contains(@class, 'a-section a-spacing-micro')]"], parsers, doc);
        addComputedValue(output.displayContent, "creativeWork_duration", ["//span[contains(@class, 'a-color-secondary')]"], parsers, doc);
        addComputedValue(output.displayContent, "creativeWork_genre", ["//span[contains(@class, 'a-color-link')]"], parsers, doc);
        addComputedValue(output.displayContent, "creativeWork_image", ["//img[contains(@class, 'sx-product-image')]"], parsers, doc);
        addComputedValue(output.displayContent, "creativeWork_name", ["//h5[contains(@class, 'a-size-base')]", "//div[contains(@class, 'sx-table-detail')]/div[contains(@class, 'a-row a-spacing-micro a-color-secondary')]/span[contains(@class, 'a-size-small')]"], parsers, doc);
        addComputedValue(output.displayContent, "creativeWork_qxyInfo", ["//div[contains(@class, 'a-spacing-none')]"], parsers, doc);
        addComputedValue(output.displayContent, "creativeWork_qxyMoreInfo", ["//div[contains(@class, 'sx-table-detail')]/div[contains(@class, 'a-section a-spacing-micro')]/div[contains(@class, 'a-row a-size-small a-color-secondary')]"], parsers, doc);
        addComputedValue(output.displayContent, "dateline", ["//div[contains(@class, 'sx-table-detail')]/div[contains(@class, 'a-section a-spacing-micro')]/div[contains(@class, 'a-row a-size-small a-color-secondary')]/span[contains(@class, 'a-text-bold')]"], parsers, doc);
        addComputedValue(output.displayContent, "description", ["//div[contains(@class, 'sx-table-detail')]/div[contains(@class, 'a-row a-spacing-micro a-color-secondary')]/span[contains(@class, 'a-size-small')]", "//div[contains(@class, 'sx-table-detail')]/div[contains(@class, 'a-row a-spacing-micro a-color-secondary')]/span[contains(@class, 'a-size-small')]"], parsers, doc);
        addComputedValue(output.displayContent, "expires", ["//div[contains(@class, 'a-spacing-none')]/span[contains(@class, 'a-color-price')]"], parsers, doc);
        addComputedValue(output.displayContent, "name", ["//h5[contains(@class, 'a-size-base')]"], parsers, doc);


        if (params) {
          output = assign(output, params);
        }

        if (typeof(funcParamsCallback) === "function" && typeof(output.webUrl) === "string") {
          var funcParams = funcParamsCallback(output.webUrl);

          output.displayContent = assign(output.displayContent, {
            "@id": populateFurl("func://amazon.com/showProductById2/{url}", funcParams)
          });

          output.displayContent = assign(output.displayContent, funcParams)
        }


        output.displayContent = assign(output.displayContent, {
          "@type": "NewsArticle",
          "crawled": utcNow(),
          "created": utcNow(),
          "httpStatusCode": 200,
          "url": output.webUrl
        });
        output.entitySchema = "newsarticle";
        output.useEntitySchema = true;

        results.push({ "function": func, "deepViewContent": output });
      }

      return results;
    }
  };

  return transform["func://amazon.com/cloudSearch2-showProductById2Adi123"](webcloudOutput);
}



