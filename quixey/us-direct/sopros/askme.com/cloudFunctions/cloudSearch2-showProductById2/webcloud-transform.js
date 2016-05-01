var transform = function(cloudOutput, ttl) {
  var transform = {
    "func://askme.com/cloudSearch2-showProductById2": function(cloudOutput) {
      
          
      var parsers = {          "name": function(str) {
            try {
              return "bobo";
            } catch(e) {}
            return str;
          },
          "@vertical": function(str) {
            try {
              return "bobo";
            } catch(e) {}
            return str;
          }
      };

      var results = [];

      for (var i = 0; i < cloudOutput.length ; i++) {

        var data = cloudOutput[i];
        var cloudFunc = "func://askme.com/cloudSearch2-showProductById2";

        var func = "func://askme.com/showProductById2";

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

        
  
        addComputedValue(output.displayContent, "@vertical", [], parsers, doc);
        addComputedValue(output.displayContent, "name", [], parsers, doc);
        addComputedValue(output.displayContent, "product_brand", ['/div[1]/div[3]/div[1]/div[2]/a'], parsers, doc);
        addComputedValue(output.displayContent, "product_description", ['return " bobo";'], parsers, doc);
        addComputedValue(output.displayContent, "product_image", ['/div[1]/div[1]/a/img'], parsers, doc);
        addComputedValue(output.displayContent, "product_name", ['/div[1]/a'], parsers, doc);
        addComputedValue(output.displayContent, "product_price", ['/div[1]/div[3]/div[1]/span[2]'], parsers, doc);
        addComputedValue(output.displayContent, "product_qxyInfo", ['/div[1]/div[3]/div[1]/span[2]'], parsers, doc);


        if (params) {
          output = assign(output, params);
        }

        if (typeof(funcParamsCallback) === "function" && typeof(output.webUrl) === "string") {
          var funcParams = funcParamsCallback(output.webUrl);

          output.displayContent = assign(output.displayContent, {
            "@id": populateFurl("func://askme.com/showProductById2/{id}", funcParams)
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

  return transform["func://askme.com/cloudSearch2-showProductById2"](cloudOutput);
}



