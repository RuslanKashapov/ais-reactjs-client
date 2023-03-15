import React, { useState } from "react";
import axios from "axios";
import { API_URL, CITY_NAMES, POWER_NUMBERS } from "./constants";
import Select from 'react-select';
import Info from "./Info.jsx";



class transformatorForm extends React.Component {

  constructor(props) {
    super(props);
    // устанавливаем состояние компонента по умолчанию
    this.state = {number: 100, hydrogen: 100, oxygen: 100, nitrogen: 100, methane: 100, co: 100, co_2: 100, ethylene: 100, ethane: 100, acethylene: 100, dbds: 100,
    power_factor: 100, interfacial_v: 100, dielectric_rigidity: 100, water_content: 100, health_index: 0, city_id: 1, types: 1, cities: [], types_: []};
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
      types: parseInt(this.state.types),
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
    this.setState({types_: options})
  }

  componentDidMount(){
    this.getCities()
    this.getTypes()
  }

handleChange_city(e){
  this.setState({city_id: e.value})
 }

 handleChange_type(e){
  this.setState({types: e.value})
 }

  render() {
    console.log(this.state.cities)
    return (
      <div>
      <form className="uk-form-stacked">
        <div className="uk-margin-strict">
        <div className="uk-margin">
          <label className="uk-form-label">Number:</label>
          <input className="uk-input"  type="number" min='0' onChange={(e) => {this.setState({number: e.target.value})}} onKeyPress={(event) => {if (!/[0-9]/.test(event.key)) {event.preventDefault();}}}/>
        </div>
        <div className="uk-margin">
          <label className="uk-form-label">Hydrogen:</label>
          <input className="uk-input"  type="number" min='0' onChange={(e) => {this.setState({hydrogen: e.target.value})}} onKeyPress={(event) => {if (!/[0-9]/.test(event.key)) {event.preventDefault();}}}/>
        </div>
        <div className="uk-margin">
          <label className="uk-form-label">Oxygen:</label>
          <input className="uk-input"  type="number" min='0' onChange={(e) => {this.setState({oxygen: e.target.value})}} onKeyPress={(event) => {if (!/[0-9]/.test(event.key)) {event.preventDefault();}}}/>
        </div>
        <div className="uk-margin">
          <label className="uk-form-label">Nitrogen:</label>
          <input className="uk-input"  type="number" min='0' onChange={(e) => {this.setState({nitrogen: e.target.value})}} onKeyPress={(event) => {if (!/[0-9]/.test(event.key)) {event.preventDefault();}}}/>
        </div>
        <div className="uk-margin">
          <label className="uk-form-label">Methane:</label>
          <input className="uk-input"  type="number" min='0' onChange={(e) => {this.setState({methane: e.target.value})}} onKeyPress={(event) => {if (!/[0-9]/.test(event.key)) {event.preventDefault();}}}/>
        </div>
        </div>
        <div className="uk-margin-strict">
        <div className="uk-margin">
          <label className="uk-form-label">CO:</label>
          <input className="uk-input"  type="number" min='0' onChange={(e) => {this.setState({co: e.target.value})}} onKeyPress={(event) => {if (!/[0-9]/.test(event.key)) {event.preventDefault();}}}/>
        </div>
        <div className="uk-margin">
          <label className="uk-form-label">CO2:</label>
          <input className="uk-input"  type="number" min='0' onChange={(e) => {this.setState({co_2: e.target.value})}} onKeyPress={(event) => {if (!/[0-9]/.test(event.key)) {event.preventDefault();}}}/>
        </div>
        <div className="uk-margin">
          <label className="uk-form-label">Ethylene:</label>
          <input className="uk-input"  type="number" min='0' onChange={(e) => {this.setState({ethylene: e.target.value})}} onKeyPress={(event) => {if (!/[0-9]/.test(event.key)) {event.preventDefault();}}}/>
        </div>
        <div className="uk-margin">
          <label className="uk-form-label">Ethane:</label>
          <input className="uk-input"  type="number" min='0' onChange={(e) => {this.setState({ethane: e.target.value})}} onKeyPress={(event) => {if (!/[0-9]/.test(event.key)) {event.preventDefault();}}}/>
        </div>
        <div className="uk-margin">
          <label className="uk-form-label">Acethylene:</label>
          <input className="uk-input"  type="number" min='0' onChange={(e) => {this.setState({acethylene: e.target.value})}} onKeyPress={(event) => {if (!/[0-9]/.test(event.key)) {event.preventDefault();}}}/>
        </div>
        </div>
        <div className="uk-margin-strict">
        <div className="uk-margin">
          <label className="uk-form-label">DBDS:</label>
          <input className="uk-input"  type="number" min='0' onChange={(e) => {this.setState({dbds: e.target.value})}} onKeyPress={(event) => {if (!/[0-9]/.test(event.key)) {event.preventDefault();}}}/>
        </div>
        <div className="uk-margin">
          <label className="uk-form-label">Power Factor:</label>
          <input className="uk-input"  type="number" min='0' onChange={(e) => {this.setState({power_factor: e.target.value})}} onKeyPress={(event) => {if (!/[0-9]/.test(event.key)) {event.preventDefault();}}}/>
        </div>
        <div className="uk-margin">
          <label className="uk-form-label">Interfacial V:</label>
          <input className="uk-input"  type="number" min='0' onChange={(e) => {this.setState({interfacial_v: e.target.value})}} onKeyPress={(event) => {if (!/[0-9]/.test(event.key)) {event.preventDefault();}}}/>
        </div>
        <div className="uk-margin">
          <label className="uk-form-label">Dielectric rigidity:</label>
          <input className="uk-input"  type="number" min='0' onChange={(e) => {this.setState({dielectric_rigidity: e.target.value})}}onKeyPress={(event) => {if (!/[0-9]/.test(event.key)) {event.preventDefault();}}}/>
        </div>
        <div className="uk-margin">
          <label className="uk-form-label">Water content</label>
          <input className="uk-input" type="number" min='0' onChange={(e) => {this.setState({water_content: e.target.value})}} onKeyPress={(event) => {if (!/[0-9]/.test(event.key)) {event.preventDefault();}}}/>
        </div>
        </div>
        <input onClick={this.createData} type="submit" value="Create data" className="uk-button uk-button-primary"/>
      </form>
      <div>
        <Info n={this.state.number}/>
      </div>
      </div>

    );
  }

}
export default transformatorForm;