import React, {Component,Fragment} from 'react';
import {Container,Row,Col,Card} from 'react-bootstrap';
import {Link} from "react-router-dom";
import axios from "axios";
import FeaturedProductLoader from "../placeholder/FeaturedProductLoader";

class FeaturedProducts extends Component {

    constructor() {
        super();
        this.state = {
            ProductData:[],
            select:"Featured",
            isLoading:"BetweenTwoSection",
            mainDiv:"d-none"
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/ProductListByRemark/'+this.state.select).then(response=>{
            this.setState({ProductData:response.data,isLoading:"d-none",mainDiv:""})
        }).catch();
    }

    render() {
        let ProductList = this.state.ProductData;
        let MyView = ProductList.map((List,i)=>{
            if(List.special_price == "NA")
            {
                return <Fragment>
                    <Col key={i.toString()} className="p-1" key={1} xl={2} lg={2} md={2} sm={4} xs={6} >
                        <Link to={"/productDetails/"+List.product_code}>
                            <Card className="card w-100 image-box ">
                                <img src={List.image}/>
                                <Card.Body>
                                    <h5 className="product-name-on-card">{List.title}</h5>
                                    <p className="product-price-on-card">Price: {List.price}TK</p>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                </Fragment>
            }
            else {
                return <Fragment>
                    <Col key={i.toString()} className="p-1" key={1} xl={2} lg={2} md={2} sm={4} xs={6} >
                        <Link to={"/productDetails/"+List.product_code}>
                            <Card className="card w-100 image-box ">
                                <img src={List.image}/>
                                <Card.Body>
                                    <h5 className="product-name-on-card">{List.title}</h5>
                                    <p className="product-price-on-card">Price: <strike>{List.price}TK</strike>  {List.special_price}TK</p>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                </Fragment>
            }

        })

        return (
            <Fragment>
                <FeaturedProductLoader isLoading={this.state.isLoading}/>
                <div className={this.state.mainDiv}>
                    <Container className="text-center BetweenTwoSection" fluid={true}>
                        <h4 className="section-title">FEATURED PRODUCTS</h4>
                        <h6 className="section-sub-title pb-3">Some Of Our Exclusive Collection, You May Like</h6>
                        <Row>
                            {MyView}
                        </Row>
                    </Container>
                </div>
            </Fragment>
        );
    }
}

export default FeaturedProducts;