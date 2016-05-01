
var transform = function(cloudOutput, ttl) {
  var transform = {
    "func://yelp.com/cloudSearch-withLocation-showBizById": function(cloudOutput) {
      
          
      var parsers = {      };

      var results = [];

      for (var i = 0; i < cloudOutput.length ; i++) {

        var data = cloudOutput[i];
        var cloudFunc = "func://yelp.com/cloudSearch-withLocation-showBizById";

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

        
  
        addComputedValue(output.displayContent, "@vertical", ["//span[contains(@class, 'com.yelp.android:id/search_address1_textview')]"], parsers, doc);
        addComputedValue(output.displayContent, "concepts", ["//span[contains(@class, 'com.yelp.android:id/search_address1_textview')]"], parsers, doc);
        addComputedValue(output.displayContent, "description", ["//span[contains(@class, 'com.yelp.android:id/search_category_textview')]"], parsers, doc);
        addComputedValue(output.displayContent, "image", ["//img[contains(@class, 'android.widget.ImageView')]"], parsers, doc);
        addComputedValue(output.displayContent, "name", ["//span[contains(@class, 'com.yelp.android:id/search_title_textview')]"], parsers, doc);


        if (params) {
          output = assign(output, params);
        }

        if (typeof(funcParamsCallback) === "function" && typeof(output.webUrl) === "string") {
          var funcParams = funcParamsCallback(output.webUrl);

          output.displayContent = assign(output.displayContent, {
            "@id": populateFurl("", funcParams)
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

  return transform["func://yelp.com/cloudSearch-withLocation-showBizById"](cloudOutput);
}



