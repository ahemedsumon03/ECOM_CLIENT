import React, {Component, Fragment} from 'react';
import NavMenuDesktop from "../components/common/NavMenuDesktop";
import NavMenuMobile from "../components/common/NavMenuMobile";
import FooterDesktop from "../components/common/FooterDesktop";
import FooterMobile from "../components/common/FooterMobile";
import SuggestedProducts from "../components/ProductDetails/SuggestedProducts";
import ProductDetails from "../components/ProductDetails/ProductDetails";
import axios from "axios";
import ProductDetailsPlaceholder from "../components/placeholder/ProductDetailsPlaceholder";

class ProductDetailsPage extends Component {

    constructor({match}) {
        super();
        this.state = {
            ProductData:[],
            code:match.params.code,
            isLoading:"BetweenTwoSection",
            mainDiv:"d-none"
        }
    }

    componentDidMount() {
        window.scroll(0,0)
        axios.get('http://127.0.0.1:8000/api/SelectProductByCode/'+this.state.code).then(response=>{
            this.setState({ProductData:response.data,isLoading:"d-none",mainDiv:""})
        }).catch();
    }

    render() {

        if(this.state.mainDiv == "d-none")
        {
            return (
                <Fragment>
                    <div className="Desktop">
                        <NavMenuDesktop/>
                    </div>
                    <div className="Mobile">
                        <NavMenuMobile/>
                    </div>

                    <ProductDetailsPlaceholder isLoading={this.state.isLoading}/>

                    <div className="Desktop">
                        <FooterDesktop/>
                    </div>
                    <div className="Mobile">
                        <FooterMobile/>
                    </div>

                </Fragment>

            );
        }
        else {
            const ProductData = this.state.ProductData;
            let subcategory = ProductData['product_list'][0]['subcategory'];

            return (
                <Fragment>
                    <div className="Desktop">
                        <NavMenuDesktop/>
                    </div>
                    <div className="Mobile">
                        <NavMenuMobile/>
                    </div>

                   <ProductDetails ProductData={this.state.ProductData}/>
                   <SuggestedProducts subcategory={subcategory}/>

                    <div className="Desktop">
                        <FooterDesktop/>
                    </div>
                    <div className="Mobile">
                        <FooterMobile/>
                    </div>

                </Fragment>

            );
        }
    }
}

export default ProductDetailsPage;