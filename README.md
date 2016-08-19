# api
API

     var req = new TWBot;
         req.api('users.get', {id: 1})
          .done(function(data){
            console.log(data);
       }).fail(function(err){
          console.log(err);
       })
