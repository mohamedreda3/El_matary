import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Col, Row, Card, CardBody, UncontrolledAlert, CardHeader } from "reactstrap";
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

const UiAlerts = () => {
    document.title = "Alerts | Matary - React Admin & Dashboard Template";

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid={true}>
                    <Breadcrumbs title="UI Elements" breadcrumbItem="Alerts" />
                    <Row>
                        <Col xl={6} >
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title">Default Alerts</h4>
                                    <p className="card-title-desc">Alerts are available for any length of
                                        text, as well as an optional dismiss button. For proper styling, use one
                                        of the four <strong>required</strong> contextual classes (e.g., <code>.alert-success</code>). For inline
                                        dismissal, use the alerts jQuery plugin.
                                    </p>
                                </CardHeader>

                                <CardBody>
                                    <div className="alert alert-primary" role="alert">
                                        A simple primary alert—check it out!
                                    </div>
                                    <div className="alert alert-secondary" role="alert">
                                        A simple secondary alert—check it out!
                                    </div>
                                    <div className="alert alert-success" role="alert">
                                        A simple success alert—check it out!
                                    </div>
                                    <div className="alert alert-danger" role="alert">
                                        A simple danger alert—check it out!
                                    </div>
                                    <div className="alert alert-warning" role="alert">
                                        A simple warning alert—check it out!
                                    </div>
                                    <div className="alert alert-info" role="alert">
                                        A simple info alert—check it out!
                                    </div>
                                    <div className="alert alert-light" role="alert">
                                        A simple light alert—check it out!
                                    </div>
                                    <div className="alert alert-dark mb-0" role="alert">
                                        A simple dark alert—check it out!
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>

                        <Col xl={6} >
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title">Link Color</h4>
                                    <p className="card-title-desc">Use the <code
                                    >.alert-link</code> utility class to
                                        quickly provide matching colored links within any alert.
                                    </p>
                                </CardHeader>

                                <CardBody>
                                    <div className="alert alert-primary" role="alert">
                                        A simple primary alert with <Link to="#" className="alert-link">an example link</Link>. Give it a
                                        click if you like.
                                    </div>
                                    <div className="alert alert-secondary" role="alert">
                                        A simple secondary alert with <Link to="#" className="alert-link">an example link</Link>. Give it a
                                        click if you like.
                                    </div>
                                    <div className="alert alert-success" role="alert">
                                        A simple success alert with <Link to="#" className="alert-link">an example link</Link>. Give it a
                                        click if you like.
                                    </div>
                                    <div className="alert alert-danger" role="alert">
                                        A simple danger alert with <Link to="#" className="alert-link">an example link</Link>. Give it a
                                        click if you like.
                                    </div>
                                    <div className="alert alert-warning" role="alert">
                                        A simple warning alert with <Link to="#" className="alert-link">an example link</Link>. Give it a
                                        click if you like.
                                    </div>
                                    <div className="alert alert-info" role="alert">
                                        A simple info alert with <Link to="#" className="alert-link">an example link</Link>. Give it a click
                                        if you like.
                                    </div>
                                    <div className="alert alert-light" role="alert">
                                        A simple light alert with <Link to="#" className="alert-link">an example link</Link>. Give it a click if you like.
                                    </div>
                                    <div className="alert alert-dark mb-0" role="alert">
                                        A simple dark alert with <Link to="#" className="alert-link">an example link</Link>. Give it a click if you like.
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col xl={6} >
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title">Dismissing</h4>
                                    <p className="card-title-desc">Add a dismiss button and the <code>.alert-dismissible</code> class, which adds extra padding
                                        to the right of the alert and positions the <code>.btn-close</code> button.
                                    </p>
                                </CardHeader>
                                <CardBody>
                                    <UncontrolledAlert color='success' >
                                        A simple success alert—check it out!
                                    </UncontrolledAlert>

                                    <UncontrolledAlert color='danger' >
                                        A simple danger alert—check it out!
                                    </UncontrolledAlert>

                                    <UncontrolledAlert color='warning'>
                                        A simple warning alert—check it out!
                                    </UncontrolledAlert>

                                    <UncontrolledAlert color='info' className="mb-0" >
                                        A simple info alert—check it out!
                                    </UncontrolledAlert>
                                </CardBody>
                            </Card>
                        </Col>

                        <Col xl={6} >
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title"> Alert with Icon</h4>
                                    <p className="card-title-desc">You can use flexbox utilities and Icons to create alerts with icons</p>
                                </CardHeader>

                                <CardBody>
                                    <UncontrolledAlert color='success' >
                                        <i className="mdi mdi-check-all me-2"></i>
                                        A simple success alert—check it out!
                                    </UncontrolledAlert>

                                    <UncontrolledAlert color='danger' >
                                        <i className="mdi mdi-block-helper me-2"></i>
                                        A simple danger alert—check it out!
                                    </UncontrolledAlert>

                                    <UncontrolledAlert color='warning' >
                                        <i className="mdi mdi-alert-outline me-2"></i>
                                        A simple warning alert—check it out!
                                    </UncontrolledAlert>

                                    <UncontrolledAlert color='info' className="mb-0" >
                                        <i className="mdi mdi-alert-circle-outline me-2"></i>
                                        A simple info alert—check it out!
                                    </UncontrolledAlert>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col xl={6} >
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title">Outline Alerts</h4>
                                    <p className="card-title-desc">Add <code>.alert-outline</code> class with for Outline alerts.</p>
                                </CardHeader>

                                <CardBody>

                                    <UncontrolledAlert color='success' className="alert-outline" >
                                        <strong>Success</strong> - Outline success alert example
                                    </UncontrolledAlert>

                                    <UncontrolledAlert color='danger' className="alert-outline" >
                                        <strong>Danger</strong> - Outline danger alert example
                                    </UncontrolledAlert>

                                    <UncontrolledAlert color='warning' className="alert-outline" >
                                        <strong>Warning</strong> - Outline warning alert example
                                    </UncontrolledAlert>

                                    <UncontrolledAlert color='info' className="alert-outline mb-0" >
                                        <strong>Info</strong> - Outline info alert example
                                    </UncontrolledAlert>
                                </CardBody>
                            </Card>
                        </Col>

                        <Col xl={6} >
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title">Left Border Alerts</h4>
                                    <p className="card-title-desc">Add <code>.alert-outline</code> class with for Outline alerts.</p>
                                </CardHeader>

                                <CardBody>

                                    <UncontrolledAlert color='success' className="alert alert-border-left" >
                                        <i className="mdi mdi-check-all me-3 align-middle"></i><strong>Success</strong> - Left border alert
                                    </UncontrolledAlert>
                                    <UncontrolledAlert color='danger' className="alert alert-border-left" >
                                        <i className="mdi mdi-block-helper me-3 align-middle"></i><strong>Danger</strong> - Left border alert
                                    </UncontrolledAlert>
                                    <UncontrolledAlert color='warning' className="alert alert-border-left" >
                                        <i className="mdi mdi-alert-outline align-middle me-3"></i><strong>Warning</strong> - Left border alert
                                    </UncontrolledAlert>
                                    <UncontrolledAlert color='info' className="alert-border-left mb-0" >
                                        <i className="mdi mdi-alert-circle-outline align-middle me-3"></i><strong>Info</strong> - Left border alert
                                    </UncontrolledAlert>

                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                    <Row>

                        <Col xl={6} >
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title">Top Border Alerts</h4>
                                    <p className="card-title-desc">Left Border Alert example</p>
                                </CardHeader>

                                <CardBody>

                                    <UncontrolledAlert color='success' className="alert-top-border" >
                                        <i className="mdi mdi-check-all me-3 align-middle text-success"></i><strong>Success</strong> - Top border alert
                                    </UncontrolledAlert>
                                    <UncontrolledAlert color='danger' className="alert-top-border" >
                                        <i className="mdi mdi-check-all me-3 align-middle text-success"></i><strong>Success</strong> - Top border alert
                                    </UncontrolledAlert>
                                    <UncontrolledAlert color='warning' className="alert-top-border" >
                                        <i className="mdi mdi-alert-outline align-middle text-warning me-3"></i><strong>Warning</strong> - Top border alert
                                    </UncontrolledAlert>
                                    <UncontrolledAlert color='info' className="alert-top-border mb-0" >
                                        <i className="mdi mdi-alert-circle-outline text-info align-middle me-3"></i><strong>Info</strong> - Top border alert
                                    </UncontrolledAlert>

                                </CardBody>
                            </Card>
                        </Col>

                        <Col xl={6} >
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title">Label Icon Arrow Alerts</h4>
                                    <p className="card-title-desc">Alert label arrow example</p>
                                </CardHeader>

                                <CardBody>

                                    <UncontrolledAlert color='success' className="alert-label-icon label-arrow" >
                                        <i className="mdi mdi-check-all label-icon"></i><strong style={{ marginLeft: "40px" }}>Success</strong> - Label icon arrow alert
                                    </UncontrolledAlert>
                                    <UncontrolledAlert  color='danger' className="alert-label-icon label-arrow" >
                                        <i className="mdi mdi-block-helper label-icon"></i><strong style={{ marginLeft: "40px" }}>Danger</strong> - Label icon arrow alert
                                    </UncontrolledAlert>
                                    <UncontrolledAlert color='warning' className="alert-label-icon label-arrow" >
                                        <i className="mdi mdi-alert-outline label-icon"></i><strong style={{ marginLeft: "40px" }}>Warning</strong> - Label icon arrow alert
                                    </UncontrolledAlert>
                                    <UncontrolledAlert color='info' className="alert-label-icon label-arrow mb-0" >
                                        <i className="mdi mdi-alert-circle-outline label-icon"></i><strong style={{ marginLeft: "40px" }}>Info</strong> - Label icon arrow alert
                                    </UncontrolledAlert>

                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        <Col xl={12} >
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title">Alert Examples</h4>
                                    <p className="card-title-desc">Success, Error and Warning Alert Examples.</p>
                                </CardHeader>

                                <CardBody>
                                    <Row className="g-4">

                                        <Col sm={3}>

                                            <UncontrolledAlert color="success" className="px-4 mb-0 text-center">
                                                <i className="mdi mdi-check-all d-block display-4 mt-2 mb-3 text-success"></i>
                                                <h5 className="text-success">Success</h5>
                                                <p>A simple success alert</p>
                                            </UncontrolledAlert>
                                        </Col>

                                        <Col sm={3}>
                                            <UncontrolledAlert color="danger" className="px-4 mb-0 text-center">
                                                <i className="mdi mdi-block-helper d-block display-4 mt-2 mb-3 text-danger"></i>
                                                <h5 className="text-danger">Error</h5>
                                                <p>A simple danger alert</p>
                                            </UncontrolledAlert>
                                        </Col>

                                        <Col sm={3}>
                                            <UncontrolledAlert color="warning" className="px-4 mb-0 text-center">
                                                <i className="mdi mdi-alert-outline d-block display-4 mt-2 mb-3 text-warning"></i>
                                                <h5 className="text-warning">Warning</h5>
                                                <p>A simple warning alert</p>
                                            </UncontrolledAlert>
                                        </Col>

                                        <Col sm={3}>
                                            <UncontrolledAlert color="info" className="px-4 mb-0 text-center">
                                                <i className="mdi mdi-alert-circle-outline d-block display-4 mt-2 mb-3 text-info"></i>
                                                <h5 className="text-info">Info</h5>
                                                <p>A simple info alert</p>
                                            </UncontrolledAlert>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                </Container>
            </div>
        </React.Fragment>
    );
};
export default UiAlerts;