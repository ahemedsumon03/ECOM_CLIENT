import React, {Component} from 'react';
import image from '../../assets/images/sliderimage.svg'
import {Col, Container, Row} from "react-bootstrap";
class SliderLoader extends Component {
    render() {
        let isLoading=this.props.isLoading;
        return (
            <div className={isLoading}>
                <Container className="p-0 TopSection overflow-hidden" fluid={true}>
                    <Row>
                        <Col className="p-1" lg={3} md={3} sm={12}>
                            <div className="shadow-sm h-100 bg-white">
                                <div className="ph-item">
                                    <div className="ph-col-12">
                                        <div className="ph-row">
                                            <div className="ph-col-12 small"/>
                                            <div className="ph-col-12 small"/>
                                            <div className="ph-col-12 small"/>
                                            <div className="ph-col-12 small"/>
                                            <div className="ph-col-12 small"/>
                                            <div className="ph-col-12 small"/>
                                            <div className="ph-col-12 small"/>
                                            <div className="ph-col-12 small"/>
                                            <div className="ph-col-12 small"/>
                                            <div className="ph-col-12 small"/>
                                            <div className="ph-col-12 small"/>
                                            <div className="ph-col-12 small"/>
                                            <div className="ph-col-12 small"/>
                                            <div className="ph-col-12 small"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col className="p-1" lg={9} md={9} sm={12}>
                            <div  className="container-fluid shadow-sm bg-white">
                                <div className="row card-body">
                                    <div className="col-md-8 slider-title-div text-center">
                                        <div className="ph-item">
                                            <div className="ph-col-12">
                                                <div className="ph-row">
                                                    <div className="ph-col-12 small"/>
                                                    <div className="ph-col-12 small"/>
                                                    <div className="ph-col-12 small"/>
                                                    <div className="ph-col-12 small"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4 text-center">
                                        <img alt="" className="slider-img"  src={image}/>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default SliderLoader;
