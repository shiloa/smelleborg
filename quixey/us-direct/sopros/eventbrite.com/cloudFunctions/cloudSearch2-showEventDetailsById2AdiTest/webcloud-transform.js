var transform = function(webcloudOutput) {
  var transform = {
    "func://eventbrite.com/cloudSearch2-showEventDetailsById2AdiTest": function(webcloudOutput) {
      
    
      
      var parsers = {
          "event_qxyAvgRating": function(str) {
            try {
              return str.split(' ')[0];
            } catch(e) {}
            return str;
          }
      };

      
      var funcParamsCallback = function(url) {
        try {
          var urlWOqs = url.split("?")[0]; var parts = urlWOqs.split("/"); var
   titleId = parts[parts.length-1]; var titleIdParts = titleId.split("-"); return {
   "eventId": titleIdParts[titleIdParts.length-1] };
        } catch (e) {
          print(e);
          return {};
        }
      };

      var results = [];

      for (var i = 0; i < webcloudOutput.length ; i++) {

        var data = webcloudOutput[i];
        var cloudFunc = "func://eventbrite.com/cloudSearch2-showEventDetailsById2AdiTest";

        var func = "func://eventbrite.com/showEventDetailsById2";

        var doc = parseDocument(data.content);

        var params = {};
        for (var key in data) {
          if (keysToExclude.indexOf(key) < 0) {
            params[key] = data[key];
          }
        }

        var output = {
          "displayContent": {          
          "event_description": getNodeValue(["//div[contains(@class, 'list-card__venue')]", "//div[contains(@class, 'list-card__venue')]"], doc),
          "event_image": getNodeValue(["//img[contains(@class, 'js-poster-image')]"], doc),
          "event_name": getNodeValue(["//h4[contains(@class, 'list-card__title')]"], doc),
          "event_qxyAvgRating": parsers["event_qxyAvgRating"](getNodeValue(["//h4[contains(@class, 'list-card__title')]"], doc)) ,
          "event_qxyPriceText": getNodeValue(["//span[contains(@class, 'list-card__label')]"], doc),
          "event_startDate": getNodeValue(["//time[contains(@class, 'list-card__date')]"], doc)
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

  return transform["func://eventbrite.com/cloudSearch2-showEventDetailsById2AdiTest"](webcloudOutput);
}



