import connection from '../database';
import * as Yup from 'yup';
import {getFromCache, saveInCache} from '../database/cache';
export default async (client, message) => {

  message.body = message.body.replace(/\D/gim, '').trim();

  let schema = Yup.object().shape({
    body: Yup.number().required().trim().min(3)
  });

  const isValid = await schema.isValid(message);

  if(!isValid){
    await saveInCache(message.from, "set_class_student");
    return "Que pena, esse não é um endereço válido. Tenta me enviar de novo."
  }

  try {
    const cpf = await getFromCache(`${message.from}_cpf`);
    await connection('students').where({cpf: cpf}).update({email: message.body});

    const teachings = await connection('teaching').select("id", "name");
    let text = "";
    teachings.forEach(teach => {
      text += `\n*${teach.id}* - ${teach.name}`
    });

    await saveInCache(message.from, "set_teaching_student");
    return `Tudo bem. Me diz agora qual dessas é a sua modalidade de ensino: ${text}`;
  } catch (error) {
    console.log("erro :( ", error);
    return `Que pena. Parece que houve um erro. Tenta continuar mais tarde, tá bom?!`;
  }
}