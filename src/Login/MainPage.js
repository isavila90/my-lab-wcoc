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
            showProfile: false,
            showTutorial: false,
            dataFire: [],
            name: "",
            showEditProfile: false,
            showNonEditProfile: true,
            username: "",
            usernameError: "",
            passwordError: "",
            exitConfirmation: false,
            showAnnouncement: false,
            showPuzzle: false,
            showAnswer: false,
            privilege: false,

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
                                  name2: snapshot.val().name,
                                  password: snapshot.val().password,
                                  username: snapshot.val().username,
                                  lastName: snapshot.val().lastName,
                                  email: snapshot.val().email,
                                  instructor: snapshot.val().instructor,

                              });
                // console.log("instructor " + this.state.instructor);
                // if (this.state.instructor) {
                //     this.setState({
                //
                //                       privilege: true,
                //
                //                   });
                // } else {
                //     this.setState({
                //
                //                       privilege: false,
                //
                //                   });
                // }
                //
                // console.log("pri " + this.state.privilege);
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
                                        state: {path: '/home'}
                                    })
        }

    }

    imageClick() {
        this.setState({})

    }

    getAnswer() {
        this.setState({
                          showAnswer: true,
                      });
    }

    hideAnswer() {
        this.setState({
                          showAnswer: false,
                      });
    }

    openProfile() {
        this.setState({
                          showProfile: true,
                      });
    }

    closeProfile() {
        this.setState({
                          showProfile: false
                      });
    }

    editProfile() {
        this.setState({
                          showEditProfile: true,
                          showNonEditProfile: false,
                      });
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

    handleInput = (event) => {
        event.preventDefault();
        console.log(event.target.value);
        console.log(event.target.name);
        this.setState({
                          [event.target.name]: event.target.value
                      })
    }

    goToLesson() {

        this.props.history.push({
                                    pathname: '/index',
                                    state: {
                                        user: this.props.location.state.user,
                                        animation: "SlideIn"
                                    }
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

    goToNewUser() {

        this.props.history.push({
                                    pathname: '/newUser',
                                    state: {
                                        user: this.props.location.state.user,
                                        animation: "SlideIn"
                                    }
                                })
    }

    openExitLesson() {
        this.setState({
                          exitConfirmation: true
                      });
    }

    closeExitLesson() {
        this.setState({
                          exitConfirmation: false
                      });
    }

    openPuzzle() {
        this.setState({
                          showPuzzle: true
                      });
    }

    closePuzzle() {
        this.setState({
                          showPuzzle: false
                      });
    }

    goToLessonIndex() {
        this.props.history.push({
                                    pathname: '/log',

                                })
    }

    saveProfile() {
        this.setState({
                          showEditProfile: false,
                          showNonEditProfile: true,
                      });
        firebase.database().ref("users").child(this.props.location.state.user)
            .update({name: this.state.name});
        firebase.database().ref("users").child(this.props.location.state.user)
            .update({lastName: this.state.lastName});
        firebase.database().ref("users").child(this.props.location.state.user)
            .update({email: this.state.email});
        firebase.database().ref("users").child(this.props.location.state.user)
            .update({password: this.state.password});
        firebase.database().ref("users").child(this.props.location.state.user)
            .update({username: this.state.username});

        alert("Your Changes have been saved")
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

createUI() {
    console.log("instructor " + this.state.instructor);
        if(this.state.instructor == true) {

            return (
                <button id="btn-new-user" onClick={() => this.goToNewUser()}>
                    Create new user
                </button>
            )
        }
    return;

}

    render() {
        const {username} = this.state
        const {password} = this.state
        const {name} = this.state
        const {lastName} = this.state
        const {email} = this.state

        return (
            <div className="main-container" style={this.state.colorInput}>
                <header>
                    <div id="top-banner">

                        <div style={{marginTop: "-10px"}}><img src={logo} alt={"Logo"}
                                                               width="300px"/></div>
                        <h1 id="tittle2" style={{fontSize: "4rem"}}>Welcome to {this.state.name2}'s
                            Lab</h1>
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
                        <h2 style={{
                            fontFamily: "GlacialIndifference",
                            textAlign: "center"
                        }}>Summer/Fall Workshops Coming Soon!
                        </h2>
                        <img
                            src='https://khoury.northeastern.edu/home/laney/wcoc/images/wcoc_insta.png'
                            width="200rem"/>
                        <div className="modal-footer">
                            <button className="btn-login"
                                    onClick={() => this.closeAnnouncement()}>Close
                            </button>
                        </div>
                    </div>
                </Modal>
                <Modal className="modal-dialog modal-xl"
                       id="five login-popup"
                       show={this.state.exitConfirmation}
                       animation={true}
                >

                    <div className="modal-content  modal-dialog-centered"
                         style={{backgroundColor: "#F6D2E0"}}>
                        <div className="modal-header text-center">
                            <h1 style={{fontFamily: "MoreSugarExtra"}}>8</h1>
                            <h1 style={{marginRight: "2rem"}}>Attention</h1>

                        </div>
                        <h2 style={{fontFamily: "GlacialIndifference", textAlign: "center"}}>Are you
                            sure you want to logout?</h2>

                        <div className="modal-footer">
                            <button className="btn-login" onClick={() => this.goToLessonIndex()}>Yes
                            </button>
                            <button className="btn-login" onClick={() => this.closeExitLesson()}>No
                            </button>
                        </div>
                    </div>
                </Modal>
                <Modal className="modal-dialog modal-xl"
                       id="five login-popup"
                       show={this.state.showProfile}
                       animation={true}
                >

                    <div className="modal-content  modal-dialog-centered"
                         style={{backgroundColor: "#F6D2E0"}}>
                        <div className="modal-header text-center">
                            <h1 style={{fontFamily: "MoreSugarExtra"}}>8</h1>
                            <h1 style={{marginRight: "2rem"}}>Profile </h1>
                            {
                                this.state.showNonEditProfile ?
                                <button id="btn-edit"
                                        onClick={() => this.editProfile()}>Edit</button>
                                                              : null}
                            {
                                this.state.showEditProfile ?
                                <button id="btn-edit"
                                        onClick={() => this.saveProfile()}>Save</button>
                                                           : null}
                        </div>
                        {
                            this.state.showNonEditProfile ?
                            <div className="modal-body text-center ">
                                <div className="row"
                                     style={{color: "#E95086"}}>
                                    <h2 style={{fontFamily: "GlacialIndifference"}}>Name: </h2>
                                    <h2 style={{marginTop: "5px"}}>{this.state.name}</h2>
                                </div>
                                <div className="row"
                                     style={{color: "#E95086"}}>
                                    <h2 style={{fontFamily: "GlacialIndifference"}}>Last name: </h2>
                                    <h2 tyle={{marginTop: "5px"}}>{this.state.lastName}</h2>
                                </div>
                                <div className="row"
                                     style={{color: "#E95086"}}>
                                    <h2 style={{fontFamily: "GlacialIndifference"}}>Email: </h2>
                                    <h2 tyle={{marginTop: "5px"}}>{this.state.email}</h2>
                                </div>
                                <div className="row"
                                     style={{color: "#E95086"}}>
                                    <h2 style={{fontFamily: "GlacialIndifference"}}>Username: </h2>
                                    <h2 tyle={{marginTop: "5px"}}>{this.state.username}</h2>
                                </div>
                                <div className="row"
                                     style={{color: "#E95086"}}>
                                    <h2 style={{fontFamily: "GlacialIndifference"}}>Password: </h2>
                                    <h2 tyle={{marginTop: "5px"}}>{this.state.password}</h2>
                                </div>
                            </div>
                                                          : null}
                        {
                            this.state.showEditProfile ?
                            <div className="modal-body text-center ">
                                <div className="row"
                                     style={{color: "#E95086"}}>
                                    <h2 style={{fontFamily: "GlacialIndifference"}}>Name: </h2>
                                    <input className="profile-input" type="text"
                                           name="name" autoFocus="autofocus"
                                           value={name}
                                           onChange={this.handleInput}
                                           style={this.state.borderUsername}/>
                                </div>
                                <div className="row"
                                     style={{color: "#E95086"}}>
                                    <h2 style={{fontFamily: "GlacialIndifference"}}>Last name: </h2>
                                    <input className="profile-input" type="text"
                                           name="lastName" autoFocus="autofocus"
                                           value={lastName}
                                           onChange={this.handleInput}
                                           style={this.state.borderUsername}/>
                                </div>
                                <div className="row"
                                     style={{color: "#E95086"}}>
                                    <h2 style={{fontFamily: "GlacialIndifference"}}>Email: </h2>
                                    <input className="profile-input" type="text"
                                           name="email" autoFocus="autofocus"
                                           value={email}
                                           onChange={this.handleInput}
                                           style={this.state.borderUsername}/>
                                </div>
                                <div className="row"
                                     style={{color: "#E95086"}}>
                                    <h2 style={{fontFamily: "GlacialIndifference"}}>Username: </h2>
                                    <input className="profile-input" type="text"
                                           name="username" autoFocus="autofocus"
                                           value={username}
                                           onChange={this.handleInput}
                                           style={this.state.borderUsername}/>
                                </div>
                                <div className="row"
                                     style={{color: "#E95086"}}>
                                    <h2 style={{fontFamily: "GlacialIndifference"}}>Password: </h2>
                                    <input className="profile-input" type="text"
                                           name="password" autoFocus="autofocus"
                                           value={password}
                                           onChange={this.handleInput}
                                           style={this.state.borderUsername}/>
                                </div>
                            </div>
                                                       : null}

                        <div className="modal-footer">
                            <button className="btn-login" onClick={() => this.closeProfile()}>Close
                            </button>
                        </div>
                    </div>
                </Modal>

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

                <Modal className="modal-dialog modal-xl"
                       id="five login-popup"
                       show={this.state.showPuzzle}
                       animation={true}
                >

                    <div className="modal-content  modal-dialog-centered"
                         style={{backgroundColor: "#F6D2E0"}}>
                        <div className="modal-header text-center">
                            <h1 style={{marginRight: "2rem"}}>Solve this puzzle</h1>
                            <h1 style={{fontFamily: "MoreSugarExtra"}}>&</h1>
                        </div>
                        <h3 style={{fontFamily: "GlacialIndifference", textAlign: "center"}}>Which
                            number should replace the question mark In The Circle Below ?
                        </h3>
                        <img width="50%"
                             src="https://gpuzzles.com/images/riddles/which-number-should-replace-the-question-mark-In-The-Circle-Below-501.jpg"/>


                        {
                            this.state.showAnswer ?
                            <div>
                                <button id="btn-edit"
                                        style={{position: "absolute", marginLeft: "5rem"}}
                                        onClick={() => this.hideAnswer()}>Hide answer
                                </button>
                                <h2 style={{
                                    fontFamily: "GlacialIndifference",
                                    textAlign: "center"
                                }}>17
                                </h2>
                                <h5 style={{
                                    fontFamily: "GlacialIndifference",
                                    textAlign: "center"
                                }}>It is the sum of the two digits(9 + 8) in opposite quadrant.
                                </h5>

                            </div>
                                                  : <button id="btn-edit"
                                                            onClick={() => this.getAnswer()}>Get
                                                      answer
                            </button>}
                        <div className="modal-footer">
                            <button className="btn-login" onClick={() => this.closePuzzle()}>Close
                            </button>
                        </div>
                    </div>
                </Modal>

                <button id="btn-left" onClick={() => this.goToDisplay()}>
                    <div className="vector-main-l">=</div>
                    Go to display
                </button>
                <button id="btn-right" onClick={() => this.goToLesson()}>
                    <div className="vector-main-r">=</div>
                    Go to lessons
                </button>
                {this.createUI()}
                {/*{*/}
                {/*    this.state.privilege ?*/}
                {/*    <button id="btn-new-user" onClick={() => this.goToNewUser()}>*/}
                {/*        Create new user*/}
                {/*    </button>*/}
                {/*                         : null*/}
                {/*}*/}

                <div id="game" style={{marginTop: "6rem", right: "60px"}}>
                    <button className="btn-plain" onClick={() => this.openProfile()}>
                        <img src="profile.png" width="200rem"/>
                    </button>

                    <button className="btn-plain" onClick={() => this.openPuzzle()}><img
                        src="puzzle.png" width="200rem"/>
                    </button>

                </div>

                <div id="shelf" style={{marginTop: "30rem", right: "50px"}}>
                    <img src="shelf2.png" width="450rem"/>
                </div>

                <div id="watch" style={{marginTop: "25rem", right: "120px"}}>
                    <div id="watch-inside">
                        {this.state.curTime}
                    </div>
                </div>
                <div id="shelf" style={{marginTop: "20rem", right: "50px"}}>
                    <img src="shelf2.png" width="450rem"/>
                </div>
                <div id="board">
                    <img src="exit.png" width="150rem" style={{marginTop: "-7rem"}}
                         onClick={() => this.openExitLesson()}/>
                    <button className="btn-plain"
                            onClick={() => this.openAnnouncement()}>
                        <img src="anno.png" width="250rem"/>
                    </button>
                    <img src="tutorial.png" width="130rem"
                         style={{marginTop: "-8rem", marginRight: "15rem"}}
                         onClick={() => this.openTutorial()}/>
                </div>


                <div style={{marginTop: "-50px"}}>
                    <div><img src={Door} alt={"Door"} width="35%"/>
                        <div id="decoration-door"
                             dangerouslySetInnerHTML={{__html: this.state.html}}></div>
                    </div>


                </div>

            </div>

        )
    }
}

