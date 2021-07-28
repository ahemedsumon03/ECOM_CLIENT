import React, {Component, Fragment} from 'react';
import {Container,Row,Col,Card} from "react-bootstrap";
import {Link} from "react-router-dom";
import axios from "axios";
class SuggestedProducts extends Component {

    constructor() {
        super();
        this.state = {
            ProductData:[]
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/SimilarProduct/'+this.props.subcategory).then(response=>{
            this.setState({ProductData:response.data})
        }).catch();
    }

    render() {

        let ProductData = this.state.ProductData;
        if(ProductData.length > 0)
        {
            const MyView = ProductData.map((List,i)=>{
                if(List.special_price==="NA"){
                    return <Col className="p-1" key={1} xl={2} lg={2} md={2} sm={4} xs={6} >
                        <Link to={"/productDetails/"+List.product_code}>
                            <Card className="card h-100 w-100  image-box ">
                                <img src={List.image} alt=""/>
                                <Card.Body>
                                    <h5 className="product-name-on-card">{(List.title).substring(0,50) }</h5>
                                    <p className="product-price-on-card">Price: { List.price}TK</p>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                }
            })

            return (
                <Fragment>
                    <Container className="text-center BetweenTwoSection" fluid={true}>
                        <h4 className="section-title">YOU MAY LIKE</h4>
                        <h6 className="section-sub-title pb-3">Some Of Our Exclusive Collection, You May Like</h6>
                        <Row>
                            {MyView}
                        </Row>
                    </Container>

                </Fragment>
            );

        }
        else {
            return  <Fragment>

                    </Fragment>
        }
    }
}

export default SuggestedProducts;