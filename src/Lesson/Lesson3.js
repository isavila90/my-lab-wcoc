import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import "../style.css"
import ReactColorPicker from '@super-effective/react-color-picker';
import logo from "../images/logo.png";
import Door from "../images/door.png";
import validateColor from "validate-color";
import firebase from "../utils/firebase";
import Modal from "react-bootstrap/Modal";

export default class Lesson3 extends Component {

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
            html1: <div>
                <img src="deccor2.png" width="150px"/>
                <h1 style="color:red; background:yellow">hi</h1>

            </div>,
            html: ""

        }
    }

    componentDidMount() {
        // this.setState({
        //                   user: this.props.location.state.user,
        //               })
        try{
            console.log("user " + JSON.stringify(this.props.location.state.user))

            const todoRef = firebase.database().ref("users").child(this.props.location.state.user);
            todoRef.on('value', snapshot => {
                console.log("key " + JSON.stringify(snapshot.val().Module1.lesson3));
                this.setState({
                                  lesson3: snapshot.val().Module1.lesson3,
                                  html: snapshot.val().decor,
                              });
            });

        }
        catch {
            this.props.history.push({
                                        pathname: '/redirect',
                                        state: {path: '/lesson3'}
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

        this.setState({
                          code: "",
                          html: ""
                      })
    }

    helpCode() {
        const output = "<img src=\"decor.png\"  width=\"100%\"/>\n"
                       + "<h1 style=\"color:purple; background:pink\">hi</h1>"
        this.setState({
                          code: output,
                          message: 'Here is how your code should look like! Press "run code" and see the magic',
                          messageVec: '8',
                      })

    }

    runCode2() {
        if (this.state.code == "") {
            this.setState({

                              message: 'Error: Your code is empty',
                              messageVec: '^',
                          })
            return;
        }
        const demo = "ABC Results for draw no 2888";

        const color = this.state.code.split('color:').pop().split(';')[0];
        const back = this.state.code.split('background:').pop().split('"')[0];
        if (!validateColor(color) && this.state.code.includes("color")) {
            alert(color);
            this.setState({
                              message: 'Error: Almost...but check that your color name on the color in the h1 tab has no typos',
                              messageVec: '@',
                          })
            return;

        }
        if (!validateColor(back) && this.state.code.includes("background")) {
            this.setState({
                              message: 'Error: Almost...but check that your color name on the background in the h1 tab has no typos',
                              messageVec: '@',
                          })
            return;

        }
        // alert(color);
        // alert(back);
        this.check();
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

    check() {
        const lines = (this.state.code).split("\n");
        for (let i = 0; i < lines.length; i++) {
            const ans = /<(br|basefont|hr|input|source|frame|param|area|meta|!--|col|link|option|base|img|wbr|!DOCTYPE).*?>|<(a|abbr|acronym|address|applet|article|aside|audio|b|bdi|bdo|big|blockquote|body|button|canvas|caption|center|cite|code|colgroup|command|datalist|dd|del|details|dfn|dialog|dir|div|dl|dt|em|embed|fieldset|figcaption|figure|font|footer|form|frameset|head|header|hgroup|h1|h2|h3|h4|h5|h6|html|i|iframe|ins|kbd|keygen|label|legend|li|map|mark|menu|meter|nav|noframes|noscript|object|ol|optgroup|output|p|pre|progress|q|rp|rt|ruby|s|samp|script|section|select|small|span|strike|strong|style|sub|summary|sup|table|tbody|td|textarea|tfoot|th|thead|time|title|tr|track|tt|u|ul|var|video).*?<\/\2>/i.test(
                lines[i]);
            // alert(ans + " " + lines[i]);
            if (!ans) {
                if (lines[i].includes("img")) {
                    const count1 = (lines[i].match(/</g) || []).length;
                    if (count1 == 1) {
                        const count2 = (lines[i].match(/>/g) || []).length;
                        if (count2 == 1) {
                            if (lines[i].includes("src")) {
                                this.setState({
                                                  message: "there is something wrong with the img tag",
                                                  messageVec: '&',
                                              })
                                return;

                            } else {
                                this.setState({
                                                  message: 'check that \'src\' is correctly spelled',
                                                  messageVec: '&',
                                              })
                                return;
                            }

                        } else {
                            this.setState({
                                              message: 'Error: you are missing > in your img tag...',
                                              messageVec: '&',
                                          })
                            return;
                        }

                    } else {
                        this.setState({
                                          message: "Error: you are missing < in your img tag",
                                          messageVec: '&',
                                      })
                        return;
                    }

                }

                if (lines[i].includes("h1")) {

                    const count1 = (lines[i].match(/</g) || []).length;
                    if (count1 == 2) {
                        const count2 = (lines[i].match(/>/g) || []).length;
                        if (count2 == 2) {
                            if (lines[i].includes("style")) {
                                this.setState({
                                                  message: "Error: there is something wrong with the h1 tag",
                                                  messageVec: '&',
                                              })
                                return;

                            } else {
                                this.setState({
                                                  message: "Error: check that 'style' is correctly spelled",
                                                  messageVec: '&',
                                              })
                                return;
                            }

                        } else {
                            this.setState({
                                              message: "Error: you are missing > in your img tag",
                                              messageVec: '&',
                                          })
                            return;
                        }

                    } else {
                        this.setState({
                                          message: "Error: You are missing < in your img tag",
                                          messageVec: '&',
                                      })
                        return;
                    }
                }
            }

        }
        this.setState({
                          html: this.state.code,
                          message: 'Good Job with your code!!',
                          messageVec: ':',

                      })
        firebase.database().ref("users").child(this.props.location.state.user).child("Module1")
            .update({lesson3: "complete.png"});
        return;
    }

    saveCode() {

        const todoRef = firebase.database().ref("users").child(this.props.location.state.user);
        todoRef.on('value', snapshot => {
            console.log("key " + JSON.stringify(snapshot.val().color));
            this.setState({
                              lesson3: snapshot.val().Module1.lesson3,
                          });
        });
        if (this.state.lesson3 == "complete.png") {
            firebase.database().ref("users").child(this.props.location.state.user).update({decor: this.state.html});
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

    goToPrevLesson() {
        this.props.history.push({
                                    pathname: '/lesson2',
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

            <div className="main-container" style={colorInput}>
                <header>
                    <div><img src={logo} alt={"Logo"} width="300px"/></div>

                    <div id="top-banner">

                        <h1 id="tittle">Lesson 3: Let's decorate your door with HTML</h1>
                    </div>
                </header>
                <img id="btn-top" src="exitLesson.png" width="150rem"
                     onClick={() => this.openExitLesson()}/>
                <button id="btn-left" onClick={() => this.goToPrevLesson()}>
                    <div className="vector-main-l">=</div>
                    Go to previous lesson
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
                                onClick={() => this.runCode2()}>
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

                            <div id="preview-container" style={colorInput}>
                                <p id="preview-tittle">Welcome to Isabella's Lab</p>
                                <img src={Door} alt={"Door"} width="300px"/>

                                <div id="decoration-door-prev"
                                     dangerouslySetInnerHTML={{__html: this.state.html}}>
                                </div>
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

