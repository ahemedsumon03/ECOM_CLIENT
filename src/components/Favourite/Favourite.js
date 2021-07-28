import React, {Component, Fragment} from 'react';
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import axios from "axios";
import SessionHelper from "../../SessionHelper/SessionHelper";
import FavouriteItemPlaceHolder from "../placeholder/FavouriteItemPlaceHolder";
import CogoToast from "cogo-toast";
import {Redirect} from "react-router-dom";

class Favourite extends Component {

    constructor() {
        super();
        this.state = {
            ProductData:[],
            isLoading:"TopSection",
            mainDiv:"d-none",
            pageRefreshStatus:false
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/showFavouriteItem/'+SessionHelper.getUserName()).then(response=>{
            this.setState({ProductData:response.data,isLoading:"d-none",mainDiv:""})
        }).catch();

    }

    removeFavProduct=(event)=>{
       let id = event.target.getAttribute('data-id');
       axios.post('http://127.0.0.1:8000/api/RemoveFavouriteItem/'+id).then(response=>{
           if(response.status === 200 && response.data === 1)
           {
               CogoToast.success('Item Removed',{position:'bottom-center'})
               this.setState({pageRefreshStatus:true})
           }else {
               CogoToast.error('Item not Removed',{position:'bottom-center'})
           }
       }).catch(error=>{
           CogoToast.error('Item not Removed',{position:'bottom-center'})
       });
    }

    pageRefreshRedirect=()=>{
        if(this.state.pageRefreshStatus === true)
        {
            this.componentDidMount();
        }
    }

    render() {

        let ProductData = this.state.ProductData;
        let MyView = ProductData.map((List,i)=>{
            return <Fragment>
                        <Col className="p-2" xl={3} lg={3} md={3} sm={6} xs={6} >
                            <Card className="card text-center w-100  image-box ">
                                <img src={List.image} alt=""/>
                                <Card.Body>
                                    <h5 className="product-name-on-card m-0 p-0">{List.title}</h5>
                                    <p className="product-price-on-card m-0 p-0">Price: {List.price}TK</p>
                                </Card.Body>
                                <button onClick={this.removeFavProduct} data-id={List.id} className="btn text-danger w-100 btn-light"> <i className="fa fa-trash-alt"></i> Remove </button>
                            </Card>
                        </Col>
                   </Fragment>
        })

        return (
            <Fragment>
                <FavouriteItemPlaceHolder isLoading={this.state.isLoading}/>
                <div className={this.state.mainDiv}>
                    <Container  className="text-center bg-white card-body shadow-sm py-5 BetweenTwoSection" fluid={true}>
                        <h4 className="section-title ">My Favourite Items</h4>
                        <h6 className="section-sub-title pb-3">Some Of Our Exclusive Collection, You May Like</h6>
                        <Row>
                            {MyView}
                        </Row>
                    </Container>
                </div>
                {this.pageRefreshRedirect()}
            </Fragment>
        );
    }
}

export default Favourite;