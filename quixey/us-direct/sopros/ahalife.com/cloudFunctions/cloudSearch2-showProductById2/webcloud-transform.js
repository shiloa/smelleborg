var transform = function(webcloudOutput) {
  var transform = {
    "func://ahalife.com/cloudSearch2-showProductById2": function(webcloudOutput) {
      
    


      var results = [];

      for (var i = 0; i < webcloudOutput.length ; i++) {

        var data = webcloudOutput[i];
        var cloudFunc = "func://ahalife.com/cloudSearch2-showProductById2";

        var func = "None";

        var doc = parseDocument(data.content);

        var params = {};
        for (var key in data) {
          if (keysToExclude.indexOf(key) < 0) {
            params[key] = data[key];
          }
        }

        var output = {
          "displayContent": {          
          "product_description": getNodeValue(["//li[contains(@class, 'bag')]/div[contains(@class, 'bag-popup')]/div[contains(@class, 'content-cont')]/div[contains(@class, 'content')]/div"], doc),
          "product_image": getNodeValue(["//nav[contains(@class, 'clearfix')]/div[contains(@class, 'float-l')]/img"], doc),
          "product_name": getNodeValue(["//li[contains(@class, 'bag')]/div[contains(@class, 'bag-popup')]/div[contains(@class, 'content-cont')]/div[contains(@class, 'header')]"], doc)
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

  return transform["func://ahalife.com/cloudSearch2-showProductById2"](webcloudOutput);
}



