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

export default class Empty extends Component {

    constructor(props) {

        super(props);
        this.state = {
            showDeleteConfirmation: true,
            dataFire: [],
            name: "",
            color: "",
            username: "",
            usernameError: "",
            passwordError: "",

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
                                                pathname: this.props.location.state.path,
                                                state: {user: value.key}
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

    render() {
        const {username} = this.state
        const {password} = this.state

        return (
            <div className="main-container">
                <header>
                    <div id="top-banner">
                        <div style={{marginTop: "50px"}}><img src={logo} alt={"Logo"}
                                                               width="300px"/></div>
                    </div>
                </header>
                <div style={{marginTop: "-100px"}}>
                    <Modal className="modal-dialog modal-xl"
                           id="five login-popup"
                           show={this.state.showDeleteConfirmation}
                           animation={true}
                    >

                        <div className="modal-content  modal-dialog-centered"
                             style={{backgroundColor: "#F6D2E0"}}>
                            <div className="modal-header text-center">
                                <h1 className="col-12 modal-title text-center">Please login!</h1>
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

