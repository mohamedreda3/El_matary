import React, { useState, useEffect } from "react";
import classnames from "classnames";
import "./style.css"
import {
    Container,
    Row,
    Col,
    Card,
    Collapse,
    Form,
    Modal
} from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import Dropzone from "react-dropzone";

// Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { DatePicker, Loader } from "rsuite";

const AddCopoun = () => {
    document.title = "Add Copoun | Matary - React Admin & Dashboard Template";

    const [col1, setcol1] = useState(true);
    const [col2, setcol2] = useState(false);
    const [col3, setcol3] = useState(false);

    const t_col1 = () => {
        setcol1(!col1);
        setcol2(false);
        setcol3(false);
    };


    const [modal, setmodal] = useState(false);

    function tog_mod() {
        setmodal(!modal);
    }

    const [subjects, setSubjects] = useState(
        [
            {
                id: 1,
                name: "Math",
                selected: false
            }, {
                id: 2,
                name: "Math2",
                selected: false
            }, {
                id: 3,
                name: "Math3",
                selected: false
            }
        ]
    );
    const [Courses, setCourses] = useState(false)

    const getCourses = async () => {
        const courses = await axios.get("https://camp-coding.tech/dr_elmatary/admin/courses/select_courses.php");

        const co = courses.map((item) => {
            return {
                id: item.course_id,
                name: item.course_name,
                selected: false
            }
        });
        console.log(co);

        setCourses([...co])
    }
    useEffect(() => {
        getCourses();
    }, [])

    const copounDate = useRef();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const addCopoun = async (e) => {
        setLoading(true);
        e.preventDefault();
        // alert("Submitted")
        const data_send = {
            "copoun_name": copounDate.current.copoun_name.value,
            "copoun_quantity": copounDate.current.copoun_quantity.value,
            "subjects": Courses && Courses.length ? Courses.filter((item) => item.selected).map((item) => item.id).join("*") : null,
            "phone_number": copounDate.current.phone_number.value,
            "end_date": copounDate.current.end_date.value
        }

        const allPropertiesNotEmpty = Object.values(data_send).every((value) => value !== null && value !== undefined && value !== "");

        if (allPropertiesNotEmpty) {
            const link = `https://camp-coding.tech/dr_elmatary/admin/subscription/create_cards.php?courses_ids=${data_send.subjects}&card_count=${data_send.copoun_quantity}&title=${data_send.copoun_name}&support_no=${data_send.phone_number}&end_date=${data_send.end_date}`

            const url = await axios.get(link);
            toast.success("Card Created Successfully");
            window.open(link, "_blank");
        } else {
            toast.error("Add All Card Data");
        }
        setLoading(false)
    }

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid={true}>
                    <Breadcrumbs title="Ecommerce" breadcrumbItem="Add Copoun" />
                    <Row>
                        <Col lg={12}>
                            <div className="custom-accordion" id="addcopoun-accordion">
                                <Card>
                                    <Link to="#addcopoun-copouninfo-collapse"
                                        className={
                                            classnames("text-dark", {
                                                collapsed: !col1
                                            })
                                        }
                                        type="button"
                                        onClick={t_col1}
                                        style={
                                            { cursor: "pointer" }
                                        }>
                                        <div className="p-4">
                                            <div className="d-flex align-items-center">
                                                <div className="flex-shrink-0 me-3">
                                                    <div className="avatar-sm">
                                                        <div className="avatar-title rounded-circle bg-soft-primary text-primary">
                                                            01
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex-grow-1 overflow-hidden">
                                                    <h5 className="font-size-16 mb-1">Copoun Info</h5>
                                                    <p className="text-muted text-truncate mb-0">
                                                        Fill all information below
                                                    </p>
                                                </div>
                                                <div className="flex-shrink-0">
                                                    <i className="mdi mdi-chevron-up accor-down-icon font-size-24"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                    <Collapse isOpen={col1}
                                        id="checkout-billinginfo-collapse">
                                        <div className="p-4 border-top">
                                            <form ref={copounDate}
                                                autocomplete="on"
                                                onSubmit={
                                                    (e) => {
                                                        e.preventDefault();
                                                        addCopoun(e)
                                                    }
                                                }>
                                                <div className="mb-3">
                                                    <label className="form-label" htmlFor="copoun_name">
                                                        Copoun Name
                                                    </label>
                                                    <input id="copoun_name" name="copoun_name" placeholder="Enter Copoun Name" type="text" className="form-control" />
                                                </div>
                                                <div className="mb-3">
                                                    <label className="form-label" htmlFor="end_date">
                                                        Copoun End Date
                                                    </label>
                                                    {/* <input id="end_date" name="end_date" placeholder="Enter Copoun End Date" type="date" className="form-control" /> */}
                                                    <DatePicker id="end_date" name="end_date" />
                                                </div>
                                                <Row>
                                                    <Col lg={4}
                                                        style={
                                                            { width: "100%" }
                                                        }>
                                                        <div className="mb-3">
                                                            <label className="form-label" htmlFor="copoun_quantity">
                                                                Copoun Quantity
                                                            </label>
                                                            <input id="copoun_quantity" name="copoun_quantity" placeholder="Enter Quantity" type="number"
                                                                style={
                                                                    { width: "100%" }
                                                                }
                                                                className="form-control" />
                                                        </div>
                                                    </Col>

                                                </Row>


                                                <div className="mb-0">
                                                    <label className="form-label" htmlFor="phone_number">
                                                        Support phone number
                                                    </label>
                                                    <input className="form-control" name="phone_number" id="phone_number" placeholder="Enter Copoun Phone Number"></input>
                                                </div>

                                                <div className="mb-0">
                                                    <label className="form-label" htmlFor="phone_number">
                                                        Select Copoun Subjects
                                                    </label>
                                                    <ul className="subjects_av">
                                                        {
                                                            Courses && Courses.length ? Courses.map((item, index) => {
                                                                return <li key={index}
                                                                    className={
                                                                        item.selected ? "btn btn-success" : "btn"
                                                                    }
                                                                    onClick={
                                                                        () => {
                                                                            Courses.map(
                                                                                (s_item, index) => s_item.id == item.id ? s_item.selected = !s_item.selected : item
                                                                            )
                                                                            setCourses([...Courses])
                                                                        }
                                                                    }>
                                                                    {
                                                                        item.name
                                                                    }</li>
                                                            }) : <h2 style={
                                                                { textAlign: "center" }
                                                            }>
                                                                No Subjects Found
                                                            </h2>
                                                        } </ul>
                                                </div>
                                                <Row className="mb-4">
                                                    <Col className="col text-end">
                                                        <Link to="#" className="btn btn-danger me-1">
                                                            {" "}
                                                            <i className="bx bx-x me-1"></i>
                                                            Cancel{" "} </Link>
                                                        {!loading ?
                                                            <button to="#" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#success-btn"
                                                                onClick={
                                                                    (e) => {
                                                                        addCopoun(e)
                                                                    }
                                                                }>
                                                                {" "}
                                                                <><i className=" bx bx-file me-1"></i>
                                                                    Save </> </button> : <Loader size="sm" />}
                                                    </Col>
                                                </Row>
                                            </form>
                                        </div>
                                    </Collapse>
                                </Card>

                            </div>
                        </Col>
                    </Row>


                </Container>
            </div>
            <Modal isOpen={modal}
                toggle={
                    () => {
                        tog_mod();
                    }
                }
                id="success-btn"
                centered>
                <div className="modal-content">
                    <div className="modal-body">
                        <div className="text-center">
                            <i className="bx bx-check-circle display-1 text-success"></i>
                            <h3 className="mt-3">Copoun Added Successfully</h3>
                        </div>
                    </div>
                </div>
            </Modal>
            <ToastContainer />
        </React.Fragment>
    );
};

export default AddCopoun;
