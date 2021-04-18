import connection from '../database';
import * as Yup from 'yup';
import {getFromCache, saveInCache} from '../database/cache';
export default async (client, message) => {

  message.body = message.body.replace(/\D/gim, '').trim();

  let schema = Yup.object().shape({
    body: Yup.string().required().min(3)
  });

  const isValid = await schema.isValid(message);

  if(!isValid){
    await saveInCache(message.from, "set_phone_responsible");
    return "Esse número de telefone não é válido. Tente novamente."
  }

  try {
    const cpf = await getFromCache(`${message.from}_cpf`);

    const student = await connection('students').where({cpf: cpf}).select("id").first();
    
    await connection('responsibles').update({phone: message.body,}).where({student_id: student.id});
    
    const teachings = await connection('courses').select("id", "name").where({teaching_id: 1});
    let text = "";
    teachings.forEach(teach => {
      text += `\n*${teach.id}* - ${teach.name}`
    });

    await saveInCache(message.from, "set_course_student");
    return `Tudo bem. Me diz agora qual desses é o seu curso: ${text}`;

  } catch (error) {
    console.log("erro :( ", error);
    return `Que pena. Parece que houve um erro. Tenta continuar mais tarde, tá bom?!`;
  }
}