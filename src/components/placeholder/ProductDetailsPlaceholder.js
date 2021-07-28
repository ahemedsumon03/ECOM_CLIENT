import React, {Component,Fragment} from 'react';
import DetailsImage from '../../assets/images/DetailsImage.svg'
class ProductDetailsPlaceholder extends Component {
    render() {

        let isLoading= this.props.isLoading;
        return (
            <Fragment>
                <div className={isLoading}>
                    <div className="container-fluid shadow-sm bg-white TopSection">
                        <div className="row">
                            <div className="col-md-6 text-center">
                                <img alt="" className="w-100" src={DetailsImage}/>
                            </div>
                            <div className="col-md-6">
                                <div className="ph-item">
                                    <div className="ph-col-12">
                                        <div className="ph-row">
                                            <div className="ph-col-12 big"/>
                                        </div>
                                        <div className="ph-row">
                                            <div className="ph-col-8"/>
                                        </div>
                                        <div className="ph-row">
                                            <div className="ph-col-8"/>
                                        </div>
                                        <div className="ph-row">
                                            <div className="ph-col-8"/>
                                            <div className="ph-col-8"/>
                                        </div>
                                        <div className="ph-row">
                                            <div className="ph-col-8"/>
                                            <div className="ph-col-8"/>
                                        </div>
                                        <div className="ph-row">
                                            <div className="ph-col-8"/>
                                            <div className="ph-col-8"/>
                                        </div>
                                        <div className="ph-row">
                                            <div className="ph-col-8"/>
                                            <div className="ph-col-8"/>
                                        </div>
                                        <div className="ph-row">
                                            <div className="ph-col-8"/>
                                            <div className="ph-col-8"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </Fragment>
        );
    }
}

export default ProductDetailsPlaceholder;