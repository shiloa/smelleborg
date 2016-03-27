var transform = function(webcloudOutput) {
  var transform = {
    "func://amazon.com/cloudSearch2-showProductById2guyguyguy": function(webcloudOutput) {
      
    

      
      var funcParamsCallback = function(url) {
        try {
          return { "bla": url };
        } catch (e) {
          print(e);
          return {};
        }
      };

      var results = [];

      for (var i = 0; i < webcloudOutput.length ; i++) {

        var data = webcloudOutput[i];
        var cloudFunc = "func://amazon.com/cloudSearch2-showProductById2guyguyguy";

        var func = "func://amazon.com/showProductById2";

        var doc = parseDocument(data.content);

        var params = {};
        for (var key in data) {
          if (keysToExclude.indexOf(key) < 0) {
            params[key] = data[key];
          }
        }

        var output = {
          "displayContent": {          
          "product_description": getNodeValue(["//div[contains(@class, 'a-color-secondary')]/span[contains(@class, 'a-size-small')]"], doc),
          "product_image": getNodeValue(['//li/a/div/div/div/img'], doc),
          "product_name": getNodeValue(["//span[contains(@class, 'a-text-bold')]"], doc)
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

  return transform["func://amazon.com/cloudSearch2-showProductById2guyguyguy"](webcloudOutput);
}



