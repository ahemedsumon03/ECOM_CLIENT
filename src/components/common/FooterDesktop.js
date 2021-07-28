import React, {Component,Fragment} from 'react';
import {Container, Col, Row, Card} from "react-bootstrap";
import {Link} from "react-router-dom";
class FooterDesktop extends Component {

    constructor() {
        super();
        this.state={
            footerData:"",
            androidLink:"",
            iosLink:"",
            facebookLink:"",
            twitterLink:"",
            instagramLink:"",
            address:"",
            aboutCompany:"",
            deliveryNotice:"",
            loaderDiv:"",
            mainDiv:"d-none",
        }
    }

    render() {
        return (
                <div className="m-0 bg-white mt-5 pt-3 shadow-sm">
                    <div className={this.state.mainDiv}>
                        <div className="ph-item">
                            <div className="ph-col-12">
                                <div className="ph-row">
                                    <div className="ph-col-12"></div>
                                    <div className="ph-col-12"></div>
                                    <div className="ph-col-12"></div>
                                    <div className="ph-col-12"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <Container>
                            <Row className="px-0 my-5">
                                <Col className="p-2" lg={3} md={3} sm={6} xs={12}>
                                    <h5 className="footer-menu-title">ABOUT COMPANY</h5>
                                    <p>on the left are linked together and the changes are reflected in the other one as you type</p>
                                    <h5 className="footer-menu-title">SOCIAL LINK</h5>
                                    <a target="_blank"><i className="fab m-1 h4 fa-facebook"></i></a>
                                    <a target="_blank"><i className="fab m-1 h4 fa-instagram"></i></a>
                                    <a target="_blank"><i className="fab m-1 h4 fa-twitter"></i></a>
                                </Col>
                                <Col className="p-2" lg={3} md={3} sm={6} xs={12}>
                                    <h5 className="footer-menu-title">THE COMPANY</h5>
                                    <Link to="/about" className="footer-link">About Us</Link><br/>
                                    <Link to="/contact" className="footer-link">Contact Us</Link><br/>

                                    <h5 className="footer-menu-title mt-3">OFFICE ADDRESS</h5>
                                    <p>Shekhertek 8,Mohammadpur, Adabor, Dhaka-1207, 01774688159 (Help-Line) Engr.Rabbil@yahoo.com</p>
                                </Col>
                                <Col className="p-2" lg={3} md={3} sm={6} xs={12}>
                                    <h5 className="footer-menu-title">MORE INFO</h5>
                                    <Link to="/purchase" className="footer-link">How To Purchase</Link><br/>
                                    <Link to="/policy" className="footer-link">Privacy Policy</Link><br/>
                                    <Link  to="/refund" className="footer-link">Refund Policy</Link><br/>
                                </Col>
                                <Col className="p-2" lg={3} md={3} sm={6} xs={12}>
                                    <h5 className="footer-menu-title">DOWNLOAD APP</h5>
                                    <a target="_blank" ><img className="" src="Images/apple.png"/></a><br/>
                                    <a target="_blank" ><img className="mt-2" src="Images/playstore.png"/></a>
                                </Col>
                            </Row>

                        </Container>
                        <Container fluid={true} className=" m-0 pt-3 pb-1 bg-dark">
                            <Container className="">
                                <Row className="px-0 text-white">
                                    <p>Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book.</p>
                                </Row>
                            </Container>
                        </Container>
                    </div>
                </div>

        );
    }
}

export default FooterDesktop;