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

export default class LoginPage extends Component {

    constructor(props) {

        super(props);
        this.state = {
            showDeleteConfirmation: false,
            dataFire: [],
            name: "",
            color: "",
            username: "",
            usernameError: "",
            passwordError: "",
            showTutorial: false,
            showAnnouncement: false,

        }
    }

    componentDidMount() {

        const todoRef = firebase.database().ref("users");
        todoRef.on('value', snapshot => {
            // convert messages list from snapshot
            snapshot.forEach(userSnapshot => {
                console.log("key " + userSnapshot.key);
                const value = snapshot.child(userSnapshot.key).val();
                const key = {key: userSnapshot.key};
                Object.assign(value, key);
                console.log("key2" + value.key);
                this.setState(prevState => ({
                    dataFire: [...prevState.dataFire, value]
                }))

                //
                // const key = {key:userSnapshot.key};
                // Object.assign(value, key);
                // console.log("key2" + value.username)
                // this.setState({
                //                 name: value.name,
                //                 color:value.color,
                //
                //               })

            });

        });

    }

    loginSendInput() {

        const array = this.state.dataFire;

        for (let i = 0; i < array.length; i++) {

            const value = array[i];
            console.log("username" + value.username);
            console.log("username" + this.state.username);

            if (value.username == this.state.username) {
                // alert("name exist");
                if (value.password == this.state.password) {
                    // alert("password correct");
                    console.log("new key " + value.key);
                    this.setState({

                                      showDeleteConfirmation: false,
                                      passwordError: "",
                                      usernameError: "",
                                      borderUsername: {
                                          border: "transparent 2px solid"
                                      },
                                      borderPassword: {
                                          border: "transparent 2px solid"
                                      },
                                  });

                    this.props.history.push({
                                                pathname: '/home',
                                                query: {tran: 'SlideOut'},
                                                state: {user: value.key, animation: "SlideIn"}
                                            })
                    return;
                }
                this.setState({
                                  passwordError: "password Incorrect",
                                  usernameError: "",
                                  borderUsername: {
                                      border: "transparent 2px solid"
                                  },
                                  borderPassword: {
                                      border: "red 2px solid"
                                  },
                              });
                // alert("password incorrect!!!!");
                return;

            }

        }
        this.setState({
                          usernameError: "Incorrect name",
                          passwordError: "",
                          borderUsername: {
                              border: "red 2px solid"
                          },
                          borderPassword: {
                              border: "transparent 2px solid"
                          },
                      });
        // alert("name not exist");

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

    goToFacebook() {
        window.location.href = 'https://facebook.com/womensccboston/';
        return null;
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

    openAnnouncement() {
        this.setState({
                          showAnnouncement: true,
                      });
    }

    closeAnnouncement() {
        this.setState({
                          showAnnouncement: false
                      });
    }

    render() {
        const {username} = this.state
        const {password} = this.state

        return (
            <div className="main-container">
                <header>
                    <div id="top-banner">
                        <h1 id="tittle2">Welcome to</h1>
                        <div style={{marginTop: "-20px"}}><img src={logo} alt={"Logo"}
                                                               width="300px"/></div>
                    </div>
                </header>

                <Modal className="modal-dialog modal-xl"
                       id="five login-popup"
                       show={this.state.showAnnouncement}
                       animation={true}
                >

                    <div className="modal-content  modal-dialog-centered"
                         style={{backgroundColor: "#F6D2E0"}}>
                        <div className="modal-header text-center">
                            <h1 style={{fontFamily: "MoreSugarExtra"}}>8</h1>
                            <h1 style={{marginRight: "2rem"}}>Announcements</h1>
                        </div>
                        <h2 style={{fontFamily: "GlacialIndifference", textAlign: "center"}}>Summer/Fall Workshops Coming Soon!
                        </h2>
                        <img src='https://khoury.northeastern.edu/home/laney/wcoc/images/wcoc_insta.png' width="200rem"/>
                        <div className="modal-footer">
                            <button className="btn-login" onClick={() => this.closeAnnouncement()}>Close
                            </button>
                        </div>
                    </div>
                </Modal>

                <div style={{marginTop: "-50px"}}>
                    <img style={{position: "absolute", left: "2rem", bottom: "0"}} src="plant2.png"
                         width="400rem"/>
                    <img style={{position: "absolute", left: "13rem", bottom: "0"}} src="plant3.png"
                         width="300rem"/>
                    <div><img src={Enter} alt={"Enter"} width="35%"
                              onClick={() => this.openDeleteConfirmation()}/></div>
                    <button className="btn-login" style={{
                        zIndex: "10000",
                        position: "absolute",
                        marginTop: "-22.5rem",
                        marginLeft: "-6.5rem",
                        height: "5rem",
                        width: "13rem",
                        fontSize: "3rem"
                    }} onClick={() => this.openDeleteConfirmation()}>
                        ENTER
                    </button>
                    <div id="stand">
                        <button className="btn-plain"
                                style={{marginTop: "-3rem", marginRight: "1rem"}}
                                onClick={() => this.goToFacebook()}>
                            <img src="facebook.png" width="150rem"/>
                        </button>
                        <button className="btn-plain"
                                style={{marginRight: "15rem"}}
                                onClick={() => this.openAnnouncement()}>
                            <img src="anno.png" width="200rem" />
                        </button>

                    </div>
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

                                            <input className="login-input" type="text"
                                                   name="username" autoFocus="autofocus"
                                                   onChange={this.handleInput}
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
                                            <input className="login-input" type="password"
                                                   name="password" autoFocus="autofocus"
                                                   onChange={this.handleInput}
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
                                <button className="btn-login"
                                        onClick={() => this.loginSendInput()}>Login
                                </button>

                            </div>
                        </div>


                    </Modal>

                </div>


            </div>

        )
    }
}

