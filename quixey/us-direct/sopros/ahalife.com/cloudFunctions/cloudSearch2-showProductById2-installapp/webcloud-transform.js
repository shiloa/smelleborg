
var transform = function(cloudOutput, ttl) {
  var transform = {
    "func://ahalife.com/cloudSearch2-showProductById2-installapp": function(cloudOutput) {
      
          
      var parsers = {          "product_image": function(str) {
            try {
              return "https://lh3.googleusercontent.com/Phk5qqQ1Fs-mQACNeuZjqsWIJJknpoSXBmQFi0vRw2IlO0nZ7H8O8rYUvwcVvfk-wdY=w300-rw";

            } catch(e) {}
            return str;
          },
          "@vertical": function(str) {
            try {
              return "Deals";
            } catch(e) {}
            return str;
          }
      };

      var results = [];

      for (var i = 0; i < cloudOutput.length ; i++) {

        var data = cloudOutput[i];
        var cloudFunc = "func://ahalife.com/cloudSearch2-showProductById2-installapp";

        var func = "func://ahalife.com/showProductById2";

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
        addComputedValue(output.displayContent, "image", ["//div[contains(@class, 'img-wrapper')]/img"], parsers, doc);
        addComputedValue(output.displayContent, "name", ["//h4[contains(@class, 'product-name')]"], parsers, doc);
        addComputedValue(output.displayContent, "product_description", ['/a/div[2]/div[3]'], parsers, doc);
        addComputedValue(output.displayContent, "product_image", ['/a/div[1]/div[2]/img'], parsers, doc);
        addComputedValue(output.displayContent, "product_name", ['/a/div[2]/h4'], parsers, doc);
        addComputedValue(output.displayContent, "product_price", ['/a/div[2]/div[1]'], parsers, doc);
        addComputedValue(output.displayContent, "product_qxyInfo", ['/a/div[2]/div[2]'], parsers, doc);


        if (params) {
          output = assign(output, params);
        }

        if (typeof(funcParamsCallback) === "function" && typeof(output.webUrl) === "string") {
          var funcParams = funcParamsCallback(output.webUrl);

          output.displayContent = assign(output.displayContent, {
            "@id": populateFurl("func://ahalife.com/showProductById2/{id}", funcParams)
          });

          output.displayContent = assign(output.displayContent, funcParams)
        }


        output.displayContent = assign(output.displayContent, {
          "@type": "Thing",
          "crawled": utcNow(),
          "created": utcNow(),
          "httpStatusCode": 200,
          "expires": utcNow(ttl || 60),
          "url": output.webUrl
        });
        output.entitySchema = "thing";
        output.useEntitySchema = true;

        results.push({ "function": func, "deepViewContent": output });
      }

      return results;
    }
  };

  return transform["func://ahalife.com/cloudSearch2-showProductById2-installapp"](cloudOutput);
}



