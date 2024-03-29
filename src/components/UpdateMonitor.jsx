import React from "react";
import axios from "axios";
import { API_URL, GET_DATA_INTERVAL } from "./constants";

class UpdateMonitor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {transData: {}};
    }

    getData() {
        console.log('GET Request to: ' + API_URL + '?trans_number=' + this.props.number)
        axios.get(API_URL  + '?trans_number=' + this.props.number)
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
        if (this.state.transData.number > 0) {
                return(
                    <tr>
                        <td>{this.state.transData.number}</td>
                        <td>{this.state.transData.city_id}</td>
                        <td>{this.state.transData.types}</td>
                        <td>{this.state.transData.hydrogen}</td>
                        <td>{this.state.transData.health_index}</td>
                    </tr>
                );
        }
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