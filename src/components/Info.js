
import React, { useState, useEffect } from "react";
import { API_URL, GET_DATA_INTERVAL } from "./constants";
import axios from "axios";



function Info(props) {

  var optionHealthind = {};

  const getData = () => {
    console.log('GET Request to: ' + API_URL + '?trans_number=' + props.n)
    // отправляем запрос на сервер, если данные получены (сервер отвечает в виде массива json-строк), 
    // обновляем массив this.state.weatherData. В случае ошибки очищаем массив. 
    axios.get(API_URL  + '?trans_number=' + props.n)
    .then(response => {
      optionHealthind =  response.data;
      console.log(optionHealthind.health_index);
    }, error => {
    
        console.log(error);
    });
  }

  useEffect(() => {
    getData();
  }, [])


  return (
    <div className="uk-section uk-section-muted">
     <div className="uk-grid uk-text-center-output">
        <div className="uk-grid uk-text-center-output-contain">
          <div className="uk-grid uk-text-center-output-index-left">
            <p>Health index(%)</p>
            <p className="health_index">{optionHealthind.health_index}</p>
          </div>
          <div className="uk-grid uk-text-center-output-index-right">
            <table>
              <tr>
                <th>HI%</th>
                &ensp;
                <th>Condition</th>
                &ensp;
                <th>Expected Lifetime</th>
                &ensp;
                <th>Requirements</th>
              </tr>
              <tr>
                <td>85-100</td>
                &ensp;
                <td>Very Good</td>
                &ensp;
                <td>More than 15 years</td>
                &ensp;
                <td>Normal maintenance</td>
              </tr>
              <tr>
                <td>75-85</td>
                &ensp;
                <td>Good</td>
                &ensp;
                <td>More than 10 years</td>
                &ensp;
                <td>Normal maintenance</td>
              </tr>
              <tr>
                <td>50-70</td>
                &ensp;
                <td>Fair</td>
                &ensp;
                <td>From 3-10 years</td>
                &ensp;
                <td>Increase diagnostic testing, possible remedial work or replacement needed depending on criticality</td>
              </tr>
              <tr>
                <td>30-50</td>
                &ensp;
                <td>Poor</td>
                &ensp;
                <td>Less than 3 years</td>
                &ensp;
                <td>Start planning process to replace or rebuild considering risk and consequences of failure</td>
              </tr>
              <tr>
                <td>0-30</td>
                &ensp;
                <td>Very Poor</td>
                &ensp;
                <td>Near to the end of life</td>
                &ensp;
                <td>Immediately assess risk; replace or rebuild based on assessment</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Info;