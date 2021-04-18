import connection from '../database';
import * as Yup from 'yup';
import {saveInCache} from '../database/cache';
import { cpf } from 'cpf-cnpj-validator'; 
export default async (client, message) => {

  message.body = message.body.replace(/\D/gim, '').trim();

  let schema = Yup.object().shape({
    body: Yup.string().required().length(11).trim()
  });

  const isValid = await schema.isValid(message);

  if(!isValid || !cpf.isValid(message.body)){
    await saveInCache(message.from, "set_cpf_student");
    return "Desculpa, talvez eu não tenha entendido certo, mas você informou um cpf inválido. Tente novamente"
  }

  try {
    await connection('students').insert({cpf: message.body, chat_id: message.from});

    await saveInCache(message.from, "set_name_student");
    await saveInCache(`${message.from}_cpf`, message.body);
    return `Ótimo. Agora me informe seu nome completo`;
  } catch (error) {
    console.log("erro :( ", error);
    await saveInCache(message.from, "set_cpf_student");
    return `Que pena. Parece que você já fez sua rematrícula. Tente enviar o cpf novamente.`;
  }
}