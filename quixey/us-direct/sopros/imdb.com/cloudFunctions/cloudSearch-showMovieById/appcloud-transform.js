var transform = function(cloudOutput, ttl) {
  var transform = {
    "func://imdb.com/cloudSearch-showMovieById": function(cloudOutput) {
      
          
      var parsers = {          "category": function(str) {
            try {
              return 'bobo';
            } catch(e) {}
            return str;
          }
      };

      var results = [];

      for (var i = 0; i < cloudOutput.length ; i++) {

        var data = cloudOutput[i];
        var cloudFunc = "func://imdb.com/cloudSearch-showMovieById";

        var func = "func://imdb.com/showMovieById";

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

        
  
        addComputedValue(output.displayContent, "@vertical", ["//span[contains(@class, 'com.imdb.mobile:id/label')]"], parsers, doc);
        addComputedValue(output.displayContent, "category", [], parsers, doc);
        addComputedValue(output.displayContent, "description", ["//span[contains(@class, 'com.imdb.mobile:id/description')]"], parsers, doc);
        addComputedValue(output.displayContent, "image", ["//img[contains(@class, 'android.widget.ImageView')]"], parsers, doc);
        addComputedValue(output.displayContent, "name", ["//span[contains(@class, 'com.imdb.mobile:id/label')]"], parsers, doc);
        addComputedValue(output.displayContent, "originalPrice", ["//span[contains(@class, 'com.imdb.mobile:id/label')]"], parsers, doc);
        addComputedValue(output.displayContent, "price", ["//span[contains(@class, 'com.imdb.mobile:id/description')]"], parsers, doc);


        if (params) {
          output = assign(output, params);
        }

        if (typeof(funcParamsCallback) === "function" && typeof(output.webUrl) === "string") {
          var funcParams = funcParamsCallback(output.webUrl);

          output.displayContent = assign(output.displayContent, {
            "@id": populateFurl("func://imdb.com/showMovieById/{id}", funcParams)
          });

          output.displayContent = assign(output.displayContent, funcParams)
        }


        output.displayContent = assign(output.displayContent, {
          "@type": "Deal",
          "crawled": utcNow(),
          "created": utcNow(),
          "httpStatusCode": 200,
          "expires": utcNow(ttl || 60),
          "url": output.webUrl
        });
        output.entitySchema = "deal";
        output.useEntitySchema = true;

        results.push({ "function": func, "deepViewContent": output });
      }

      return results;
    }
  };

  return transform["func://imdb.com/cloudSearch-showMovieById"](cloudOutput);
}



