import React, {Component,Fragment} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import {Redirect} from "react-router";

class MegaMenuMobile extends Component {

    constructor() {
        super();
        this.state = {
            ProductData:[],
            searchKey:'',
            searchRedirectStatus:false
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/GetCategoryDetails').then(response=>{
            this.setState({ProductData:response.data})
        }).catch();
    }


    // MegaMenu(){
    //     var acc= document.getElementsByClassName("accordionMobile");
    //     var accNum=acc.length;
    //     var i;
    //     for(i=0;i<accNum;i++){
    //         acc[i].addEventListener("click",function () {
    //             this.classList.toggle("active");
    //             var panel=this.nextElementSibling;
    //             if(panel.style.maxHeight){
    //                 panel.style.maxHeight=null;
    //             }
    //             else{
    //                 panel.style.maxHeight=panel.scrollHeight+ "px"
    //             }
    //         })
    //     }
    //
    // }

    MegaMenu=(event)=>{
       let menubar = event.target;
       event.target.classList.toggle("active");
        var panel=event.target.nextElementSibling;
        if(panel.style.maxHeight){
            panel.style.maxHeight=null;
        }
        else{
            panel.style.maxHeight=panel.scrollHeight+ "px"
        }
    }

    searchOnChange=(event)=>{
        let key = event.target.value;
        this.setState({searchKey:key})
    }

    SearchHandler=()=>{
        this.setState({searchRedirectStatus:true})
    }

    SearchRedirect=()=>{
        if(this.state.searchRedirectStatus === true)
        {
            return(
                <Redirect to={"/SearchByKey/"+this.state.searchKey}/>
            )
        }
    }


    render() {

        const ProductData = this.state.ProductData;
        let MyView = ProductData.map((ParentList,i)=>{
            return <Fragment>
                        <button onClick={this.MegaMenu} className="accordionMobile"> <img className="accordionMenuIconMobile" src={ParentList.catone_image}/> {ParentList.catone_name}</button>
                        <div className="panelMobile">
                            <ul>
                                {ParentList.cattwo_name.map((ChildList,i)=>{
                                    return <li>
                                        <Link to={"/ProductListBySubCategoryPage/"+ParentList.catone_name+"/"+ChildList.cattwo_name} className="accordionItemMobile">{ChildList.cattwo_name}</Link>
                                    </li>
                                })}
                            </ul>
                        </div>
                  </Fragment>
        })

        return (
            <Fragment>
                <div className="accordionMenuDivMobile">
                    <div className="accordionMenuDivInsideMobile">
                        <div className='row'>
                            <div className='col-10'>
                                <input onChange={this.searchOnChange} type='text' className='form-control  ml-2 mb-2'/>
                                <button onClick={this.SearchHandler} className='btn btn-primary btn-sm ml-2 mb-2'>Search</button>
                            </div>
                        </div>
                        {MyView}
                    </div>
                </div>
                {this.SearchRedirect()}
            </Fragment>
        );
    }
}

export default MegaMenuMobile;