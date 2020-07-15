import * as websocket from 'websocket';
import * as http from 'http';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import Router from './Router';

class App{
    private _app: any;
    private _router: any;
    constructor() {
        this._app = http.createServer();
        this._router = new Router(this._app);
    }

    public get app(){
        return this._app;
    }
}

export default new App().app;


