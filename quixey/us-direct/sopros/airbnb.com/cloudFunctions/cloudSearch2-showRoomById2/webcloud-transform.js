var transform = function(webcloudOutput) {
  var transform = {
    "func://airbnb.com/cloudSearch2-showRoomById2": function(webcloudOutput) {
      
    
      
      var parsers = {
          "product_reviewCount": function(str) {
            try {
              return str.concat(' reviews')
            } catch(e) {}
            return str;
          },
          "product_description": function(str) {
            try {
              return str.split('·')[0]
            } catch(e) {}
            return str;
          }
      };


      var results = [];

      for (var i = 0; i < webcloudOutput.length ; i++) {

        var data = webcloudOutput[i];
        var cloudFunc = "func://airbnb.com/cloudSearch2-showRoomById2";

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
          "product_description": parsers["product_description"](getNodeValue(["//div[contains(@itemprop,'description')]/span/a", ''], doc)) ,
          "product_image": getNodeValue(["//img[contains(@class, 'img-responsive-height')]"], doc),
          "product_name": getNodeValue(["//h3[contains(@class, 'h5')]/a[contains(@class, 'text-normal')]"], doc),
          "product_price": getNodeValue(["//span[contains(@class,'price-amount')]"], doc),
          "product_priceCurrency": getNodeValue(['//div/sup[1]'], doc),
          "product_qxyAvgRating": getNodeValue(['//div[@data-lng]/@data-star-rating'], doc),
          "product_qxyInfo": getNodeValue(['//div/sup[1]', "//span[contains(@class,'price-amount')]"], doc),
          "product_qxyRatingText": getNodeValue(["//h3[contains(@class, 'h5')]/a[contains(@class, 'text-normal')]"], doc),
          "product_reviewCount": parsers["product_reviewCount"](getNodeValue(['//div[@data-review-count]/@data-review-count', ''], doc)) 
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

  return transform["func://airbnb.com/cloudSearch2-showRoomById2"](webcloudOutput);
}



