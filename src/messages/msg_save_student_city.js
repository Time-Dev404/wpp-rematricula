import connection from '../database';
import * as Yup from 'yup';
import {getFromCache, saveInCache} from '../database/cache';
export default async (client, message) => {

  message.body = message.body.trim();

  let schema = Yup.object().shape({
    body: Yup.string().required().trim().min(3)
  });

  const isValid = await schema.isValid(message);

  if(!isValid){
    await saveInCache(message.from, "set_city_student");
    return "Que pena, esse email não é válido. Tenta me enviar de novo."
  }

  try {
    const cpf = await getFromCache(`${message.from}_cpf`);
    await connection('students').where({cpf: cpf}).update({city: message.body});
    await saveInCache(message.from, "set_email_student");
    return `Hurum, agora me diz aí o qual o seu email`;
  } catch (error) {
    console.log("erro :( ", error);
    return `Que pena. Parece que houve um erro. Tenta continuar mais tarde, tá bom?!`;
  }
}