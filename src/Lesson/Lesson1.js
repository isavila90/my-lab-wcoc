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
            showExpand: false,

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

    expandAll() {

        if (this.state.showExpand) {

            this.setState({
                              showExpand: false,
                              showPartOne: false,
                              showPartTwo: false,
                              showPartThree: false,
                              showPartFour: false,
                              showPartFive: false,
                              showPartSix: false,
                          });
        } else {
            this.setState({
                              showExpand: true,
                              showPartOne: true,
                              showPartTwo: true,
                              showPartThree: true,
                              showPartFour: true,
                              showPartFive: true,
                              showPartSix: true,
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
                        <div id="left-sub-body" style={{
                            marginLeft: "4rem",
                            marginRight: "3rem",
                            overflow: "scroll",
                            paddingBottom: "0"
                        }}>
                            <div className="row">

                                <h1 className="left-sub-body-tittle" style={{
                                    marginLeft: "12rem",
                                    marginRight: "3rem",
                                }}>
                                    Instructions
                                </h1>
                                <button type="button" className="code-editor-button"
                                        id="btn-save" style={{
                                    marginTop: "-1rem", height: "2rem"

                                }} onClick={() => this.expandAll()}>
                                    {
                                        !this.state.showExpand ?
                                        <div style={{
                                            marginTop: "-0.2rem"
                                        }}>Show all</div>
                                                               : null}
                                    {
                                        this.state.showExpand ?
                                        <div style={{
                                            marginTop: "-0.2rem"
                                        }}>Hide all</div>
                                                              : null}
                                </button>
                            </div>
                            {/*Part1*/}
                            <div className="row" style={{marginTop: "1rem"}}>
                                <div>
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
                            <div className="row" style={{marginTop: "1rem"}}>
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
                                    <p style={{textDecoration: "underline"}}>How do we tell CSS what
                                        element to style?</p>
                                    <p>
                                        This is a very interesting question. Every element in our
                                        webpage or application has an id that lets CSS know what
                                        element we want to style.
                                    </p>
                                </div>

                                                       : null
                            }

                            {/*Part3*/}
                            <div className="row" style={{marginTop: "1rem"}}>
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
                                    <p style={{textAlign: "justify"}}>For this first challenge let’s
                                        start simple! We are going to
                                        paint our walls “purple”.
                                        Like we said before, the first thing we want to do is
                                        specify the name or id of the element we want to change. In
                                        this case, the name of our wall is “back-container”. Go to
                                        your left side and type inline “1” the name. Before we
                                        forget we always have to add a “.” before the name of the
                                        element. Your code should look like this:
                                    </p>
                                    <img className="img-lesson" src="less11.png"/>
                                    <p style={{textAlign: "justify"}}>The second step is to add some
                                        curly brackets ({}) that will
                                        contain all of our style specifications. </p>
                                    <img className="img-lesson" src="less12.png"/>
                                    <p style={{textAlign: "justify"}}>The next part is the most
                                        important because is where the
                                        magic happens! We get to tell CSS the color we want to paint
                                        our walls. First, write on line 2 the word “background”,
                                        this will tell the application we are trying to change the
                                        style of the background for the “back-container element”,
                                        then we write the name of the color we want to use, in this
                                        case, “purple” followed by a semi-colon (;). Take a second
                                        before you run your code and check that it looks like the
                                        one below:</p>
                                    <img className="img-lesson" src="less13.png"/>
                                    <p style={{textAlign: "justify"}}>
                                        Our code is ready! Now hit the <img className="img-lesson"
                                                                            src="btnRun.png"
                                                                            style={{height: "40px"}}/>.
                                        And done! We have a
                                        beautiful purple wall. If you want to see a preview of your
                                        wall, click on the Preview button on the top of the left
                                        screen. This is how your preview window should look like
                                        after you have run your code.
                                    </p>
                                    <img className="img-lesson" src="less14.png"
                                         style={{height: "300px"}}/>
                                </div>

                                                         : null
                            }

                            {/*Part4*/}
                            <div className="row" style={{marginTop: "1rem"}}>
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
                                    <p>Now that we have successfully change the color of our walls
                                        let's practice another way of specifying the color in CSS.
                                        For this second challenge, we are going to use what is
                                        called “Hex color”.

                                    </p>
                                    <p style={{textDecoration: "underline"}}>What is a "Hex
                                        color"?</p>
                                    <p>This is a representation of colors
                                        using a 6-digit combination of numbers and letters. </p>

                                    <p style={{textDecoration: "underline"}}>What do
                                        these numbers represent? </p>
                                    <p>Well, they define the mix of red,
                                        green, and blue. You can observe how the hex colors work by
                                        clicking on the Color Picker button on the top of the left
                                        screen.</p>

                                    <img className="img-lesson" src="less15.png"
                                         style={{height: "300px"}}/>

                                    <p>For our challenge let’s paint our walls turquoise. The hex
                                        color for turquoise is #3cd6bf. You can use the code from
                                        the previous challenge, just
                                        substitute the word “purple” for #3cd6bf:</p>
                                    <img className="img-lesson" src="less16.png"/>
                                    <p> When you are done hit <img
                                        className="img-lesson"
                                        src="btnRun.png"
                                        style={{height: "40px"}}/>.</p>
                                    <img className="img-lesson" src="less17.png"
                                         style={{height: "300px"}}/>

                                    <p> You can try any color you want! Just substitute the word
                                        “purple” with any color you want! Just type the name of your
                                        favorite color like “red”, “blue”, “yellow” or use the color
                                        picker to find the hex of the color, and don’t forget to hit
                                        run. Once you are happy with your color don’t forget to save
                                        it by clicking on<img
                                            className="img-lesson"
                                            src="btnSave.png"
                                            style={{height: "40px"}}/>.</p>

                                </div>

                                                        : null
                            }

                            {/*Part5*/}
                            <div className="row" style={{marginTop: "1rem"}}>
                                <div>
                                    <h4>Challenge #3: Creating an ombre effect</h4>
                                </div>
                                <div style={{marginTop: "-1.2rem"}}>
                                    <button type="button" className="code-editor-button"
                                            id="btn-expand" style={{height: "2.2rem"}}
                                            onClick={() => this.partFiveExpand()}>
                                        {
                                            this.state.showPartFive ?
                                            <div className="vector2"
                                                 style={{marginTop: "2px"}}>]</div>
                                                                    : null
                                        }
                                        {
                                            !this.state.showPartFive ?
                                            <div className="vector-up"
                                                 style={{marginTop: "-3px"}}>]</div>
                                                                     : null
                                        }

                                    </button>
                                </div>

                            </div>
                            {
                                this.state.showPartFive ?
                                <div className="instruction-text">
                                    <p>For our final challenge let's try to paint or walls ombre (2
                                        colors). For this step, you need to choose 2 colors. Let’s
                                        use the 2 colors we use in challenges #1 and #2. Instead of
                                        writing just the color in our code, we need to write the
                                        following word “linear-gradient” followed by an open and
                                        closed parenthesis (). </p>
                                    <img className="img-lesson" src="less18.png"
                                         style={{height: "100px"}}/>
                                    <p>Inside the parenthesis, we first need to code the orientation
                                        of our ombre effect, let us do a vertical effect. Write the
                                        words “to bottom” inside the parenthesis followed by a comma
                                        (,) then we have to give the first color in our case
                                        “purple” followed by “0%” and another come (,). This last
                                        part is what’s going to allow CSS to make the ombre
                                        magic.</p>
                                    <img className="img-lesson" src="less19.png"/>
                                    <p>Last but not least we type the second color #3cd6bf followed
                                        by “100%”. </p>
                                    <img className="img-lesson" src="less110.png"/>
                                    <p>We are finished, now <img
                                        className="img-lesson"
                                        src="btnRun.png"
                                        style={{height: "40px"}}/>, and let us see our amazing ombre
                                        wall.</p>
                                    <img className="img-lesson" src="less111.png"
                                         style={{height: "300px"}}/>
                                </div>

                                                        : null
                            }

                            {/*Part6*/}
                            <div className="row" style={{marginTop: "1rem"}}>
                                <div>
                                    <h4>Final Tips</h4>
                                </div>
                                <div style={{marginTop: "-1.2rem"}}>
                                    <button type="button" className="code-editor-button"
                                            id="btn-expand" style={{height: "2.2rem"}}
                                            onClick={() => this.partSixExpand()}>
                                        {
                                            this.state.showPartSix ?
                                            <div className="vector2"
                                                 style={{marginTop: "2px"}}>]</div>
                                                                   : null
                                        }
                                        {
                                            !this.state.showPartSix ?
                                            <div className="vector-up"
                                                 style={{marginTop: "-3px"}}>]</div>
                                                                    : null
                                        }

                                    </button>
                                </div>

                            </div>
                            {
                                this.state.showPartSix ?
                                <div className="instruction-text">
                                    <p>If the color of your walls is not changing, don’t worry there
                                        are a few things you can do to make sure your code has no
                                        mistakes. CSS is very sensitive to every character you type
                                        so if your code is not running there may be something
                                        missing. First, check the bottom of the right screen, most
                                        likely it will tell you what is wrong with your code. If
                                        this doesn’t work, click on <img
                                            className="img-lesson"
                                            src="btnReset.png"
                                            style={{height: "40px"}}/> and start the lesson from the
                                        beginning. Finally, if all this fails click on <img
                                            className="img-lesson"
                                            src="btnHelp.png"
                                            style={{height: "40px"}}/> and the
                                        correct code will appear on the screen.</p>
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

