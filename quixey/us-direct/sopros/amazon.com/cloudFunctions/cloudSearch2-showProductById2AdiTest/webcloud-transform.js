var transform = function(webcloudOutput) {
  var transform = {
    "func://amazon.com/cloudSearch2-showProductById2AdiTest": function(webcloudOutput) {
      
    
      
      var parsers = {
          "creativeWork_qxyInfo": function(str) {
            try {
              return 'bobo';
            } catch(e) {}
            return str;
          }
      };

      
      var funcParamsCallback = function(url) {
        try {
          return { "url": url };
        } catch (e) {
          print(e);
          return {};
        }
      };

      var results = [];

      for (var i = 0; i < webcloudOutput.length ; i++) {

        var data = webcloudOutput[i];
        var cloudFunc = "func://amazon.com/cloudSearch2-showProductById2AdiTest";

        var func = "func://amazon.com/showProductById2";

        var doc = parseDocument(data.content);

        var params = {};
        for (var key in data) {
          if (keysToExclude.indexOf(key) < 0) {
            params[key] = data[key];
          }
        }

        var output = {
          "displayContent": {          
          "areaServed": getNodeValue(["//span[contains(@class, 'a-color-secondary')]"], doc),
          "creativeWork_author": getNodeValue(["//div[contains(@class, 'sx-table-detail')]/div[contains(@class, 'a-row a-spacing-micro a-color-secondary')]/span[contains(@class, 'a-size-small')]", "//div[contains(@class, 'sx-table-detail')]/div[contains(@class, 'a-row a-spacing-micro a-color-secondary')]/span[contains(@class, 'a-size-small')]"], doc),
          "creativeWork_contentRating": getNodeValue(["//span[contains(@class, 'a-declarative')]/span[contains(@class, 'a-size-small')]"], doc),
          "creativeWork_description": getNodeValue(["//div[contains(@class, 'a-spacing-none')]", "//div[contains(@class, 'a-spacing-none')]"], doc),
          "creativeWork_duration": getNodeValue(["//span[contains(@class, 'a-color-secondary')]"], doc),
          "creativeWork_genre": getNodeValue(["//div[contains(@class, 'sx-table-detail')]/div[contains(@class, 'a-section a-spacing-micro')]/div[contains(@class, 'a-row a-size-small a-color-secondary')]"], doc),
          "creativeWork_image": getNodeValue(["//img[contains(@class, 'sx-product-image')]"], doc),
          "creativeWork_name": getNodeValue(["//h5[contains(@class, 'a-size-base')]"], doc),
          "creativeWork_qxyInfo": parsers["creativeWork_qxyInfo"](getNodeValue(["//div[contains(@class, 'sx-table-detail')]/div[contains(@class, 'a-section a-spacing-micro')]/div[contains(@class, 'a-row a-size-small a-color-secondary')]"], doc)) ,
          "creativeWork_qxyMoreInfo": getNodeValue(["//span[contains(@class, 'a-color-price')]"], doc),
          "description": getNodeValue(["//h5[contains(@class, 'a-size-base')]"], doc),
          "name": getNodeValue(["//div[contains(@class, 'sx-table-detail')]/div[contains(@class, 'a-section a-spacing-micro')]/div[contains(@class, 'a-row a-size-small a-color-secondary')]"], doc),
          "originalPrice": getNodeValue(["//span[contains(@class, 'a-declarative')]/span[contains(@class, 'a-size-small')]"], doc),
          "price": getNodeValue(["//span[contains(@class, 'a-color-price')]"], doc),
          "quality": getNodeValue(["//div[contains(@class, 'sx-table-detail')]/div[contains(@class, 'a-row a-spacing-micro a-color-secondary')]/span[contains(@class, 'a-size-small')]"], doc),
          "seller": getNodeValue(["//span[contains(@class, 'a-declarative')]/span[contains(@class, 'a-size-small')]"], doc),
          "userReviews": getNodeValue(["//span[contains(@class, 'a-color-link')]"], doc)
          }
        };

        if (params) {
          output = assign(output, params);
        }

        if (typeof(funcParamsCallback) === "function" && typeof(output.webUrl) === "string") {
          output.displayContent = assign(output.displayContent, funcParamsCallback(output.webUrl))
        }

        output.entitySchema = "Deal";
        output.useEntitySchema = true;

        results.push({ "function": func, "deepViewContent": output });
      }

      return results;
    }
  };

  return transform["func://amazon.com/cloudSearch2-showProductById2AdiTest"](webcloudOutput);
}



