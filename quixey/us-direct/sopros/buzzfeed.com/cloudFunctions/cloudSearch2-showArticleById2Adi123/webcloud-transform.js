
var transform = function(cloudOutput, ttl) {
  var transform = {
    "func://buzzfeed.com/cloudSearch2-showArticleById2Adi123": function(cloudOutput) {
      
        
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
      
      var parsers = {          "photograph_qxyMoreInfo": function(str) {
            try {
              return 'lolo';
            } catch(e) {}
            return str;
          },
          "startDate": function(str) {
            try {
              return '2016-04-11T17:31:22Z';
            } catch(e) {}
            return str;
          },
          "photograph_qxyInfo": function(str) {
            try {
              return 'Adi Adi Adi';
            } catch(e) {}
            return str;
          }
      };

      var results = [];

      for (var i = 0; i < cloudOutput.length ; i++) {

        var data = cloudOutput[i];
        var cloudFunc = "func://buzzfeed.com/cloudSearch2-showArticleById2Adi123";

        var func = "func://buzzfeed.com/showArticleById2";

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

        
  
        addComputedValue(output.displayContent, "@vertical", ["//div[contains(@class, 'byline__title')]"], parsers, doc);
        addComputedValue(output.displayContent, "description", ["//div[contains(@class, 'byline__title')]"], parsers, doc);
        addComputedValue(output.displayContent, "doorTime", ["//div[contains(@class, 'byline__title')]"], parsers, doc);
        addComputedValue(output.displayContent, "geo", ["//div[contains(@class, 'suplist_none')]/div[contains(@class, 'buzz_superlist_item buzz-superlist-itembuzz_superlist_item_image')]/h2"], parsers, doc);
        addComputedValue(output.displayContent, "name", ["//section[contains(@class, 'header-block')]/div[contains(@class, 'description')]"], parsers, doc);
        addComputedValue(output.displayContent, "photograph_author", ["//a[contains(@class, 'byline__author')]", "//div[contains(@class, 'byline__title')]"], parsers, doc);
        addComputedValue(output.displayContent, "photograph_datePublished", ["//span[contains(@class, 'buzz-datetime')]"], parsers, doc);
        addComputedValue(output.displayContent, "photograph_description", ["//div[contains(@class, 'user-bylines')]/div[contains(@class, 'byline\n')]/div[contains(@class, 'byline__body')]/div[contains(@class, 'byline__title')]"], parsers, doc);
        addComputedValue(output.displayContent, "photograph_genre", ["//span[contains(@class, 'buzz-datetime')]"], parsers, doc);
        addComputedValue(output.displayContent, "photograph_image", ["//div[contains(@class, 'suplist_dec_up')]/div[contains(@class, 'buzz_superlist_item buzz-superlist-itembuzz_superlist_item_image')]/div[contains(@class, 'sub_buzz_content sub-buzz-content ')]/div[contains(@class, 'sub_buzz_media sub-buzz-mediajs-subbuzz__share-container ')]/a/img"], parsers, doc);
        addComputedValue(output.displayContent, "photograph_name", ["//h1[contains(@class, 'title')]"], parsers, doc);
        addComputedValue(output.displayContent, "photograph_qxyInfo", [], parsers, doc);
        addComputedValue(output.displayContent, "photograph_qxyMoreInfo", ["//a[contains(@class, 'byline__author')]"], parsers, doc);
        addComputedValue(output.displayContent, "startDate", ["//div[contains(@class, 'byline__title')]"], parsers, doc);


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

  return transform["func://buzzfeed.com/cloudSearch2-showArticleById2Adi123"](cloudOutput);
}


