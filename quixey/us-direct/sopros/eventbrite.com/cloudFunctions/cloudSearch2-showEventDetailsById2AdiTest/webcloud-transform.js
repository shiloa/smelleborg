var transform = function(webcloudOutput) {
  var transform = {
    "func://eventbrite.com/cloudSearch2-showEventDetailsById2AdiTest": function(webcloudOutput) {
      
    
      
      var parsers = {
          "startDate": function(str) {
            try {
              return ' 1234-10-12';
            } catch(e) {}
            return str;
          },
          "event_description": function(str) {
            try {
              return 'bobo';
            } catch(e) {}
            return str;
          },
          "event_startDate": function(str) {
            try {
              return 'koko';
            } catch(e) {}
            return str;
          },
          "address": function(str) {
            try {
              return 'yoyo';
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
          "address": parsers["address"](getNodeValue(["//div[contains(@class, 'list-card__venue')]"], doc)) ,
          "description": getNodeValue(["//div[contains(@class, 'list-card__tags')]/a", "//div[contains(@class, 'list-card__tags')]/a"], doc),
          "doorTime": getNodeValue(["//time[contains(@class, 'list-card__date')]"], doc),
          "event_description": parsers["event_description"](getNodeValue(["//div[contains(@class, 'list-card__venue')]"], doc)) ,
          "event_image": getNodeValue(["//img[contains(@class, 'js-poster-image')]"], doc),
          "event_name": getNodeValue(["//h4[contains(@class, 'list-card__title')]"], doc),
          "event_priceCurrency": getNodeValue(["//div[contains(@class, 'list-card__venue')]"], doc),
          "event_qxyPriceText": getNodeValue(["//span[contains(@class, 'list-card__label')]"], doc),
          "event_qxyRatingText": getNodeValue(["//div[contains(@class, 'list-card__tags')]/a", "//div[contains(@class, 'list-card__tags')]/a"], doc),
          "event_startDate": parsers["event_startDate"](getNodeValue(["//div[contains(@class, 'list-card__venue')]"], doc)) ,
          "image": getNodeValue(["//img[contains(@class, 'js-poster-image')]"], doc),
          "location": getNodeValue(["//div[contains(@class, 'list-card__venue')]"], doc),
          "name": getNodeValue(["//h4[contains(@class, 'list-card__title')]"], doc),
          "price": getNodeValue(["//span[contains(@class, 'list-card__label')]"], doc),
          "startDate": parsers["startDate"](getNodeValue(["//time[contains(@class, 'list-card__date')]"], doc)) ,
          "userReviews": getNodeValue(["//div[contains(@class, 'list-card__tags')]"], doc)
          }
        };

        if (params) {
          output = assign(output, params);
        }

        if (typeof(funcParamsCallback) === "function" && typeof(output.webUrl) === "string") {
          output.displayContent = assign(output.displayContent, funcParamsCallback(output.webUrl))
        }

        output.entitySchema = "event";
        output.useEntitySchema = true;

        results.push({ "function": func, "deepViewContent": output });
      }

      return results;
    }
  };

  return transform["func://eventbrite.com/cloudSearch2-showEventDetailsById2AdiTest"](webcloudOutput);
}



