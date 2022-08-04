import {Response , Request} from "express"

class IndexController{

    static async index(req:Request , res:Response) {

        return res.render("index.hbs")

    }

}

export default IndexController