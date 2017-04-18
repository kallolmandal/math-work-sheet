"use strict";
var BaseController = (function () {
    function BaseController(req) {
        this._sessionStateId = null;
        this._req = req;
    }
    Object.defineProperty(BaseController.prototype, "request", {
        get: function () {
            return this._req;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseController.prototype, "sessionStateId", {
        /**
         * The session state identifier.
         * @return {string} identifier for the session state
         */
        get: function () {
            if (this._sessionStateId === null) {
                throw new Error('need to implement');
            }
            return this._sessionStateId;
        },
        set: function (value) {
            this._sessionStateId = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Get the current session, identified by {sessionStateId}, or create a new instance.
     * @return {any} session instance
     */
    BaseController.prototype.getOrCreateSession = function () {
        return this.getSession(true);
    };
    /**
     * Get the session identified by {sessionStateId}.
     * @param  {Boolean} canCreate Can a session be created, if none exists.
     * @return {any}               session instance
     */
    BaseController.prototype.getSession = function (canCreate) {
        // console.log('getSession id:', req.session.id, 'stateId:', this.sessionStateId);
        var session = this.request.session[this.sessionStateId];
        if (!session && canCreate) {
            session = this.createSession();
            this._sessionState = session;
            // console.log('getSession created:', JSON.stringify(session));
            this.saveSession();
        }
        return this._sessionState;
    };
    /**
     * Return a new session instance.
     * @return {any} session instance
     */
    BaseController.prototype.createSession = function () {
        return {};
    };
    /**
     * Save the current session state.
     * @return {void}
     */
    BaseController.prototype.saveSession = function () {
        if (this._sessionState === null) {
            throw new Error('Cannot save null session state.');
        }
        // console.log('saveSession id:', req.session.id, 'stateId:', this.sessionStateId);
        this.request.session[this.sessionStateId] = this._sessionState;
        // console.log('saveSession value:', JSON.stringify(req.session[this.sessionStateId]));
        // console.log('saveSession type:', typeof(req.session[this.sessionStateId]));
        this.request.session.save(function () { });
    };
    return BaseController;
}());
exports.BaseController = BaseController;
//# sourceMappingURL=base.controller.js.map