var transform = function(webcloudOutput) {
  var transform = {
    "func://amazon.com/cloudSearch2-showProductByIdWithEntity2AdiTest": function(webcloudOutput) {
      
    
      
      var parsers = {
          "product_price": function(str) {
            try {
              return str.split(' ')[2];
            } catch(e) {}
            return str;
          }
      };

      
      var funcParamsCallback = function(url) {
        try {
          return {bla: url}
        } catch (e) {
          print(e);
          return {};
        }
      };

      var results = [];

      for (var i = 0; i < webcloudOutput.length ; i++) {

        var data = webcloudOutput[i];
        var cloudFunc = "func://amazon.com/cloudSearch2-showProductByIdWithEntity2AdiTest";

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
          "product_description": getNodeValue(["//div[contains(@class, 'a-container')]/div/div[contains(@class, 'a-row')]/div/span/span/div[contains(@class, 'a-section a-spacing-mini')]/span[contains(@class, 'a-color-secondary')]/span[contains(@class, 'a-size-small')]", "//div[contains(@class, 'a-container')]/div/div[contains(@class, 'a-row')]/div/span/span/div[contains(@class, 'a-section a-spacing-mini')]/span[contains(@class, 'a-color-secondary')]/span[contains(@class, 'a-size-small')]"], doc),
          "product_image": getNodeValue(["//*[@id='main-image']"], doc),
          "product_name": getNodeValue(['//td/h4'], doc),
          "product_price": parsers["product_price"](getNodeValue(["//div[contains(@class, 'a-container')]/div/div[contains(@class, 'a-row')]/div/div[contains(@class, 'a-section a-spacing-none')]/div[contains(@class, 'a-section a-spacing-none')]/div[contains(@class, 'a-section a-spacing-small a-spacing-top-small')]/span[contains(@class, 'a-text-bold')]"], doc)) ,
          "product_qxyAvgRating": getNodeValue(['//td/h4'], doc),
          "product_qxyInfo": getNodeValue(["//table[contains(@class, 'a-align-top')]/tbody/tr/td/span[contains(@class, 'a-size-medium a-color-price')]"], doc),
          "product_qxyPriceText": getNodeValue(["//*[@id='merchant-info']"], doc),
          "product_qxyRatingText": getNodeValue(["//a[contains(@class, 'a-size-small')]"], doc)
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

  return transform["func://amazon.com/cloudSearch2-showProductByIdWithEntity2AdiTest"](webcloudOutput);
}



