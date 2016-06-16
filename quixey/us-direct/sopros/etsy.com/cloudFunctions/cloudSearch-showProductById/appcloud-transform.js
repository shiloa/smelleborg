var transform = function(cloudOutput, ttl) {
  var transform = {
    "func://etsy.com/cloudSearch-showProductById": function(cloudOutput) {
      
          
      var parsers = {      };

      var results = [];

      for (var i = 0; i < cloudOutput.length ; i++) {

        var data = cloudOutput[i];
        var cloudFunc = "func://etsy.com/cloudSearch-showProductById";

        var func = "func://etsy.com/showProductById";

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

        
  
        addComputedValue(output.displayContent, "@vertical", ["//span[contains(@class, 'com.etsy.android:id/listing_shop')]"], parsers, doc);
        addComputedValue(output.displayContent, "description", ["//span[contains(@class, 'com.etsy.android:id/listing_shop')]"], parsers, doc);
        addComputedValue(output.displayContent, "image", ["//img[contains(@class, 'com.etsy.android:id/listing_image')]"], parsers, doc);
        addComputedValue(output.displayContent, "name", ["//span[contains(@class, 'com.etsy.android:id/listing_title')]"], parsers, doc);
        addComputedValue(output.displayContent, "price", ["//span[contains(@class, 'com.etsy.android:id/listing_price')]"], parsers, doc);


        if (params) {
          output = assign(output, params);
        }

        if (typeof(funcParamsCallback) === "function" && typeof(output.webUrl) === "string") {
          var funcParams = funcParamsCallback(output.webUrl);

          output.displayContent = assign(output.displayContent, {
            "@id": populateFurl("func://etsy.com/showProductById/{productId}", funcParams)
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

  return transform["func://etsy.com/cloudSearch-showProductById"](cloudOutput);
}



