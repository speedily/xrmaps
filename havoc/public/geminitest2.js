// CURL REST TECHNIQUE
// https://ai.google.dev/gemini-api/docs/get-started/rest

API_KEY="AIzaSyD1LmuHrMHSKyNXpeZYZTS37C3LSr3QsRo";

// Adjust safety settings in generationConfig below.
//See https://ai.google.dev/gemini-api/docs/safety-settings
/*
curl \
  -X POST https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY} \
  -H 'Content-Type: application/json' \
  -d @<(echo '{
  "contents": [
    {
      "role": "user",
      "parts": [
        {
          "text": "INSERT_INPUT_HERE"
        }
      ]
    }
  ],
  "generationConfig": {
    "temperature": 1,
    "topK": 64,
    "topP": 0.95,
    "maxOutputTokens": 8192,
    "responseMimeType": "text/plain"
  }
}')


$.ajax({
    url: "https://usX.api.mailchimp.com/3.0/lists/1234/members",
    beforeSend: function(xhr) { 
      xhr.setRequestHeader("Authorization", "Basic " + btoa("username:api_key")); 
    },
    type: 'POST',
    dataType: 'json',
    contentType: 'application/json',
    processData: false,
    data: '{"email_address": "user@example.com", "status": "pending"}',
    success: function (data) {
      alert(JSON.stringify(data));
    },
    error: function(){
      alert("Cannot get data");
    }
});

*/