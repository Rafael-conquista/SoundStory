import express from 'express'
import './src/database/db.js'
import user from './src/routes/user.js'

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
            this.app.use('/user', user);
    }
}

export default new App().app;