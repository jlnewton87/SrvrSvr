SrvrSvr
=====
Save your servers by limiting the number of resource intensive/long running requests that would otherwise be performed (in the instance of binding a request to each of many checkboxes).

SrvrSvr internally creates and tracks you XMLHttpRequest, and calls functions of your choice on success or error (both get a parameter, containing the response message from the server).  For the first request, it is sent immediately. If another request is made before the first returns, the first is cancelled, and another is queued for your set interval (or 3000 millis if you did not set one).  Each subsequent 'request' updates the data to be sent to the server, but keeps the timer going!  This way, you can get data to your users quickly, without having to burn resources on your server for requests that ultimately get ignored (at least not as many).

Requirements
-----
This project relies on [Q](https://github.com/kriskowal/q)

If Q is not found, then SrvrSvr will throw an exception in the constructor


Usage
-----
```javascript
$(document).ready(function(){
    //Create a new SrvrSvr object, passing in the URL to post data to success and error functions, and the content type
    //of the data to be posted (application/json, application/x-www-form-urlencoded)
    //
    //it also accepts an interval in milliseconds, for time between concurrent requests
    var saver = new SrvrSvr('http://localhost:8081', somethingToDoOnSuccess, SomethingToDoOnError, 'application/json');
    $('input:checkbox').change(function(){
        //call saver.request() with the data to be posted to the URL given to the constructor
        saver.request(JSON.stringify({id:this.id}));
    });
});
```
