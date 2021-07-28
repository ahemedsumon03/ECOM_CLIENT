import React, {Component,Fragment} from 'react';
import {Col} from "react-bootstrap";
import axios from "axios";

class UserReview extends Component {

    constructor() {
        super();
        this.state = {
            ProductData:[]
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/GetUserReview/'+this.props.code).then(response=>{
            this.setState({ProductData:response.data})
        }).catch();
    }

    render() {

        const ProductData = this.state.ProductData;
        if(ProductData.length > 0)
        {
            let MyView = ProductData.map((List,i)=>{

                if(List.reviewer_rating === '1'){
                    return (
                        <Fragment>
                            <p className="p-0 m-0"><span className="Review-Title">{List.reviewer_name}</span>
                                <span className="text-success">
                                    <i className="fa fa-star"></i>
                                </span>
                            </p>
                            <p>{List.reviewer_comments}</p>
                        </Fragment>
                    )
                }else if(List.reviewer_rating ==='2')
                {
                    return (
                        <Fragment>
                            <p className="p-0 m-0"><span className="Review-Title">{List.reviewer_name}</span>
                                <span className="text-success">
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                </span>
                            </p>
                            <p>{List.reviewer_comments}</p>
                        </Fragment>
                    )
                }
                else if(List.reviewer_rating ==='3')
                {
                    return (
                        <Fragment>
                            <p className="p-0 m-0"><span className="Review-Title">{List.reviewer_name}</span>
                                <span className="text-success">
                                     <i className="fa fa-star"></i>
                                     <i className="fa fa-star"></i>
                                     <i className="fa fa-star"></i>
                                </span>
                            </p>
                            <p>{List.reviewer_comments}</p>
                        </Fragment>
                    )
                }
                else if(List.reviewer_rating ==='4')
                {
                    return (
                        <Fragment>
                            <p className="p-0 m-0"><span className="Review-Title">{List.reviewer_name}</span>
                                <span className="text-success">
                                     <i className="fa fa-star"></i>
                                     <i className="fa fa-star"></i>
                                     <i className="fa fa-star"></i>
                                     <i className="fa fa-star"></i>
                                </span>
                            </p>
                            <p>{List.reviewer_comments}</p>
                        </Fragment>
                    )
                }
                else {
                    return (
                        <Fragment>
                            <p className="p-0 m-0"><span className="Review-Title">{List.reviewer_name}</span>
                                <span className="text-success">
                                     <i className="fa fa-star"></i>
                                     <i className="fa fa-star"></i>
                                     <i className="fa fa-star"></i>
                                     <i className="fa fa-star"></i>
                                     <i className="fa fa-star"></i>
                                </span>
                            </p>
                            <p>{List.reviewer_comments}</p>
                        </Fragment>
                    )
                }
            })

            return (
                <Fragment>
                    {MyView}
                </Fragment>
            );
        }else {
            return (
                <Fragment>

                </Fragment>
            )
        }
    }
}

export default UserReview;