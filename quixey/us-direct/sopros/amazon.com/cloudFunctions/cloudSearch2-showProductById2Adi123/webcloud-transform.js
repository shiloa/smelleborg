var transform = function(webcloudOutput) {
  var transform = {
    "func://amazon.com/cloudSearch2-showProductById2Adi123": function(webcloudOutput) {
      
    
      
      var parsers = {
          "creativeWork_qxyInfo": function(str) {
            try {
              return 'bobo';
            } catch(e) {}
            return str;
          },
          "@vertical": function(str) {
            try {
              return 'Deal';
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
          "displayContent": {          
          "@vertical": parsers["@vertical"](getNodeValue(["//div[contains(@class, 'sx-table-detail')]/div[contains(@class, 'a-section a-spacing-micro')]/div[contains(@class, 'a-row a-size-small a-color-secondary')]/span[contains(@class, 'a-text-bold')]"], doc)) ,
          "creativeWork_author": getNodeValue(["//div[contains(@class, 'sx-table-detail')]/div[contains(@class, 'a-section a-spacing-micro')]/div[contains(@class, 'a-row a-size-small a-color-secondary')]"], doc),
          "creativeWork_description": getNodeValue(["//div[contains(@class, 'sx-table-detail')]/div[contains(@class, 'a-section a-spacing-micro')]/div[contains(@class, 'a-row a-size-small a-color-secondary')]"], doc),
          "creativeWork_duration": getNodeValue(["//div[contains(@class, 'sx-table-detail')]/div[contains(@class, 'a-section a-spacing-micro')]"], doc),
          "creativeWork_genre": getNodeValue(["//div[contains(@class, 'a-spacing-none')]"], doc),
          "creativeWork_image": getNodeValue(["//img[contains(@class, 'sx-product-image')]"], doc),
          "creativeWork_name": getNodeValue(["//h5[contains(@class, 'a-size-base')]", "//div[contains(@class, 'sx-table-detail')]/div[contains(@class, 'a-row a-spacing-micro a-color-secondary')]/span[contains(@class, 'a-size-small')]"], doc),
          "creativeWork_qxyInfo": parsers["creativeWork_qxyInfo"](getNodeValue(["//div[contains(@class, 'a-spacing-none')]"], doc)) ,
          "creativeWork_qxyMoreInfo": getNodeValue(["//div[contains(@class, 'sx-table-detail')]/div[contains(@class, 'a-section a-spacing-micro')]/div[contains(@class, 'a-row')]/span[contains(@class, 'a-size-small a-color-price a-text-bold')]", "//div[contains(@class, 'sx-table-detail')]/div[contains(@class, 'a-section a-spacing-micro')]/div[contains(@class, 'a-row')]/span[contains(@class, 'a-size-small a-color-price a-text-bold')]"], doc),
          "description": getNodeValue(["//div[contains(@class, 'sx-table-detail')]/div[contains(@class, 'a-section a-spacing-micro')]/div[contains(@class, 'a-row a-size-small a-color-secondary')]"], doc),
          "manufacturer": getNodeValue(["//span[contains(@class, 'a-color-link')]", "//span[contains(@class, 'a-color-link')]"], doc),
          "name": getNodeValue(["//h5[contains(@class, 'a-size-base')]"], doc),
          "price": getNodeValue(["//div[contains(@class, 'a-spacing-none')]/span[contains(@class, 'a-color-price')]"], doc)
          }
        };

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

  return transform["func://amazon.com/cloudSearch2-showProductById2Adi123"](webcloudOutput);
}



