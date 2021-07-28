import React, {Component,Fragment} from 'react';
import {Container, Row, Col, Breadcrumb} from "react-bootstrap";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import ReactDom from 'react-dom';
import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.min.css';
import UserReview from "../Others/UserReview";
import SessionHelper from "../../SessionHelper/SessionHelper";
import CogoToast from "cogo-toast";
import axios from "axios";
import {Redirect} from "react-router";
import {Link} from "react-router-dom";
class ProductDetails extends Component {

    constructor() {
        super();
        this.state = {
            previewImage:'0',
            isSize:null,
            isColor:null,
            color:"",
            size:"",
            quantity:"",
            productCode:null,
            pageRefreshStatus:false,
            addToCart:"Add To Cart",
            addToFavourite:"Favourite",
            order:"Order Now",
            pageRedirect:false,
            cartRedirect:false,
            favRedirect:false,
            orderRedirect:false
        }
    }

    imgonClick=(event)=>{
        let imgSrc = event.target.getAttribute('src');
        this.setState({previewImage:imgSrc})
    }

    PriceOption=(special_price,price)=>{
        if(special_price=="NA")
        {
            return (
                <p className='product-name-on-card'>Price: {price} TK</p>
            )
        }
        else
        {
            return (
                <p className='product-name-on-card'>
                    <strike className='text-secondary'>Price: {price} TK</strike> {special_price} TK
                </p>
            )
        }
    }

    ColorHandler=(event)=>{
        let color = event.target.value;
        this.setState({color:color})
    }

    SizeHandler=(event)=>{
        let size = event.target.value;
        this.setState({size:size})
    }

    QuantityHandler=(event)=>{
        let quantity = event.target.value;
        this.setState({quantity:quantity})
    }

    pageRefreshRedirect=()=>{
        if(this.state.pageRefreshStatus === true)
        {
           return (
               <Redirect to={"/productDetails/"+this.state.productCode}/>
           )
        }
    };

    pageRedirect=()=>{
        if(this.state.pageRedirect === true)
        {
            return(
                <Redirect to={"/cart"}/>
            )
        }
    }

    cartRedirect=()=>{
        if(this.state.cartRedirect === true)
        {
            return(
                <Redirect to={"/onboard"}/>
            )
        }
    }

    favRedirect=()=>{
        if(this.state.favRedirect === true)
        {
            return(
                <Redirect to={"/onboard"}/>
            )
        }
    }

    orderRedirect=()=>{
        if(this.state.orderRedirect === true)
        {
            return(
                <Redirect to={"/onboard"}/>
            )
        }
    }

    addToCartHandler=()=>{
        if(SessionHelper.getUserName()!=null)
        {
            let color = this.state.color;
            let size = this.state.size;
            let product_code = this.state.productCode;
            let quantity = this.state.quantity;
            let username = SessionHelper.getUserName();
            let isColor = this.state.isColor;
            let isSize = this.state.isSize;

            if(isColor ==='YES' && color.length === 0)
            {
                CogoToast.error('Please Select Color',{position:'bottom-center'})
            }else if(isSize === 'YES' && size.length === 0)
            {
                CogoToast.error('Please Select Size',{position:'bottom-center'})
            }else if(quantity.length ===0)
            {
                CogoToast.error('Please Select Quantity',{position:'bottom-center'})
            }
            else {
                this.setState({addToCart:"Processing....."})
                let MyFormData = new FormData();
                MyFormData.append('color',color);
                MyFormData.append('size',size);
                MyFormData.append('product_code',product_code);
                MyFormData.append('quantity',quantity);
                MyFormData.append('username',username);

                axios.post('http://127.0.0.1:8000/api/AddToCart/',MyFormData).then(response=>{
                    if(response.status === 200&& response.data === 1)
                    {
                        CogoToast.success('Item added',{position:'bottom-center'})
                        this.setState({pageRefreshStatus:true})
                        this.setState({addToCart:"Add To Cart"});
                    }else if(response.data === -1)
                    {
                        CogoToast.success('Item already added! pls try new Product',{position:'bottom-center'})
                        this.setState({addToCart:"Add To Cart"});
                    }
                    else {
                        CogoToast.error('Item not added',{position:'bottom-center'})
                        this.setState({addToCart:"Add To Cart"});
                    }
                }).catch(error=>{
                    CogoToast.error('Item not added',{position:'bottom-center'})
                    this.setState({addToCart:"Add To Cart"});
                });
            }
        }else {
            let winlocation = "/productDetails/"+this.state.productCode;
            SessionHelper.setPreviouspath(winlocation);
            this.setState({cartRedirect:true})
        }
    }

