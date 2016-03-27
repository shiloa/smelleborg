var transform = function(webcloudOutput) {
  var transform = {
    "func://amazon.com/cloudSearch2-showProductById2QA": function(webcloudOutput) {
      
    

      
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
        var cloudFunc = "func://amazon.com/cloudSearch2-showProductById2QA";

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
          "product_image": getNodeValue(["//img[contains(@class, 'sx-product-image')]"], doc),
          "product_name": getNodeValue(["//h5[contains(@class, 'a-size-base')]"], doc),
          "product_qxyInfo": getNodeValue(["//h5[contains(@class, 'a-size-base')]"], doc)
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

  return transform["func://amazon.com/cloudSearch2-showProductById2QA"](webcloudOutput);
}



