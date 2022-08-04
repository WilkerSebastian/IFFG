import express, { json, urlencoded } from "express";
import router from "./router";
import { engine } from "express-handlebars";

export default class App {

    server:express.Application

    constructor() {

        this.server = express()
        this.middleware()
        this.router()

    }

    middleware() {

        this.server.set("views" , __dirname + "/app/views")
        this.server.engine(".hbs" , engine({

            defaultLayout: 'main', 

            extname: '.hbs'

        }))

        this.server.use('/xcss' , express.static('./node_modules/xterm/css'))
        this.server.use('/xjs' , express.static('./node_modules/xterm/lib'))
        this.server.use('/bsicon' , express.static('./node_modules/bootstrap-icons/font'))
        this.server.use('/bscss', express.static('./node_modules/bootstrap/dist/css'));
        this.server.use('/bsjs', express.static('./node_modules/bootstrap/dist/js'));
        this.server.use('/popperjs', express.static('./node_modules/@popperjs/core/dist/umd'));
        this.server.use('/public', express.static(__dirname + "/app/public"));

        this.server.use(urlencoded({ extended: true }));
        this.server.use(json());

    }

    router() {

        this.server.use(router)

    }

}