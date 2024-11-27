export default class idEnumerator {
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