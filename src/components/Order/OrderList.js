import React, {Component} from 'react';
import {Breadcrumb, Col, Container, Modal, Row} from "react-bootstrap";
import DescriptionPlaceholder from "../placeholder/DescriptionPlaceholder";
import axios from "axios";
import SessionHelper from "../../SessionHelper/SessionHelper";
import {Link} from "react-router-dom";
import CogoToast from "cogo-toast";

class OrderList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ProductData:[],
            isLoading:"TopSection",
            MainDiv:"d-none",
            ReviewModal:false,
            product_code:'',
            product_name:'',
            name:'',
            rating:'',
            comments:'',
            postText:'Post'
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/ShowOrderProduct/'+SessionHelper.getUserName()).then(response=>{
            this.setState({ProductData:response.data,isLoading:"d-none",MainDiv:""})
        }).catch(error=>{

        });
    }

    ReviewModalOpen=(code,name)=>{
        this.setState({ReviewModal:true,product_code:code,product_name:name})
    }

    ReviewModalClose=()=>{
        this.setState({ReviewModal:false})
    }

    nameChangeHandler=(event)=>{
        let name = event.target.value;
        this.setState({name:name})
    }

    onRatingChangeHandler=(event)=>{
        let rating = event.target.value;
        this.setState({rating:rating})
    }

    onCommentChangeHandler=(event)=>{
        let comments = event.target.value;
        this.setState({comments:comments})
    }

    postData=()=>{
        let product_code = this.state.product_code;
        let product_name = this.state.product_name;
        let name = this.state.name;
        let rating = this.state.rating;
        let comments = this.state.comments;

        if(product_code.length === 0)
        {
            CogoToast.error('Product Code is Empty',{position:"bottom-center"});
        }
        else if(product_name.length ===0)
        {
            CogoToast.error('Product Name is Empty',{position:"bottom-center"});
        }
        else if(name.length ===0)
        {
            CogoToast.error('Name is Empty',{position:"bottom-center"});
        }
        else if(rating.length ===0)
        {
            CogoToast.error('Rating is Empty',{position:"bottom-center"});
        }
        else if(comments.length ===0)
        {
            CogoToast.error('Comments is Empty',{position:"bottom-center"});
        }
        else if(comments.length >150)
        {
            CogoToast.error('Your Comments Should be less than 150 characters',{position:"bottom-center"});
        }
        else {
            let MyFormData = new FormData();
            MyFormData.append('product_code',product_code);
            MyFormData.append('product_name',product_name);
            MyFormData.append('username',SessionHelper.getUserName());
            MyFormData.append('userPhoto',"NULL");
            MyFormData.append('reviewer_name',name);
            MyFormData.append('reviewer_rating',rating);
            MyFormData.append('reviewer_comments',comments);
            this.setState({postText:'Processing....'})
            axios.post('http://127.0.0.1:8000/api/AddReviewData',MyFormData).then(response=>{
                if(response.status ===200 && response.data ===1)
                {
                    CogoToast.success('Review Data added',{position:"bottom-center"});
                    this.setState({postText:'Post'})
                    this.ReviewModalClose();
                }
                else {
                    CogoToast.error('Review Data not added',{position:"bottom-center"});
                    this.setState({postText:'Post'})
                    this.ReviewModalClose();
                }
            }).catch(error=>{
                 CogoToast.error('Review Data added',{position:"bottom-center"});
                this.setState({postText:'Post'})
                this.ReviewModalClose();
            });
        }

    }

    render() {

        const ProductData = this.state.ProductData;
        let MyView = ProductData.map((List,i)=>{
            return <>
                        <Col className="d-flex justify-content-around p-1" md={12} lg={12} sm={12} xs={12}>
                            <div className="float-left w-75">
                                <h6 className="product-name-on-card"> {List.product_name}</h6>
                                <h6 className="product-price-on-card"> Total Price: {List.total_price}</h6>
                                <h6 className="product-name-on-card"> Quantity: {List.product_quantity}</h6>
                                <h6 className="product-name-on-card"> Info: {List.product_info}</h6>
                                <h6 className="product-price-on-card"> Status: {List.order_status}</h6>
                            </div>
                            <div className="float-right px-2 w-25">
                                <button  onClick={()=>this.ReviewModalOpen(List.product_code,List.product_name)} className="btn btn-sm site-btn">Review</button>
                            </div>
                        </Col>
                        <hr className="bg-light w-100"/>
                   </>
        })

        return (
            <div>
                <Container  className={this.state.isLoading+" TopSection"}>
                    <Row  className="d-flex justify-content-center">
                        <Col  md={10} lg={10} sm={12} xs={12}>
                            <Container>
                                <DescriptionPlaceholder isLoading={this.state.isLoading}/>
                            </Container>
                        </Col>
                    </Row>
                </Container>

                <Container className={this.state.MainDiv+" TopSection"}>
                    <Row  className="d-flex justify-content-center">
                        <Col  md={10} lg={10}  sm={12} xs={12}>
                            <Breadcrumb className="shadow-sm mt-2 bg-white">
                                <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
                                <Breadcrumb.Item><Link>Order History</Link></Breadcrumb.Item>
                            </Breadcrumb>
                            <Container className="mt-1">
                                <Row className="shadow-sm animated slideInDown bg-white p-4">
                                    {MyView}
                                </Row>
                            </Container>
                        </Col>
                    </Row>
                </Container>

                <Modal show={this.state.ReviewModal} onHide={this.ReviewModalClose}>
                    <Modal.Header closeButton>
                        <h6> Write Review</h6>
                    </Modal.Header>
                    <Modal.Body>

                        <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                            <label className="form-label">Your Name</label>
                            <input onChange={this.nameChangeHandler} className="form-control" type="text" placeholder=""/>
                        </div>

                        <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                            <label className="form-label">Rating</label>
                            <select className="form-control" onChange={this.onRatingChangeHandler}>
                                <option value="">Choose</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </div>

                        <div className="col-md-12 p-1 col-lg-12 col-sm-12 col-12">
                            <label className="form-label">Comments</label>
                            <textarea onChange={this.onCommentChangeHandler} rows={2}  className="form-control" type="text" placeholder=""/>
                        </div>

                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn site-btn" onClick={this.ReviewModalClose}>Cancel</button>
                        <button onClick={this.postData} className="btn site-btn">{this.state.postText}</button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default OrderList;