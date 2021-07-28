import React, {Component} from 'react';
import cardPhotoPlaceholder from "../../assets/images/cardPhotoPlaceholder.svg";
import {Container} from "react-bootstrap";

class NewArrivalPlaceholder extends Component {
    render() {
        let isLoading=this.props.isLoading;
        return (
            <div className={isLoading}>
                <Container className="text-center BetweenTwoSection" fluid={true}>
                    <h4 className="section-title">NEW ARRIVAL</h4>
                    <h6 className="section-sub-title">Some Of Our Exclusive Collection, You May Like</h6>
                    <div className="row">
                        <div className="col-lg-2 col-md-2 col-sm-4 col-6 p-1">
                            <a href="" className="card image-box h-100  w-100">
                                <img className="w-100" src={cardPhotoPlaceholder} alt=""/>
                                <div className="ph-item">
                                    <div className="ph-col-12">
                                        <div className="ph-row">
                                            <div className="ph-col-12 small"/>
                                            <div className="ph-col-12 small"/>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div className="col-lg-2 col-md-2 col-sm-4 col-6 p-1">
                            <a href="" className="card image-box h-100  w-100">
                                <img className="w-100" src={cardPhotoPlaceholder}/>
                                <div className="ph-item">
                                    <div className="ph-col-12">
                                        <div className="ph-row">
                                            <div className="ph-col-12 small"/>
                                            <div className="ph-col-12 small"/>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div className="col-lg-2 col-md-2 col-sm-4 col-6 p-1">
                            <a href="" className="card image-box h-100  w-100">
                                <img className="w-100" src={cardPhotoPlaceholder}/>
                                <div className="ph-item">
                                    <div className="ph-col-12">
                                        <div className="ph-row">
                                            <div className="ph-col-12 small"/>
                                            <div className="ph-col-12 small"/>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div className="col-lg-2 col-md-2 col-sm-4 col-6 p-1">
                            <a href="" className="card image-box h-100  w-100">
                                <img className="w-100" src={cardPhotoPlaceholder}/>
                                <div className="ph-item">
                                    <div className="ph-col-12">
                                        <div className="ph-row">
                                            <div className="ph-col-12 small"/>
                                            <div className="ph-col-12 small"/>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div className="col-lg-2 col-md-2 col-sm-4 col-6 p-1">
                            <a href="" className="card image-box h-100  w-100">
                                <img className="w-100" src={cardPhotoPlaceholder}/>
                                <div className="ph-item">
                                    <div className="ph-col-12">
                                        <div className="ph-row">
                                            <div className="ph-col-12 small"/>
                                            <div className="ph-col-12 small"/>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div className="col-lg-2 col-md-2 col-sm-4 col-6 p-1">
                            <a href="" className="card image-box h-100  w-100">
                                <img className="w-100" src={cardPhotoPlaceholder}/>
                                <div className="ph-item">
                                    <div className="ph-col-12">
                                        <div className="ph-row">
                                            <div className="ph-col-12 small"/>
                                            <div className="ph-col-12 small"/>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </Container>
            </div>

        );
    }
}

export default NewArrivalPlaceholder;