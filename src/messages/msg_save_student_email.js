
import * as Yup from 'yup';
import connection from '../database';
import {getFromCache, saveInCache} from '../database/cache';
export default async (client, message) => {

  message.body = message.body.trim();

  let schema = Yup.object().shape({
    body: Yup.string().email().required().trim().min(3)
  });

  const isValid = await schema.isValid(message);

  if(!isValid ){
    await saveInCache(message.from, "set_email_student");
    return "Que pena, esse email não é válido. Tenta me enviar de novo."
  }

  try {
    const cpf = await getFromCache(`${message.from}_cpf`);
    await connection('students').where({cpf: cpf}).update({email: message.body});


    await saveInCache(message.from, "set_name_responsible");

    client
        .sendText(message.from, "Muito bem, agora vou precisar que me informe os dados do seu responsável. Vamos lá!")
        .then((result) => {
          console.log('Result: ', result); //return object success
        })
        .catch((erro) => {
          console.error('Error when sending: ', erro); //return object error
        });

    return `Me informe o nome do seu responsável.`;
  } catch (error) {
    console.log("erro :( ", error);
    return `Que pena. Parece que houve um erro. Tenta continuar mais tarde, tá bom?!`;
  }
}