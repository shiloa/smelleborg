var transform = function(cloudOutput, ttl) {
  var transform = {
    "func://amazon.com/cloudSearch2-showProductById2": function(cloudOutput) {
      
          
      var parsers = {          "product_reviewCount": function(str) {
            try {
              return str.replace("(", "").replace(")", "");
            } catch(e) {}
            return str;
          }
      };

      var results = [];

      for (var i = 0; i < cloudOutput.length ; i++) {

        var data = cloudOutput[i];
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
          "displayContent": {}
        };

        
  
        addComputedValue(output.displayContent, "@vertical", ["//div[contains(@class, 'sx-table-detail')]/div[contains(@class, 'a-section a-spacing-micro')]/div[contains(@class, 'a-row a-size-small a-color-secondary')]/span[contains(@class, 'a-text-bold')]"], parsers, doc);
        addComputedValue(output.displayContent, "image", ["//img[contains(@class, 'sx-product-image')]"], parsers, doc);
        addComputedValue(output.displayContent, "name", ["//h5[contains(@class, 'a-size-base')]"], parsers, doc);
        addComputedValue(output.displayContent, "product_brand", ['/li[1]/a/div/div[2]/div[1]/span'], parsers, doc);
        addComputedValue(output.displayContent, "product_description", ['/li[1]/a/div/div[2]/div[3]/div[3]'], parsers, doc);
        addComputedValue(output.displayContent, "product_image", ['/li[1]/a/div/div[1]/div/img'], parsers, doc);
        addComputedValue(output.displayContent, "product_name", ['/li[1]/a/div/div[2]/h5/strong'], parsers, doc);
        addComputedValue(output.displayContent, "product_price", ['/li[1]/a/div/div[2]/div[4]/span'], parsers, doc);
        addComputedValue(output.displayContent, "product_priceCurrency", ['/li[1]/a/div/div[2]/div[4]/span'], parsers, doc);
        addComputedValue(output.displayContent, "product_qxyInfo", ['/li[1]/a/div/div[2]/div[4]/span'], parsers, doc);
        addComputedValue(output.displayContent, "product_qxyPriceText", ['/li[1]/a/div/div[2]/div[3]/div[1]/span[1]'], parsers, doc);
        addComputedValue(output.displayContent, "product_reviewCount", ['/li[1]/a/div/div[2]/div[5]/span'], parsers, doc);


        if (params) {
          output = assign(output, params);
        }

        if (typeof(funcParamsCallback) === "function" && typeof(output.webUrl) === "string") {
          var funcParams = funcParamsCallback(output.webUrl);

          output.displayContent = assign(output.displayContent, {
            "@id": populateFurl("func://amazon.com/showProductById2/{bla}", funcParams)
          });

          output.displayContent = assign(output.displayContent, funcParams)
        }


        output.displayContent = assign(output.displayContent, {
          "@type": "Actor",
          "crawled": utcNow(),
          "created": utcNow(),
          "httpStatusCode": 200,
          "expires": utcNow(ttl || 60),
          "url": output.webUrl
        });
        output.entitySchema = "actor";
        output.useEntitySchema = true;

        results.push({ "function": func, "deepViewContent": output });
      }

      return results;
    }
  };

  return transform["func://amazon.com/cloudSearch2-showProductById2"](cloudOutput);
}



