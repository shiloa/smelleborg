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
      
      var parsers = {      };

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

        
  
        addComputedValue(output.displayContent, "@vertical", ["//h5[contains(@class, 'a-size-base')]"], parsers, doc);
        addComputedValue(output.displayContent, "action_name", ["//h5[contains(@class, 'a-size-base')]"], parsers, doc);
        addComputedValue(output.displayContent, "name", ["//h5[contains(@class, 'a-size-base')]"], parsers, doc);


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

  return transform["func://amazon.in/cloudSearch-showProductById"](cloudOutput);
}



