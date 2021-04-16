import connection from '../database';
import {getFromCache, saveInCache} from '../database/cache';
export default async (client, message) => {
  try {
    // const cpf = await getFromCache(`${message.from}_cpf`);
    // await connection('students').where({cpf: cpf}).update({email: message.body});

    const subjects = await connection('subjects')
      .select("subjects.name as name", "subjects.workload", "teachers.name as teacher", "subject_course.period")
      .join('subject_course', 'subjects.id', '=', 'subject_course.subject_id')
      .join('teachers', 'subject_course.teacher_id', '=', 'teachers.id')
      .join('classes', 'subject_course.class_id', '=', 'classes.id')
      .where('classes.year', message.from);
    
    let text = "";
    let i = 0;
    subjects.forEach(subject => {
      i++;
      text += `\n${i} - *${subject.name}* - Professor ${teacher} - ${workload}hrs`
    });

    await saveInCache(message.from, "set_confirm_student");
    await saveInCache(`${message.from}_class`, message.body);
    return `Então, essas serão suas disciplinas para esse semestre: ${text}`;
  } catch (error) {
    console.log("erro :( ", error);
    return `Que pena. Parece que houve um erro. Tenta continuar mais tarde, tá bom?!`;
  }
}