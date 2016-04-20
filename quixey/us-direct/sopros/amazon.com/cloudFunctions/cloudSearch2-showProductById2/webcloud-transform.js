var transform = function(webcloudOutput) {
  var transform = {
    "func://amazon.com/cloudSearch2-showProductById2": function(webcloudOutput) {
      
        
      var funcParamsCallback = function(url) {
        try {
          {}
        } catch (e) {
          print(e);
          return {};
        }
      };
      
      var parsers = {          "action_description": function(str) {
            try {
              return str.split(":")[0];
            } catch(e) {}
            return str;
          },
          "expires": function(str) {
            try {
              return (new Date).toISOString().replace(/\.\d+/g, '');
            } catch(e) {}
            return str;
          }
      };

      var results = [];

      for (var i = 0; i < webcloudOutput.length ; i++) {

        var data = webcloudOutput[i];
        var cloudFunc = "func://amazon.com/cloudSearch2-showProductById2";

        var func = "{}";

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

        
        addComputedValue(output.displayContent, "action_description", ["//div[contains(@class, 'sx-table-detail')]/div[contains(@class, 'a-row a-spacing-none a-size-small a-color-secondary')]"], parsers, doc);
        addComputedValue(output.displayContent, "action_image", ["//img[contains(@class, 'sx-product-image')]"], parsers, doc);
        addComputedValue(output.displayContent, "action_name", ["//h5[contains(@class, 'a-size-base')]"], parsers, doc);
        addComputedValue(output.displayContent, "expires", ["//div[contains(@class, 'sx-table-detail')]/div[contains(@class, 'a-section a-spacing-micro')]/div[contains(@class, 'a-row a-size-small a-color-secondary')]/span[contains(@class, 'a-text-bold')]"], parsers, doc);
        addComputedValue(output.displayContent, "name", ["//h5[contains(@class, 'a-size-base')]"], parsers, doc);
        addComputedValue(output.displayContent, "price", ["//div[contains(@class, 'sx-table-detail')]/div[contains(@class, 'a-section a-spacing-micro')]/div[contains(@class, 'a-row')]/span[contains(@class, 'a-size-small a-color-price a-text-bold')]"], parsers, doc);
        addComputedValue(output.displayContent, "ratingCount", ["//div[contains(@class, 'a-icon-row')]/span[contains(@class, 'a-size-small a-color-secondary')]"], parsers, doc);


        if (params) {
          output = assign(output, params);
        }

        if (typeof(funcParamsCallback) === "function" && typeof(output.webUrl) === "string") {
          var funcParams = funcParamsCallback(output.webUrl);

          output.displayContent = assign(output.displayContent, {
            "@id": populateFurl("{}", funcParams)
          });

          output.displayContent = assign(output.displayContent, funcParams)
        }


        output.displayContent = assign(output.displayContent, {
          "@type": "Product",
          "crawled": utcNow(),
          "created": utcNow(),
          "httpStatusCode": 200,
          "url": output.webUrl
        });
        output.entitySchema = "product";
        output.useEntitySchema = true;

        results.push({ "function": func, "deepViewContent": output });
      }

      return results;
    }
  };

  return transform["func://amazon.com/cloudSearch2-showProductById2"](webcloudOutput);
}



