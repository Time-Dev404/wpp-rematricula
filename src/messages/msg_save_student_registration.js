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
    await saveInCache(message.from, "set_registration_student");
    return "Desculpa, mas essa matrícula não é válida. Tente novamente."
  }

  try {
    const cpf = await getFromCache(`${message.from}_cpf`);
    await connection('students').where({cpf: cpf}).update({registration: message.body});

    await saveInCache(message.from, "set_address_student");
    return `Massa. Me diz aí seu endereço`;
  } catch (error) {
    console.log("erro :( ", error);
    return `Que pena. Parece que houve um erro. Tenta continuar mais tarde, tá bom?!`;
  }
}