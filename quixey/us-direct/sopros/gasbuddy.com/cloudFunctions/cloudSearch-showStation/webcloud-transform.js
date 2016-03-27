var transform = function(webcloudOutput) {
  var transform = {
    "func://gasbuddy.com/cloudSearch-showStation": function(webcloudOutput) {
      
    
      
      var parsers = {
          "place_address": function(str) {
            try {
              return str.split(' ')[0];
            } catch(e) {}
            return str;
          }
      };


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
          "place_address": parsers["place_address"](getNodeValue(["//span[contains(@class, 'gbis.gbandroid:id/stationlist_row_address')]"], doc)) ,
          "place_description": getNodeValue(["//span[contains(@class, 'gbis.gbandroid:id/stationlist_row_citystate')]", "//span[contains(@class, 'gbis.gbandroid:id/stationlist_row_citystate')]"], doc),
          "place_distance": getNodeValue(["//span[contains(@class, 'gbis.gbandroid:id/stationlist_row_name')]"], doc),
          "place_image": getNodeValue(["//img[contains(@class, 'android.widget.TextView')]"], doc),
          "place_name": getNodeValue(["//span[contains(@class, 'gbis.gbandroid:id/stationlist_row_name')]"], doc),
          "place_qxyInfo": getNodeValue(["//span[contains(@class, 'gbis.gbandroid:id/stationlist_row_distance')]", "//span[contains(@class, 'gbis.gbandroid:id/stationlist_row_price_time')]"], doc),
          "place_telephone": getNodeValue(["//span[contains(@class, 'gbis.gbandroid:id/stationlist_row_distance')]"], doc)
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



