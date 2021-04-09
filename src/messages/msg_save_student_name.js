import connection from '../database';
import {saveInCache} from '../database/cache';
export default async (client, message) => {
  try {
    await connection('students').insert({name: message.body});
    client
    .sendText(message.from, `Ótimo, ${message.body}. Agora me informe seu endereço`)
    .then((result) => {
      console.log('Result: ', result); //return object success
    })
    .catch((erro) => {
      console.error('Error when sending: ', erro); //return object error
    });
    await saveInCache(message.from, "set_address");
    return;
  } catch (error) {
    console.log("erro :( ", error);
    return;
  }
}