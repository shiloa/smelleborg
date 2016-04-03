var transform = function(webcloudOutput) {
  var transform = {
    "func://espn.go.com/cloudSearch-showTeamById": function(webcloudOutput) {
      
    


      var results = [];

      for (var i = 0; i < webcloudOutput.length ; i++) {

        var data = webcloudOutput[i];
        var cloudFunc = "func://espn.go.com/cloudSearch-showTeamById";

        var func = "func://espn.go.com/showTeamById";

        var doc = parseDocument(data.content);

        var params = {};
        for (var key in data) {
          if (keysToExclude.indexOf(key) < 0) {
            params[key] = data[key];
          }
        }

        var output = {
          "displayContent": {          
          "name": getNodeValue(["//span[contains(@class, 'com.espn.score_center:id/search_result_item_team_name')]"], doc)
          }
        };

        if (params) {
          output = assign(output, params);
        }

        if (typeof(funcParamsCallback) === "function" && typeof(output.webUrl) === "string") {
          output.displayContent = assign(output.displayContent, funcParamsCallback(output.webUrl))
        }

        output.entitySchema = "Article";
        output.useEntitySchema = true;

        results.push({ "function": func, "deepViewContent": output });
      }

      return results;
    }
  };

  return transform["func://espn.go.com/cloudSearch-showTeamById"](webcloudOutput);
}



