import React from "react";
import axios from "axios";
import { API_URL, GET_DATA_INTERVAL } from "./constants";


class TransformatorMonitor extends React.Component {

    constructor(props) {
        super(props);
        // устанавливаем состояние компонента по умолчанию
        this.state = {transData: []};
    }

    getData() {
        console.log('GET Request to: ' + API_URL + '/' + this.props.cityName) 
        axios.get(API_URL + '/' + this.props.cityName)
        .then(response => {
            this.setState(state => ({
                transData: response.data,
            }));
        }, error => {
            this.setState(state => ({
                transData: [],
            }));
            console.log(error);
        });
    }

    renderData() {
        console.log(this.state.transData)
        if (this.state.transData.length > 0) {
            return this.state.transData.map((dataRow) => {
                return(
                    <tr>
                        <td>{dataRow.number}</td>
                        <td>{this.props.cityName}</td>
                        <td>{dataRow.types}</td>
                        <td>{dataRow.health_index}</td>
                    </tr>
                );
            });
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

export default TransformatorMonitor;