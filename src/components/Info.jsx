import React, { useState, useEffect } from "react";
import { API_URL, GET_DATA_INTERVAL } from "./constants";
import axios from "axios";



class Info extends React.Component{

    constructor(props) {
        super(props);
        this.state = {transData: {}};
    }

    getData() {
        console.log('GET Request to: ' + API_URL + '?trans_number=' + this.props.n)
        // отправляем запрос на сервер, если данные получены (сервер отвечает в виде массива json-строк), 
        axios.get(API_URL  + '?trans_number=' + this.props.n)
        .then(response => {
            this.setState(state => ({
                transData: response.data,
            }));
            console.log(this.state.transData);
        }, error => {
            this.setState(state => ({
                transData: {},
            }));
            console.log(error);
        });
    }

    renderData() {
        if (this.props.n > 0) {
            if (this.state.transData.health_index >= 70){
                return(
                    <div className="uk-grid uk-text-center-output-index-left green_text">
                    <p>Health index(%)</p>
                    <p className="health_index">{this.state.transData.health_index}</p>
                  </div>
                );
            }
            else if (this.state.transData.health_index < 70 && this.state.transData.health_index >= 50){
                return(
                    <div className="uk-grid uk-text-center-output-index-left yellow_text">
                    <p>Health index(%)</p>
                    <p className="health_index">{this.state.transData.health_index}</p>
                  </div>
                );
                }
            else {
                return(
                    <div className="uk-grid uk-text-center-output-index-left red_text">
                    <p>Health index(%)</p>
                    <p className="health_index">{this.state.transData.health_index}</p>
                    </div>
                );
                }
            }

            
        // иначе выводим информацию об отсутствии данных
        else {
            return(
                <div className="uk-grid uk-text-center-output-index-left">
                    <p>Health index(%)</p>
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

render(){
  return (
    <div className="uk-section uk-section-muted">
     <div className="uk-grid uk-text-center-output">
        <div className="uk-grid uk-text-center-output-contain">
          {this.renderData()}
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
                <td>50-75</td>
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
  );}
}


export default Info;