    addToFavourite=()=>{
        if(SessionHelper.getUserName()!=null)
        {
            this.setState({addToFavourite:"Processing..."})
            let MyFormData = new FormData();
            MyFormData.append('product_code',this.state.productCode);
            MyFormData.append('username',SessionHelper.getUserName());

            axios.post('http://127.0.0.1:8000/api/addToFavourite',MyFormData).then(response=>{
                if(response.status === 200 && response.data === 1)
                {
                    CogoToast.success('Item added',{position:'bottom-center'});
                    this.setState({addToFavourite:"Favourite"})
                }
                else if(response.data === -1)
                {
                    CogoToast.error('Item already added! pls try new Product',{position:'bottom-center'});
                    this.setState({addToFavourite:"Favourite"})
                }else {
                    CogoToast.error('Item not added',{position:'bottom-center'});
                    this.setState({addToFavourite:"Favourite"})
                }
            }).catch(error=>{
                CogoToast.error('Item not added',{position:'bottom-center'});
                this.setState({addToFavourite:"Favourite"})
            });
        }
        else {
            this.setState({favRedirect:true})
        }
    }

    orderHandler=()=>{
        if(SessionHelper.getUserName()!=null)
        {
            let color = this.state.color;
            let size = this.state.size;
            let product_code = this.state.productCode;
            let quantity = this.state.quantity;
            let username = SessionHelper.getUserName();
            let isColor = this.state.isColor;
            let isSize = this.state.isSize;

            if(isColor ==='YES' && color.length === 0)
            {
                CogoToast.error('Please Select Color',{position:'bottom-center'})
            }else if(isSize === 'YES' && size.length === 0)
            {
                CogoToast.error('Please Select Size',{position:'bottom-center'})
            }else if(quantity.length ===0)
            {
                CogoToast.error('Please Select Quantity',{position:'bottom-center'})
            }
            else {
                this.setState({order:"Processing....."})
                let MyFormData = new FormData();
                MyFormData.append('color',color);
                MyFormData.append('size',size);
                MyFormData.append('product_code',product_code);
                MyFormData.append('quantity',quantity);
                MyFormData.append('username',username);

                axios.post('http://127.0.0.1:8000/api/AddToCart/',MyFormData).then(response=>{
                    if(response.status === 200&& response.data === 1)
                    {
                        this.setState({order:"Order Now"});
                        this.setState({pageRedirect:true})
                    }else if(response.data === -1)
                    {
                        CogoToast.success('Item already added! pls try new Product',{position:'bottom-center'})
                        this.setState({order:"Order Now"});
                    }
                    else {
                        CogoToast.error('Something Wrong',{position:'bottom-center'})
                        this.setState({order:"Order Now"});
                    }
                }).catch(error=>{
                    CogoToast.error('Something Wrong',{position:'bottom-center'})
                    this.setState({order:"Order Now"});
                });
            }
        }else {
            this.setState({orderRedirect:true})
        }
    }

