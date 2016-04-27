var transform = function(webcloudOutput) {
  var transform = {
    "func://ted.com/cloudSearch-showTalkById": function(webcloudOutput) {
      
          
      var parsers = {          "expires": function(str) {
            try {
              return '2016-04-11T17:31:22Z';
            } catch(e) {}
            return str;
          },
          "@vertical": function(str) {
            try {
              return 'bobo';
            } catch(e) {}
            return str;
          }
      };

      var results = [];

      for (var i = 0; i < webcloudOutput.length ; i++) {

        var data = webcloudOutput[i];
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
        addComputedValue(output.displayContent, "category", ["//span[contains(@class, 'android.widget.CheckedTextView')]"], parsers, doc);
        addComputedValue(output.displayContent, "expires", ["//span[contains(@class, 'android.widget.CheckedTextView')]"], parsers, doc);
        addComputedValue(output.displayContent, "name", ["//span[contains(@class, 'android.widget.CheckedTextView')]"], parsers, doc);


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
          "@type": "NewsArticle",
          "crawled": utcNow(),
          "created": utcNow(),
          "httpStatusCode": 200,
          "url": output.webUrl
        });
        output.entitySchema = "newsarticle";
        output.useEntitySchema = true;

        results.push({ "function": func, "deepViewContent": output });
      }

      return results;
    }
  };

  return transform["func://ted.com/cloudSearch-showTalkById"](webcloudOutput);
}



