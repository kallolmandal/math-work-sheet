"use strict";
var BaseService = (function () {
    function BaseService(_router) {
        this._router = _router;
    }
    BaseService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        this._router.navigateByUrl('gps/dashboard/error');
        return Promise.reject(error.message || error);
    };
    return BaseService;
}());
exports.BaseService = BaseService;
