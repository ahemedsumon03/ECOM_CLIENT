import React, {Component, Fragment} from 'react';
import NavMenuDesktop from "../components/common/NavMenuDesktop";
import NavMenuMobile from "../components/common/NavMenuMobile";
import FooterDesktop from "../components/common/FooterDesktop";
import FooterMobile from "../components/common/FooterMobile";
import UserOnboard from "../components/common/UserOnboard";
import {Redirect} from "react-router-dom";
import SessionHelper from "../SessionHelper/SessionHelper";

class UserOnboardPage extends Component {

    constructor() {
        super();
        this.state = {
            RedirectStatus:false,
        }
    }

    componentDidMount() {
        window.scroll(0,0)
        let username= SessionHelper.getUserName();
        if(username!==null){
            this.setState({RedirectStatus:true})
        }
    }

    pageRedirect=()=>{
        if(this.state.RedirectStatus===true){
            return(
                <Redirect to="/"/>
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

                <UserOnboard/>

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

export default UserOnboardPage;