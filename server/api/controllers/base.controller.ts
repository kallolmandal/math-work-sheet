import * as express from 'express';
import * as expressSession from 'express-session';

export class BaseController {

  private _sessionState: Object;
  private _sessionStateId: string = null;
  private _req: express.Request;

  constructor(req: express.Request) {
    this._req = req;
  }

  get request(): express.Request {
    return this._req;
  }

  /**
   * The session state identifier.
   * @return {string} identifier for the session state
   */
  get sessionStateId(): string {
    if (this._sessionStateId === null) {
      throw new Error('need to implement');
    }
    return this._sessionStateId;
  }

  set sessionStateId(value: string) {
    this._sessionStateId = value;
  }

  /**
   * Get the current session, identified by {sessionStateId}, or create a new instance.
   * @return {any} session instance
   */
  public getOrCreateSession(): any {
    return this.getSession(true);
  }

  /**
   * Get the session identified by {sessionStateId}.
   * @param  {Boolean} canCreate Can a session be created, if none exists.
   * @return {any}               session instance
   */
  public getSession(canCreate: Boolean): any {
    // console.log('getSession id:', req.session.id, 'stateId:', this.sessionStateId);
    let session = this.request.session[this.sessionStateId];
    if (!session && canCreate) {
      session = this.createSession();
      this._sessionState = session;
      // console.log('getSession created:', JSON.stringify(session));
      this.saveSession();
    }
    return this._sessionState;
  }

  /**
   * Return a new session instance.
   * @return {any} session instance
   */
  public createSession(): any {
    return {};
  }

  /**
   * Save the current session state.
   * @return {void}
   */
  public saveSession(): void {
    if (this._sessionState === null) {
      throw new Error('Cannot save null session state.');
    }
    // console.log('saveSession id:', req.session.id, 'stateId:', this.sessionStateId);
    this.request.session[this.sessionStateId] = this._sessionState;
    // console.log('saveSession value:', JSON.stringify(req.session[this.sessionStateId]));
    // console.log('saveSession type:', typeof(req.session[this.sessionStateId]));
    this.request.session.save(() => { });
  }
}
