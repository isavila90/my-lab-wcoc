import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import "../style.css"
import { Redirect } from 'react-router';


export default class Empty extends Component {
// https://stackoverflow.com/questions/51810076/redirect-automatically-from-one-component-to-another-one-after-few-seconds-rea/51810296
    constructor(props) {

        super(props);
    }



    render() {

        return (
            <div className="main-container">

                {/*<Redirect to="/log" />*/}
            </div>


        )
    }
}

