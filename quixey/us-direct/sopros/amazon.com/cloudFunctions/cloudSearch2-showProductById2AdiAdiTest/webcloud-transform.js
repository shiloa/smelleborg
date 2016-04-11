var transform = function(webcloudOutput) {
  var transform = {
    "func://amazon.com/cloudSearch2-showProductById2AdiAdiTest": function(webcloudOutput) {
      
    
      
      var parsers = {
          "description": function(str) {
            try {
              return ' Ho ho ho!';
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
        var cloudFunc = "func://amazon.com/cloudSearch2-showProductById2AdiAdiTest";

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
          "description": parsers["description"](getNodeValue(["//div[contains(@class, 'sx-table-detail')]/div[contains(@class, 'a-row a-spacing-micro a-color-secondary')]/span[contains(@class, 'a-size-small')]"], doc)) ,
          "image": getNodeValue(["//img[contains(@class, 'sx-product-image')]"], doc),
          "manufacturer": getNodeValue(["//div[contains(@class, 'sx-table-detail')]/div[contains(@class, 'a-row a-spacing-none a-size-small a-color-secondary')]"], doc),
          "name": getNodeValue(["//h5[contains(@class, 'a-size-base')]"], doc),
          "place_description": getNodeValue(["//div[contains(@class, 'sx-table-detail')]/div[contains(@class, 'a-section a-spacing-micro')]/div[contains(@class, 'a-row a-size-small a-color-secondary')]"], doc),
          "place_image": getNodeValue(["//img[contains(@class, 'sx-product-image')]"], doc),
          "place_name": getNodeValue(["//h5[contains(@class, 'a-size-base')]"], doc),
          "place_openingHours": getNodeValue(["//div[contains(@class, 'sx-table-detail')]/div[contains(@class, 'a-section a-spacing-micro')]/div[contains(@class, 'a-row a-size-small a-color-secondary')]/span[contains(@class, 'a-text-bold')]"], doc),
          "place_qxyInfo": getNodeValue(["//div[contains(@class, 'sx-table-detail')]/div[contains(@class, 'a-row a-spacing-micro a-color-secondary')]/span[contains(@class, 'a-size-small')]"], doc),
          "place_qxyRatingText": getNodeValue(["//div[contains(@class, 'a-icon-row')]/span[contains(@class, 'a-size-small a-color-secondary')]"], doc),
          "place_telephone": getNodeValue(["//div[contains(@class, 'a-spacing-none')]"], doc),
          "price": getNodeValue(["//span[contains(@class, 'a-color-price')]"], doc),
          "userReviews": getNodeValue(["//div[contains(@class, 'closed_caption')]", "//div[contains(@class, 'closed_caption')]"], doc)
          }
        };

        if (params) {
          output = assign(output, params);
        }

        if (typeof(funcParamsCallback) === "function" && typeof(output.webUrl) === "string") {
          output.displayContent = assign(output.displayContent, funcParamsCallback(output.webUrl))
        }

        output.entitySchema = "product";
        output.useEntitySchema = true;

        results.push({ "function": func, "deepViewContent": output });
      }

      return results;
    }
  };

  return transform["func://amazon.com/cloudSearch2-showProductById2AdiAdiTest"](webcloudOutput);
}



