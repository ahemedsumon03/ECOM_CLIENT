import React, {Component,Fragment} from 'react';
import {Breadcrumb, Card, Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

class ListBySubcategory extends Component {
    render() {
        const ProductData = this.props.myData;
        let MyView = ProductData.map((List,i)=>{
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
        })

        return (
            <div>
                <Container className="text-center TopSection animate__animated animate__slideInDown animate" fluid={true}>
                    <Breadcrumb>
                        <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
                        <Breadcrumb.Item><Link>{this.props.subcategory}</Link></Breadcrumb.Item>
                    </Breadcrumb>
                    {/*<h4 className="section-title">{this.props.subcategory}</h4>*/}
                    {/*<h6 className="section-sub-title pb-3">Some Of Our Exclusive Collection, You May Like</h6>*/}
                    <Row>
                        {MyView}
                    </Row>
                </Container>
            </div>
        );
    }
}

export default ListBySubcategory;