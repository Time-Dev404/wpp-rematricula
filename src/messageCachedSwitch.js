import {saveInCache} from './database/cache';
import {
  msg_save_student_cpf,
  msg_save_student_name,
  msg_save_student_address,
  msg_save_student_city,
  msg_save_student_email,
  msg_get_classes_by_course,
  msg_get_subjects_by_class,
  msg_save_student_registration
} from './messages';

export default async (client, message, cachedMessage) => {

  let mesg;

  switch(cachedMessage){

    case "set_cpf_student":
      mesg = await msg_save_student_cpf(client, message);
      return mesg;

    case "set_name_student":
        mesg = await msg_save_student_name(client, message);
        return mesg;

    case "set_registration_student":
      mesg = await msg_save_student_registration(client, message);
      return mesg;

    case "set_address_student":
      mesg = await msg_save_student_address(client, message);
      return mesg;

    case "set_city_student":
      mesg = await msg_save_student_city(client, message);
      return mesg;

    case "set_email_student":
      mesg = await msg_save_student_email(client, message);
      return mesg;

    case "set_course_student":
      mesg = await msg_get_classes_by_course(client, message);
      return mesg;

    case "set_class_student":
      mesg = await msg_get_subjects_by_class(client, message);
      return mesg;

    case "rematricula":
      saveInCache(message.from, 'set_cpf_student')
      return "Que ótimo! Para iniciarmos com o pé direito, vou pedir que me informe seu CPF"
    
    default:
      return "Olá, seja bem vindo! Sou o assistente virtual do IFMA - Santa inês. Hoje, vou ajudar você a fazer sua rematrícula (caso já seja um de nossos alunos) ou sua matrícula (caso esteja ingressando agora). Para dar início à nossa jornada, digite *rematricula*"
  }
}
