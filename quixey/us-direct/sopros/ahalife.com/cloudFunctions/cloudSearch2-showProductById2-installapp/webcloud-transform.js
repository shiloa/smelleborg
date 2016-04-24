var transform = function(webcloudOutput) {
  var transform = {
    "func://ahalife.com/cloudSearch2-showProductById2-installapp": function(webcloudOutput) {
      
          
      var parsers = {          "product_image": function(str) {
            try {
              return "https://lh3.googleusercontent.com/Phk5qqQ1Fs-mQACNeuZjqsWIJJknpoSXBmQFi0vRw2IlO0nZ7H8O8rYUvwcVvfk-wdY=w300-rw";

            } catch(e) {}
            return str;
          }
      };

      var results = [];

      for (var i = 0; i < webcloudOutput.length ; i++) {

        var data = webcloudOutput[i];
        var cloudFunc = "func://ahalife.com/cloudSearch2-showProductById2-installapp";

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

        
        addComputedValue(output.displayContent, "product_description", ['/a/div[2]/div[3]'], parsers, doc);
        addComputedValue(output.displayContent, "product_image", ['/a/div[1]/div[2]/img'], parsers, doc);
        addComputedValue(output.displayContent, "product_name", ['/a/div[2]/h4'], parsers, doc);
        addComputedValue(output.displayContent, "product_price", ['/a/div[2]/div[1]'], parsers, doc);
        addComputedValue(output.displayContent, "product_qxyInfo", ['/a/div[2]/div[2]'], parsers, doc);


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

  return transform["func://ahalife.com/cloudSearch2-showProductById2-installapp"](webcloudOutput);
}



