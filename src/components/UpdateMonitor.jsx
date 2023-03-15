import React from "react";
import axios from "axios";
import { API_URL, GET_DATA_INTERVAL } from "./constants";

/**
 * Данный компонент отображает и обновляет таблицу с 
 * данными по установленному населённому пункту 
 */

class UpdateMonitor extends React.Component {
    /**
     * Конструктор компонента необходима инициализировать, если в компонент передаются
     * дополнительные параметры или компонент имеет внутренние переменные хранения
     * 
     * @param {*} props - данный аргумент передает атрибуты компонента
     * 
     * this.state - атрибут класса React.Component для хранения внутренних переменных (состояний) компонента
     */
    constructor(props) {
        super(props);
        // устанавливаем состояние компонента по умолчанию
        this.state = {weatherData: {}};
    }

    /**
     * Метод getData отправляет HTTP GET запрос к серверу для получения необходимых данных.
     * 
     * В качестве HTTP-клиента для запросов вместо стандартного fetch импользуется axios.
     * Основные преимущества axios:
     * 
     * - возможность выполнения сразу нескольких HTTP-запросов;
     * - автоматическая конвертация json-данных в объект JS;
     * - поддержка сессий;
     * 
     * Для использования потребуется установка:
     * 
     * npm install axios --save
     * 
     * Подробне об особенностях axios см.: https://blog.logrocket.com/axios-vs-fetch-best-http-requests/
     */
    getData() {
        console.log('GET Request to: ' + API_URL + '?trans_number=' + this.props.number)
        // отправляем запрос на сервер, если данные получены (сервер отвечает в виде массива json-строк), 
        // обновляем массив this.state.weatherData. В случае ошибки очищаем массив. 
        axios.get(API_URL  + '?trans_number=' + this.props.number)
        .then(response => {
            this.setState(state => ({
                weatherData: response.data,
            }));
        }, error => {
            this.setState(state => ({
                weatherData: [],
            }));
            console.log(error);
        });
    }
    renderData() {
        // если массив this.state.weatherData содержит данные, рендерим строки таблицы
        if (this.state.weatherData.number > 0) {
                return(
                    <tr>
                        <td>{this.state.weatherData.number}</td>
                        <td>{this.state.weatherData.city_id}</td>
                        <td>{this.state.weatherData.types}</td>
                        <td>{this.state.weatherData.hydrogen}</td>
                        <td>{this.state.weatherData.health_index}</td>
                    </tr>
                );
        }
        // иначе выводим информацию об отсутствии данных
        else {
            return(
                <div className="uk-alert-danger">
                    <a className="uk-alert-close"></a>
                    <p>Waiting for data</p>
                </div>
            )
        }
    }
    
    componentDidMount() {
        this.interval = setInterval(() => this.getData(), GET_DATA_INTERVAL);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return(
            <table className="uk-table uk-table-striped">
                <thead>
                    <tr>
                        <th className='uk-text-center'>Number</th>
                        <th className='uk-text-center'>City</th>
                        <th className='uk-text-center'>Type</th>
                        <th className='uk-text-center'>Hydrogen</th>
                        <th className='uk-text-center'>Health index</th>
                    </tr>
                </thead>
                <tbody>
                    { this.renderData() }
                </tbody>
            </table>
        );
    }
}

export default UpdateMonitor;