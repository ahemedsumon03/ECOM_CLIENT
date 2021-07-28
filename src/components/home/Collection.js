import React, {Component,Fragment} from 'react';
import {Card, Col, Container, Row} from "react-bootstrap";
import axios from "axios";
import SpecialCollectionPlaceholder from "../placeholder/SpecialCollectionPlaceholder";
import {Link} from "react-router-dom";

class Collection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ProductData:[],
            select:"Collection",
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
                    <Col key={i.toString()} className="p-0" xl={3} lg={3} md={3} sm={6} xs={6} >
                        <Link to={'/productDetails/'+List.product_code}>
                            <Card className="card text-center w-100  image-box ">
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
                    <Col key={i.toString()} className="p-0" xl={3} lg={3} md={3} sm={6} xs={6} >
                        <Link to={'/productDetails/'+List.product_code}>
                            <Card className="card text-center w-100  image-box ">
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
                <SpecialCollectionPlaceholder isLoading={this.state.isLoading}/>
                <div className={this.state.mainDiv}>
                    <Container  className="text-center bg-white card-body shadow-sm py-5 BetweenTwoSection" fluid={true}>
                        <h4 className="section-title ">SPECIAL COLLECTION</h4>
                        <h6 className="section-sub-title pb-3">Some Of Our Exclusive Collection, You May Like</h6>
                        <Row >
                            {MyView}
                        </Row>
                    </Container>
                </div>

            </Fragment>
        );
    }
}

export default Collection;