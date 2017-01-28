import * as express from 'express';
import * as expressSession from 'express-session';
import * as cookieParser from 'cookie-parser';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as serveIndex from 'serve-index';

import { WorksheetApiRouter } from './api/routers/work-sheet-api.router';

export class ServerApp {

  private _app: express.Express;

  constructor() {
    this._app = express();
  }

  private setupAuthentication() {
    // TODO
  }

  private setupSession() {
    this._app.use(cookieParser());
    this._app.use(bodyParser.json({ limit: '50mb' }));
    this._app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  }

  private setupStaticRoutes() {
    let rootPath = path.resolve(path.join(__dirname, '..'));
    this._app.use('/bootstrap', express.static(rootPath + '/node_modules/bootstrap/dist/'));
    this._app.use('/font-awesome', express.static(rootPath + '/node_modules/font-awesome/'));
    this._app.use('/result-report', express.static(rootPath + '/server/result/'));
    this._app.use('/result-report', serveIndex(rootPath + '/server/result/'));

    this._app.use(express.static(path.join(rootPath, 'public')));
    this._app.get('/worksheet*', function (req, res) {
      res.sendFile(path.join(rootPath, 'public', 'index.html'));
    });
  }

  private setupApiRoutes() {
    this._app.use('/api/worksheet', WorksheetApiRouter);
  }

  private setupAppRoutes() {
    // Register your app's routes here.
  }

  /**
   * Set the routes for the application.
   * @return {void}
   */
  private setupRoutes() {
    this.setupApiRoutes();
    this.setupStaticRoutes();
    this.setupAppRoutes();
  }

  /**
   * Setup the server
   * @return {void}
   */
  public setupServer() {
    this.setupAuthentication();
    this.setupSession();
    this.setupRoutes();
  }

  /**
   * Start the application server.
   * @return {void}
   */
  public startServer() {
    let self = this;

    this._app.listen(3001, function () {
      console.log(
        '%s application is now listening on port: %d',
        'Workshet appl',
        3001
      );
    });
  }
}
