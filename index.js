const venom = require('venom-bot');
const messageSwitch = require('./src/messageSwitch');

venom
  .create()
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });

function start(client) {
  client.onMessage((message) => {
    if (message.isGroupMsg === false) {
      const response = messageSwitch(client, message)
      client
        .sendText(message.from, response)
        .then((result) => {
          console.log('Result: ', result); //return object success
        })
        .catch((erro) => {
          console.error('Error when sending: ', erro); //return object error
        });
    }
  });
}