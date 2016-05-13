var transform = function(cloudOutput, ttl) {
  var transform = {
    "func://overstock.com/cloudSearch-showProductById": function(cloudOutput) {
      
          
      var parsers = {          "@vertical": function(str) {
            try {
              return "Product";
            } catch(e) {}
            return str;
          }
      };

      var results = [];

      for (var i = 0; i < cloudOutput.length ; i++) {

        var data = cloudOutput[i];
        var cloudFunc = "func://overstock.com/cloudSearch-showProductById";

        var func = "func://overstock.com/showProductById";

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

        
  
        addComputedValue(output.displayContent, "@vertical", [], parsers, doc);
        addComputedValue(output.displayContent, "image", ["//img[contains(@class, 'android.widget.ImageView')]"], parsers, doc);
        addComputedValue(output.displayContent, "name", ["//span[contains(@class, 'com.overstock:id/product_name')]"], parsers, doc);
        addComputedValue(output.displayContent, "price", ["//span[contains(@class, 'com.overstock:id/product_price')]"], parsers, doc);


        if (params) {
          output = assign(output, params);
        }

        if (typeof(funcParamsCallback) === "function" && typeof(output.webUrl) === "string") {
          var funcParams = funcParamsCallback(output.webUrl);

          output.displayContent = assign(output.displayContent, {
            "@id": populateFurl("func://overstock.com/showProductById/{productId}", funcParams)
          });

          output.displayContent = assign(output.displayContent, funcParams)
        }


        output.displayContent = assign(output.displayContent, {
          "@type": "Product",
          "crawled": utcNow(),
          "created": utcNow(),
          "httpStatusCode": 200,
          "expires": utcNow(ttl || 60),
          "url": output.webUrl
        });
        output.entitySchema = "product";
        output.useEntitySchema = true;

        results.push({ "function": func, "deepViewContent": output });
      }

      return results;
    }
  };

  return transform["func://overstock.com/cloudSearch-showProductById"](cloudOutput);
}



