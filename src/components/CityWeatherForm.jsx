import React, { useState } from "react";
import axios from "axios";
import { API_URL, CITY_NAMES, POWER_NUMBERS } from "./constants";
import Select from 'react-select';



class transformatorForm extends React.Component {

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


  createData = (event) => {
    console.log('POST Request to: ' + API_URL)
    // получаем Id населённого пункта из словаря и меняем состояние через встроенный метод класса React.Component setState
    event.preventDefault();   // необходимо, чтобы отключить стандартное поведение формы в браузере (AJAX)
    // формируем данные для отправки на сервер
    let data = {
      number: parseInt(this.state.number), 
      hydrogen: parseInt(this.state.hydrogen), 
      oxygen: parseInt(this.state.oxygen),
      nitrogen: parseInt(this.state.nitrogen),
      methane: parseInt(this.state.methane),
      co: parseInt(this.state.co),
      co_2: parseInt(this.state.co_2),
      ethylene: parseInt(this.state.ethylene),
      ethane: parseInt(this.state.ethane),
      acethylene: parseInt(this.state.acethylene),
      dbds: parseInt(this.state.dbds),
      power_factor: parseFloat(this.state.power_factor),
      interfacial_v: parseInt(this.state.interfacial_v),
      dielectric_rigidity: parseInt(this.state.dielectric_rigidity),
      water_content: parseInt(this.state.water_content),
      city_id: parseInt(this.state.city_id),
      type: parseInt(this.state.type),
      health_index: parseFloat(this.state.health_index),
    };

    // HTTP-клиент axios автоматически преобразует объект data в json-строку
    axios.post(API_URL, data, {
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

  async getCities(){
    const data = await axios.get("http://127.0.0.1:8000/cities")
    const tmp = data.data
    const options = tmp.map(d => ({
      "value" : d.id,
      "label" : d.name
    }))
    this.setState({cities: options})
  }

  async getTypes(){
    const data = await axios.get("http://127.0.0.1:8000/types")
    const tmp = data.data
    const options = tmp.map(d => ({
      "value" : d.id,
      "label" : d.name
    }))
    this.setState({types: options})
  }




  componentDidMount(){
    this.getCities()
    this.getTypes()
  }

handleChange(e){
  this.setState({id: e.value, name: e.label})
 }

  render() {
    console.log(this.state.cities)
    return (
      <form className="uk-form-stacked">
         <div className="uk-margin uk-card uk-card-default uk-card-body uk-text-center">
         <Select placeholder='Select city' options={this.state.cities} onChange={this.handleChange.bind(this)} />
         <br></br>
         <Select placeholder='Select transformator type' options={this.state.types} onChange={this.handleChange.bind(this)} />
        </div>
        <div className="uk-margin-strict">
        <div className="uk-margin">
          <label className="uk-form-label">Number:</label>
          <input className="uk-input" type="text" onChange={(e) => {this.setState({number: e.target.value})}} />
        </div>
        <div className="uk-margin">
          <label className="uk-form-label">Hydrogen:</label>
          <input className="uk-input" type="text" onChange={(e) => {this.setState({hydrogen: e.target.value})}} />
        </div>
        <div className="uk-margin">
          <label className="uk-form-label">Oxygen:</label>
          <input className="uk-input" type="text" onChange={(e) => {this.setState({oxygen: e.target.value})}} />
        </div>
        <div className="uk-margin">
          <label className="uk-form-label">Nitrogen:</label>
          <input className="uk-input" type="text" onChange={(e) => {this.setState({nitrogen: e.target.value})}} />
        </div>
        <div className="uk-margin">
          <label className="uk-form-label">Methane:</label>
          <input className="uk-input" type="text" onChange={(e) => {this.setState({methane: e.target.value})}} />
        </div>
        <div className="uk-margin">
          <label className="uk-form-label">CO:</label>
          <input className="uk-input" type="text" onChange={(e) => {this.setState({co: e.target.value})}} />
        </div>
        <div className="uk-margin">
          <label className="uk-form-label">CO2:</label>
          <input className="uk-input" type="text" onChange={(e) => {this.setState({co2: e.target.value})}} />
        </div>
        </div>
        <div className="uk-margin-strict">
        <div className="uk-margin">
          <label className="uk-form-label">Ethylene:</label>
          <input className="uk-input" type="text" onChange={(e) => {this.setState({ethylene: e.target.value})}} />
        </div>
        <div className="uk-margin">
          <label className="uk-form-label">Ethane:</label>
          <input className="uk-input" type="text" onChange={(e) => {this.setState({ethane: e.target.value})}} />
        </div>
        <div className="uk-margin">
          <label className="uk-form-label">Acethylene:</label>
          <input className="uk-input" type="text" onChange={(e) => {this.setState({acethylene: e.target.value})}} />
        </div>
        <div className="uk-margin">
          <label className="uk-form-label">DBDS:</label>
          <input className="uk-input" type="text" onChange={(e) => {this.setState({dbds: e.target.value})}} />
        </div>
        <div className="uk-margin">
          <label className="uk-form-label">Interfacial_V:</label>
          <input className="uk-input" type="text" onChange={(e) => {this.setState({interfacial_v: e.target.value})}} />
        </div>
        <div className="uk-margin">
          <label className="uk-form-label">Dielectric_rigidity:</label>
          <input className="uk-input" type="text" onChange={(e) => {this.setState({dielectric_rigidity: e.target.value})}} />
        </div>
        <div className="uk-margin">
          <label className="uk-form-label">Water_content</label>
          <input className="uk-input" type="text" onChange={(e) => {this.setState({water_content: e.target.value})}} />
        </div>
        </div>
        <input onClick={this.createData} type="submit" value="Create data" className="uk-button uk-button-primary"/>

      </form>
    );
  }

}
export default transformatorForm;