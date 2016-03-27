var transform = function(webcloudOutput) {
  var transform = {
    "func://gasbuddy.com/cloudSearch-showStation": function(webcloudOutput) {
      
    


      var results = [];

      for (var i = 0; i < webcloudOutput.length ; i++) {

        var data = webcloudOutput[i];
        var cloudFunc = "func://gasbuddy.com/cloudSearch-showStation";

        var func = "func://gasbuddy.com/showStation";

        var doc = parseDocument(data.content);

        var params = {};
        for (var key in data) {
          if (keysToExclude.indexOf(key) < 0) {
            params[key] = data[key];
          }
        }

        var output = {
          "displayContent": {          
          "priceSpecification_description": getNodeValue([''], doc),
          "priceSpecification_image": getNodeValue(["//img[contains(@class, 'android.widget.TextView')]"], doc),
          "priceSpecification_name": getNodeValue(["//div[contains(@class, 'compoundDrawable')]/span[contains(@class, 'android.widget.TextView')]"], doc),
          "priceSpecification_qxyPriceText": getNodeValue([''], doc)
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

  return transform["func://gasbuddy.com/cloudSearch-showStation"](webcloudOutput);
}



