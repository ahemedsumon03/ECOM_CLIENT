import React, {Component, Fragment} from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import validation from "../../validation/validation";
import axios from "axios";
import cogoToast from 'cogo-toast';
class Contact extends Component {

    constructor() {
        super();
        this.state={
            name:"",
            mobile:"",
            msg:""
        }
    }


    nameOnChange=(event)=>{
      let name=  event.target.value;
      this.setState({name:name})
    }

    mobileOnChange=(event)=>{
        let mobile=  event.target.value;
        this.setState({mobile:mobile})
    }
    msgOnChange=(event)=>{
        let msg=  event.target.value;
        this.setState({msg:msg})
    }

    onFormSubmit=(event)=>{

        let name=this.state.name;
        let mobile=this.state.mobile;
        let msg=this.state.msg;
        let sendBtn=document.getElementById('sendBtn');
        let contactForm=document.getElementById('contactForm');

        if(name.length==0){
            cogoToast.error('Name is Required', {position:"bottom-center"})
        }
        else if(mobile.length==0){
            cogoToast.error('Mobile number Required', {position:"bottom-center"})
        }

        else if(!(validation.NameRegx).test(name)){
            cogoToast.error('Invalid name', {position:"bottom-center"})
        }
        else if(!(validation.MobileRegx).test(mobile)){
            cogoToast.error('Invalid mobile number', {position:"bottom-center"})
        }
        else if(msg.length==0){
            cogoToast.error('Please write your message ', {position:"bottom-center"})
        }
        else{
            sendBtn.innerHTML="Sending...";
            let MyFormData=new FormData();
            MyFormData.append("name",name)
            MyFormData.append("phone",mobile)
            MyFormData.append("message",msg)

            axios.post('http://127.0.0.1:8000/api/SendContactData',MyFormData).then(function (response) {
                if(response.status==200 && response.data==1){
                    cogoToast.success('Request Success', {position:"bottom-center"})
                    sendBtn.innerHTML="Send";
                    contactForm.reset();
                }
                else{
                    cogoToast.success('Request Fail ! Try Again', {position:"bottom-center"})
                    sendBtn.innerHTML="Send"
                }
            }).catch(function (error) {
                cogoToast.success('Request Fail ! Try Again', {position:"bottom-center"})
                sendBtn.innerHTML="Send"
            })
        }


        event.preventDefault();
    }


    render() {
        return (
            <Fragment>
                <Container className="TopSection">
                    <Row className="p-2">
                        <Col className="shadow-sm bg-white mt-2" md={12} lg={12} sm={12} xs={12}>
                            <Row className="text-center ">
                                <Col className="d-flex justify-content-center" md={6} lg={6} sm={12} xs={12}>
                                    <Form id="contactForm" onSubmit={this.onFormSubmit}  className="onboardForm">
                                        <h4 className="section-title">CONTACT WITH US</h4>
                                        <h6 className="section-sub-title">Please Enter Your Mobile No, And Go Next</h6>
                                        <input onChange={this.nameOnChange}  className="form-control m-2" type="text" placeholder="Your Name"/>
                                        <input onChange={this.mobileOnChange} className="form-control m-2" type="text" placeholder="Mobile Number"/>
                                        <input onChange={this.msgOnChange} className="form-control m-2" type="text" placeholder="Message"/>
                                        <Button id="sendBtn" type="submit" className="btn btn-block m-2 site-btn">Send</Button>
                                    </Form>
                                </Col>
                                <Col className="p-0 Desktop m-0" md={6} lg={6} sm={6} xs={6}>
                                    <iframe className="GoogleMap" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3640.1136244605523!2d89.6869369143966!3d24.16774757862275!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fddfc2837915cd%3A0xa4b0eed959e872c!2sKaizuri%20Bazar%20Mosque!5e0!3m2!1sbn!2sbd!4v1625414219255!5m2!1sbn!2sbd"></iframe>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        );
    }
}

export default Contact;