var transform = function(cloudOutput, ttl) {
  var transform = {
    "func://gaana.com/cloudSearch2-showAlbumByName2": function(cloudOutput) {
      
          
      var parsers = {          "name": function(str) {
            try {
              return 'bobo';
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

      for (var i = 0; i < cloudOutput.length ; i++) {

        var data = cloudOutput[i];
        var cloudFunc = "func://gaana.com/cloudSearch2-showAlbumByName2";

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

        
  
        addComputedValue(output.displayContent, "@vertical", [], parsers, doc);
        addComputedValue(output.displayContent, "action_name", ['a'], parsers, doc);
        addComputedValue(output.displayContent, "name", [], parsers, doc);


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

  return transform["func://gaana.com/cloudSearch2-showAlbumByName2"](cloudOutput);
}



