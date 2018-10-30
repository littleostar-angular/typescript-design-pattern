// ---------------------------------------------------------------------------------------------------------------------
var WeatherStation = /** @class */ (function () {
    function WeatherStation() {
        this.observers = [];
    }
    WeatherStation.prototype.setTemperature = function (temp) {
        console.log('WeatherStation: new temperature measurement: ' + temp);
        this.temperature = temp;
        this.notifyObserver();
    };
    WeatherStation.prototype.registerObserver = function (o) {
        this.observers.push(o);
    };
    WeatherStation.prototype.removeObserver = function (o) {
        var index = this.observers.indexOf(o);
        this.observers.splice(index, 1);
    };
    WeatherStation.prototype.notifyObserver = function () {
        for (var _i = 0, _a = this.observers; _i < _a.length; _i++) {
            var observer = _a[_i];
            observer.update(this.temperature);
        }
    };
    return WeatherStation;
}());
// ---------------------------------------------------------------------------------------------------------------------
var TemperatureDisplay = /** @class */ (function () {
    function TemperatureDisplay(weatherStation) {
        weatherStation.registerObserver(this);
        this.subject = weatherStation;
    }
    TemperatureDisplay.prototype.update = function (temperature) {
        console.log('TemperatureDisplay: display number ' + temperature);
    };
    return TemperatureDisplay;
}());
var Fan = /** @class */ (function () {
    function Fan(weatherStation) {
        weatherStation.registerObserver(this);
        this.subject = weatherStation;
    }
    Fan.prototype.update = function (temperature) {
        if (temperature > 25) {
            console.log('Fan: hot number ' + temperature);
        }
        else {
            console.log('Fan: cool number ' + temperature);
        }
    };
    return Fan;
}());
// ---------------------------------------------------------------------------------------------------------------------
// 测试
var weatherStation = new WeatherStation();
var tempDisplay = new TemperatureDisplay(weatherStation);
var fan = new Fan(weatherStation);
weatherStation.setTemperature(20);
weatherStation.setTemperature(30);
//# sourceMappingURL=observer.js.map