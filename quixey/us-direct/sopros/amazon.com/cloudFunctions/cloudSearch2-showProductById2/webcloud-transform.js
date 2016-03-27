var transform = function(webcloudOutput) {
  var transform = {
    "func://amazon.com/cloudSearch2-showProductById2": function(webcloudOutput) {
      
    
      
      var parsers = {
          "product_reviewCount": function(str) {
            try {
              return str.replace("(", "").replace(")", "");
            } catch(e) {}
            return str;
          },
          "product_qxyRatingText": function(str) {
            try {
              return str.split(' ')[0];
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
        var cloudFunc = "func://amazon.com/cloudSearch2-showProductById2";

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
          "product_brand": getNodeValue(["//div[contains(@class, 'sx-table-detail')]/div[contains(@class, 'a-row a-spacing-micro a-color-secondary')]/span[contains(@class, 'a-size-small')]", "//div[contains(@class, 'sx-table-detail')]/div[contains(@class, 'a-row a-spacing-micro a-color-secondary')]/span[contains(@class, 'a-size-small')]"], doc),
          "product_description": getNodeValue(["//div[contains(@class, 'sx-table-detail')]/div[contains(@class, 'a-row a-spacing-none a-size-small a-color-secondary')]"], doc),
          "product_image": getNodeValue(['/li[1]/a/div/div[1]/div/img'], doc),
          "product_name": getNodeValue(['/li[1]/a/div/div[2]/h5/strong'], doc),
          "product_price": getNodeValue(['/li[1]/a/div/div[2]/div[4]/span'], doc),
          "product_qxyInfo": getNodeValue(["//div[contains(@class, 'sx-table-detail')]/div[contains(@class, 'a-section a-spacing-micro')]/div[contains(@class, 'a-row a-size-small a-color-secondary')]"], doc),
          "product_qxyPriceText": getNodeValue(["//span[contains(@class, 'a-text-strike')]", "//span[contains(@class, 'a-text-strike')]"], doc),
          "product_qxyRatingText": parsers["product_qxyRatingText"](getNodeValue(["//div[contains(@class, 'sx-table-detail')]/div[contains(@class, 'a-section a-spacing-micro')]/div[contains(@class, 'a-row a-size-small a-color-secondary')]/span[contains(@class, 'a-text-bold')]"], doc)) ,
          "product_reviewCount": parsers["product_reviewCount"](getNodeValue(['/li[1]/a/div/div[2]/div[5]/span'], doc)) 
          }
        };

        if (params) {
          output = assign(output, params);
        }

        if (typeof(funcParamsCallback) === "function" && typeof(output.webUrl) === "string") {
          output.displayContent = assign(output.displayContent, funcParamsCallback(output.webUrl))
        }

        results.push({ "function": func, "deepViewContent": output });
      }

      return results;
    }
  };

  return transform["func://amazon.com/cloudSearch2-showProductById2"](webcloudOutput);
}



