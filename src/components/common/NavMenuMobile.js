import React, {Component,Fragment} from 'react';
import {Button, Col, Container, Navbar, Row} from "react-bootstrap";
// import MegaMenu from "../home/MegaMenu";
import MegaMenuMobile from "../home/MegaMenuMobile";
import {Link} from "react-router-dom";
import SessionHelper from "../../SessionHelper/SessionHelper";
import {Redirect} from "react-router";
import axios from "axios";

class NavMenuMobile extends Component {

    constructor() {
        super();
        this.state={
            SideNavState:"sideNavClose",
            ContentOverState:"ContentOverlayClose",
            pageRedirectStatus:false,
            userCount:0,
            favCount:0,
            notificationCount:0,
            countOrder:0
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/CountProduct/'+SessionHelper.getUserName()).then(response=>{
            this.setState({userCount:response.data})
        }).catch();

        axios.get('http://127.0.0.1:8000/api/CountFav/'+SessionHelper.getUserName()).then(response=>{
            this.setState({favCount:response.data})
        }).catch();

        axios.get('http://127.0.0.1:8000/api/CountOrder/'+SessionHelper.getUserName()).then(response=>{
            this.setState({countOrder:response.data})
        }).catch();

        axios.get('http://127.0.0.1:8000/api/CountNotification').then(response=>{
            this.setState({notificationCount:response.data})
        }).catch();
    }

    MenuBarClickHandler=()=>{
        this.SideNavOpenClose();
    }

    ContentOverlayClickHandler=()=>{
        this.SideNavOpenClose();
    }


    SignOut=()=>{
        SessionHelper.removeUserName();
        this.setState({pageRedirectStatus:true})
    }

    pageRedirect=()=>{
        if(this.state.pageRedirectStatus === true)
        {
            return (
                <Redirect to={"/"}/>
            )
        }
    }


    SideNavOpenClose=()=>{
       let SideNavState= this.state.SideNavState;
       let ContentOverState= this.state.ContentOverState;
       if(SideNavState==="sideNavOpen"){
           this.setState({SideNavState:"sideNavClose",ContentOverState:"ContentOverlayClose"})
       }
       else{
           this.setState({SideNavState:"sideNavOpen",ContentOverState:"ContentOverlayOpen"})
       }
    }


    render() {


        if(SessionHelper.getUserName()!==null)
        {
            return (
                <Fragment>
                    <Navbar fluid={"true"} className="fixed-top shadow-sm p-2 m-0 bg-white">
                        <a onClick={this.MenuBarClickHandler} className=" mx-2 navbar-brand"><i className="fa fa-bars"></i></a>
                        <Link to="/cart" className="cart-btn"><i className="fa fa-shopping-cart"></i> {this.state.userCount} items </Link>
                        <Link to="/favourite" className="btn"><i className="fa h4 fa-heart"></i>  <sup><span className="badge text-white bg-danger"></span>{this.state.favCount}</sup></Link>
                        <Link to="/notification" className="btn"><i className="fa h4  fa-bell"></i> <sup><span className="badge text-white bg-danger"></span>{this.state.notificationCount}</sup></Link>
                        <Link to="/order" className="btn"><i className="fa fa-briefcase"></i> <sup><span className="badge text-white bg-danger"></span>{this.state.countOrder}</sup></Link>
                        <button onClick={this.SignOut} className="btn site-btn ml-4">LOGOUT</button>
                    </Navbar>
                    <div  className={this.state.SideNavState}>
                        <Link to="/" className="btn"> <img className="nav-logo" src="http://demo.ecom.rabbil.com/static/media/BigExpress.432afd37.png"/></Link>
                        <hr/>
                        <MegaMenuMobile/>
                    </div>

                    <div onClick={this.ContentOverlayClickHandler}  className={this.state.ContentOverState}>

                    </div>
                    {this.pageRedirect()}
                </Fragment>

            );
        }
        else {
            return (
                <Fragment>
                    <Navbar fluid={"true"} className="fixed-top shadow-sm p-2 m-0 bg-white">
                        <a onClick={this.MenuBarClickHandler} className=" mx-2 navbar-brand"><i className="fa fa-bars"></i></a>
                        <Link to="/cart" className="cart-btn"><i className="fa fa-shopping-cart"></i> 0 items </Link>
                        <Link to={'/onboard'} className="btn site-btn ml-4">LOGIN</Link>
                    </Navbar>
                    <div  className={this.state.SideNavState}>
                        <Link to="/" className="btn"> <img className="nav-logo" src="http://demo.ecom.rabbil.com/static/media/BigExpress.432afd37.png"/></Link>
                        <hr/>
                        <MegaMenuMobile/>
                    </div>

                    <div onClick={this.ContentOverlayClickHandler}  className={this.state.ContentOverState}>

                    </div>
                    {this.pageRedirect()}
                </Fragment>

            );
        }
    }
}

export default NavMenuMobile;