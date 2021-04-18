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
    await saveInCache(message.from, "set_name_responsible");
    return "Desculpa, você inseriu um nome inválido. Tente novamente."
  }

  try {
    const cpf = await getFromCache(`${message.from}_cpf`);

    const student = await connection('students').where({cpf: cpf}).select("id").first();
    
    await connection('responsibles').insert({name: message.body, student_id: student.id});
    await saveInCache(message.from, "set_cpf_responsible");
    return `Muito bom. Agora me informe o cpf de ${message.body.split(" ")[0]}`;
  } catch (error) {
    console.log("erro :( ", error);
    return `Que pena. Parece que houve um erro. Tenta continuar mais tarde, tá bom?!`;
  }
}