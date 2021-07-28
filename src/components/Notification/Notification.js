import React, {Component,Fragment} from 'react';
import {Card,Modal,Button,Container,Row,Col} from "react-bootstrap";
import axios from "axios";
import DescriptionPlaceholder from "../placeholder/DescriptionPlaceholder";
class Notification extends Component {

    constructor() {
        super();
        this.state={
            show:false,
            ProductData:[],
            NotificationTitle:"",
            NotificationMessage:"",
            NotificationDate:"",
            isLoading:"TopSection",
            mainDiv:"d-none"
        }
    }

    handleClose = () => {
        this.setState({ show:false})
    };
    handleShow = (event) => {
        this.setState({ show:true})
        let NotificationMessage = event.target.getAttribute('data-message');
        let NotificationDate = event.target.getAttribute('data-date');
        let NotificationTitle = event.target.getAttribute('data-title');

        this.setState({
            NotificationTitle:NotificationTitle,
            NotificationMessage:NotificationMessage,
            NotificationDate:NotificationDate
        })
    };

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/GetNotificationList').then(response=>{
            this.setState({ProductData:response.data,isLoading:"d-none",mainDiv:""})
        }).catch();
    }

    render() {

        const ProductData = this.state.ProductData;
        let MyView = ProductData.map((List,i)=>{
            return <Fragment>
                        <Col key={i.toString()} className=" p-1 " md={6} lg={6} sm={12} xs={12}>
                            <div className='float-left w-75'>
                                <Card className="notification-card">
                                    <Card.Body>
                                        <h6> {List.title}</h6>
                                        <p className="py-1  px-0 text-primary m-0"><i className="fa  fa-bell"></i>   Date: {List.date} | Status: Unread</p>
                                    </Card.Body>
                                </Card>
                            </div>
                           <div className='float-right px-2 w-25 mt-4'>
                               <button onClick={this.handleShow} data-message={List.message} data-date={List.date} data-title={List.title} className='btn btn-sm site-btn'>Details</button>
                           </div>
                        </Col>
                  </Fragment>
        })

        return (
                <Fragment>
                    <DescriptionPlaceholder isLoading={this.state.isLoading}/>
                    <div className={this.state.mainDiv}>
                        <Container className="TopSection">
                            <Row>
                                {MyView}
                            </Row>
                        </Container>
                    </div>
                    <Modal show={this.state.show} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <h6><i className="fa  fa-bell"></i>   Date: {this.state.NotificationDate} </h6>
                        </Modal.Header>
                        <Modal.Body>
                            <h6>{this.state.NotificationTitle}</h6>
                            <p className='text-justify'>{this.state.NotificationMessage}</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Fragment>
        );
    }
}

export default Notification;