import React, {Component, Fragment} from 'react';
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {Link, Redirect} from "react-router-dom";
import CogoToast from "cogo-toast";
import axios from "axios";
import SessionHelper from "../../SessionHelper/SessionHelper";

class UserOnboard extends Component {

    constructor() {
        super();
        this.state = {
            name:'',
            password:'',
            UserRedirect:false,
        }
    }

    nameOnChange=(event)=>{
        this.setState({name:event.target.value})
    }

    passwordOnChange=(event)=>{
        this.setState({password:event.target.value})
    }

    userSignIn=()=>{
        let name = this.state.name;
        let password = this.state.password;


        if(name.length == 0)
        {
            CogoToast.error('Please enter your name',{position:"bottom-center"});
        }
        else if(password.length == 0)
        {
            CogoToast.error('Please enter your password',{position:"bottom-center"});
        }
        else {
            let myData = {
                name:name,
                password:password
            }

            axios.post('http://127.0.0.1:8000/api/GetUser',myData).then(response=>{
                if(response.status == 200 && response.data ==1)
                {
                    SessionHelper.setUserName(name);
                    CogoToast.success('User Login Success',{position:"bottom-center"})
                    this.setState({UserRedirect:true})
                }else {
                    CogoToast.error('No account Found',{position:"bottom-center"})
                }
            }).catch(error=>{
                CogoToast.error('No account Found',{position:"bottom-center"})
            });
        }
    }

    UserRedirect=()=>{

        if(this.state.UserRedirect === true)
        {
            let winlocation = SessionHelper.getPreviouspath();
            if(winlocation == null)
            {
                return (
                    <Redirect to="/"/>
                )
            }else {
                return (
                    <Redirect to={winlocation}/>
                )
            }
        }
    }

    render() {
        return (
            <Fragment>
                <Container className="TopSection animate__animated animate__slideInDown animate">
                    <Row className="p-2">
                        <Col className="shadow-sm bg-white mt-2" md={12} lg={12} sm={12} xs={12}>
                            <Row className="text-center ">
                                <Col className="d-flex justify-content-center" md={6} lg={6} sm={12} xs={12}>
                                    <div className="onboardForm">
                                        <h4 className="section-title">USER SING IN</h4>
                                        <h6 className="section-sub-title">Please Enter Your User name, And Password Go Login</h6>
                                        <input onChange={this.nameOnChange} className="form-control m-2" type="text" placeholder="Enter User Name"/>
                                        <input onChange={this.passwordOnChange} className="form-control m-2" type="text" placeholder="Enter User Password"/>
                                        <button onClick={this.userSignIn} n className="btn btn-block m-2 site-btn">Login</button>
                                        <h6 className="section-sub-title">If you are not register yet then please sign up and then login</h6>
                                        <Link to="/onsignup" className="btn btn-block m-2 site-btn">Sign Up</Link>
                                    </div>
                                </Col>
                                <Col className="p-0 Desktop m-0" md={6} lg={6} sm={6} xs={6}>
                                    <img className="onboardBanner" src="Images/otppagebanner.png"/>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
                {this.UserRedirect()}
            </Fragment>
        );
    }
}

export default UserOnboard;