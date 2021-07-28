import React, {Component,Fragment} from 'react';
import Slider from "react-slick";
import {Link} from "react-router-dom";
import axios from "axios";
import SliderLoader from "../placeholder/SliderLoader";
class SliderHome extends Component {

    constructor() {
        super();
        this.state = {
            SlideData:[],
            isLoading:"BetweenTwoSection",
            mainDiv:"d-none"
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/SlideInfo').then(response=>{
            this.setState({SlideData:response.data,isLoading:"d-none",mainDiv:""})
        }).catch();
    }

    render() {

        const settings = {
            dots: true,
            infinite: true,
            autoplay:true,
            autoplaySpeed:3000,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };

        let SlideData = this.state.SlideData;

        let MyView = SlideData.map((List,i)=>{
            return <Fragment>
                        <div key={i.toString()}  className="container-fluid m-0 p-0 overflow-hidden w-100 shadow-sm">
                            <div style={{backgroundColor:List.bg_color}} className="m-0 p-0">
                                <div className="row card-body">
                                    <div className="col-md-6 slider-title-div animated slideInDown text-center mt-5">
                                        <h1 style={{color:List.text_color}} className="slider-title">{List.title}</h1>
                                        <h4 style={{color:List.text_color}} className="slider-sub-title">
                                            {List.sub_title}
                                        </h4>
                                        <Link to={"/productDetails/"+List.product_code} className="btn site-btn px-5">More Info</Link>
                                    </div>
                                    <div className="col-md-6 animated slideInDown text-center">
                                        <img className="slider-img" src={List.image} alt="slider img"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                  </Fragment>
        })


        return (
            <div>
                <SliderLoader isLoading={this.state.isLoading}/>
                <div className={this.state.mainDiv}>
                    <Slider {...settings}>
                        {MyView}
                    </Slider>
                </div>
            </div>

        );
    }
}

export default SliderHome;