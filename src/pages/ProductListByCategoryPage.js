import React, {Component, Fragment} from 'react';
import NavMenuDesktop from "../components/common/NavMenuDesktop";
import NavMenuMobile from "../components/common/NavMenuMobile";
import FooterDesktop from "../components/common/FooterDesktop";
import FooterMobile from "../components/common/FooterMobile";
import ListByCategory from "../components/ProductDetails/ListByCategory";
import axios from "axios";
import ProductListByCategoryLoader from "../components/placeholder/ProductListByCategoryLoader";

class ProductListByCategoryPage extends Component {

    constructor({match}) {
        super();
        this.state = {
            ProductData:[],
            category:match.params.category,
            isLoading:"TopSection",
            mainDiv:"d-none"
        }
    }


    componentDidMount() {
        window.scroll(0,0)
        axios.get('http://127.0.0.1:8000/api/ProductListByCategory/'+this.state.category).then(response=>{
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
                <ProductListByCategoryLoader category={this.state.category} isLoading={this.state.isLoading}/>
                <ListByCategory className={this.state.mainDiv} category={this.state.category} myData={this.state.ProductData}/>

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

export default ProductListByCategoryPage;