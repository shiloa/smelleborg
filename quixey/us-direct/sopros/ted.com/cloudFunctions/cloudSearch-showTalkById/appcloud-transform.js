var transform = function(cloudOutput, ttl) {
  var transform = {
    "func://ted.com/cloudSearch-showTalkById": function(cloudOutput) {
      
          
      var parsers = {      };

      var results = [];

      for (var i = 0; i < cloudOutput.length ; i++) {

        var data = cloudOutput[i];
        var cloudFunc = "func://ted.com/cloudSearch-showTalkById";

        var func = "func://ted.com/showTalkById";

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

        
  
        addComputedValue(output.displayContent, "@vertical", ["//span[contains(@class, 'android.widget.CheckedTextView')]"], parsers, doc);
        addComputedValue(output.displayContent, "image", ["//img[contains(@class, 'android.widget.ImageView')]"], parsers, doc);
        addComputedValue(output.displayContent, "name", ["//span[contains(@class, 'android.widget.CheckedTextView')]"], parsers, doc);
        addComputedValue(output.displayContent, "originalPrice", ["//span[contains(@class, 'android.widget.CheckedTextView')]"], parsers, doc);
        addComputedValue(output.displayContent, "price", ["//span[contains(@class, 'android.widget.CheckedTextView')]"], parsers, doc);


        if (params) {
          output = assign(output, params);
        }

        if (typeof(funcParamsCallback) === "function" && typeof(output.webUrl) === "string") {
          var funcParams = funcParamsCallback(output.webUrl);

          output.displayContent = assign(output.displayContent, {
            "@id": populateFurl("func://ted.com/showTalkById/{meta_data}/{source}/{id}", funcParams)
          });

          output.displayContent = assign(output.displayContent, funcParams)
        }


        output.displayContent = assign(output.displayContent, {
          "@type": "Coupon",
          "crawled": utcNow(),
          "created": utcNow(),
          "httpStatusCode": 200,
          "expires": utcNow(ttl || 60),
          "url": output.webUrl
        });
        output.entitySchema = "coupon";
        output.useEntitySchema = true;

        results.push({ "function": func, "deepViewContent": output });
      }

      return results;
    }
  };

  return transform["func://ted.com/cloudSearch-showTalkById"](cloudOutput);
}



