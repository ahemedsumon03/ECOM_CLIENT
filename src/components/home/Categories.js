import React, {Component,Fragment} from 'react';
import {Card, Col, Container, Row} from "react-bootstrap";
import axios from "axios";
import CategoryPlaceholder from "../placeholder/CategoryPlaceholder";
import {Link} from "react-router-dom";

class Categories extends Component {

    constructor() {
        super();
        this.state = {
            productData:[],
            isLoading:"BetweenTwoSection",
            mainDiv:"d-none"
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/GetCategoryDetails').then(response=>{
            this.setState({productData:response.data,isLoading:"d-none",mainDiv:""})
        }).catch();
    }
    render() {

        let ProductList = this.state.productData;
        let MyView = ProductList.map((List,i)=>{
            return <Fragment>
                        <Col key={i.toString()} className="p-0" key={1} xl={2} lg={2} md={2} sm={6} xs={6} >
                            <Link to={"/ProductListByCategoryPage/"+List.catone_name}>
                                <Card className="h-100 w-100 text-center">
                                    <Card.Body>
                                        <img className="w-75" src={List.catone_image}/>
                                        <h5 className="category-name">{List.catone_name}</h5>
                                    </Card.Body>
                                </Card>
                            </Link>
                        </Col>
                   </Fragment>
        })

        return (
            <Fragment>
                <CategoryPlaceholder isLoading={this.state.isLoading}/>
                <div className={this.state.mainDiv}>
                    <Container className="text-center pt-3  BetweenTwoSection" fluid={true}>
                        <h4 className="section-title">CATEGORIES</h4>
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

export default Categories;