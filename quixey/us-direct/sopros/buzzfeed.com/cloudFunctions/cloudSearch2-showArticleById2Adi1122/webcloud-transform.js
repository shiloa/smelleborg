var transform = function(cloudOutput, ttl) {
  var transform = {
    "func://buzzfeed.com/cloudSearch2-showArticleById2Adi1122": function(cloudOutput) {
      
        
      var funcParamsCallback = function(url) {
        try {
          var articleUrl = url.replace("http://","").replace("https://","");
return {
  "articleUrl": articleUrl
}
        } catch (e) {
          print(e);
          return {};
        }
      };
      
      var parsers = {      };

      var results = [];

      for (var i = 0; i < cloudOutput.length ; i++) {

        var data = cloudOutput[i];
        var cloudFunc = "func://buzzfeed.com/cloudSearch2-showArticleById2Adi1122";

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

        
  
        addComputedValue(output.displayContent, "@vertical", ["//section[contains(@class, 'header-block')]"], parsers, doc);
        addComputedValue(output.displayContent, "action_name", ["//h1[contains(@class, 'title')]"], parsers, doc);
        addComputedValue(output.displayContent, "name", ["//h1[contains(@class, 'title')]"], parsers, doc);


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

  return transform["func://buzzfeed.com/cloudSearch2-showArticleById2Adi1122"](cloudOutput);
}



