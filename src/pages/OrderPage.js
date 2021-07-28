import React, {Component, Fragment} from 'react';
import NavMenuDesktop from "../components/common/NavMenuDesktop";
import NavMenuMobile from "../components/common/NavMenuMobile";
import FooterDesktop from "../components/common/FooterDesktop";
import FooterMobile from "../components/common/FooterMobile";
import OrderList from "../components/Order/OrderList";
import SessionHelper from "../SessionHelper/SessionHelper";
import {Redirect} from "react-router-dom";

class OrderPage extends Component {

    constructor() {
        super();
        this.state = {
            pageRedirect:false
        }
    }

    componentDidMount() {
        window.scroll(0,0)
        let username = SessionHelper.getUserName();
        if(username===null)
        {
            this.setState({pageRedirect:true})
        }
    }

    pageRedirect=()=>{
        if(this.state.pageRedirect === true)
        {
            return (
                <Redirect to={"/"}/>
            )
        }
    }


    render() {
        return (
            <Fragment>
                <div className="Desktop">
                    <NavMenuDesktop/>
                </div>
                <div className="Mobile">
                    <NavMenuMobile/>
                </div>

                <OrderList/>

                <div className="Desktop">
                    <FooterDesktop/>
                </div>
                <div className="Mobile">
                    <FooterMobile/>
                </div>
                {this.pageRedirect()}
            </Fragment>
        );
    }
}

export default OrderPage;