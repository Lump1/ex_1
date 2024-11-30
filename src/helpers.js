export class idEnumerator {
    static tagsJSON = {};

    static tagEnumerate(tagName = "key") {   
        var returnVal;
        var tag = Object.keys(this.tagsJSON).find(tag => tag == tagName);
        if(tag == undefined) {
            this.tagsJSON[tagName] = 0;
            console.log(this.tagsJSON[tagName]);
            returnVal = 0;
        }
        else {
            console.log(this.tagsJSON[tagName]);
            this.tagsJSON[tagName] += 1;
            console.log(this.tagsJSON[tagName]);
            returnVal = this.tagsJSON[tagName];
        }

        return tagName + '_' + returnVal;
    }
}

export class urlWorker {
    static urlCutter(url) {
      if(url == undefined) return undefined;
  
      var start = url.indexOf("//") == -1 ? 0 : url.indexOf("//") + 2;
      var end = url.indexOf("/", start) == -1 ? url.length : url.indexOf("/", start);
  
      url = url.slice(start, end);
  
      return url;
    }
  
    static urlEqualChecker(url1, url2) {
      if(this.urlCutter(url1) === this.urlCutter(url2)) return true;
      else return false;
    }
  }
