
import * as Yup from 'yup';
import connection from '../database';
import {getFromCache, saveInCache} from '../database/cache';
export default async (client, message) => {

  message.body = message.body.replace(/\D/gim, '').trim();

  let schema = Yup.object().shape({
    body: Yup.number().required()
  });

  const isValid = await schema.isValid(message);

  if(!isValid){
    await saveInCache(message.from, "set_course_student");
    return "Que pena, esse não é um endereço válido. Tenta me enviar de novo."
  }

  try {
    // const cpf = await getFromCache(`${message.from}_cpf`);
    // await connection('students').where({cpf: cpf}).update({email: message.body});

    const teachings = await connection('classes').select("id", "year").where({course_id: message.body});
    
    if(!teachings){
      await saveInCache(message.from, "set_course_student");
      return "Oops! Parece que não encontrei o curso que você informou. Tenta me enviar de novo."
    }

    let text = "";
    let i = 0;
    teachings.forEach(teach => {
      i++;
      text += `\n${i} - *${teach.year}*`
    });

    await saveInCache(message.from, "set_class_student");
    return `Tudo bem. Me diz agora qual a sua turma: ${text}`;
  } catch (error) {
    console.log("erro :( ", error);
    return `Que pena. Parece que houve um erro. Tenta continuar mais tarde, tá bom?!`;
  }
}