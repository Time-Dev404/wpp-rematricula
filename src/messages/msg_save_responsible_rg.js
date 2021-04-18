import connection from '../database';
import * as Yup from 'yup';
import {getFromCache, saveInCache} from '../database/cache';
export default async (client, message) => {

  message.body = message.body.replace(/\D/gim, '').trim();

  let schema = Yup.object().shape({
    body: Yup.string().required().trim().min(3)
  });

  const isValid = await schema.isValid(message);

  if(!isValid){
    await saveInCache(message.from, "set_rg_responsible");
    return "Que pena, esse RG não é válido. Tenta me enviar de novo."
  }

  try {
    const cpf = await getFromCache(`${message.from}_cpf`);

    const student = await connection('students').where({cpf: cpf}).select("id").first();
    
    await connection('responsibles').update({rg: message.body,}).where({student_id: student.id});
    await saveInCache(message.from, "set_phone_responsible");
    return `Muito bom. Agora me informe o número de telefone`;
  } catch (error) {
    console.log("erro :( ", error);
    return `Que pena. Parece que houve um erro. Tenta continuar mais tarde, tá bom?!`;
  }
}