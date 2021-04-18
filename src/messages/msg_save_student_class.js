import connection from '../database';
import * as Yup from 'yup';
import {getFromCache, saveInCache} from '../database/cache';
export default async (client, message) => {

  message.body = message.body.trim();

  let schema = Yup.object().shape({
    body: Yup.number().required().trim().min(3)
  });

  const isValid = await schema.isValid(message);

  if(!isValid){
    await saveInCache(message.from, "set_class_student");
    return "Que pena, esse email não é válido. Tenta me enviar de novo."
  }

  try {
    const cpf = await getFromCache(`${message.from}_cpf`);
    const student = await connection('students').select("id").where({cpf: cpf});

    const classes = await connection('classes').select("id").where({year: message.body});

    if(!classes) {
      return `Oops! Parece que essa turma não existe. Me diga novamente, qual o ano da sua turma.`;
    }

    await connection('student_class').insert({
      class_id: classes.indexOf,
      student_id: student.id
    });
    
    await saveInCache(message.from, "set_class_student");
    return `Que massa, você finalizou sua rematrícula!`;
  } catch (error) {
    console.log("erro :( ", error);
    return `Que pena. Parece que houve um erro. Tenta continuar mais tarde, tá bom?!`;
  }
}