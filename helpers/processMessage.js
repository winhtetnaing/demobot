//‘your Dialogflow Client Access Token’
const API_AI_TOKEN = '4f142208c0824834818fef07d72dda07';
const apiAiClient = require('apiai')(API_AI_TOKEN);
//‘your Facebook Page Access Token’
const FACEBOOK_ACCESS_TOKEN = 'EAAEX8u1ysWMBAEPrq8JqKjtKeUlQohxKQyrRt0l5OnxWOKJSr6SPCNo0r7FU1fxeSjTsvS9aTHWFeGn78jD1XUaP8qNPXV8tpe8VakSo5YjQrcfwgaAZCyiovLoRxayWokciUdjMRly2awH8TR8m2Gagm5ZBFCtjTLSwW8uwZDZD';
const request = require('request');

const sendTextMessage = (senderId, text) => {
 request({
 url: 'https://graph.facebook.com/v3.1/me/messages',
 qs: { access_token: FACEBOOK_ACCESS_TOKEN },
 method: 'POST',
 json: {
 recipient: { id: senderId },
 message: { text },
 }
 });
};

module.exports = (event) => {
 const senderId = event.sender.id;
 const message = event.message.text;

const apiaiSession = apiAiClient.textRequest(message, {sessionId: 'winbotdemo'});

apiaiSession.on('response', (response) => {
 const result = response.result.fulfillment.speech;

sendTextMessage(senderId, result);
 });

apiaiSession.on('error', error => console.log(error));
 apiaiSession.end();
};
