import React, {Component, Fragment} from 'react';
import NavMenuDesktop from "../components/common/NavMenuDesktop";
import NavMenuMobile from "../components/common/NavMenuMobile";
import FooterDesktop from "../components/common/FooterDesktop";
import FooterMobile from "../components/common/FooterMobile";
import ListBySubcategory from "../components/ProductDetails/ListBySubcategory";
import axios from "axios";
import ProductListBySubCategoryLoader from "../components/placeholder/ProductListBySubCategoryLoader";

class ProductListBySubcategoryPage extends Component {

    constructor({match}) {
        super();
        this.state = {
            ProductData:[],
            category:match.params.category,
            subcategory:match.params.subcategory,
            isLoading:"TopSection",
            mainDiv:"d-none"
        }
    }

    componentDidMount() {
        window.scroll(0,0);
        axios.get('http://127.0.0.1:8000/api/ProductListBySubcategory/'+this.state.category+"/"+this.state.subcategory).then(response=>{
            this.setState({ProductData:response.data,isLoading:"d-none",mainDiv:""})
        }).catch();
    }

    render() {
        return (
            <Fragment>
                <div className="Desktop">
                    <NavMenuDesktop/>
                </div>

                <div className="Mobile">
                    <NavMenuMobile/>
                </div>

                <ProductListBySubCategoryLoader isLoading={this.state.isLoading} subcategory={this.state.subcategory}/>
                <ListBySubcategory className={this.state.mainDiv} category={this.state.category} subcategory={this.state.subcategory} myData={this.state.ProductData}/>

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

export default ProductListBySubcategoryPage;