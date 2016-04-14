var transform = function(webcloudOutput) {
  var transform = {
    "func://buzzfeed.com/cloudSearch2-showArticleById2AdiTest": function(webcloudOutput) {
      
    
      
      var parsers = {
          "@vertical": function(str) {
            try {
              return 'Local';
            } catch(e) {}
            return str;
          }
      };

      
      var funcParamsCallback = function(url) {
        try {
          var articleUrl = url.replace("http://","").replace("https://","");
return {
  "articleUrl": articleUrl
}
        } catch (e) {
          print(e);
          return {};
        }
      };

      var results = [];

      for (var i = 0; i < webcloudOutput.length ; i++) {

        var data = webcloudOutput[i];
        var cloudFunc = "func://buzzfeed.com/cloudSearch2-showArticleById2AdiTest";

        var func = "func://buzzfeed.com/showArticleById2";

        var doc = parseDocument(data.content);

        var params = {};
        for (var key in data) {
          if (keysToExclude.indexOf(key) < 0) {
            params[key] = data[key];
          }
        }

        var output = {
          "displayContent": {          
          "@vertical": parsers["@vertical"](getNodeValue(["//a[contains(@class, 'byline__author')]"], doc)) ,
          "category": getNodeValue(["//div[contains(@class, 'suplist_dec_up')]/div[contains(@class, 'buzz_superlist_item buzz-superlist-itembuzz_superlist_item_image')]/h2"], doc),
          "creativeWork_description": getNodeValue(["//div[contains(@class, 'byline__title')]"], doc),
          "creativeWork_image": getNodeValue(["//div[contains(@class, 'suplist_dec_up')]/div[contains(@class, 'buzz_superlist_item buzz-superlist-itembuzz_superlist_item_image')]/div[contains(@class, 'sub_buzz_content sub-buzz-content ')]/div[contains(@class, 'sub_buzz_media sub-buzz-mediajs-subbuzz__share-container ')]/a/img"], doc),
          "creativeWork_name": getNodeValue(["//h1[contains(@class, 'title')]"], doc),
          "description": getNodeValue(["//section[contains(@class, 'header-block')]/div[contains(@class, 'description')]"], doc),
          "image": getNodeValue(["//div[contains(@class, 'suplist_none')]/div[contains(@class, 'buzz_superlist_item buzz-superlist-itembuzz_superlist_item_image')]/div[contains(@class, 'sub_buzz_content sub-buzz-content ')]/div[contains(@class, 'sub_buzz_media sub-buzz-mediajs-subbuzz__share-container ')]/a/img"], doc),
          "name": getNodeValue(["//h1[contains(@class, 'title')]"], doc)
          }
        };

        if (params) {
          output = assign(output, params);
        }

        if (typeof(funcParamsCallback) === "function" && typeof(output.webUrl) === "string") {
          var funcParams = funcParamsCallback(output.webUrl);

          output.displayContent = assign(output.displayContent, {
            "@id": populateFurl("func://buzzfeed.com/showArticleById2/{articleUrl}", funcParams)
          });

          output.displayContent = assign(output.displayContent, funcParams)
        }


        output.displayContent = assign(output.displayContent, {
          "@type": "NewsArticle",
          "crawled": utcNow(),
          "created": utcNow(),
          "httpStatusCode": 200,
          "url": output.webUrl
        });
        output.entitySchema = "newsarticle";
        output.useEntitySchema = true;

        results.push({ "function": func, "deepViewContent": output });
      }

      return results;
    }
  };

  return transform["func://buzzfeed.com/cloudSearch2-showArticleById2AdiTest"](webcloudOutput);
}



