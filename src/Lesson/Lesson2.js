import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import "../style.css"
import ReactColorPicker from '@super-effective/react-color-picker';
import logo from "../images/logo.png";
import Door from "../images/door.png";
import validateColor from "validate-color";
import firebase from "../utils/firebase";
import Modal from "react-bootstrap/Modal";

const {validate} = require('csstree-validator');

export default class Lesson2 extends Component {

    constructor(props) {

        super(props);
        this.state = {
            showPreview: false,
            showInstructions: true,
            showColorPicker: false,
            input: '',
            code: '',
            message: 'Run your code to watch the color of the walls change',
            messageVec: '8',

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
                console.log("key " + JSON.stringify(snapshot.val().Module1.lesson2));
                this.setState({
                                  lesson2: snapshot.val().Module1.lesson2,
                                  colorInput: {
                                      backgroundImage: snapshot.val().wallpaper,
                                      backgroundColor: "#ffaf88"
                                  },

                              });
            });
        }
        catch{
            this.props.history.push({
                                        pathname: '/redirect',
                                        state: {path: '/lesson2'}
                                    })
        }
    }


    handleInputCode = (event) => {
        event.preventDefault();
        console.log(event.target.value);
        this.setState({
                          code: event.target.value
                      })
    }

    handleError(input) {
        // alert(validate('.hello {padding: 10px; border: 1px', 'demo/example.css'));
        if (!input.includes('background-color') && !input.includes('background')) {
            this.setState({
                              message: 'Error: Make sure that the word "background" is spelled correctly',
                              messageVec: '&',
                          })
            return;
        }

    }

    resetCode() {
        const todoRef = firebase.database().ref("users").child(this.props.location.state.user);
        todoRef.on('value', snapshot => {
            console.log("key " + JSON.stringify(snapshot.val().Module1.lesson2));
            this.setState({
                              lesson2: snapshot.val().Module1.lesson2,
                              colorInput: {
                                  backgroundImage: snapshot.val().wallpaper,
                                  backgroundColor: "#ffaf88"
                              },
                              code: "",
                              message: 'Run your code to watch the color of the walls change',
                              messageVec: '8',

                          });
        });
    }

    helpCode() {
        this.setState({
                          code: '{\n'
                                + 'background-image: url(\'halloween.png\');\n'
                                + '}',
                          message: 'Here is how your code should look like! Press "run code" and see the magic',
                          messageVec: '8',
                      })

    }

    runCode() {
        const codeInput = this.state.code;
        const css = codeInput.split(';');
        const imageArray = css[0].split('background-image:');
        // alert("2" + imageArray[1])
        const color = this.state.code.split('background-image: url(').pop().split(')')[0];
        const back = this.state.code.split('background-color: ').pop().split(';')[0];

        this.setState({
                          wallpaper: "url(" + color + ")",
                          colorInput: {
                              backgroundImage: "url(" + color + ")",
                              backgroundColor: "#ffaf88",
                          },
                          message: 'Good Job with your code!!',
                          messageVec: ':',

                      })
        firebase.database().ref("users").child(this.props.location.state.user).child("Module1")
            .update({lesson2: "complete.png"});

    }

    showInstructionsFunc() {
        this.setState({
                          showPreview: false,
                          showInstructions: true,
                          showColorPicker: false,
                      })
    }

    showPreviewFunc() {
        this.setState({
                          showPreview: true,
                          showInstructions: false,
                          showColorPicker: false,
                      })
    }

    showColorPickerFunc() {
        this.setState({
                          showPreview: false,
                          showInstructions: false,
                          showColorPicker: true,
                      })
    }

    saveCode() {

        const todoRef = firebase.database().ref("users").child(this.props.location.state.user);
        todoRef.on('value', snapshot => {
            console.log("key " + JSON.stringify(snapshot.val().color));
            this.setState({
                              lesson2: snapshot.val().Module1.lesson2,
                          });
        });
        if (this.state.lesson2 == "complete.png") {
            firebase.database().ref("users").child(this.props.location.state.user)
                .update({wallpaper: this.state.wallpaper})
            this.setState({
                              showSave2: true,
                          })
        } else {
                this.setState({
                                  showSave: true,
                              });
        }


    }

    openSave() {
        this.setState({
                          showSave: true,
                      });
    }

    closeSave() {
        this.setState({
                          showSave: false
                      });
    }

    closeSave2() {
        this.setState({
                          showSave2: false
                      });
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

    goToLessonIndex() {
        this.props.history.push({
                                    pathname: '/index',
                                    state: {user: this.props.location.state.user}
                                })
    }

    goToPrevLesson() {
        this.props.history.push({
                                    pathname: '/lesson1',
                                    state: {user: this.props.location.state.user}
                                })
    }

    goToNextLesson() {
        this.props.history.push({
                                    pathname: '/lesson3',
                                    state: {user: this.props.location.state.user}
                                })
    }

    render() {
        const {colorInput} = this.state
        const {input} = this.state
        const {code} = this.state
        const {message} = this.state
        const {messageVec} = this.state

        return (

            <div className="main-container">
                <header>
                    <div><img src={logo} alt={"Logo"} width="300px"/></div>

                    <div id="top-banner">

                        <h1 id="tittle">Lesson 2: Let's create a wallpaper with CSS</h1>
                    </div>
                </header>

                {/*<input placeholder="color" name="input" onChange={this.handleInput}/>*/}
                <img id="btn-top" src="exitLesson.png" width="150rem"
                     onClick={() => this.openExitLesson()}/>
                <button id="btn-left" onClick={() => this.goToPrevLesson()}>
                    <div className="vector-main-l">=</div>
                    Go to previous lesson
                </button>
                <button id="btn-right" onClick={() => this.goToNextLesson()}>
                    <div className="vector-main-r">=</div>
                    Go to next lesson
                </button>
                <Modal className="modal-dialog modal-xl"
                       id="five login-popup"
                       show={this.state.showSave}
                       animation={true}
                >

                    <div className="modal-content  modal-dialog-centered"
                         style={{backgroundColor: "#F6D2E0"}}>
                        <div className="modal-header text-center">
                            <h1 style={{fontFamily: "MoreSugarExtra"}}>8</h1>
                            <h1 style={{marginRight: "2rem"}}>Attention</h1>

                        </div>


                        <h2 style={{fontFamily: "GlacialIndifference", textAlign: "center"}}>Your
                            code can't be saved
                            until you complete the lesson</h2>

                        <div className="modal-footer">
                            <button className="btn-login" onClick={() => this.closeSave()}>Close
                            </button>
                        </div>
                    </div>
                </Modal>
                <Modal className="modal-dialog modal-xl"
                       id="five login-popup"
                       show={this.state.showSave2}
                       animation={true}
                >

                    <div className="modal-content  modal-dialog-centered"
                         style={{backgroundColor: "#F6D2E0"}}>
                        <div className="modal-header text-center">
                            <h1 style={{fontFamily: "MoreSugarExtra"}}>@</h1>
                            <h1 style={{marginRight: "2rem"}}>Congratulations</h1>

                        </div>
                        <h2 style={{fontFamily: "GlacialIndifference", textAlign: "center"}}>Your
                            code has successfully been
                            saved!</h2>

                        <div className="modal-footer">
                            <button className="btn-login" onClick={() => this.closeSave2()}>Close
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
                            sure you want to exit the lesson?</h2>

                        <div className="modal-footer">
                            <button className="btn-login" onClick={() => this.goToLessonIndex()}>Yes
                            </button>
                            <button className="btn-login" onClick={() => this.closeExitLesson()}>No
                            </button>
                        </div>
                    </div>
                </Modal>
                <div id="one_div" className="textarea-wrapper">
                    <textarea id="code-input" value={code} rows="10" cols="100" name="code"
                              onChange={this.handleInputCode}></textarea>
                    <div id="three_div">
                        <button type="button" className="code-editor-button" id="btn-run"
                                onClick={() => this.runCode()}>
                            <div className="vector2">|</div>
                            <div className="text">Run Code</div>
                        </button>
                        <button type="button" style={{marginLeft: "10px"}}
                                className="code-editor-button" id="btn-run"
                                onClick={() => this.helpCode()}>
                            <div className="vector3">?</div>
                            Help Me
                        </button>
                        <button type="button" className="code-editor-button" id="btn-reset"
                                onClick={() => this.resetCode()}>
                            <div className="vector">-</div>
                            Reset
                        </button>

                    </div>
                    <div id="four_div">
                        <div id="error-vector">{messageVec}</div>
                        <div id="error-message">{message}</div>

                    </div>

                </div>
                <div id="two_div">
                    <div id="left-sub-header">
                        <button type="button" className="sub-header-button"
                                onClick={() => this.showInstructionsFunc()}>Instructions
                        </button>
                        <button type="button" className="sub-header-button" id="btn-center"
                                onClick={() => this.showColorPickerFunc()}>Color Picker
                        </button>
                        <button type="button" className="sub-header-button"
                                onClick={() => this.showPreviewFunc()}>Preview

                        </button>


                    </div>
                    {
                        this.state.showInstructions ?
                        <div id="left-sub-body">
                            <h1 className="left-sub-body-tittle">Instructions</h1>
                            <h2>Part a: Use name of color</h2>

                            <h2>Part b: Use hex of color</h2>

                            <h2>Part c: ombre effect</h2>

                        </div>
                                                    : null
                    }
                    {
                        this.state.showPreview ?
                        <div id="left-sub-body">
                            <p className="left-sub-body-tittle">Preview
                                <button type="button" className="code-editor-button"
                                        id="btn-save" onClick={() => this.saveCode()}>
                                    Save
                                </button>
                            </p>

                            <div id="preview-container-less2" style={colorInput}>

                            </div>
                        </div>
                                               : null
                    }

                    {
                        this.state.showColorPicker ?
                        <div id="left-sub-body">
                            <p className="left-sub-body-tittle">Color Picker</p>
                            <div id="color-pick">
                                <ReactColorPicker/>

                            </div>
                        </div>
                                                   : null
                    }

                </div>

            </div>

        )
    }
}

