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

import "./style.css";
// Import Flatepicker
import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";

// Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import CourseListTable from "./CourseTable/courseListTable";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { Loader } from "rsuite";
import { AiOutlineConsoleSql } from "react-icons/ai";


const Courses = () => {
    document.title = "Courses | Matary - React Admin & Dashboard Template";
    const navigate = useNavigate();

    const [Courses, setCourses] = useState(false)
    const [loading, setLoading] = useState(false);
    const [univs, setUnivs] = useState(false);
    const [filteredCourses, setFilteredCourses] = useState()
    const getCourses = async () => {
        setLoading(true);
        const courses = await axios.get("https://camp-coding.tech/dr_elmatary/admin/courses/select_courses.php");
        console.log(courses);
        setCourses([...courses]);
        setFilteredCourses([...courses]);
        setLoading(false);
    }

    const showHideCourse = async (send_data) => {
        console.log(send_data)
        const courses = await axios.post("https://camp-coding.tech/dr_elmatary/admin/courses/show_hide_course.php", JSON.stringify(send_data));
        console.log(courses);
        if (courses.status == 'success') {
            toast.success(courses.message);
            getCourses();
            console.log("getCourses");
        }
        else if (courses.status == 'error') {
            toast.error(courses.message);
        }
        else {
            toast.error("Something Went Error");
        }

    }

    const getUnivs = async () => {
        const selct_univs = await axios.get("https://camp-coding.tech/dr_elmatary/admin/universities/select_universities_grade.php");
        setUnivs(selct_univs.message);
    }

    const [selectedUnivs, setSelectedUnivs] = useState([])


    useEffect(() => {
        getCourses();
        getUnivs();
    }, []);

    useEffect(() => {
        const arr = [];
        console.log("Courses", selectedUnivs);
        if (selectedUnivs && selectedUnivs.length) {
            setCourses(
                selectedUnivs?.map((u_item, u_index) => {
                    filteredCourses.map((item, index) => {
                        console.log(item)
                        if (item.university_id
                            === u_item.university_id
                        ) {
                            return arr.push(item);
                        }
                    })
                }))
            setCourses([...arr]);
        } else {
            getCourses();
        }
    }, [selectedUnivs]);

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid={true}>
                    <Breadcrumbs title="Courses" breadcrumbItem="Course List" />
                    <div className="univs">
                        {
                            univs && univs.length ? univs.map((item, index) => {

                                return <span className={
                                    selectedUnivs && selectedUnivs.length &&
                                        selectedUnivs?.map((f_item) => f_item.university_id)?.find(class_item => class_item == item?.university_id)
                                        ?
                                        "active"
                                        :
                                        ""
                                }
                                    onClick={() =>

                                        !selectedUnivs?.map((f_item) => f_item?.university_id)?.find(class_item => class_item == item?.university_id) ?
                                            setSelectedUnivs([...selectedUnivs, { university_id: item?.university_id }]) : setSelectedUnivs(selectedUnivs.filter(fc_item => fc_item.university_id != item?.university_id))}
                                >
                                    {item?.university_name}
                                </span>
                            }) : null
                        }</div>
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

                                            </Row>
                                        </div>
                                    </div>

                                    <div id="table-invoices-list">

                                        {loading ? <Loader /> :
                                            <>

                                                <CourseListTable Courses={Courses}
                                                    showHideCourse={showHideCourse}
                                                    getCourses={getCourses}
                                                />

                                            </>
                                        }</div>

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
