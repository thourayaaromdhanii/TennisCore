 


 exports.getToken =( )=> {
    var request = require('request');
var options = {
  'method': 'POST',
  'url': 'https://api.orange.com/oauth/v2/token',
  'headers': {
    'Content-Type': ['application/x-www-form-urlencoded', 'application/x-www-form-urlencoded'],
    'Authorization': 'Basic SlRubFFWcXJnMVJPVklKaWdpcndwWElEM2ZyVWQ2VjE6QkVkZW9BOFFndkx3RUxOUw=='
  },
  form: {
    'grant_type': 'client_credentials'
  }
};
request(options, function (error, response) { 
  if (error) throw new Error(error);
  console.log(response.body);
});

}    