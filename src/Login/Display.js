import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import "../style.css"
import ReactColorPicker from '@super-effective/react-color-picker';
import logo from "../images/logo.png";
import Door from "../images/door.png";
import Enter from "../images/enter.png";
import {Link} from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Button from "react-bootstrap/Button";
import firebase from "../utils/firebase";
import ReactTooltip from "react-tooltip";

export default class MainPage extends Component {

    constructor(props) {

        super(props);
        this.state = {
            showDeleteConfirmation: false,
            dataFire: [],
            name: "",
            animationID: "SlideIn",
            username: "",
            usernameError: "",
            passwordError: "",

        }
    }

    componentDidMount() {
        // this.setState({
        //                   user: this.props.location.state.user,
        //               })
        try {
            console.log("user " + JSON.stringify(this.props.location.state.user))

            const todoRef = firebase.database().ref("users").child(this.props.location.state.user);
            todoRef.on('value', snapshot => {
                console.log("key " + JSON.stringify(snapshot.val().color));
                this.setState({
                                  colorInput: {
                                      backgroundImage: snapshot.val().wallpaper,
                                      backgroundColor: "#ffaf88"
                                  },
                              });
            });

            setInterval(function () {
                this.setState({
                                  curTime: new Date().toLocaleString([], {
                                      hour: '2-digit',
                                      minute: '2-digit'
                                  })
                              })
            }.bind(this), 1000);
        } catch {
            this.props.history.push({
                                        pathname: '/redirect',
                                        state: {path: '/display'}
                                    })
        }
    }

    imageClick() {
        this.setState({})

    }

    openDeleteConfirmation() {
        this.setState({
                          showDeleteConfirmation: true,
                      });
    }

    closeDeleteConfirmation() {
        this.setState({showDeleteConfirmation: false});
    }

    handleInput = (event) => {
        event.preventDefault();
        console.log(event.target.value);
        console.log(event.target.name);
        this.setState({
                          [event.target.name]: event.target.value
                      })
    }

    goToLesson() {
        this.setState({
                          animationID: "SlideOut"
                      });
        this.props.history.push({
                                    pathname: '/index',
                                    state: {user: this.props.location.state.user}
                                })
    }

    goToHome() {

        this.setState({
                          animationID: "SlideIn"
                      });
        this.props.history.push({
                                    pathname: '/home',
                                    query: {tran: 'SlideOut'},
                                    state: {user: this.props.location.state.user}
                                })
    }

    render() {
        const {username} = this.state
        const {password} = this.state
        const {animationID} = this.state
        const time = new Date().toLocaleTimeString();

        return (
            <div className="main-container">
                <div id="main-container-shelf" style={this.state.colorInput}>
                    <header>
                        <div id="top-banner">

                            <div style={{marginTop: "0px"}}><img src={logo} alt={"Logo"}
                                                                 width="300px"/>
                            </div>

                        </div>
                    </header>


                    <button id="btn-left" onClick={() => this.goToLesson()}>
                        <div className="vector-main-l">=</div>
                        Go to lessons
                    </button>
                    <button id="btn-right" onClick={() => this.goToHome()}>
                        <div className="vector-main-r">=</div>
                        Go to home
                    </button>

                    <div id="watch">
                        <div id="watch-inside">
                            {this.state.curTime}
                        </div>
                    </div>
                    <div>
                        <div>
                            <img src="mug.png" width="10%"
                                 style={{marginTop:"-1rem", marginLeft: "10rem", position:"absolute"}}/>
                            <img src="shelf.png" width="75%"/>
                        </div>
                    </div>

                </div>
            </div>

        )
    }
}

