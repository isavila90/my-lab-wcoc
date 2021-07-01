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
                console.log("key " + JSON.stringify(snapshot.val().Module1.lesson2));
                this.setState({
                                  lesson2: snapshot.val().Module1.lesson2,
                                  colorInput: {
                                      backgroundImage: snapshot.val().wallpaper,
                                      backgroundColor: "#ffaf88"
                                  },

                              });
            });
        } catch {
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
                                    <h4>Challenge #1: let's add an image to our wallpaper</h4>
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
                                        add a pre-saved image from our app! We are going to create
                                        an ice-cream wallpaper.
                                        Like we said before, the first thing we want to do is
                                        specify the name or id of the element we want to change. In
                                        this case, the name of our wall is “back-container”. Go to
                                        your left side and type inline “1” the name. Before we
                                        forget we always must add a “.” before the name of the
                                        element. Your code should look like this:

                                    </p>
                                    <img className="img-lesson" src="less11.png"/>
                                    <p style={{textAlign: "justify"}}>The second step is to add some
                                        curly brackets ({}) that will
                                        contain all of our style specifications. </p>
                                    <img className="img-lesson" src="less12.png"/>


                                    <p style={{textAlign: "justify"}}>The next part is the most
                                        important because is where the magic happens! We get to tell
                                        CSS the image we want to add to our walls. First, write on
                                        line 2 the word “background-image”, this will tell the
                                        application we are trying to add an image to the background
                                        of the “back-container element”, then you want to add the
                                        following word: “url(‘’);”. Your code should look like this:
                                    </p>
                                    <img className="img-lesson" src="less21.png"/>

                                    <p style={{textAlign: "justify"}}> The next step is to add the
                                        name of the image inside the URL parenthesis. Since we are
                                        creating an ice-cream wallpaper add the word “iceCream.png”.
                                        Take a second
                                        before you run your code and check that it looks like the
                                        one below:
                                    </p>
                                    <img className="img-lesson" src="less22.png"/>


                                    <p style={{textAlign: "justify"}}>
                                        Our code is ready! Now hit the <img className="img-lesson"
                                                                            src="btnRun.png"
                                                                            style={{height: "40px"}}/>.
                                        And done! We have a
                                        beautiful ice-cream wallpaper. If you want to see a preview
                                        of your
                                        wall, click on the Preview button on the top of the left
                                        screen. This is how your preview window should look like
                                        after you have run your code.
                                    </p>
                                    <img className="img-lesson" src="less23.png"
                                         style={{height: "300px"}}/>
                                </div>

                                                         : null
                            }

                            {/*Part4*/}
                            <div className="row" style={{marginTop: "1rem"}}>
                                <div>
                                    <h4>Challenge #2: Let's choose an image from internet</h4>
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

                                    <p style={{textAlign: "justify"}}>
                                        The great thing about CSS is that we can choose whatever
                                        image we want for our background. For this challenge let’s
                                        pick an image from the internet. Go to your favorite search
                                        engine a find search for an image you want to add to your
                                        wallpaper. After you have found the image, you want to add
                                        to you wallpaper you can click the right button of your
                                        mouse a click on copy image address. After you have
                                        successfully copied substitute the word “iceCream.png” for
                                        the image address you copied.
                                    </p>

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
                                    <p>If the image of your walls is not changing, don’t worry there
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

