var transform = function(webcloudOutput) {
  var transform = {
    "func://yelp.com/cloudSearch-withLocation-showBizById": function(webcloudOutput) {
      
    


      var results = [];

      for (var i = 0; i < webcloudOutput.length ; i++) {

        var data = webcloudOutput[i];
        var cloudFunc = "func://yelp.com/cloudSearch-withLocation-showBizById";

        var func = "func://yelp.com/showBizById";

        var doc = parseDocument(data.content);

        var params = {};
        for (var key in data) {
          if (keysToExclude.indexOf(key) < 0) {
            params[key] = data[key];
          }
        }

        var output = {
          "displayContent": {          
          "event_description": getNodeValue(["//span[contains(@class, 'com.yelp.android:id/search_category_textview')]"], doc),
          "event_eventVenue": getNodeValue(["//span[contains(@class, 'com.yelp.android:id/search_address1_textview')]"], doc),
          "event_image": getNodeValue(["//img[contains(@class, 'android.widget.ImageView')]"], doc),
          "event_name": getNodeValue(["//span[contains(@class, 'com.yelp.android:id/search_title_textview')]"], doc)
          }
        };

        if (params) {
          output = assign(output, params);
        }

        if (typeof(funcParamsCallback) === "function" && typeof(output.webUrl) === "string") {
          output.displayContent = assign(output.displayContent, funcParamsCallback(output.webUrl))
        }

        results.push({ "function": func, "deepViewContent": output });
      }

      return results;
    }
  };

  return transform["func://yelp.com/cloudSearch-withLocation-showBizById"](webcloudOutput);
}



