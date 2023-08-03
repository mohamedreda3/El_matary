import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
    DropdownToggle
} from "reactstrap";

// Import Flatepicker
import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";

// Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import CourseListTable from "./CourseTable/courseListTable";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";


const Courses = () => {
    document.title = "Courses | Matary - React Admin & Dashboard Template";
    const navigate = useNavigate();

    const [Courses, setCourses] = useState(false)

    const getCourses = async () => {
        const courses = await axios.get("https://camp-coding.tech/dr_elmatary/admin/courses/select_courses.php");
        console.log(courses);
        setCourses([...courses])
    }

    const showHideCourse = async (send_data) => {
        const courses = await axios.post("https://camp-coding.tech/dr_elmatary/admin/courses/show_hide_course.php", JSON.stringify(send_data));
        console.log(courses);
        if (courses.status) {
            toast.success(courses.message);
            await getCourses();
        } else {
            toast.error(courses.message);
        }
    }


    useEffect(() => {
        getCourses();
    }, [])

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid={true}>
                    <Breadcrumbs title="Courses" breadcrumbItem="Course List" />
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
                                                                    navigate("add-course")
                                                                }
                                                            }>
                                                            <i className="mdi mdi-plus me-1"></i>
                                                            Add Course
                                                        </button>
                                                    </div>
                                                </Col>
                                                <Col className="col-sm-auto">
                                                    <div className="d-flex gap-1">
                                                        <div className="input-group">
                                                            <Flatpickr className="form-control" placeholder="dd M, yyyy"
                                                                options={
                                                                    {
                                                                        mode: "range",
                                                                        dateFormat: "Y-m-d"
                                                                    }
                                                                }
                                                                id="datepicker-range" />
                                                            <span className="input-group-text">
                                                                <i className="bx bx-calendar-event"></i>
                                                            </span>
                                                        </div>

                                                        <UncontrolledDropdown className="dropdown" direction="start">
                                                            <DropdownToggle tag="a" className="btn btn-link text-body shadow-none">
                                                                <i className="bx bx-dots-horizontal-rounded"></i>
                                                            </DropdownToggle>
                                                            <DropdownMenu className="dropdown-menu-end">
                                                                <DropdownItem>Action</DropdownItem>
                                                                <DropdownItem>Another action</DropdownItem>
                                                                <DropdownItem>Something else here</DropdownItem>
                                                            </DropdownMenu>
                                                        </UncontrolledDropdown>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>
                                    <div id="table-invoices-list">
                                        <CourseListTable Courses={Courses}
                                            showHideCourse={showHideCourse} />
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
                <ToastContainer />
            </div>

        </React.Fragment>
    );
};

export default Courses;
