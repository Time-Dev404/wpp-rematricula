import 'dotenv/config';
import express from 'express';
import {startBot} from './src/venom';
import cors from 'cors';
import { getFromCache } from './src/database/cache';


const app = express();
const routes = express.Router();

routes.get("/qrcode", async (request, response) => {
  const status = await getFromCache('statusSession');
  console.log(status)
  const outUrl = `${request.protocol}://${request.get('host')}/files/out.png`;

  const data = {
    message: '',
    outUrl
  }

  if(status == 'notLogged' || status == null){
    startBot();
    data.message = "Se o link do código não veio, tente novamente daqui a alguns segundos";
    return response.json(data);
  }else if(status == 'isLogged'){
    data.message = "Já tem alguém logado nessa sessão.";
    data.outUrl = "";
    return response.json(data);
  }
  data.message = "Verifique sua conexão com a internet.";
  return response.json(data);
})

app.use(cors())
app.use('/files', express.static(__dirname + '/public'));
app.use(express.json())
app.use('/v1', routes)

const port = process.env.PORT || 3333;
app.listen(port, console.log("server running in ", port));