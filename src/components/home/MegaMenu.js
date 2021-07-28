import React, {Component,Fragment} from 'react';
import {Link} from "react-router-dom";

class MegaMenu extends Component {

    constructor() {
        super();
    }



    MegaMenuList=(event)=>{
        let menubar = event.target;
        event.target.classList.toggle("active");
        let panel=event.target.nextElementSibling;
        if(panel.style.maxHeight){
            panel.style.maxHeight=null;
        }
        else{
            panel.style.maxHeight=panel.scrollHeight+ "px"
        }
    }


    // MegaMenu(){
    //   var acc= document.getElementsByClassName("accordion");
    //   var accNum=acc.length;
    //   var i;
    //   for(i=0;i<accNum;i++){
    //       acc[i].addEventListener("click",function () {
    //          this.classList.toggle("active");
    //          var panel=this.nextElementSibling;
    //          if(panel.style.maxHeight){
    //              panel.style.maxHeight=null;
    //          }
    //          else{
    //              panel.style.maxHeight=panel.scrollHeight+ "px"
    //          }
    //       })
    //   }
    //
    // }


    render() {

        let MenuList = this.props.data;

        let ParentView = MenuList.map((ParentList,i)=>{
            return <Fragment>
                        <div key={i.toString()}>
                           <button onClick={this.MegaMenuList} className="accordion"><span><i className='fa fa-arrow-right'></i>  <img className="accordionMenuIcon ml-2" src={ParentList.catone_image} alt=""/> {ParentList.catone_name}</span></button>
                            <div className="panel">
                                <ul>

                                    {
                                        (ParentList.cattwo_name).map((ChildList,i)=>{
                                            return <Fragment>
                                                <li key={i.toString()}>
                                                    <Link to={/ProductListBySubCategoryPage/+ChildList.catone_name+"/"+ChildList.cattwo_name} className="accordionItem">{ChildList.cattwo_name}</Link>
                                                </li>
                                            </Fragment>
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                  </Fragment>
        })

        return (
            <div className="accordionMenuDiv animated slideInDown">
                <div className="accordionMenuDivInside">
                    {ParentView}
                </div>
            </div>
        );
    }
}

export default MegaMenu;