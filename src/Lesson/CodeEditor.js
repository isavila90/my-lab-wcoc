import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import "../style.css"
import ReactColorPicker from '@super-effective/react-color-picker';
import logo from "../images/logo.png";
import Door from "../images/door.png";
import validateColor from "validate-color";

const { validate } = require('csstree-validator');


export default class CodeEditor extends Component {

    constructor(props) {

        super(props);
        this.state= {
            showPreview:false,
            showInstructions:true,
            showColorPicker:false,
            input:'',
            code:'',
            message: 'Run your code to watch the color of the walls change',
            messageVec: '8',
        }
    }

    handleInputCode = (event) =>{
        event.preventDefault();
        console.log(event.target.value);
        this.setState({
                          code: event.target.value
                      })
        }

    handleError(input) {
        // alert(validate('.hello {padding: 10px; border: 1px', 'demo/example.css'));
        if(!input.includes('background-color') && !input.includes('background')){
            this.setState({
                              message:'Error: Make sure that the word "background" is spelled correctly',
                              messageVec:'&',
                          })
            return;
        }


    }

    resetCode(){
        this.setState({
                          code:"",
                          colorInput: {
                              background: "linear-gradient(to bottom, #ffaf88 0%, #ff99cc 100%)"
                          },
                          message: 'Run your code to watch the color of the walls change',
                          messageVec: '8',
                      })
    }

    helpCode(){
        this.setState({
                          code:".back-container{\n"
                               + "     background: linear-gradient(to bottom, #643cd6 0%, #ff99cc 100%);\n"
                               + " }",
                          message: 'Here is how your code should look like! Press "run code" and see the magic',
                          messageVec: '8',
                      })


    }

    runCode() {
        const codeInput = this.state.code;

      if(codeInput.includes('background')) {
            const a = codeInput.split('background: ');
            if(!codeInput.includes('background: ')) {
                this.setState({
                                  message: 'Error: You are missing a space after "background:"',
                                  messageVec: '@',
                              })
                return;
            }
            if(!codeInput.includes('{')){
                this.setState({
                                  message:'Error: You are missing a "{" in your code...',
                                  messageVec:'&',
                              })
                return;
            }
            if(!codeInput.includes('}')){
                this.setState({
                                  message:'Error: You are missing a "}" in your code...',
                                  messageVec:'&',
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
                if (!validateColor(color[0])){
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
                                          message:'Good Job with your code!!',
                                          messageVec:':',

                                      })

                        return;


                    }
                    this.setState({
                                      message: 'Error: Almost...but check that your color names has no typos',
                                      messageVec: '@',
                                  })
                    return;

            }



                // if(!validateColor(color[0])){
                //     this.setState({
                //                       message: 'Error: Almost...but check that your color name has no typos',
                //                       messageVec: '@',
                //                   })
                //     return;
                // }

                this.setState({
                                  input: color[0],
                                  colorInput: {
                                      background: color[0]
                                  },
                                  message:'Good Job with your code!!',
                                  messageVec:':',

                              })
            }

            return;
        }
        else if(codeInput == ""){
            this.setState({

                              message:'Error: Your code is empty',
                              messageVec:'^',
                          })
            return;
        }
        this.setState({

                          message:'Error: Make sure that the word "background" is spelled correctly',
                          messageVec:'&',
                      })


    }



    showInstructionsFunc() {
        this.setState({
                          showPreview:false,
                          showInstructions:true,
                          showColorPicker:false,
                      })
    }

    showPreviewFunc() {
        this.setState({
                          showPreview:true,
                          showInstructions:false,
                          showColorPicker:false,
                      })
    }

    showColorPickerFunc() {
        this.setState({
                          showPreview:false,
                          showInstructions:false,
                          showColorPicker:true,
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

                       <h1 id="tittle">Lesson 1: Let's paint our walls with CSS</h1>
                   </div>
                </header>

                {/*<input placeholder="color" name="input" onChange={this.handleInput}/>*/}
                    <div id="one_div" className="textarea-wrapper">
                        <textarea id="code-input" value={code} rows="10" cols="100" name="code" onChange={this.handleInputCode}></textarea>
                        <div id="three_div">
                            <button type="button" className="code-editor-button" id="btn-run"
                                    onClick={() =>this.runCode()}><div className="vector2">|</div><div className="text">Run Code</div>
                            </button>
                            <button type="button" style={{marginLeft:"10px"}} className="code-editor-button" id="btn-run"
                                    onClick={() =>this.helpCode()}><div className="vector3">?</div>Help Me
                            </button>
                            <button type="button" className="code-editor-button" id="btn-reset"
                                    onClick={() =>this.resetCode()}><div className="vector">-</div>Reset
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
                                    onClick={() =>this.showInstructionsFunc()}>Instructions
                            </button>
                            <button type="button" className="sub-header-button" id="btn-center"
                                    onClick={() =>this.showColorPickerFunc()}>Color Picker
                            </button>
                            <button type="button" className="sub-header-button"
                                    onClick={() =>this.showPreviewFunc()}>Preview

                            </button>


                        </div>
                        {
                            this.state.showInstructions?
                            <div id="left-sub-body">
                                <h1 className="left-sub-body-tittle">Instructions</h1>
                                <h2>Part a: Use name of color</h2>

                                <h2>Part b: Use hex of color</h2>

                                <h2>Part c: ombre effect</h2>

                            </div>
                                                       :null
                        }
                        {
                            this.state.showPreview?
                            <div id="left-sub-body">
                                <p className="left-sub-body-tittle">Preview
                                    <button type="button" className="code-editor-button"
                                            id="btn-save" onClick={() =>this.resetCode()}>
                                        Save
                                    </button>
                                </p>

                                    <div id="preview-container" style={colorInput}>
                                        <p id="preview-tittle">Welcome to Isabella's Lab</p>
                                        <img src={Door} alt={"Door"} width="270px"/>
                                    </div>
                                </div>
                                                   :null
                        }

                        {
                            this.state.showColorPicker?
                            <div id="left-sub-body">
                                <p className="left-sub-body-tittle">Color Picker</p>
                                <div id="color-pick">
                                    <ReactColorPicker/>

                                </div>
                            </div>
                                                  :null
                        }

                    </div>

            </div>


        )
    }
}

