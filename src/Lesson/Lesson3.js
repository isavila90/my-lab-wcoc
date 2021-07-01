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
            html: "",
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
                console.log("key " + JSON.stringify(snapshot.val().Module1.lesson3));
                this.setState({
                                  lesson3: snapshot.val().Module1.lesson3,
                                  html: snapshot.val().decor,
                              });
            });

        } catch {
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
        const output = "<img src=\"plant.png\"  width=\"100%\"/>\n"
                       + "<h1 style=\"color:purple; background:pink\">Hello</h1>"
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
            firebase.database().ref("users").child(this.props.location.state.user)
                .update({decor: this.state.html});
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
                                    <h4>What is HTML?</h4>
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
                                    <p>HTML helps us structure our Web pages and applications. This
                                        language allows us to use several elements to add and
                                        organize our projects. Through it we can add text, images,
                                        containers, and many other elements. </p>
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
                                    <p style={{textDecoration: "underline"}}>How can we tell html if
                                        we want to add and image or a text?</p>
                                    <p>
                                        We use “tags”. Depending on what we put into these tags is
                                        what’s doing to tell HTML what type of element our we trying
                                        to add.
                                    </p>
                                    <p style={{textDecoration: "underline"}}>How do we use tags?</p>
                                    <p>
                                        When we want to add an element we use a start tag, some
                                        content, and an end tag:
                                    </p>
                                    <img className="img-lesson" src="less112.png"/>
                                    <p>
                                        source: <a
                                        href="https://www.w3schools.com/html/html_intro.asp">w3schools:
                                        Intro to html</a>
                                    </p>
                                </div>

                                                       : null
                            }

                            {/*Part3*/}
                            <div className="row" style={{marginTop: "1rem"}}>
                                <div>
                                    <h4>Challenge #1: Let's add decor using the "img" tag</h4>
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
                                    <p style={{textAlign: "justify"}}>
                                        For this challenge we are going to learn how to use the img
                                        tag. This tag is going to help us add an image to our lab's
                                        door.
                                        The first thing we want to do is add and empty img tag:
                                    </p>
                                    <img className="img-lesson" src="less31.png"/>

                                    <p style={{textAlign: "justify"}}>
                                        The next step is to specify what image are we going to use.
                                        For this we use the "src=" syntax followed by the name of
                                        the image we want to add. Let's add a plant decor by using
                                        the following image name "plant.png".
                                    </p>
                                    <img className="img-lesson" src="less32.png"/>

                                    <p style={{textAlign: "justify"}}>
                                        The last step is to specify the width of the image. For this
                                        step add the following word inside the img tag :
                                        width="100%".Take a second
                                        before you run your code and check that it looks like the
                                        one below:
                                    </p>
                                    <img className="img-lesson" src="less33.png"/>


                                    <p style={{textAlign: "justify"}}>
                                        Our code is ready! Now hit the <img className="img-lesson"
                                                                            src="btnRun.png"
                                                                            style={{height: "40px"}}/>.
                                        And done! This is how your preview window should look like
                                        after you have run your code.
                                    </p>
                                    <img className="img-lesson" src="less34.png"
                                         style={{height: "300px"}}/>
                                </div>

                                                         : null
                            }

                            {/*Part4*/}
                            <div className="row" style={{marginTop: "1rem"}}>
                                <div>
                                    <h4>Challenge #2: Add a banner to out door</h4>
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
                                        For this challenge we are going to learn how to use the h1
                                        tag. This tag is going to help us add an a text banner to
                                        our lab's
                                        door.
                                        The first thing we want to do is add and empty h1 tag:
                                    </p>
                                    <img className="img-lesson" src="less35.png"/>

                                    <p style={{textAlign: "justify"}}>
                                        The next step is to specify what text we want to add to the
                                        banner.
                                        For this we need to write whichever text you want inside the
                                        h1 tag. Let's write hello:
                                    </p>
                                    <img className="img-lesson" src="less36.png"/>

                                    <p style={{textAlign: "justify"}}>
                                        Another awesome thing about h1 tabs is that you can style
                                        them. For example, you can change the color of the letters
                                        and the color of the background. Let's make the letters
                                        purple for this example. You want to add the "style=" word
                                        and then ""color:purple"". This is what your code should
                                        look like:
                                    </p>
                                    <img className="img-lesson" src="less37.png"/>

                                    <p style={{textAlign: "justify"}}>
                                        For the last part let's change the color of the background
                                        banner. For this just add the word "background:pink". Don't
                                        forget to add ";" after the word purple. After you can
                                        substitute any the color for any of the hex colors id from
                                        the color picker tab. Take a second
                                        before you run your code and check that it looks like the
                                        one below:
                                    </p>
                                    <img className="img-lesson" src="less38.png"/>


                                    <p style={{textAlign: "justify"}}>
                                        Our code is ready! Now hit the <img className="img-lesson"
                                                                            src="btnRun.png"
                                                                            style={{height: "40px"}}/>.
                                        And done! This is how your preview window should look like
                                        after you have run your code.
                                    </p>
                                    <img className="img-lesson" src="less39.png"
                                         style={{height: "300px"}}/>

                                    <p style={{textAlign: "justify"}}>
                                        Once you are happy with your color don’t forget to save
                                        it by clicking on<img
                                        className="img-lesson"
                                        src="btnSave.png"
                                        style={{height: "40px"}}/>
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
                                    <p>If the decor of your door is not changing, don’t worry there
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

