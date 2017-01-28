"use strict";
var tesseract = require('tesseract.js');
var DashboardComponent = (function () {
    function DashboardComponent() {
    }
    DashboardComponent.prototype.test = function () {
        tesseract.detect(new ssImage());
    };
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
