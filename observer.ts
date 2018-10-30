interface Subject { // 主题接口, 即有值的类
    registerObserver(o: Observer); // 增加观察者
    removeObserver(o: Observer); // 移除观察者
    notifyObserver(); // 通知当前的观察者
}

interface Observer { // 观察者接口, 即需要值得类
    update(temperature: number); // 被通知时, 执行的方法
}

// ---------------------------------------------------------------------------------------------------------------------


class WeatherStation implements Subject{ // 天气站类, 实现主题接口
    private temperature: number;
    private observers: Observer[] = [];

    setTemperature(temp: number){
        console.log('WeatherStation: new temperature measurement: ' + temp);
        this.temperature = temp;
        this.notifyObserver();
    }

    registerObserver(o: Observer) {
        this.observers.push(o);
    }

    removeObserver(o: Observer) {
        let index = this.observers.indexOf(o);
        this.observers.splice(index, 1);
    }

    notifyObserver() {
        for (let observer of this.observers){
            observer.update(this.temperature);
        }
    }

}

// ---------------------------------------------------------------------------------------------------------------------


class TemperatureDisplay implements Observer{ // 温度显示类, 实现观察者接口
    private subject: Subject;

    constructor(weatherStation: Subject){
        weatherStation.registerObserver(this);
        this.subject = weatherStation;
    }

    update(temperature: number) {
        console.log('TemperatureDisplay: display number ' + temperature);
    }
}

class Fan implements Observer{ // 某地名类, 实现观察者接口
    private subject: Subject;

    constructor(weatherStation: Subject){
        weatherStation.registerObserver(this);
        this.subject = weatherStation;
    }

    update(temperature: number) {
        if (temperature > 25){
            console.log('Fan: hot number ' + temperature);
        } else {
            console.log('Fan: cool number ' + temperature);
        }
    }
}

// ---------------------------------------------------------------------------------------------------------------------

// 测试
let weatherStation: WeatherStation = new WeatherStation();

let tempDisplay: TemperatureDisplay = new TemperatureDisplay(weatherStation);
let fan: Fan = new Fan(weatherStation);

weatherStation.setTemperature(20);
weatherStation.setTemperature(30);


