import React, { useState } from "react";
import axios from "axios";
import { API_URL, CITY_NAMES, POWER_NUMBERS } from "./constants";
import Select from 'react-select';



class UpdateForm extends React.Component {

  constructor(props) {
    super(props);
    // устанавливаем состояние компонента по умолчанию
    this.state = {number: 100, hydrogen: 100, oxygen: 100, nitrogen: 100, methane: 100, co: 100, co_2: 100, ethylene: 100, ethane: 100, acethylene: 100, dbds: 100,
    power_factor: 100, interfacial_v: 100, dielectric_rigidity: 100, water_content: 100, health_index: 100, city_id: 1, type: 1, cities: [], types: []};
    }

  /**
   * Обновление данных на сервере (отправка HTTP PUT запроса).
   * 
   * Данная функция вызывается при Submit формы.
   * 
   * Конструкция updateData = (event) => {...} реализует публичную функцию, которую сразу можно
   * привязывать к событиям типа onChange, onSubmit и т.д.
   * 
   * Подробнее об обработчиках событий в компонентах React см.: https://reactjs.org/docs/handling-events.html
   * 
   * @param {*} event 
   */
  updateData = (event) => {
    console.log('PUT Request to: ' + API_URL)
    // получаем Id населённого пункта из словаря и меняем состояние через встроенный метод класса React.Component setState
    event.preventDefault();   // необходимо, чтобы отключить стандартное поведение формы в браузере (AJAX)
    // формируем данные для отправки на сервер
    let data = {
      number: parseInt(this.state.number), 
      hydrogen: parseInt(this.state.hydrogen), 
    };
    // HTTP-клиент axios автоматически преобразует объект data в json-строку
    axios.put(API_URL, data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
    })
    .then(response => {
      console.log('Response: ' + response.status);
    }, error => {
        console.log(error);
        alert(error);
    });
  }


  

  render() {
    return (
      <form className="uk-form-stacked">
        <div className="uk-margin-strict">
        <div className="uk-margin">
          <label className="uk-form-label">Number:</label>
          <input className="uk-input" type="text" onChange={(e) => {this.setState({number: e.target.value})}} />
        </div>
        <div className="uk-margin">
          <label className="uk-form-label">Nitrogen:</label>
          <input className="uk-input" type="text" onChange={(e) => {this.setState({nitrogen: e.target.value})}} />
        </div>
        </div>
        <input onClick={this.updateData} type="submit" value="Update data" className="uk-button uk-button-primary"/>
      </form>
    );
  }

}
export default UpdateForm;