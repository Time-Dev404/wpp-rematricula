import { saveInCache } from './database/cache';

const venom = require('venom-bot');
const messageSwitch = require('./messageSwitch');

function startBot(){
  venom
  .create(
    "avime",
    (base64Qr, asciiQR, attempts, urlCode) => {
      console.log(asciiQR); // Optional to log the QR in the terminal
      var matches = base64Qr.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
        response = {};

      if (matches.length !== 3) {
        return new Error('Invalid input string');
      }
      response.type = matches[1];
      response.data = new Buffer.from(matches[2], 'base64');

      var imageBuffer = response;
      require('fs').writeFile(
        `${__dirname}/../public/out.png`,
        imageBuffer['data'],
        'binary',
        function (err) {
          if (err != null) {
            console.log(err);
          }
        }
      );
    },
    (statusSession, session) => {
      console.log('Status Session: ', statusSession); //return isLogged || notLogged || browserClose || qrReadSuccess || qrReadFail || autocloseCalled || desconnectedMobile || deleteToken || chatsAvailable || deviceNotConnected || serverWssNotConnected || noOpenBrowser
      //Create session wss return "serverClose" case server for close
      saveInCache("statusSession", statusSession)
      console.log('Session name: ', session);
    },
    {
    puppeteerOptions: {
      headless: true,
    },
    autoClose: 0,
    browserArgs: ['--no-sandbox', '--disable-setuid-sandbox']
  })
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });
}

function start(client) {
  client.onMessage(async (message) => {
    if (message.isGroupMsg === false) {
      const response = await messageSwitch(client, message)
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

export {startBot};