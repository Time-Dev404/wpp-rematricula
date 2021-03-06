import {saveInCache} from './database/cache';
import {
  msg_save_student_cpf,
  msg_save_student_name,
  msg_save_student_registration,
  msg_save_student_address,
  msg_save_student_city,
  msg_save_student_email,
  msg_get_classes_by_course,
  msg_get_subjects_by_class,
  msg_save_responsible_name,
  msg_save_responsible_cpf,
  msg_save_responsible_rg,
  msg_save_responsible_phone,
  msg_save_student_subjects
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

    case "set_name_responsible":
      mesg = await msg_save_responsible_name(client, message);
      return mesg;

    case "set_cpf_responsible":
      mesg = await msg_save_responsible_cpf(client, message);
      return mesg;

    case "set_rg_responsible":
      mesg = await msg_save_responsible_rg(client, message);
      return mesg;

    case "set_phone_responsible":
      mesg = await msg_save_responsible_phone(client, message);
      return mesg;

    case "set_course_student":
      mesg = await msg_get_classes_by_course(client, message);
      return mesg;
  
    case "set_class_student":
      mesg = await msg_get_subjects_by_class(client, message);
      return mesg;

    case "set_confirm_student":
      mesg = await msg_save_student_subjects(client, message);
      return mesg;


    case "rematricula":
      saveInCache(message.from, 'set_cpf_student')
      return "Que ??timo! Para iniciarmos com o p?? direito, vou pedir que me informe seu CPF"
    
    default:
      return "Ol??, seja bem vindo! Sou o assistente virtual do IFMA - Santa in??s. Hoje, vou ajudar voc?? a fazer sua rematr??cula (caso j?? seja um de nossos alunos) ou sua matr??cula (caso esteja ingressando agora). Para dar in??cio ?? nossa jornada, digite *rematricula*"
  }
}
