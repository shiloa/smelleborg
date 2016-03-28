var transform = function(webcloudOutput) {
  var transform = {
    "func://ahalife.com/cloudSearch2-showProductById2": function(webcloudOutput) {
      
    
      
      var parsers = {
          "product_image": function(str) {
            try {
              return "https://lh5.ggpht.com/81M05pEyFiOqKt8CashUoz66iJAhL-3PHHbAil108QkU9sKeVZBuZaNJiV7b0gZ2GFU=w300-rw";
            } catch(e) {}
            return str;
          },
          "product_price": function(str) {
            try {
              return str.substring(1);
            } catch(e) {}
            return str;
          },
          "product_qxyPriceText": function(str) {
            try {
              return "bla";
            } catch(e) {}
            return str;
          },
          "product_priceCurrency": function(str) {
            try {
              return str.substring(0,1);
            } catch(e) {}
            return str;
          }
      };


      var results = [];

      for (var i = 0; i < webcloudOutput.length ; i++) {

        var data = webcloudOutput[i];
        var cloudFunc = "func://ahalife.com/cloudSearch2-showProductById2";

        var func = "None";

        var doc = parseDocument(data.content);

        var params = {};
        for (var key in data) {
          if (keysToExclude.indexOf(key) < 0) {
            params[key] = data[key];
          }
        }

        var output = {
          "displayContent": {          
          "product_brand": getNodeValue(["//a[contains(@class, 'highlight')]"], doc),
          "product_description": getNodeValue(["//h2[contains(@class, 'heading3')]/span"], doc),
          "product_image": parsers["product_image"](getNodeValue(["//img[contains(@itemprop,'image')]"], doc)) ,
          "product_name": getNodeValue(["//h1[contains(@class, 'heading1')]"], doc),
          "product_price": parsers["product_price"](getNodeValue(["//div[contains(@class, 'sku-price')]"], doc)) ,
          "product_priceCurrency": parsers["product_priceCurrency"](getNodeValue(["//div[contains(@class, 'sku-price')]"], doc)) ,
          "product_qxyAvgRating": getNodeValue(["//a[contains(@class, 'MANUAL')]"], doc),
          "product_qxyInfo": getNodeValue(["//div[contains(@class, 'sku-price')]"], doc),
          "product_qxyPriceText": parsers["product_qxyPriceText"](getNodeValue(["//a[contains(@class, 'MANUAL')]"], doc)) ,
          "product_qxyRatingText": getNodeValue(["//a[contains(@class, 'MANUAL')]"], doc),
          "product_reviewCount": getNodeValue(["//a[contains(@class, 'MANUAL')]"], doc)
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

  return transform["func://ahalife.com/cloudSearch2-showProductById2"](webcloudOutput);
}



