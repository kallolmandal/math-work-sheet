"use strict";
var express = require("express");
var cookieParser = require("cookie-parser");
var path = require("path");
var bodyParser = require("body-parser");
var serveIndex = require("serve-index");
var work_sheet_api_router_1 = require("./api/routers/work-sheet-api.router");
var work_sheet_result_service_1 = require("./services/work-sheet-result-service");
var ServerApp = (function () {
    function ServerApp() {
        this._app = express();
        this._app.set('port', (process.env.PORT || 5000));
    }
    ServerApp.prototype.setupAuthentication = function () {
        // TODO
    };
    ServerApp.prototype.setupSession = function () {
        this._app.use(cookieParser());
        this._app.use(bodyParser.json({ limit: '50mb' }));
        this._app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
    };
    ServerApp.prototype.setupStaticRoutes = function () {
        var rootPath = path.resolve(path.join(__dirname, '..'));
        this._app.use('/bootstrap', express.static(rootPath + '/node_modules/bootstrap/dist/'));
        this._app.use('/font-awesome', express.static(rootPath + '/node_modules/font-awesome/'));
        this._app.use('/images', express.static(rootPath + '/assets/images/'));
        this._app.use('/result-report', express.static(rootPath + '/server/result/'));
        this._app.use('/result-report', serveIndex(rootPath + '/server/result/'));
        this._app.use(express.static(path.join(rootPath, 'public')));
        this._app.get('/worksheet*', function (req, res) {
            res.sendFile(path.join(rootPath, 'public', 'index.html'));
        });
    };
    ServerApp.prototype.setupApiRoutes = function () {
        this._app.use('/api/worksheet', work_sheet_api_router_1.WorksheetApiRouter);
    };
    ServerApp.prototype.setupAppRoutes = function () {
        // Register your app's routes here.
    };
    /**
     * Set the routes for the application.
     * @return {void}
     */
    ServerApp.prototype.setupRoutes = function () {
        this.setupApiRoutes();
        this.setupStaticRoutes();
        this.setupAppRoutes();
    };
    ServerApp.prototype.setupService = function () {
        work_sheet_result_service_1.WorksheetResultService.init();
    };
    /**
     * Setup the server
     * @return {void}
     */
    ServerApp.prototype.setupServer = function () {
        this.setupAuthentication();
        this.setupSession();
        this.setupRoutes();
        this.setupService();
    };
    /**
     * Start the application server.
     * @return {void}
     */
    ServerApp.prototype.startServer = function () {
        var self = this;
        console.log('port number is ' + this._app.get('port'));
        this._app.listen(this._app.get('port'), function () {
            console.log('%s application is now listening on port: %d', 'Workshet appl', self._app.get('port'));
        });
    };
    return ServerApp;
}());
exports.ServerApp = ServerApp;
//# sourceMappingURL=server.app.js.map