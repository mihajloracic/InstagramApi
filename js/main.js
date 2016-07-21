$(document).ready(function() {
    var clientId = 'xxx';
    var clientSecret = 'xxx';
    var redirectUri = 'https://localhost/twiterFeed/';
    var access_token = "";
    var scope = 'basic public_content follower_list comments relationships likes';
    $("#generateToken").click(function(event){
      window.location = 'https://instagram.com/oauth/authorize/?client_id=' + clientId + '&redirect_uri=' + redirectUri + '&response_type=token&scope='+scope;
      if (window.location.hash) {
          access_token = window.location.hash.split("access_token=")[1];
          window.location.hash = "";
          requestMedia();
      }
    });
    $("#showToken").click(function(){
      access_token = window.location.hash.split("access_token=")[1];
      console.log(access_token);
      searchUsers(access_token);
      searchByTag(access_token)
    });
    var requestMedia = function(token){
      var userId='xxx';
      url = 'https://api.instagram.com/v1/users/'+ userId +'/media/recent?count=200=&access_token='+token;
      $.ajax({
          type:'GET',
          url: url,
          dataType: 'jsonp',
          cache:false,
          success: function(data){
            for(var i=0;i<5;i++){
              var imgTag = '<img src="' +  data.data[i].images.standard_resolution.url + '">';
              $( ".zaSlike" ).append( imgTag );
            }
          }
      });
    };
    var searchUsers = function(token){
      var querry = 'mihajloracic';
      url = 'https://api.instagram.com/v1/users/search?q='+querry+'&access_token='+token;
      $.ajax({
          type:'GET',
          url: url,
          dataType: 'jsonp',
          cache:false,
          success: function(data){
            console.log(data);
          }
      });
    }
    var searchByTag = function(token){
      var querry = 'djokernole';
      url = 'https://api.instagram.com/v1/tags/'+querry+'/media/recent?access_token=' + token;
    //  url = 'https://api.instagram.com/v1/users/search?q=&'+ querry +'&access_token='+token;
      $.ajax({
          type:'GET',
          url: url,
          dataType: 'jsonp',
          cache:false,
          success: function(data,mata){
            console.log(data);
            console.log(mata);
          }
      });
    }
});
