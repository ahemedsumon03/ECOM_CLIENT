import React, {Component,Fragment} from 'react';
import {Container,Row,Col} from "react-bootstrap";
import MegaMenu from "./MegaMenu";
import SliderHome from "./SliderHome";
import axios from 'axios'

class HomeTop extends Component {

    constructor() {
        super();
        this.state = {
            MenuData:[],

        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/GetCategoryDetails').then(response=>{
            this.setState({MenuData:response.data})
        }).catch();
    }

    render() {
        return (
            <Fragment>
                <Container className="p-0 TopSection  overflow-hidden" fluid={true}>
                    <Row className="p-0 m-0 overflow-hidden">
                        <Col className="p-0 m-0 overflow-hidden animate__animated animate__slideInDown animate" lg={3} md={3} sm={12}>
                                <MegaMenu data={this.state.MenuData}/>
                        </Col>
                        <Col className="p-0 m-0 overflow-hidden animate__animated animate__slideInDown animate" lg={9} md={9} sm={12}>
                                <SliderHome SlideData={this.state.SlideData}/>
                        </Col>
                    </Row>
                </Container>
                
            </Fragment>
        );
    }
}

export default HomeTop;