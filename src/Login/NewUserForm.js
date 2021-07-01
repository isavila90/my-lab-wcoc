import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import "../style.css"
import { Redirect } from 'react-router';
import logo from "../images/logo.png";
import firebase from "../utils/firebase";


export default class NewUserForm extends Component {

    constructor(props) {

        super(props);
        this.state = {
            email: "",
            instructor: "",
            lastName: "",
            name: "",
            password: "",
            username: "",
        }
    }

    handleInput = (event) =>{
        event.preventDefault();
        console.log(event.target.value);
        this.setState({
                          [event.target.name]: event.target.value

                      })
    }

    addUser (){

        const todoRef = firebase.database().ref("users");
        const module ={
            lesson1: "incomplete.png",
            lesson2: "incomplete.png",
            lesson3: "incomplete.png"

        }
        const item ={
            Module1: module,
            color:"",
            decor:"",
            email: this.state.email,
            instructor: this.state.privilege,
            lastName: this.state.lastName,
            name: this.state.name,
            password: this.state.password,
            username: this.state.username,
            wallpaper: "",

        }
        todoRef.push(item);




    }

    render() {
        const {email} = this.state
        const {instructor} = this.state
        const {lastName} = this.state
        const {name} = this.state
        const {password} = this.state
        const {username} = this.state

        return (
            <div className="main-container">

                <header>
                    <div id="top-banner">

                        <div style={{marginTop: "-10px"}}><img src={logo} alt={"Logo"}
                                                               width="300px"/></div>
                        <h1 id="tittle2" style={{fontSize: "4rem"}}>New user Form</h1>
                    </div>
                </header>
                <div style={{padding: "2rem"}}>
                <form style={{marginLeft: "32rem"}}>
                    <div className="row" >
                        <h5 style={{marginRight:"1rem", marginTop:"0.5rem", color:"white", fontFamily:"MoreSugar", fontSize:"1.5rem"}} >Name:</h5>
                        <input type="text" className="form-control form-font"
                               name="name" onChange={this.handleInput} style={{width: "30%"}}/>
                    </div>
                    <div className="row" style={{marginTop:"1rem"}}>
                        <h5 style={{marginRight:"1rem", marginTop:"0.5rem", color:"white", fontFamily:"MoreSugar", fontSize:"1.5rem"}} >Last Name:</h5>
                        <input type="text" className="form-control form-font"
                               name="lastName" onChange={this.handleInput} style={{width: "30%"}}/>
                    </div>
                    <div className="row" style={{marginTop:"1rem"}}>
                        <h5 style={{marginRight:"1rem", marginTop:"0.5rem", color:"white", fontFamily:"MoreSugar", fontSize:"1.5rem"}} >Email:</h5>
                        <input type="text" className="form-control form-font"
                               name="email" onChange={this.handleInput} style={{width: "30%"}}/>
                    </div>
                    <div className="row" style={{marginTop:"1rem"}}>
                        <h5 style={{marginRight:"1rem", marginTop:"0.5rem", color:"white", fontFamily:"MoreSugar", fontSize:"1.5rem"}} >Username:</h5>
                        <input type="text" className="form-control form-font"
                               name="username" onChange={this.handleInput} style={{width: "30%"}}/>
                    </div>
                    <div className="row" style={{marginTop:"1rem"}}>
                        <h5 style={{marginRight:"1rem", marginTop:"0.5rem", color:"white", fontFamily:"MoreSugar", fontSize:"1.5rem"}} >Password:</h5>
                        <input type="text" className="form-control form-font"
                               name="password" onChange={this.handleInput} style={{width: "30%"}}/>
                    </div>
                    <div className="row" style={{marginTop:"1rem"}}>
                        <h5 style={{marginRight:"1rem", marginTop:"0.5rem", color:"white", fontFamily:"MoreSugar", fontSize:"1.5rem"}} >Privilege:</h5>
                        <select className="form-control form-font" name="privilege" onChange={this.handleInput} style={{width: "30%"}}>
                            <option value="true">Instructor</option>
                            <option value="false">Not instructor</option>
                        </select>

                    </div>




                </form>
                    <button id="btn-run" style={{marginTop:"3rem", fontSize:"2rem"}} onClick={() => this.addUser()}> Add new User</button>
                </div>
            </div>


        )
    }
}