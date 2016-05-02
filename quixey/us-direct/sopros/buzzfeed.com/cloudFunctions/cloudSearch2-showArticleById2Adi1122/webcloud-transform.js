var transform = function(cloudOutput, ttl) {
  var transform = {
    "func://buzzfeed.com/cloudSearch2-showArticleById2Adi1122": function(cloudOutput) {
      
        
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
      
      var parsers = {          "creativeWork_genre": function(str) {
            try {
              return 'lolo';
            } catch(e) {}
            return str;
          },
          "creativeWork_qxyMoreInfo": function(str) {
            try {
              return 'bobo';
            } catch(e) {}
            return str;
          }
      };

      var results = [];

      for (var i = 0; i < cloudOutput.length ; i++) {

        var data = cloudOutput[i];
        var cloudFunc = "func://buzzfeed.com/cloudSearch2-showArticleById2Adi1122";

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

        
  
        addComputedValue(output.displayContent, "@vertical", ["//li[contains(@class, 'quiz_question')]/ol[contains(@class, 'smallImgAnswers image')]/li[contains(@class, 'quiz_answer quiz-answer quiz_answer_el  has_quiz_answer_text')]/span[contains(@class, 'quiz_checkbox_wrp')]/span[contains(@class, 'quiz_answer_text')]"], parsers, doc);
        addComputedValue(output.displayContent, "creativeWork_author", ["//a[contains(@class, 'byline__author')]"], parsers, doc);
        addComputedValue(output.displayContent, "creativeWork_description", ["//div[contains(@class, 'description')]"], parsers, doc);
        addComputedValue(output.displayContent, "creativeWork_genre", ["//div[contains(@class, 'byline__title')]"], parsers, doc);
        addComputedValue(output.displayContent, "creativeWork_image", ["//img[contains(@class, 'byline__avatar')]"], parsers, doc);
        addComputedValue(output.displayContent, "creativeWork_name", ["//h1[contains(@class, 'title')]"], parsers, doc);
        addComputedValue(output.displayContent, "creativeWork_qxyInfo", ["//span[contains(@class, 'buzz-datetime')]"], parsers, doc);
        addComputedValue(output.displayContent, "creativeWork_qxyMoreInfo", [], parsers, doc);
        addComputedValue(output.displayContent, "description", ["//div[contains(@class, 'description')]"], parsers, doc);
        addComputedValue(output.displayContent, "image", ["//img[contains(@class, 'byline__avatar')]"], parsers, doc);
        addComputedValue(output.displayContent, "name", ["//h1[contains(@class, 'title')]"], parsers, doc);


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

  return transform["func://buzzfeed.com/cloudSearch2-showArticleById2Adi1122"](cloudOutput);
}



