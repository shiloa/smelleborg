var transform = function(cloudOutput, ttl) {
  var transform = {
    "func://amazon.in/cloudSearch-showProductById": function(cloudOutput) {
      
        
      var funcParamsCallback = function(url) {
        try {
          {}
        } catch (e) {
          print(e);
          return {};
        }
      };
      
      var parsers = {          "product_brand": function(str) {
            try {
              return str.split("by ")[1]
            } catch(e) {}
            return str;
          },
          "product_qxyAvgRating": function(str) {
            try {
              return str.split(" ")[0]
            } catch(e) {}
            return str;
          },
          "geo": function(str) {
            try {
              return "55,66";
            } catch(e) {}
            return str;
          },
          "product_description": function(str) {
            try {
              return "test js"
            } catch(e) {}
            return str;
          }
      };

      var results = [];

      for (var i = 0; i < cloudOutput.length ; i++) {

        var data = cloudOutput[i];
        var cloudFunc = "func://amazon.in/cloudSearch-showProductById";

        var func = "func://amazon.in/showProductById";

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

        
  
        addComputedValue(output.displayContent, "@vertical", ["//div[contains(@class, 'sx-table-detail')]/div[contains(@class, 'a-row a-spacing-micro a-color-secondary')]/span[contains(@class, 'a-size-small')]"], parsers, doc);
        addComputedValue(output.displayContent, "geo", [], parsers, doc);
        addComputedValue(output.displayContent, "image", ["//img[contains(@class, 'sx-product-image')]"], parsers, doc);
        addComputedValue(output.displayContent, "name", ["//h5[contains(@class, 'a-size-base')]"], parsers, doc);
        addComputedValue(output.displayContent, "product_brand", ['/li[1]/a/div/div[2]/div[1]/span'], parsers, doc);
        addComputedValue(output.displayContent, "product_description", [], parsers, doc);
        addComputedValue(output.displayContent, "product_image", ["//img[contains(@class, 'sx-product-image')]"], parsers, doc);
        addComputedValue(output.displayContent, "product_name", ["//h5[contains(@class, 'a-size-base')]"], parsers, doc);
        addComputedValue(output.displayContent, "product_price", ['/li[1]/a/div/div[2]/div[3]/div[1]/span[3]'], parsers, doc);
        addComputedValue(output.displayContent, "product_qxyAvgRating", ['/li[1]/a/div/div[2]/div[5]'], parsers, doc);
        addComputedValue(output.displayContent, "product_qxyPriceText", ['/li[1]/a/div/div[2]/div[3]/div[1]/span[3]'], parsers, doc);


        if (params) {
          output = assign(output, params);
        }

        if (typeof(funcParamsCallback) === "function" && typeof(output.webUrl) === "string") {
          var funcParams = funcParamsCallback(output.webUrl);

          output.displayContent = assign(output.displayContent, {
            "@id": populateFurl("func://amazon.in/showProductById/{url}", funcParams)
          });

          output.displayContent = assign(output.displayContent, funcParams)
        }


        output.displayContent = assign(output.displayContent, {
          "@type": "Hotel",
          "crawled": utcNow(),
          "created": utcNow(),
          "httpStatusCode": 200,
          "expires": utcNow(ttl || 60),
          "url": output.webUrl
        });
        output.entitySchema = "hotel";
        output.useEntitySchema = true;

        results.push({ "function": func, "deepViewContent": output });
      }

      return results;
    }
  };

  return transform["func://amazon.in/cloudSearch-showProductById"](cloudOutput);
}



