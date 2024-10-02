// JS TECHNIQUE
/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */
//import { GoogleGenerativeAI } from "@google/generative-ai";
/*
const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");
*/

const apiKey = 'AIzaSyD1LmuHrMHSKyNXpeZYZTS37C3LSr3QsRo';
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function run(msgval) {
  const chatSession = model.startChat({
    generationConfig,
 // safetySettings: Adjust safety settings
 // See https://ai.google.dev/gemini-api/docs/safety-settings
    history: [
    ],
  });

  const result = await chatSession.sendMessage(msgval);

  console.log(result.response.text());
  $("#chat-containerout").html(result.response.text());
}



 document.getElementById('AIChat').addEventListener('submit', (e) => {
        e.preventDefault();
        
        var msgval = $('#chat-containerin').val();

        run(msgval);

    });