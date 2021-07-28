import React, {Component,Fragment} from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";
import CogoToast from 'cogo-toast';
import axios from "axios";
import {Redirect} from "react-router-dom";

class UserOnSignUp extends Component {

    constructor() {
        super();
        this.state = {
            name:'',
            email:'',
            password:'',
        }
    }

    // PageRedirect=()=>{
    //     return (
    //         <Redirect to='/onboard'/>
    //     )
    // }

    usernameHandle=(event)=>{
        this.setState({name:event.target.value})
    }

    useremailHandle=(event)=>{
        this.setState({email:event.target.value})
    }

    userpasswordHandle=(event)=>{
        this.setState({password:event.target.value})
    }

    signUpHandle=()=>{
        let name = this.state.name;
        let email = this.state.email;
        let password = this.state.password;

        if(name.length == 0)
        {
            CogoToast.error('Please enter your name',{position:"bottom-center"});
        }
        else if(email.length == 0){
            CogoToast.error('Please enter your email',{position:"bottom-center"});
        }
        else if(password.length == 0){
            CogoToast.error('Please enter your password',{position:"bottom-center"});
        }else {
            let myData = {
                name:name,
                email:email,
                password:password
            }

            axios.post('http://127.0.0.1:8000/api/AddUser',myData).then(response=>{
                if(response.status == 200 && response.data == 1)
                {
                    CogoToast.success('User Registration Success',{position:"bottom-center"})
                    window.location('/');
                }else if(response.data === -1)
                {
                    CogoToast.error('User Already Exists..pls try new',{position:"bottom-center"})
                }
                else {
                    CogoToast.error('User Registration Fail',{position:"bottom-center"})
                }
            }).catch(error=>{
                CogoToast.error('User Registration Fail',{position:"bottom-center"})
            });
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
                                        <h4 className="section-title">USER SING UP</h4>
                                        <h6 className="section-sub-title">Please Enter Your User name,Password,Email and then Sign Up</h6>
                                        <input onChange={this.usernameHandle} className="form-control m-2" type="text" placeholder="Enter User Name"/>
                                        <input onChange={this.useremailHandle} className="form-control m-2" type="text" placeholder="Enter User Email"/>
                                        <input onChange={this.userpasswordHandle} className="form-control m-2" type="text" placeholder="Enter User Password"/>
                                        <button id='btn' onClick={this.signUpHandle} className="btn btn-block m-2 site-btn">Sign Up</button>
                                    </div>
                                </Col>
                                <Col className="p-0 Desktop m-0" md={6} lg={6} sm={6} xs={6}>
                                    <img className="onboardBanner" src="Images/otppagebanner.png"/>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        );
    }
}

export default UserOnSignUp;