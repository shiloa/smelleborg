var transform = function(webcloudOutput) {
  var transform = {
    "func://amazon.com/cloudSearch2-showProductById2AdiTest": function(webcloudOutput) {
      
    
      
      var parsers = {
          "product_price": function(str) {
            try {
              return 'Adi!';
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
          "name": getNodeValue(["//h5[contains(@class, 'a-size-base')]"], doc),
          "product_brand": getNodeValue(["//div[contains(@class, 'sx-table-detail')]/div[contains(@class, 'a-row a-spacing-micro a-color-secondary')]/span[contains(@class, 'a-size-small')]"], doc),
          "product_description": getNodeValue(["//div[contains(@class, 'a-spacing-none')]", "//div[contains(@class, 'sx-table-detail')]/div[contains(@class, 'a-section a-spacing-micro')]/div[contains(@class, 'a-row a-size-small a-color-secondary')]"], doc),
          "product_image": getNodeValue(["//img[contains(@class, 'sx-product-image')]"], doc),
          "product_name": getNodeValue(["//h5[contains(@class, 'a-size-base')]"], doc),
          "product_price": parsers["product_price"](getNodeValue(["//span[contains(@class, 'a-declarative')]/span[contains(@class, 'a-size-small')]"], doc)) ,
          "product_qxyInfo": getNodeValue(["//div[contains(@class, 'a-spacing-none')]", "//div[contains(@class, 'sx-table-detail')]/div[contains(@class, 'a-row a-spacing-micro a-color-secondary')]/span[contains(@class, 'a-size-small')]"], doc),
          "product_qxyPriceText": getNodeValue(["//div[contains(@class, 'sx-table-detail')]/div[contains(@class, 'a-row a-spacing-micro a-color-secondary')]/span[contains(@class, 'a-size-small')]", "//div[contains(@class, 'sx-table-detail')]/div[contains(@class, 'a-row a-spacing-micro a-color-secondary')]/span[contains(@class, 'a-size-small')]"], doc),
          "product_qxyRatingText": getNodeValue(["//div[contains(@class, 'a-spacing-none')]", "//div[contains(@class, 'a-spacing-none')]"], doc),
          "product_reviewCount": getNodeValue(["//div[contains(@class, 'a-spacing-none')]"], doc),
          "quality": getNodeValue(["//div[contains(@class, 'sx-table-detail')]/div[contains(@class, 'a-section a-spacing-micro')]/div[contains(@class, 'a-row a-size-small a-color-secondary')]", "//div[contains(@class, 'a-spacing-none')]"], doc),
          "ratingCount": getNodeValue(["//div[contains(@class, 'sx-table-detail')]/div[contains(@class, 'a-section a-spacing-micro')]/div[contains(@class, 'a-row a-size-small a-color-secondary')]"], doc),
          "recipeIngredients": getNodeValue(["//span[contains(@class, 'a-declarative')]/span[contains(@class, 'a-size-small')]", "//span[contains(@class, 'a-declarative')]/span[contains(@class, 'a-size-small')]"], doc)
          }
        };

        if (params) {
          output = assign(output, params);
        }

        if (typeof(funcParamsCallback) === "function" && typeof(output.webUrl) === "string") {
          output.displayContent = assign(output.displayContent, funcParamsCallback(output.webUrl))
        }

        output.entitySchema = "Recipe";
        output.useEntitySchema = true;

        results.push({ "function": func, "deepViewContent": output });
      }

      return results;
    }
  };

  return transform["func://amazon.com/cloudSearch2-showProductById2AdiTest"](webcloudOutput);
}



