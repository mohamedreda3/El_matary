import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    Row,
    Col,
    Container,
    Modal,
    TabContent,
    TabPane,
    Tooltip,
    Card,
    CardBody,
    UncontrolledDropdown,
    DropdownMenu,
    DropdownItem,
    DropdownToggle,
    Input,
    CloseButton
} from "reactstrap";

// Import Flatepicker
import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";

// Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import UnitListTable from "./UnitTable/UnitTableList";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";

const Unit = () => {
    document.title = "Courses | Matary - React Admin & Dashboard Template";
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [Units, setUnits] = useState(false)
    const location = useLocation();
    const getUnits = async () => {
        const send_data = {
            course_id: location?.state?.coursedata?.course_id
        };
        try {
            const units = await axios.post("https://camp-coding.tech/dr_elmatary/admin/courses/select_course_units.php", send_data);
            console.log(units);
            setUnits([...units]);
        } catch (err) {
            console.log(err);
        }
    }


    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = async (e) => {
        const send_data = {
            course_id: location.state.coursedata.course_id,
            unit_name: e.currentTarget.unit_name.value
        };
        const units = await axios.post("https://camp-coding.tech/dr_elmatary/admin/courses/add_unit.php", send_data);
        console.log(units);
        if (units.status) {
            toast.success("Added");
            await getUnits();
        } else {
            toast.error(units.message);
        }
        setIsModalOpen(false);
    };
    useEffect(() => {
        getUnits();
    }, []);

    const showHideUnit = async (send_data) => {
        const units = await axios.post("https://camp-coding.tech/dr_elmatary/admin/courses/show_hide_unit.php", JSON.stringify(send_data));
        if (units.status) {
            toast.success(units.message);
            await getUnits();
        } else {
            toast.error(units.message);
        }
    }

    if (!location.state) {
        return navigate("/courses-list");
    }
    console.log(location.state);
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid={true}>
                    {/* breadcrumbItem={loation?.state?.coursedata?.course_name + " Unit List"} */}
                    <Breadcrumbs title="Units" breadcrumbItem={location?.state?.coursedata?.course_name + " - Unit List"} />

                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardBody>
                                    <div className="position-relative">
                                        <div className="modal-button mt-2">
                                            <Row className="align-items-start">
                                                <Col className="col-sm">
                                                    <div>
                                                        <button type="button" className="btn btn-success mb-4" data-bs-toggle="modal" data-bs-target="#addCourseModal"
                                                            onClick={
                                                                () => {
                                                                    showModal();
                                                                }
                                                            }>
                                                            <i className="mdi mdi-plus me-1"></i>
                                                            Add Unit
                                                        </button>
                                                    </div>
                                                </Col>
                                              
                                            </Row>
                                        </div>
                                    </div>
                                    <div id="table-invoices-list">
                                        <UnitListTable Units={Units}
                                            showHideUnit={showHideUnit}
                                            courseData={
                                                location.state.coursedata
                                            } />
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>

                <Modal title="add unit"
                    isOpen={isModalOpen}>
                    <form action="#"
                        style={
                            {
                                padding: "15px",
                                display: "flex",
                                flexDirection: "column"
                            }
                        }
                        onSubmit={
                            (e) => {
                                e.preventDefault();
                                handleOk(e)
                                setIsModalOpen(false);
                            }
                        }>
                        <CloseButton onClick={
                            () => setIsModalOpen(false)
                        }
                            style={
                                { marginLeft: "auto" }
                            } />

                        <div className="input_Field">
                            <label forHtml="unit_name">Unit Name</label>
                            <Input style={
                                {
                                    width: "100%",
                                    padding: "10px",
                                    borderRadius: "4px"
                                }
                            }
                                type="text"
                                name="unit_name"
                                id="unit_name"
                                placeholder="unit_name"
                                required />
                        </div>
                        <button className="btn btn-success"
                            style={
                                { margin: "10px 0 0 auto" }
                            }>
                            {" "}
                            Add Unit{" "} </button>
                    </form>
                </Modal>
                <ToastContainer />

            </div>
        </React.Fragment>
    );
};

export default Unit;
