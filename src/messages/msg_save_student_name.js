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
    await saveInCache(message.from, "set_name_student");
    return "Desculpa, você inseriu um nome inválido. Tente novamente."
  }

  try {
    const cpf = await getFromCache(`${message.from}_cpf`);
    
    await connection('students').where({cpf: cpf}).update({name: message.body});
    await saveInCache(message.from, "set_registration_student");
    return `Que nome lindo, ${message.body.split(" ")[0]}! Agora me informe sua matrícula.`;
  } catch (error) {
    console.log("erro :( ", error);
    return `Que pena. Parece que houve um erro. Tenta continuar mais tarde, tá bom?!`;
  }
}