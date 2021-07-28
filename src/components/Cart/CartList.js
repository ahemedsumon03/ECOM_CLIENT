import React, {Component,Fragment} from 'react';
import {Button, Card, ListGroup, Col, Container, Row, Form, Breadcrumb} from "react-bootstrap";
import {Link, Redirect} from "react-router-dom";
import axios from "axios";
import SessionHelper from "../../SessionHelper/SessionHelper";
import CartPlaceHolder from "../placeholder/CartPlaceHolder";
import CogoToast from "cogo-toast";

class CartList extends Component {

    constructor() {
        super();
        this.state = {
            ProductData:[],
            isLoading:"TopSection",
            mainDiv:"d-none",
            cart_count:0,
            total_price:0,
            pageRefreshStatus:false,
            city:'',
            pmethod:'',
            name:'',
            mobile:'',
            address:'',
            pageRedirect:false,
            Confirm:'ConfirmBtn'
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/ShowCartItem/'+SessionHelper.getUserName()).then(response=>{
            this.setState({ProductData:response.data,isLoading:"d-none",mainDiv:""})
        }).catch();


        axios.get('http://127.0.0.1:8000/api/GetTotalAndCountValue/'+SessionHelper.getUserName()).then(response=>{
            this.setState({cart_count:response.data[0]['count_result'],total_price:response.data[0]['total_price']})
        }).catch();
    }

    removeCartProduct=(id)=>{
        axios.post('http://127.0.0.1:8000/api/RemoveProduct/'+id).then(response=>{
            if(response.status === 200 && response.data ===1)
            {
                CogoToast.success('Item Removed',{position:'bottom-center'})
                this.setState({pageRefreshStatus:true})
            }
            else {
                CogoToast.error('Item not Removed',{position:'bottom-center'})
            }
        }).catch(error=>{
              CogoToast.error('Item not Removed',{position:'bottom-center'})
        });
    }

    cartItemPlus=(id,quantity,unit_price)=>{
        let MyFormData = new FormData();
        MyFormData.append('quantity',quantity);
        MyFormData.append('unit_price',unit_price);

        axios.post('http://127.0.0.1:8000/api/CartItemPlus/'+id,MyFormData).then(response=>{
            if(response.status === 200 && response.data === 1)
            {
                CogoToast.success('Item quantity increase',{position:'bottom-center'});
                this.setState({pageRefreshStatus:true})
            }
            else {
                CogoToast.error('Item quantity not increase',{position:'bottom-center'});
            }
        }).catch(error=>{
            CogoToast.error('Item quantity not increase',{position:'bottom-center'});
        });
    }

    cartItemMinus=(id,quantity,unit_price)=>{
        let MyFormData = new FormData();
        MyFormData.append('quantity',quantity);
        MyFormData.append('unit_price',unit_price);

        axios.post('http://127.0.0.1:8000/api/CartItemMinus/'+id,MyFormData).then(response=>{
            if(response.status === 200 && response.data === 1)
            {
                CogoToast.success('Item quantity decrease',{position:'bottom-center'});
                this.setState({pageRefreshStatus:true})
            }
            else {
                CogoToast.error('Item quantity not decrease',{position:'bottom-center'});
            }
        }).catch(error=>{
            CogoToast.error('Item quantity not decrease',{position:'bottom-center'});
        });
    }

    pageRefresh=()=>{
        if(this.state.pageRefreshStatus === true)
        {
           return(
               <Redirect to="/cart"/>
           )
        }
    }

    SelectCityHandle=(event)=>{
        let city = event.target.value;
        this.setState({city:city})
    }

    paymentHandler=(event)=>{
        let pmethod = event.target.value;
        this.setState({pmethod:pmethod})
    }

    nameHandler=(event)=>{
        let name = event.target.value;
        this.setState({name:name})
    }

    mobileHandler=(event)=>{
        let mobile = event.target.value;
        this.setState({mobile:mobile})
    }

    addressHandler=(event)=>{
        let address = event.target.value;
        this.setState({address:address})
    }

    confirmHandler=()=>{
        let city = this.state.city;
        let pmethod = this.state.pmethod;
        let name = this.state.name;
        let mobile = this.state.mobile;
        let address = this.state.address;
        let delivery_charge;

        if(city === "Dhaka")
        {
            delivery_charge = 30;
        }

        if(city.length === 0)
        {
            CogoToast.error('City name is Empty! pls input city name',{position:'bottom-center'});
        }
        else if(pmethod.length ===0)
        {
            CogoToast.error('Payment Method is Empty! pls input payment method',{position:'bottom-center'});
        }
        else if(name.length ===0)
        {
            CogoToast.error('Name is Empty! pls input name',{position:'bottom-center'});
        }
        else if(mobile.length ===0)
        {
            CogoToast.error('Mobile no is Empty! pls input mobile no',{position:'bottom-center'});
        }
        else if(address.length ===0)
        {
            CogoToast.error('Address is Empty! pls input address',{position:'bottom-center'});
        }
        else {
            let invoice_no = new Date().getTime();
            let MyFormData = new FormData();
            MyFormData.append('city',city);
            MyFormData.append('invoice_no',invoice_no);
            MyFormData.append('mobile_no',mobile);
            MyFormData.append('name',name);
            MyFormData.append('payment_method',pmethod);
            MyFormData.append('delivery_address',address);
            MyFormData.append('delivery_charge',delivery_charge);
            MyFormData.append('username',SessionHelper.getUserName());
            this.setState({Confirm:'Processing....'})
            axios.post('http://127.0.0.1:8000/api/OrderProduct',MyFormData).then(response=>{
                if(response.status ===200 && response.data===1)
                {
                    CogoToast.success('Order Rechived',{position:'bottom-center'})
                    this.setState({pageRedirect:true})
                    this.setState({Confirm:'ConfirmBtn'})
                }
                else {
                    CogoToast.success('Order not Rechived',{position:'bottom-center'})
                    this.setState({Confirm:'ConfirmBtn'})
                }
            }).catch(error=>{
                CogoToast.success('Order not Rechived',{position:'bottom-center'})
                this.setState({Confirm:'ConfirmBtn'})
            });
        }
    }

    pageRedirect=()=>{
        if(this.state.pageRedirect === true)
        {
            return(
                <Redirect to={"/order"}/>
            )
        }
    }

    render() {
        let ProductData = this.state.ProductData;
        let MyView = ProductData.map((List,i)=>{
            return <Fragment>
                        <Col className="p-1" key={1} xl={6} lg={6} md={6} sm={12} xs={12} >
                            <div className="w-100 image-box">
                                <img src={List.image}/>
                            </div>
                        </Col>
                        <Col className="p-1 mt-2" key={1} xl={6} lg={6} md={6} sm={12} xs={12} >
                            <h5 className="product-name-on-card m-0 p-0 mb-2">{List.product_name}</h5>
                            <p className="product-price-on-card m-0 p-0">Quantity: {List.product_quantity}</p>
                            <p className="product-price-on-card m-0 p-0">Unit Price: {List.unit_price}TK</p>
                            <p className="product-price-on-card m-0 p-0">Total Price: {List.total_price}TK</p>
                            <div className='mt-2'>
                                <button onClick={()=>this.removeCartProduct(List.id)} className="btn text-danger btn-light"><i className="fa fa-trash-alt"></i></button>
                                <button onClick={()=>this.cartItemPlus(List.id,List.product_quantity,List.unit_price)} className="btn text-danger btn-light"><i className="fa fa-plus"></i></button>
                                <button onClick={()=>this.cartItemMinus(List.id,List.product_quantity,List.unit_price)} className="btn text-danger btn-light"><i className="fa fa-minus"></i></button>
                            </div>
                        </Col>

                  </Fragment>
        })

        return (
            <Fragment>
                <br/>
                <Container className="TopSection pb-5 text-center" fluid={true}>
                    <Breadcrumb className='TopSection'>
                        <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
                        <Breadcrumb.Item><Link to={'/cart'}>Cart</Link></Breadcrumb.Item>
                    </Breadcrumb>
                    {/*<Row className="p-2 text-center">*/}
                    {/*    /!*<Col className="p-1" key={1} xl={12} lg={12} md={12} sm={12} xs={12}>*!/*/}
                    {/*    /!*    <h5 className=" "> PRODUCT CART LIST</h5>*!/*/}
                    {/*    /!*    /!*<h6 className="m-0  p-0">Total Price {this.state.total_price} BDT | Total Item {this.state.cart_count}</h6>*!/*!/*/}
                    {/*    /!*    /!*<Link to="/order" className="btn m-1  site-btn"> <i className="fa fa-shopping-cart"></i> Checkout Now</Link>*!/*!/*/}
                    {/*    /!*</Col>*!/*/}
                    {/*</Row>*/}
                    <CartPlaceHolder isLoading={this.state.isLoading}/>
                    <div className={this.state.mainDiv}>
                        <Row className="p-2">
                            <Col xl={6} lg={6} md={6} sm={12} xs={12}>
                                {MyView}
                            </Col>
                            <Col xl={6} lg={6} md={6} sm={12} xs={12}>
                                <div className="card p-2">
                                    <div className="card-body">
                                        <div className="container-fluid ">
                                            <div className="row">
                                                <div className="col-md-12 p-1  col-lg-12 col-sm-12 col-12">
                                                    <h5 className="Product-Name text-danger">Total Due: {this.state.total_price} TK</h5>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                                                    <label className="form-label">Choose City</label>
                                                    <select className="form-control" onChange={this.SelectCityHandle}>
                                                        <option value="">Choose</option>
                                                        <option value="Dhaka">Dhaka</option>
                                                    </select>
                                                </div>
                                                <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                                                    <label className="form-label">Choose Payment Method</label>
                                                    <select className="form-control" onChange={this.paymentHandler}>
                                                        <option value="">Choose</option>
                                                        <option value="Cash On Delivery">Cash On Delivery</option>
                                                    </select>
                                                </div>
                                                <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                                                    <label className="form-label">Your Name</label>
                                                    <input onChange={this.nameHandler} className="form-control" type="text" placeholder=""/>
                                                </div>

                                                <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                                                    <label className="form-label">Your Mobile Number</label>
                                                    <input onChange={this.mobileHandler} className="form-control" type="text" placeholder=""/>
                                                </div>

                                                <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                                                    <label className="form-label">Delivery Address</label>
                                                    <textarea onChange={this.addressHandler}  rows={2}  className="form-control" type="text" placeholder=""/>
                                                </div>
                                                <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                                                    <button onClick={this.confirmHandler} className="btn  site-btn">{this.state.Confirm}</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Container>
                {this.pageRefresh()}
                {this.pageRedirect()}
            </Fragment>
        );
    }
}

export default CartList;