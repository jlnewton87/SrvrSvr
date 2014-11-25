SrvrSvr
=======
Save your servers by limiting the number of resource intensive/long running requests that would otherwise be performed (in the instance of binding a request to each of many checkboxes)


Usage
=====
    $(document).ready(function(){
        var saver = new SrvrSvr('http://localhost:8081')
        $('input:checkbox').change(function(){
            saver.request(JSON.stringify({id:this.id}));
        });
      });
