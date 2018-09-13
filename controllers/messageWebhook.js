const processMessage = require('../helpers/processMessage');
module.exports = (req, res) => {
 console.log("req data: "+req);
 if (req.body.object === 'page') {
  console.log("enter if cond: "+req);
 req.body.entry.forEach(entry => {
 entry.messaging.forEach(event => {
 if (event.message && event.message.text) {
 processMessage(event);
 }
 });
 });
res.status(200).end();
 }
};
