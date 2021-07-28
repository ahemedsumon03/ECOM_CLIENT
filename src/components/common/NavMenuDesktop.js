import React, {Component,Fragment} from 'react';
import {Container, Nav, Navbar, Row, Col, Button, InputGroup, NavDropdown} from "react-bootstrap";
import {Link, Redirect} from "react-router-dom";
import SessionHelper from "../../SessionHelper/SessionHelper";
import axios from "axios";

class NavMenuDesktop extends Component {

    constructor() {
        super();
        this.state = {
            searchValue:'',
            pageRedirect:false,
            userCount:0,
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/CountProduct/'+SessionHelper.getUserName()).then(response=>{
            this.setState({userCount:response.data})
        }).catch();
    }

    signOut=()=>{
        SessionHelper.removeUserName();
        this.setState({pageRedirectStatus:true})
    }

    searchOnchange=(event)=>{
        let searchValue = event.target.value;
        this.setState({searchValue:searchValue})
    }

    SearchOnClick=()=>{
        this.setState({pageRedirect:true})
    }

    SearchPageRedirect=()=>{
        if(this.state.pageRedirect == true)
        {
            return (
                <Redirect to={'/SearchByKey/'+this.state.searchValue}/>
            )
        }
    }

    RedirectHome=()=>{
        if(this.state.pageRedirectStatus == true)
        {
            return (
                <Redirect to="/"/>
            )
        }
    }


    render() {

        if(SessionHelper.getUserName()===null)
        {
            return (
                <Fragment>
                    <Container fluid={"true"} className="fixed-top shadow-sm p-2 m-0 bg-white">
                        <Row>
                            <Col className="p-1" lg={4} md={4} sm={12} xs={12}>
                                <Link to="/" className="btn"> <img className="nav-logo" src="http://demo.ecom.rabbil.com/static/media/BigExpress.432afd37.png"/></Link>
                                <Link to="/cart" className="cart-btn"><i className="fa fa-shopping-cart"></i> {this.state.userCount} items </Link>
                            </Col>
                            <Col className="p-1" lg={4} md={4} sm={12} xs={12}>
                                <div className="input-group w-100">
                                    <input onChange={this.searchOnchange} type="text" className="form-control" aria-label="Text input with segmented dropdown button"/>
                                    <button onClick={this.SearchOnClick} type="button" className="btn site-btn"><i className="fa fa-search"></i></button>
                                </div>
                            </Col>
                            <Col className="p-1" lg={4} md={4} sm={12} xs={12}>
                                <Link to="/favourite" className="btn"><i className="fa h4 fa-heart"></i>  <sup><span className="badge text-white bg-danger">4</span></sup></Link>
                                <Link to="/notification" className="btn"><i className="fa h4  fa-bell"></i> <sup><span className="badge text-white bg-danger">4</span></sup></Link>
                                <a className="btn"><i className="fa fa-mobile-alt"></i></a>
                                <Link to="/onboard" className="h4 btn">LOGIN</Link>
                            </Col>
                        </Row>
                    </Container>
                    {this.SearchPageRedirect()}
                    {this.RedirectHome()}
                </Fragment>
            );
        }
        else {
            return (
                <Fragment>
                    <Container fluid={"true"} className="fixed-top shadow-sm p-2 m-0 bg-white">
                        <Row>
                            <Col className="p-1" lg={4} md={4} sm={12} xs={12}>
                                <Link to="/" className="btn"> <img className="nav-logo" src="http://demo.ecom.rabbil.com/static/media/BigExpress.432afd37.png"/></Link>
                                <Link to="/cart" className="cart-btn"><i className="fa fa-shopping-cart"></i> {this.state.userCount} items </Link>
                            </Col>
                            <Col className="p-1" lg={6} md={6} sm={12} xs={12}>
                                <div className="input-group w-100">
                                    <input onChange={this.searchOnchange} type="text" className="form-control" aria-label="Text input with segmented dropdown button"/>
                                    <button onClick={this.SearchOnClick} type="button" className="btn site-btn"><i className="fa fa-search"></i></button>
                                </div>
                            </Col>
                            <Col className="p-1" lg={2} md={2} sm={12} xs={12}>
                                <NavDropdown title="User Account" className='text-color'>
                                    <NavDropdown.Item><Link to="/favourite" className='text-color btn btn-outline-none'><i className="fa fa-bug"></i> Favourite</Link></NavDropdown.Item>
                                    <NavDropdown.Item><Link to="/notification" className='text-color btn btn-outline-none'><i className="fa fa-envelope"></i> Notification</Link></NavDropdown.Item>
                                    <NavDropdown.Item><Link to="/order" className='text-color btn btn-outline-none'><i className="fa fa-briefcase"></i> Order Product</Link></NavDropdown.Item>
                                    <NavDropdown.Item><button onClick={this.signOut} className='text-color btn btn-outline-none'><i className="fa fa-sign-out-alt"></i> Logout</button></NavDropdown.Item>
                                </NavDropdown>
                            </Col>
                        </Row>
                    </Container>
                    {this.SearchPageRedirect()}
                    {this.RedirectHome()}
                </Fragment>

            );
        }
    }
}

export default NavMenuDesktop;