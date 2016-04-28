
var transform = function(cloudOutput, ttl) {
  var transform = {
    "func://amazon.com/cloudSearch2-showProductById2": function(cloudOutput) {
      
        
      var funcParamsCallback = function(url) {
        try {
          return { url: url };
        } catch (e) {
          print(e);
          return {};
        }
      };
      
      var parsers = {          "@vertical": function(str) {
            try {
              return "Deals";
            } catch(e) {}
            return str;
          },
          "image": function(str) {
            try {
              return "http://i.imgur.com/mNaWTY5.gif";
            } catch(e) {}
            return str;
          },
          "product_qxyAvgRating": function(str) {
            try {
              return 4.5;
            } catch(e) {}
            return str;
          },
          "product_priceCurrency": function(str) {
            try {
              return "$";
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

        
  
        addComputedValue(output.displayContent, "@vertical", [], parsers, doc);
        addComputedValue(output.displayContent, "image", ["//img[contains(@class, 'sx-product-image')]"], parsers, doc);
        addComputedValue(output.displayContent, "name", ["//h5[contains(@class, 'a-size-base')]"], parsers, doc);
        addComputedValue(output.displayContent, "price", ["//span[contains(@class, 'a-text-bold')]"], parsers, doc);
        addComputedValue(output.displayContent, "product_description", ["//div[contains(@class, 'a-size-mini')]"], parsers, doc);
        addComputedValue(output.displayContent, "product_image", ["//img[contains(@class, 'sx-product-image')]"], parsers, doc);
        addComputedValue(output.displayContent, "product_name", ["//h5[contains(@class, 'a-size-base')]"], parsers, doc);
        addComputedValue(output.displayContent, "product_priceCurrency", [], parsers, doc);
        addComputedValue(output.displayContent, "product_qxyAvgRating", [], parsers, doc);
        addComputedValue(output.displayContent, "product_qxyInfo", ["//div[contains(@class, 's-usedandnew')]/span[contains(@class, 'a-color-price')]"], parsers, doc);
        addComputedValue(output.displayContent, "quality", ["//div[contains(@class, 'a-size-mini')]"], parsers, doc);
        addComputedValue(output.displayContent, "ratingCount", ["//span[contains(@class, 'a-color-secondary')]"], parsers, doc);


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

  return transform["func://amazon.com/cloudSearch2-showProductById2"](cloudOutput);
}



