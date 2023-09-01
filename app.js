import express from 'express'
import './src/database/db.js'
import home from './src/routes/home.js'

class App{
    constructor() {
        this.app = express();
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
        }

    routes() {
            this.app.use('/', home);
            //this.app.use('/users');
    }
}

export default new App().app;