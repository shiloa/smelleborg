var transform = function(webcloudOutput) {
  var transform = {
    "func://askme.com/cloudSearch2-showProductById2": function(webcloudOutput) {
      
    
      
      var parsers = {
          "product_qxyInfo": function(str) {
            try {
              return str.split(': ')[1];
            } catch(e) {}
            return str;
          },
          "product_qxyPriceText": function(str) {
            try {
              if(str.length>2){return str.split(': ')[1];}
            } catch(e) {}
            return str;
          }
      };

      
      var funcParamsCallback = function(url) {
        try {
          return { id: url.match(/\-p(\d+)/)[1] };
        } catch (e) {
          print(e);
          return {};
        }
      };

      var results = [];

      for (var i = 0; i < webcloudOutput.length ; i++) {

        var data = webcloudOutput[i];
        var cloudFunc = "func://askme.com/cloudSearch2-showProductById2";

        var func = "func://askme
.com/showProductById2";

        var doc = parseDocument(data.content);

        var params = {};
        for (var key in data) {
          if (keysToExclude.indexOf(key) < 0) {
            params[key] = data[key];
          }
        }

        var output = {
          "displayContent": {          
          "product_brand": getNodeValue(["//div[contains(@class, 'seller')]"], doc),
          "product_image": getNodeValue(["//div[contains(@class, 'productImage')]/a/img"], doc),
          "product_name": getNodeValue(["//a[contains(@class, 'prd_title')]"], doc),
          "product_priceCurrency": getNodeValue(["//div[contains(@class, 'src-pd-rpy')]"], doc),
          "product_qxyInfo": parsers["product_qxyInfo"](getNodeValue(["//span[contains(@class, 'deal_price')]"], doc)) ,
          "product_qxyPriceText": parsers["product_qxyPriceText"](getNodeValue(["//span[contains(@class, 'old_price')]"], doc)) 
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

  return transform["func://askme.com/cloudSearch2-showProductById2"](webcloudOutput);
}