    render() {

        const ProductData = this.props.ProductData;
        let img1 = ProductData['product_details'][0]['img1'];
        let img2 = ProductData['product_details'][0]['img2'];
        let img3 = ProductData['product_details'][0]['img3'];
        let img4 = ProductData['product_details'][0]['img4'];
        let des = ProductData['product_details'][0]['des'];
        let color = ProductData['product_details'][0]['color'];
        let size = ProductData['product_details'][0]['size'];
        let details = ProductData['product_details'][0]['details'];
        let product_code = ProductData['product_details'][0]['product_code'];

        let main_image = ProductData['product_list'][0]['image'];

        if(this.state.previewImage == '0')
        {
            this.setState({previewImage:main_image})
        }

        let title = ProductData['product_list'][0]['title'];
        let price = ProductData['product_list'][0]['price'];
        let special_price = ProductData['product_list'][0]['special_price'];
        let category = ProductData['product_list'][0]['category'];
        let subcategory = ProductData['product_list'][0]['subcategory'];
        let remark = ProductData['product_list'][0]['remark'];
        let brand = ProductData['product_list'][0]['brand'];
        let star = ProductData['product_list'][0]['star'];

        let ColorDiv="d-none"
        if(color!=="NA"){
            let ColorArray = color.split(',');
            var ColorOption=ColorArray.map((ColorList,i)=>{
                return <option value={ColorList}>{ColorList}</option>
            })
            ColorDiv=""
        }
        else{
            ColorDiv="d-none"
        }

        var SizeDiv = "d-none";
        if(size!=="NA")
        {
            let SizeArray = size.split(',');
            var SizeOption = SizeArray.map((SizeList,i)=>{
                return <option value={SizeList}>{SizeList}</option>
            })
            SizeDiv = "";
        }else {
            var SizeDiv = "d-none";
        }

        if(this.state.isSize == null)
        {
            if(size!=='NA')
            {
                this.setState({isSize:'YES'})
            }else {
                this.setState({isSize:'NO'})
            }
        }

        if(this.state.isColor == null)
        {
            if(color!=='NA')
            {
                this.setState({isColor:'YES'})
            }else {
                this.setState({isColor:'NO'})
            }
        }

        if(this.state.productCode == null)
        {
            this.setState({productCode:product_code})
        }

        return (
            <Fragment>
                <Container  className="BetweenTwoSection animate__animated animate__slideInDown animate" fluid={true}>
                    <Breadcrumb className='TopSection'>
                        <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
                        <Breadcrumb.Item><Link>{this.state.productCode}</Link></Breadcrumb.Item>
                    </Breadcrumb>
                    <Row className="p-2">
                        <Col className="shadow-sm bg-white pb-3" md={12} lg={12} sm={12} xs={12}>
                            <Row>
                                <Col className="p-3" md={6} lg={6} sm={12} xs={12}>
                                    <InnerImageZoom
                                        className='img-fluid'
                                        src={this.state.previewImage}
                                        zoomSrc={this.state.previewImage}
                                        zoomScale={1.8}
                                        zoomType={'hover'}
                                    />
                                    <Container>
                                        <Row>
                                            <Col className="p-0 m-0"  md={3} lg={3} sm={3} xs={3}>
                                                <img onClick={this.imgonClick} className="w-100 onImage" src={img1}/>
                                            </Col>
                                            <Col className="p-0 m-0" md={3} lg={3} sm={3} xs={3}>
                                                <img onClick={this.imgonClick} className="w-100 onImage" src={img2}/>
                                            </Col>
                                            <Col className="p-0 m-0" md={3} lg={3} sm={3} xs={3}>
                                                <img onClick={this.imgonClick} className="w-100 onImage" src={img3}/>
                                            </Col>
                                            <Col className="p-0 m-0" md={3} lg={3} sm={3} xs={3}>
                                                <img onClick={this.imgonClick} className="w-100 onImage" src={img4}/>
                                            </Col>
                                        </Row>
                                    </Container>
                                </Col>
                                <Col className="p-3 " md={6} lg={6} sm={12} xs={12}>
                                    <h5 className="Product-Name">{title}</h5>
                                    <h6 className="section-sub-title">Some Of Our Exclusive Collection, You May Like Some Of Our Exclusive Collection</h6>
                                    {this.PriceOption(special_price,price)}

                                    <div className={ColorDiv}>
                                        <h6 className="mt-2">Choose Color</h6>
                                        <select onChange={this.ColorHandler} className="form-control form-select">
                                            <option value="">Choose Color</option>
                                            {ColorOption}
                                        </select>
                                    </div>

                                    <div className={SizeDiv}>
                                        <h6 className="mt-2">Choose Size</h6>
                                        <select onChange={this.SizeHandler} className="form-control form-select">
                                            <option value="">Choose Size</option>
                                            {SizeOption}
                                        </select>
                                    </div>


                                    <h6 className="mt-2">Quantity</h6>
                                    <select onChange={this.QuantityHandler} className='form-control form-select'>
                                        <option value="">Choose Quantity</option>
                                        <option value="01">01</option>
                                        <option value="02">02</option>
                                        <option value="03">03</option>
                                        <option value="04">04</option>
                                        <option value="05">05</option>
                                        <option value="06">06</option>
                                        <option value="07">07</option>
                                        <option value="08">08</option>
                                        <option value="09">09</option>
                                        <option value="10">10</option>
                                    </select>

                                    <div className="input-group mt-3">
                                        <button onClick={this.addToCartHandler} className="btn site-btn m-1 "> <i className="fa fa-shopping-cart"></i> {this.state.addToCart}</button>
                                        <button onClick={this.orderHandler} className="btn btn-primary m-1"> <i className="fa fa-car"></i> {this.state.order}</button>
                                        <button onClick={this.addToFavourite} className="btn btn-primary m-1"> <i className="fa fa-heart"></i> {this.state.addToFavourite}</button>
                                    </div>
                                </Col>
                            </Row>

                            <Row>
                                <Col className="" md={6} lg={6} sm={12} xs={12}>
                                    <h6 className="mt-2">DETAILS</h6>
                                    <p className='text-justify'>{ ReactHtmlParser(details) }</p>
                                    <p></p>
                                    <h6 className="mt-2">Description</h6>
                                    <p className='text-justify'>{ ReactHtmlParser(des) }</p>
                                </Col>

                                <Col className="" md={6} lg={6} sm={12} xs={12}>
                                    <h6 className="mt-2">REVIEWS</h6>
                                    <UserReview code={product_code}/>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
                {this.pageRefreshRedirect()}
                {this.pageRedirect()}
                {this.cartRedirect()}
                {this.favRedirect()}
                {this.orderRedirect()}
            </Fragment>
        );
    }
}

export default ProductDetails;