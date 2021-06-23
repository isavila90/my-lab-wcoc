import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import "../style.css"
import ReactColorPicker from '@super-effective/react-color-picker';
import logo from "../images/logo.png";
import Door from "../images/door.png";
import firebase from "../utils/firebase";
import validateColor from "validate-color";
import ReactPlayer from "react-player";
import Modal from "react-bootstrap/Modal";

const {validate} = require('csstree-validator');

export default class Lesson1 extends Component {

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
            showSave: false,
            showSave2: false,
            exitConfirmation: false,
            showPartOne: false,
            showPartTwo: false,
            showPartThree: false,
            showPartFour: false,
            showPartFive: false,
            showPartSix: false,



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
                console.log("key " + JSON.stringify(snapshot.val().Module1.lesson1));
                this.setState({
                                  lesson1: snapshot.val().Module1.lesson1,
                                  colorInput: {background: snapshot.val().color}

                              });
            });
        } catch {
            this.props.history.push({
                                        pathname: '/redirect',
                                        state: {path: '/lesson1'}
                                    })
        }
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        this.props.history.push({
                                    pathname: '/login',
                                    state: {user: this.props.location.state.user}
                                })
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
        this.setState({
                          code: "",
                          colorInput: {
                              background: "linear-gradient(to bottom, #ffaf88 0%, #ff99cc 100%)"
                          },
                          message: 'Run your code to watch the color of the walls change',
                          messageVec: '8',
                      })
    }

    helpCode() {
        this.setState({
                          code: ".back-container{\n"
                                + "     background: linear-gradient(to bottom, #643cd6 0%, #ff99cc 100%);\n"
                                + " }",
                          message: 'Here is how your code should look like! Press "run code" and see the magic',
                          messageVec: '8',
                      })

    }

    runCode() {
        const codeInput = this.state.code;

        if (codeInput.includes('background')) {
            const a = codeInput.split('background: ');
            if (!codeInput.includes('background: ')) {
                this.setState({
                                  message: 'Error: You are missing a space after "background:"',
                                  messageVec: '@',
                              })
                return;
            }
            if (!codeInput.includes('{')) {
                this.setState({
                                  message: 'Error: You are missing a "{" in your code...',
                                  messageVec: '&',
                              })
                return;
            }
            if (!codeInput.includes('}')) {
                this.setState({
                                  message: 'Error: You are missing a "}" in your code...',
                                  messageVec: '&',
                              })
                return;
            }
            if (a[1] != null) {
                if (!codeInput.includes(';')) {
                    this.setState({
                                      message: 'Error: You are missing a ";" after your color name',
                                      messageVec: '@',
                                  })
                    return;
                }
                const color = a[1].split(';');
                if (!validateColor(color[0])) {
                    if ((color[0]).includes("(") || (color[0]).includes("%") || (color[0]).includes(
                        "linear-gradient")) {
                        const gradient = (color[0].split(', '));
                        const color1 = gradient[1].split(" ");
                        const color2 = gradient[2].split(" ");
                        if (!validateColor(color1[0]) || !validateColor(color2[0])) {
                            this.setState({
                                              message: 'Error: Almost...but check that your color names has no typos',
                                              messageVec: '@',
                                          })
                            return;

                        }
                        if (gradient[0] != "linear-gradient(to bottom") {

                            this.setState({
                                              message: 'Error: You are almost there!! Make sure "linear-gradient(to bottom" is spelled correctly',
                                              messageVec: '@',
                                          })
                            return;

                        }
                        if (!color1[1].includes("%") || !color2[1].includes("%")) {

                            this.setState({
                                              message: 'Error: You are missing a % symbol in your code',
                                              messageVec: '@',
                                          })
                            return;

                        }
                        this.setState({
                                          input: color[0],
                                          colorInput: {
                                              background: color[0]
                                          },
                                          message: 'Good Job with your code!!',
                                          messageVec: ':',

                                      })
                        firebase.database().ref("users").child(this.props.location.state.user)
                            .child("Module1")
                            .update({lesson1: "complete.png"});
                        return;

                    }
                    this.setState({
                                      message: 'Error: Almost...but check that your color names has no typos',
                                      messageVec: '@',
                                  })
                    return;

                }

                this.setState({
                                  input: color[0],
                                  colorInput: {
                                      background: color[0]
                                  },
                                  message: 'Good Job with your code!!',
                                  messageVec: ':',

                              })
                firebase.database().ref("users").child(this.props.location.state.user)
                    .child("Module1")
                    .update({lesson1: "complete.png"});
            }

            return;
        } else if (codeInput == "") {
            this.setState({

                              message: 'Error: Your code is empty',
                              messageVec: '^',
                          })
            return;
        }
        this.setState({

                          message: 'Error: Make sure that the word "background" is spelled correctly',
                          messageVec: '&',
                      })

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
                              lesson1: snapshot.val().Module1.lesson1,
                          });
        });
        if (this.state.lesson1 == "complete.png") {
            firebase.database().ref("users").child(this.props.location.state.user)
                .update({color: this.state.input})
            this.setState({
                              showSave2: true,
                          })
        } else {
            (

                this.setState({
                                  showSave: true,
                              })

            )
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

    goToNextLesson() {
        this.props.history.push({
                                    pathname: '/lesson2',
                                    state: {user: this.props.location.state.user}
                                })
    }

    copyColor() {

    }

    partOneExpand() {

        if (this.state.showPartOne) {

            this.setState({
                              showPartOne: false
                          });
        } else {
            this.setState({
                              showPartOne: true
                          });
        }
    }

    partTwoExpand() {

        if (this.state.showPartTwo) {

            this.setState({
                              showPartTwo: false
                          });
        } else {
            this.setState({
                              showPartTwo: true
                          });
        }
    }

    partThreeExpand() {

        if (this.state.showPartThree) {

            this.setState({
                              showPartThree: false
                          });
        } else {
            this.setState({
                              showPartThree: true
                          });
        }
    }
    partFourExpand() {

        if (this.state.showPartFour) {

            this.setState({
                              showPartFour: false
                          });
        } else {
            this.setState({
                              showPartFour: true
                          });
        }
    }
    partFiveExpand() {

        if (this.state.showPartFive) {

            this.setState({
                              showPartFive: false
                          });
        } else {
            this.setState({
                              showPartFive: true
                          });
        }
    }

    partSixExpand() {

        if (this.state.showPartSix) {

            this.setState({
                              showPartSix: false
                          });
        } else {
            this.setState({
                              showPartSix: true
                          });
        }
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

                        <h1 id="tittle">Lesson 1: Let's paint our walls with CSS</h1>
                    </div>
                </header>
                {/*<button id="btn-top" onClick={() => this.goToDisplay()}>*/}
                {/*    <div className="vector-main-l">#</div>*/}
                {/*    Exit Lesson*/}
                {/*</button>*/}
                <img id="btn-top" src="exitLesson.png" width="150rem"
                     onClick={() => this.openExitLesson()}/>
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
                {/*<input placeholder="color" name="input" onChange={this.handleInput}/>*/}
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
                        <div id="left-sub-body" style={{marginLeft: "4rem", marginRight: "3rem", overflow:"scroll", paddingBottom:"0"}}>
                            <h1 className="left-sub-body-tittle"
                                style={{marginLeft: "-5rem"}}>Instructions</h1>

                            {/*Part1*/}
                            <div className="row" style={{marginTop:"1rem"}}>
                                <div >
                                    <h4>What is CSS?</h4>
                                </div>
                                <div style={{marginTop: "-1.2rem"}}>
                                    <button type="button" className="code-editor-button"
                                            id="btn-expand" style={{height: "2.2rem"}}
                                            onClick={() => this.partOneExpand()}>
                                        {
                                            this.state.showPartOne ?
                                            <div className="vector2"
                                                 style={{marginTop: "2px"}}>]</div>
                                                                   : null
                                        }
                                        {
                                            !this.state.showPartOne ?
                                            <div className="vector-up"
                                                 style={{marginTop: "-3px"}}>]</div>
                                                                    : null
                                        }

                                    </button>
                                </div>

                            </div>
                            {
                                this.state.showPartOne ?
                                <div className="instruction-text">
                                    <p>Is the language we coders use to style the look of the
                                        websites and applications that we create.</p>
                                </div>

                                                       : null
                            }

                            {/*Part2*/}
                            <div className="row" style={{marginTop:"1rem"}}>
                                <div>
                                    <h4>Things to know before we start</h4>
                                </div>
                                <div style={{marginTop: "-1.2rem"}}>
                                    <button type="button" className="code-editor-button"
                                            id="btn-expand" style={{height: "2.2rem"}}
                                            onClick={() => this.partTwoExpand()}>
                                        {
                                            this.state.showPartTwo ?
                                            <div className="vector2"
                                                 style={{marginTop: "2px"}}>]</div>
                                                                   : null
                                        }
                                        {
                                            !this.state.showPartTwo ?
                                            <div className="vector-up"
                                                 style={{marginTop: "-3px"}}>]</div>
                                                                    : null
                                        }

                                    </button>
                                </div>

                            </div>
                            {
                                this.state.showPartTwo ?
                                <div className="instruction-text">
                                    <p>Is the language we coders use to style the look of the
                                        websites and applications that we create.</p>
                                </div>

                                                       : null
                            }

                            {/*Part3*/}
                            <div className="row" style={{marginTop:"1rem"}}>
                                <div>
                                    <h4>Challenge #1: The basics of Css and color</h4>
                                </div>
                                <div style={{marginTop: "-1.2rem"}}>
                                    <button type="button" className="code-editor-button"
                                            id="btn-expand" style={{height: "2.2rem"}}
                                            onClick={() => this.partThreeExpand()}>
                                        {
                                            this.state.showPartThree ?
                                            <div className="vector2"
                                                 style={{marginTop: "2px"}}>]</div>
                                                                   : null
                                        }
                                        {
                                            !this.state.showPartThree ?
                                            <div className="vector-up"
                                                 style={{marginTop: "-3px"}}>]</div>
                                                                    : null
                                        }

                                    </button>
                                </div>

                            </div>
                            {
                                this.state.showPartThree ?
                                <div className="instruction-text">
                                    <p>Is the language we coders use to style the look of the
                                        websites and applications that we create.</p>
                                </div>

                                                       : null
                            }

                            {/*Part4*/}
                            <div className="row" style={{marginTop:"1rem"}}>
                                <div>
                                    <h4>Challenge #2: Using Hex colors</h4>
                                </div>
                                <div style={{marginTop: "-1.2rem"}}>
                                    <button type="button" className="code-editor-button"
                                            id="btn-expand" style={{height: "2.2rem"}}
                                            onClick={() => this.partFourExpand()}>
                                        {
                                            this.state.showPartFour ?
                                            <div className="vector2"
                                                 style={{marginTop: "2px"}}>]</div>
                                                                   : null
                                        }
                                        {
                                            !this.state.showPartFour ?
                                            <div className="vector-up"
                                                 style={{marginTop: "-3px"}}>]</div>
                                                                    : null
                                        }

                                    </button>
                                </div>

                            </div>
                            {
                                this.state.showPartFour ?
                                <div className="instruction-text">
                                    <p>Is the language we coders use to style the look of the
                                        websites and applications that we create.</p>
                                </div>

                                                       : null
                            }

                            {/*Part5*/}
                            <div className="row" style={{marginTop:"1rem"}}>
                                <div>
                                    <h4>Challenge #3: Creating an ombre effect</h4>
                                </div>
                                <div style={{marginTop: "-1.2rem"}}>
                                    <button type="button" className="code-editor-button"
                                            id="btn-expand" style={{height: "2.2rem"}}
                                            onClick={() => this.partTwoExpand()}>
                                        {
                                            this.state.showPartTwo ?
                                            <div className="vector2"
                                                 style={{marginTop: "2px"}}>]</div>
                                                                   : null
                                        }
                                        {
                                            !this.state.showPartTwo ?
                                            <div className="vector-up"
                                                 style={{marginTop: "-3px"}}>]</div>
                                                                    : null
                                        }

                                    </button>
                                </div>

                            </div>
                            {
                                this.state.showPartTwo ?
                                <div className="instruction-text">
                                    <p>Is the language we coders use to style the look of the
                                        websites and applications that we create.</p>
                                </div>

                                                       : null
                            }

                            {/*Part6*/}
                            <div className="row" style={{marginTop:"1rem"}}>
                                <div>
                                    <h4>Final Tips</h4>
                                </div>
                                <div style={{marginTop: "-1.2rem"}}>
                                    <button type="button" className="code-editor-button"
                                            id="btn-expand" style={{height: "2.2rem"}}
                                            onClick={() => this.partTwoExpand()}>
                                        {
                                            this.state.showPartTwo ?
                                            <div className="vector2"
                                                 style={{marginTop: "2px"}}>]</div>
                                                                   : null
                                        }
                                        {
                                            !this.state.showPartTwo ?
                                            <div className="vector-up"
                                                 style={{marginTop: "-3px"}}>]</div>
                                                                    : null
                                        }

                                    </button>
                                </div>

                            </div>
                            {
                                this.state.showPartTwo ?
                                <div className="instruction-text">
                                    <p>Is the language we coders use to style the look of the
                                        websites and applications that we create.</p>
                                </div>

                                                       : null
                            }


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

                            <div id="preview-container" style={colorInput}>
                                <p id="preview-tittle">Welcome to Isabella's Lab</p>
                                <img src={Door} alt={"Door"} width="270px"/>
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
                            <button type="button" className="code-editor-button"
                                    id="btn-copy" onClick={() => this.copyColor()}>
                                Copy
                            </button>
                        </div>
                                                   : null
                    }

                </div>

            </div>
        )
    }
}

