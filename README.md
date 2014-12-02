SrvrSvr
=====
Save your servers by limiting the number of resource intensive/long running requests that would otherwise be performed (in the instance of binding a request to each of many checkboxes)

Requirements
-----
This project relies on [Q](https://github.com/kriskowal/q)

If Q is not found, then SrvrSvr will throw an exception in the constructor


Usage
-----
```javascript
$(document).ready(function(){
    //Create a new SrvrSvr object, passing in the URL to post data to as the only parameter
    var saver = new SrvrSvr('http://localhost:8081')
    $('input:checkbox').change(function(){
        //call saver.request() with the data to be posted to the URL given to the constructor
        saver.request(JSON.stringify({id:this.id}));
    });
});
```
