import React, {Component,Fragment} from 'react';
import Slider from "react-slick";
import {Card, Col, Container, Row} from "react-bootstrap";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import NewArrivalPlaceholder from "../placeholder/NewArrivalPlaceholder";
import {Link} from "react-router-dom";

class NewArrival extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ProductData:[],
            select:"NEW",
            isLoading:"BetweenTwoSection",
            mainDiv:"d-none"
        }
        this.next=this.next.bind(this);
        this.previous=this.previous.bind(this)

    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/ProductListByRemark/'+this.state.select).then(response=>{
            this.setState({ProductData:response.data,isLoading:"d-none",mainDiv:""})
        }).catch();
    }

    next(){
        this.slider.slickNext();
    }
    previous(){
        this.slider.slickPrev();
    }

    render() {

        const settings = {
            dots: false,
            infinite: true,
            speed: 500,
            autoplaySpeed:3000,
            autoplay:true,
            slidesToShow: 4,
            slidesToScroll: 1,
            initialSlide: 0,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 1,
                        infinite: true,
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        initialSlide: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                }
            ]
        };

        let ProductList = this.state.ProductData;
        let MyView = ProductList.map((List,i)=>{
            if(List.special_price == "NA")
            {
                return <Fragment>
                    <div className="p-1" key={i.toString()}>
                        <Link to={'/productDetails/'+List.product_code}>
                            <Card className="card w-100  image-box ">
                                <img src={List.image}/>
                                <Card.Body>
                                    <h5 className="product-name-on-card">{List.title}</h5>
                                    <p className="product-price-on-card">Price: {List.price}TK</p>
                                </Card.Body>
                            </Card>
                        </Link>
                    </div>
                </Fragment>
            }
            else {
                return <Fragment>
                    <div className="p-1" key={i.toString()}>
                        <Link to={'/productDetails/'+List.product_code}>
                            <Card className="card w-100  image-box ">
                                <img src={List.image}/>
                                <Card.Body>
                                    <h5 className="product-name-on-card">{List.title}</h5>
                                    <p className="product-price-on-card">Price: <strike>{List.price}TK</strike>  {List.special_price}TK</p>
                                </Card.Body>
                            </Card>
                        </Link>
                    </div>
                </Fragment>
            }

        })

        return (
            <Fragment>
                <NewArrivalPlaceholder isLoading={this.state.isLoading}/>
                <div className={this.state.mainDiv}>
                    <Container className="text-center BetweenTwoSection" fluid={true}>
                        <h4 className="section-title px-0 mx-0 ">NEW ARRIVAL
                            <a className="btn btn-sm ml-2 site-btn" onClick={this.previous} >
                                <i className="fa fa-angle-left"></i>
                            </a>
                            <a className="btn btn-sm ml-2 site-btn" onClick={this.next}>
                                <i className="fa fa-angle-right"></i>
                            </a>
                        </h4>
                        <h6 className="section-sub-title pb-3">Some Of Our Exclusive Collection, You May Like</h6>
                        <Slider  ref={c=>(this.slider=c)}   {...settings}>
                            {MyView}
                        </Slider>
                    </Container>
                </div>
            </Fragment>
        );
    }
}

export default NewArrival;