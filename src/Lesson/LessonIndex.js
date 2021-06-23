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
import ReactPlayer from "react-player";

export default class MainPage extends Component {

    constructor(props) {

        super(props);
        this.state = {
            showDeleteConfirmation: false,
            dataFire: [],
            name: "",

            username: "",
            usernameError: "",
            passwordError: "",
            showTutorial: false,
            // colorInput:{background: "red"},

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
                                  colorInput: {background: snapshot.val().color},
                                  html: snapshot.val().decor,
                                  name: snapshot.val().name,
                                  lesson1: snapshot.val().Module1.lesson1,
                                  lesson2: snapshot.val().Module1.lesson2,
                                  lesson3: snapshot.val().Module1.lesson3,
                              });
            });
        } catch {
            this.props.history.push({
                                        pathname: '/redirect',
                                        state: {path: '/index'}
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

    goToLesson1() {

        this.props.history.push({
                                    pathname: '/lesson1',
                                    state: {user: this.props.location.state.user}
                                })
    }

    goToLesson2() {

        this.props.history.push({
                                    pathname: '/lesson2',
                                    state: {user: this.props.location.state.user}
                                })
    }

    goToLesson3() {

        this.props.history.push({
                                    pathname: '/lesson3',
                                    state: {user: this.props.location.state.user}
                                })
    }

    goToDisplay() {

        this.props.history.push({
                                    pathname: '/display',
                                    state: {
                                        user: this.props.location.state.user,
                                        animation: "SlideIn"
                                    }
                                })
    }

    goToHome() {

        this.props.history.push({
                                    pathname: '/home',
                                    state: {
                                        user: this.props.location.state.user,
                                        animation: "SlideIn"
                                    }
                                })
    }

    openTutorial() {
        this.setState({
                          showTutorial: true,
                      });
    }

    closeTutorial() {
        this.setState({
                          showTutorial: false
                      });
    }

    render() {
        const {username} = this.state
        const {password} = this.state

        return (
            <div className="main-container" style={this.state.colorInput}>
                <header>
                    <div id="top-banner">


                    </div>

                </header>
                <Modal className="modal-dialog modal-xl"
                       id="five login-popup"
                       show={this.state.showTutorial}
                       animation={true}
                >

                    <div className="modal-content  modal-dialog-centered"
                         style={{backgroundColor: "#F6D2E0"}}>
                        <div className="modal-header text-center">
                            <h1 style={{marginRight: "2rem"}}>Video tutorial</h1>
                            <h1 style={{fontFamily: "MoreSugarExtra"}}>&</h1>
                        </div>
                        <ReactPlayer width="30rem"
                                     url="https://www.youtube.com/watch?v=w7ejDZ8SWv8"
                        />
                        <div className="modal-footer">
                            <button className="btn-login" onClick={() => this.closeTutorial()}>Close
                            </button>
                        </div>
                    </div>
                </Modal>
                <div>
                    <div id="computer">
                        <button className="btn-plain"
                                style={{position:"absolute", marginLeft:"-20rem"}}
                                onClick={() => this.openTutorial()}>
                            <img src="tutorial2.png" width="40%"
                            />
                        </button>

                        <img src="computer.png" width="75%"/>
                        <div id="lesson-content">
                            <h1 style={{
                                fontFamily: "MoreSugar",
                                color: "#5ec5bd",
                                marginLeft: "-8rem"
                            }}>Module 1: let's decorate your lab</h1>
                            <div className="row"
                                 style={{color: "#E95086", marginTop: "2.5rem"}}>
                                <img src={this.state.lesson1} width="50rem"
                                     style={{marginTop: "-0.3rem"}}/>
                                <button className="btn-lesson"
                                        onClick={() => this.goToLesson1()}>Lesson 1: Let's paint our
                                    walls with CSS
                                </button>
                            </div>
                            <div className="row"
                                 style={{color: "#E95086", marginTop: "2.5rem"}}>
                                <img src={this.state.lesson2} width="50rem"
                                     style={{marginTop: "-0.3rem"}}/>
                                <button className="btn-lesson"
                                        onClick={() => this.goToLesson2()}>Lesson 2: Let's create a
                                    wallpaper with CSS
                                </button>
                            </div>

                            <div className="row"
                                 style={{color: "#E95086", marginTop: "2.5rem"}}>
                                <img src={this.state.lesson3} width="50rem"
                                     tyle={{marginTop: "-0.3rem"}}/>
                                <button className="btn-lesson"
                                        onClick={() => this.goToLesson3()}>Lesson 3: Let's decorate
                                    your door with HTML
                                </button>
                            </div>

                        </div>

                    </div>

                    <button id="btn-left" onClick={() => this.goToHome()}>
                        <div className="vector-main-l">=</div>
                        Go to home
                    </button>
                    <button id="btn-right" onClick={() => this.goToDisplay()}>
                        <div className="vector-main-r">=</div>
                        Go to display
                    </button>


                    <Modal className="modal-dialog modal-xl"
                           id="five login-popup"
                           show={this.state.showDeleteConfirmation}
                           animation={true}
                    >

                        <div className="modal-content  modal-dialog-centered"
                             style={{backgroundColor: "#F6D2E0"}}>
                            <div className="modal-header text-center">
                                <h1 className="col-12 modal-title text-center">Welcome back!</h1>
                                <button type="button" className="close"
                                        data-dismiss="modal"
                                        onClick={() => this.closeDeleteConfirmation()}>x
                                </button>
                            </div>
                            <div className="modal-body text-center ">
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="recipient-name"
                                               className="modal-input">Username</label>
                                        <div className="input-box">

                                            <input id="username" type="text" name="username"
                                                   autoFocus="autofocus" onChange={this.handleInput}
                                                   style={this.state.borderUsername}/>

                                            <span className="symbol">0</span>
                                        </div>
                                    </div>
                                    <p style={{fontSize: "15px", color: "red", marginTop: "-10px"}}>
                                        {this.state.usernameError}
                                    </p>
                                    <div className="form-group">
                                        <label htmlFor="recipient-name"
                                               className="modal-input">Password</label>

                                        <div className="input-box">
                                            <input type="password" name="password"
                                                   autoFocus="autofocus" onChange={this.handleInput}
                                                   style={this.state.borderPassword}/>
                                            <span className="symbol">ß</span>
                                        </div>

                                    </div>
                                    <p style={{fontSize: "15px", color: "red", marginTop: "-10px"}}>
                                        {this.state.passwordError}
                                    </p>


                                </form>
                            </div>
                            <div className="modal-footer">
                                <button className="btn-login">Login
                                </button>

                            </div>
                        </div>


                    </Modal>

                </div>

                <div style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "white",
                    marginTop: "-30rem"
                }}></div>
            </div>

        )
    }
}

