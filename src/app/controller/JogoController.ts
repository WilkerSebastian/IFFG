import {Response , Request} from "express"
import path from "path"

class JogoController{

    static async jogo(req:Request , res:Response) {

        return res.sendFile(path.resolve("src" , "app" , "views" , "jogo.html"))

    }

}

export default JogoController