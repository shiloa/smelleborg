var transform = function(webcloudOutput) {
  var transform = {
    "func://youtube.com/cloudSearch2-watchVideo2": function(webcloudOutput) {
      
          
      var parsers = {      };

      var results = [];

      for (var i = 0; i < webcloudOutput.length ; i++) {

        var data = webcloudOutput[i];
        var cloudFunc = "func://youtube.com/cloudSearch2-watchVideo2";

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



        results.push({ "function": func, "deepViewContent": output });
      }

      return results;
    }
  };

  return transform["func://youtube.com/cloudSearch2-watchVideo2"](webcloudOutput);
}



