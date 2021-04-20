import 'dotenv/config';
import express from 'express';
import axios from 'axios';
import {startBot} from './src/venom';
import cors from 'cors';
import { getFromCache } from './src/database/cache';


const app = express();
const routes = express.Router();

routes.get("/", (request, response) => {
  const outUrl = `${request.protocol}://${request.get('host')}/v1/refresh`;
  axios.get(outUrl).then((res) => {console.log(res)});
  return response.send("<h1>Bem vindo à deep web</h1>")
})

routes.get("/refresh", (request, response) => {
  return response.send("<h1>Refresh!</h1>")
})

routes.get("/qrcode", async (request, response) => {
  const status = await getFromCache('statusSession');
  console.log(status)
  const outUrl = `${request.protocol}://${request.get('host')}/files/out.png`;

  const data = {
    message: '',
    outUrl
  }

  if(status != 'isLogged' || status == null){
    startBot();
    data.message = "Se o link do código não veio, tente novamente daqui a alguns segundos";
    return response.json(data);
  }else if(status == 'isLogged'){
    data.message = "Já tem alguém logado nessa sessão.";
    data.outUrl = "";
    return response.json(data);
  }
  data.message = "Está tudo certo com sua sessão. Segue o link do Qrcode";
  return response.json(data);
})

app.use(cors())
app.use('/files', express.static(__dirname + '/public'));
app.use(express.json())
app.use('/v1', routes)

const port = process.env.PORT || 3333;

app.listen(port, async () => {
  const status = await getFromCache('statusSession');
  console.log("statusSession", status)
  if(status == 'isLogged'){
    startBot();
    console.log("iniciando bot")
  }
});