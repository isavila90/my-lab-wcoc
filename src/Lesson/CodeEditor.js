import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import "../style.css"



export default class createGroceryItem extends Component {

    constructor(props) {
        super(props);
        this.state= {
            showPreview:false,
            showInstructions:true,
            showColorPicker:false,
            input:'',
        }
    }

    handleInputCode = (event) =>{
        event.preventDefault();
        console.log(event.target.value);
        const x = event.target.value;

        if(x.includes('background-color')) {
            const a = x.split('background-color: ');
            if(a[1] != null) {
                const color = a[1].split(';');
                this.setState({
                                  input: color[0],
                                  colorInput: {
                                      backgroundColor: color[0]
                                  }
                              })
            }
        }
        else if(x.includes('background')) {
            const a = x.split('background: ');
            if (a[1] != null) {
                const color = a[1].split(';');
                this.setState({
                                  input: color[0],
                                  colorInput: {
                                      background: color[0]
                                  }
                              })
            }
        }

    }

    runCode() {






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

        return (

            <div className="main-container" style={colorInput}>
                <header>
                    <h1 id="tittle">Lesson 1</h1>
                    <h1 id="tittle">Let's paint our walls with CSS</h1>
                </header>

                {/*<input placeholder="color" name="input" onChange={this.handleInput}/>*/}
                <h2>{input}</h2>

                    <div id="one_div" className="textarea-wrapper">
                        <textarea id="code-input" rows="10" cols="100" name="input" onChange={this.handleInputCode}></textarea>
                        <div id="three_div">
                            <button type="button" className="code-editor-button" id="btn-run"
                                    onClick={() =>this.showPreviewFunc()}>Run Code
                            </button>
                            <button type="button" className="code-editor-button" id="btn-reset"
                                    onClick={() =>this.showPreviewFunc()}>Reset Code
                            </button>
                        </div>
                        <div id="four_div">Errors</div>

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
                            <div id="left-sub-body">Instructions</div>
                                                       :null
                        }
                        {
                            this.state.showPreview?
                            <div id="left-sub-body">Preview</div>
                                                   :null
                        }

                        {
                            this.state.showColorPicker?
                            <div id="left-sub-body">Color Picker</div>
                                                  :null
                        }

                    </div>

            </div>


        )
    }
}

