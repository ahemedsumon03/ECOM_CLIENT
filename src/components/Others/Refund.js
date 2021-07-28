import React, {Component, Fragment} from 'react';
import {Breadcrumb, Card, Col, Container, Row} from "react-bootstrap";
import axios from 'axios';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import cogoToast from "cogo-toast";
import {Link} from "react-router-dom";
import SessionHelper from "../../SessionHelper/SessionHelper";


class Refund extends Component {

    constructor() {
        super();
        this.state={
            Refund:"",
            loaderDiv:"",
            mainDiv:"d-none",
        }
    }
    componentDidMount() {
        let SiteInfoRefund= SessionHelper.getRefundSession();
        if(SiteInfoRefund==null){
            axios.get('http://127.0.0.1:8000/api/SiteDetails').then(response=> {
                let  StatusCode =response.status;
                if(StatusCode==200){
                    let  JSONData =(response.data)[0]['terms'];
                    this.setState({Refund:JSONData,loaderDiv:"d-none",mainDiv:""})
                    SessionHelper.setRefundSession(JSONData);
                }
                else{
                    cogoToast.error('Something Went Wrong ! Try Again',{position:"bottom-center"})
                }

            }).catch(error=> {
                cogoToast.error('Something Went Wrong ! Try Again',{position:"bottom-center"})
            });
        }
        else{
            this.setState({Refund:SiteInfoRefund,loaderDiv:"d-none",mainDiv:""})
        }
    }


    render() {
        return (
            <Fragment>
                <Container className="TopSection animate__animated animate__slideInDown animate">
                    <Breadcrumb>
                        <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
                        <Breadcrumb.Item><Link to="/refund">Refund</Link></Breadcrumb.Item>
                    </Breadcrumb>
                    <Row>
                        <Col className="mt-2" md={12} lg={12} sm={12} xs={12}>
                          <div className='mt-3'>
                              <div className={this.state.loaderDiv}>
                                  <div className="ph-item">
                                      <div className="ph-col-12">
                                          <div className="ph-row">
                                              <div className="ph-col-12"></div>
                                              <div className="ph-col-12"></div>
                                              <div className="ph-col-12"></div>
                                              <div className="ph-col-12"></div>
                                          </div>
                                      </div>
                                  </div>
                                  <div className="ph-item">
                                      <div className="ph-col-12">
                                          <div className="ph-row">
                                              <div className="ph-col-12"></div>
                                              <div className="ph-col-12"></div>
                                              <div className="ph-col-12"></div>
                                              <div className="ph-col-12"></div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                            <Card className={this.state.mainDiv}>
                                <Card.Body>
                                    <p>{ReactHtmlParser(this.state.Refund) }</p>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>

                {/*<ToastContainer />*/}
            </Fragment>
        );
    }
}
export default Refund;