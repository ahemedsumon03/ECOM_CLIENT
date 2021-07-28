import React, {Component,Fragment} from 'react';
import axios from "axios";
import {Breadcrumb, Card, Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import SearchPlaceholder from "../placeholder/SearchPlaceholder";

class SearchProduct extends Component {

    constructor() {
        super();
        this.state = {
            ProductData:[],
            isLoading:"TopSection",
            mainDiv:"d-none"
        }
    }


    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/GetSearchItem/'+this.props.searchKey).then(response=>{
            this.setState({ProductData:response.data,isLoading:'d-none',mainDiv:""})
        }).catch();
    }


    render() {

        const MyData = this.state.ProductData;
        let MyView = MyData.map((List,i)=>{
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
            <div className='animate__animated animate__slideInDown animate'>
                <SearchPlaceholder isLoading={this.state.isLoading} searchKey={this.props.searchKey}/>
                <div className={this.state.mainDiv}>
                    <Container className="text-center TopSection" fluid={true}>
                        <Breadcrumb>
                            <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
                            <Breadcrumb.Item><Link>{this.props.searchKey}</Link></Breadcrumb.Item>
                        </Breadcrumb>
                        {/*<h4 className="section-title">{this.props.searchKey}</h4>*/}
                        {/*<h6 className="section-sub-title pb-3">Some Of Our Exclusive Collection, You May Like</h6>*/}
                        <Row>
                            {MyView}
                        </Row>
                    </Container>
                </div>
            </div>
        );
    }
}

export default SearchProduct;