import {Router} from '@angular/router';

export class BaseService {
  constructor(protected _router: Router) {
  }

  handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    this._router.navigateByUrl('gps/dashboard/error');
    return Promise.reject(error.message || error);
  }

}
