
var transform = function(cloudOutput, ttl) {
  var transform = {
    "func://airbnb.com/cloudSearch2-showRoomById2": function(cloudOutput) {
      
          
      var parsers = {          "product_reviewCount": function(str) {
            try {
              return str.concat(' reviews')
            } catch(e) {}
            return str;
          },
          "product_description": function(str) {
            try {
              return str.split('·')[0]
            } catch(e) {}
            return str;
          }
      };

      var results = [];

      for (var i = 0; i < cloudOutput.length ; i++) {

        var data = cloudOutput[i];
        var cloudFunc = "func://airbnb.com/cloudSearch2-showRoomById2";

        var func = "None";

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

        
  
        addComputedValue(output.displayContent, "@vertical", ["//h3[contains(@class, 'h5')]/a[contains(@class, 'text-normal')]"], parsers, doc);
        addComputedValue(output.displayContent, "image", ["//img[contains(@class, 'img-responsive-height')]"], parsers, doc);
        addComputedValue(output.displayContent, "name", ["//h3[contains(@class, 'h5')]/a[contains(@class, 'text-normal')]"], parsers, doc);
        addComputedValue(output.displayContent, "product_description", ["//div[contains(@itemprop,'description')]/span/a", ''], parsers, doc);
        addComputedValue(output.displayContent, "product_image", ["//img[contains(@class, 'img-responsive-height')]"], parsers, doc);
        addComputedValue(output.displayContent, "product_name", ["//h3[contains(@class, 'h5')]/a[contains(@class, 'text-normal')]"], parsers, doc);
        addComputedValue(output.displayContent, "product_price", ["//span[contains(@class,'price-amount')]"], parsers, doc);
        addComputedValue(output.displayContent, "product_priceCurrency", ['//div/sup[1]'], parsers, doc);
        addComputedValue(output.displayContent, "product_qxyAvgRating", ['//div[@data-lng]/@data-star-rating'], parsers, doc);
        addComputedValue(output.displayContent, "product_qxyInfo", ['//div/sup[1]', "//span[contains(@class,'price-amount')]"], parsers, doc);
        addComputedValue(output.displayContent, "product_qxyPriceText", ["//span[contains(@class,'price-amount')]"], parsers, doc);
        addComputedValue(output.displayContent, "product_reviewCount", ['//div[@data-review-count]/@data-review-count', ''], parsers, doc);


        if (params) {
          output = assign(output, params);
        }

        if (typeof(funcParamsCallback) === "function" && typeof(output.webUrl) === "string") {
          var funcParams = funcParamsCallback(output.webUrl);

          output.displayContent = assign(output.displayContent, {
            "@id": populateFurl("None", funcParams)
          });

          output.displayContent = assign(output.displayContent, funcParams)
        }


        output.displayContent = assign(output.displayContent, {
          "@type": "NewsArticle",
          "crawled": utcNow(),
          "created": utcNow(),
          "httpStatusCode": 200,
          "expires": utcNow(ttl || 60),
          "url": output.webUrl
        });
        output.entitySchema = "newsarticle";
        output.useEntitySchema = true;

        results.push({ "function": func, "deepViewContent": output });
      }

      return results;
    }
  };

  return transform["func://airbnb.com/cloudSearch2-showRoomById2"](cloudOutput);
}



