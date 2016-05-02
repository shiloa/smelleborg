var transform = function(cloudOutput, ttl) {
  var transform = {
    "func://airbnb.com/cloudSearch2-showRoom3": function(cloudOutput) {
      
          
      var parsers = {      };

      var results = [];

      for (var i = 0; i < cloudOutput.length ; i++) {

        var data = cloudOutput[i];
        var cloudFunc = "func://airbnb.com/cloudSearch2-showRoom3";

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

        
  
        addComputedValue(output.displayContent, "@vertical", ["//h1[contains(@class, 'overflow')]"], parsers, doc);
        addComputedValue(output.displayContent, "action_name", ["//h1[contains(@class, 'overflow')]"], parsers, doc);
        addComputedValue(output.displayContent, "image", ["//img[contains(@class, 'host-profile-image')]"], parsers, doc);
        addComputedValue(output.displayContent, "name", ["//h1[contains(@class, 'overflow')]"], parsers, doc);


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

  return transform["func://airbnb.com/cloudSearch2-showRoom3"](cloudOutput);
}



