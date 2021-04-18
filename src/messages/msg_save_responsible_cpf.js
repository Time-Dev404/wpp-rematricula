import connection from '../database';
import * as Yup from 'yup';
import { cpf } from 'cpf-cnpj-validator'; 
import {getFromCache, saveInCache} from '../database/cache';
export default async (client, message) => {
  message.body = message.body.replace(/\D/gim, '').trim();

  let schema = Yup.object().shape({
    body: Yup.string().required().length(11).trim()
  });

  const isValid = await schema.isValid(message);

  if(!isValid || !cpf.isValid(message.body)){
    await saveInCache(message.from, "set_cpf_responsible");
    return "Desculpa, talvez eu não tenha entendido certo, mas você informou um cpf inválido. Tente novamente"
  }
  try {
    const cpf = await getFromCache(`${message.from}_cpf`);

    const student = await connection('students').where({cpf: cpf}).select("id").first();
    
    await connection('responsibles').update({cpf: message.body,}).where({student_id: student.id});
    await saveInCache(message.from, "set_rg_responsible");
    return `Nossa, que legal. Agora me informe o rg`;
  } catch (error) {
    console.log("erro :( ", error);
    return `Que pena. Parece que houve um erro. Tenta continuar mais tarde, tá bom?!`;
  }
}