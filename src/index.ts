import 'dotenv/config'
import App from "./App";

const app = new App()

const PORT = process.env.PORT || 8080

app.server.listen(PORT , ()=> {

    console.log(`Servidor do IFFG rodando na porta ${PORT}, em modo: ${process.env.NODE_ENV}`);

})