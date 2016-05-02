var transform = function(cloudOutput, ttl) {
  var transform = {
    "func://amazon.com/cloudSearch2-showProductById2AdiAdiTest": function(cloudOutput) {
      
        
      var funcParamsCallback = function(url) {
        try {
          return { "url": url };
        } catch (e) {
          print(e);
          return {};
        }
      };
      
      var parsers = {          "geo": function(str) {
            try {
              return "hi";
            } catch(e) {}
            return str;
          },
          "place_reviewCount": function(str) {
            try {
              return 'bobo';
            } catch(e) {}
            return str;
          },
          "startDate": function(str) {
            try {
              return '2016-04-11T17:31:22Z';
            } catch(e) {}
            return str;
          }
      };

      var results = [];

      for (var i = 0; i < cloudOutput.length ; i++) {

        var data = cloudOutput[i];
        var cloudFunc = "func://amazon.com/cloudSearch2-showProductById2AdiAdiTest";

        var func = "func://amazon.com/showProductById2";

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

        
  
        addComputedValue(output.displayContent, "@vertical", ["//div[contains(@class, 'sx-table-detail')]/div[contains(@class, 'a-section a-spacing-micro')]/div[contains(@class, 'a-row')]/span[contains(@class, 'a-size-small a-color-secondary')]"], parsers, doc);
        addComputedValue(output.displayContent, "doorTime", ["//div[contains(@class, 'sx-table-detail')]/div[contains(@class, 'a-row a-spacing-none a-size-small a-color-secondary')]"], parsers, doc);
        addComputedValue(output.displayContent, "geo", ["//div[contains(@class, 'sx-table-detail')]/div[contains(@class, 'a-row a-spacing-none a-size-small a-color-secondary')]"], parsers, doc);
        addComputedValue(output.displayContent, "name", ["//h5[contains(@class, 'a-size-base')]"], parsers, doc);
        addComputedValue(output.displayContent, "place_description", ["//div[contains(@class, 'sx-table-detail')]/div[contains(@class, 'a-section a-spacing-micro')]/div[contains(@class, 'a-row a-size-small a-color-secondary')]"], parsers, doc);
        addComputedValue(output.displayContent, "place_distance", ["//div[contains(@class, 'sx-table-detail')]/div[contains(@class, 'a-row a-spacing-none a-size-small a-color-secondary')]"], parsers, doc);
        addComputedValue(output.displayContent, "place_image", ["//img[contains(@class, 'sx-product-image')]"], parsers, doc);
        addComputedValue(output.displayContent, "place_name", ["//h5[contains(@class, 'a-size-base')]"], parsers, doc);
        addComputedValue(output.displayContent, "place_qxyAvgRating", ["//div[contains(@class, 'sx-table-detail')]/div[contains(@class, 'a-row a-spacing-micro a-color-secondary')]/span[contains(@class, 'a-size-small')]"], parsers, doc);
        addComputedValue(output.displayContent, "place_qxyInfo", ["//div[contains(@class, 'sx-table-detail')]/div[contains(@class, 'a-row a-spacing-micro a-color-secondary')]/span[contains(@class, 'a-size-small')]"], parsers, doc);
        addComputedValue(output.displayContent, "place_reviewCount", ["//div[contains(@class, 'a-icon-row')]/span[contains(@class, 'a-size-small a-color-secondary')]"], parsers, doc);
        addComputedValue(output.displayContent, "place_telephone", ["//div[contains(@class, 'a-spacing-none')]"], parsers, doc);
        addComputedValue(output.displayContent, "startDate", ["//div[contains(@class, 'closed_caption')]"], parsers, doc);


        if (params) {
          output = assign(output, params);
        }

        if (typeof(funcParamsCallback) === "function" && typeof(output.webUrl) === "string") {
          var funcParams = funcParamsCallback(output.webUrl);

          output.displayContent = assign(output.displayContent, {
            "@id": populateFurl("func://amazon.com/showProductById2/{url}", funcParams)
          });

          output.displayContent = assign(output.displayContent, funcParams)
        }


        output.displayContent = assign(output.displayContent, {
          "@type": "Event",
          "crawled": utcNow(),
          "created": utcNow(),
          "httpStatusCode": 200,
          "expires": utcNow(ttl || 60),
          "url": output.webUrl
        });
        output.entitySchema = "event";
        output.useEntitySchema = true;

        results.push({ "function": func, "deepViewContent": output });
      }

      return results;
    }
  };

  return transform["func://amazon.com/cloudSearch2-showProductById2AdiAdiTest"](cloudOutput);
}



