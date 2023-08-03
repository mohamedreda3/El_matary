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
    CloseButton,
    ModalBody,
    ModalHeader
} from "reactstrap";

// Import Flatepicker
import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";

// Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import GradeListTable from "./GradeTable/GradeTableList";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";

const Grade = () => {
    document.title = "Courses | Matary - React Admin & Dashboard Template";
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [Units, setUnits] = useState(false)
    const [showadduni,setshowadduni]=useState(false);
    const [gradename,setgradename]=useState("");
    const location = useLocation();

    const getUnits = async () => {
        const send_data = {
            course_id: location?.state?.universitydata?.course_id
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
            course_id: location.state.universitydata.course_id,
            unit_name: e.currentTarget.unit_name.value
        };
        const units = await axios.post("https://camp-coding.tech/dr_elmatary/admin/courses/add_unit.php", send_data);
        console.log(units);
        if (units.status) {
            toast.success(units.message);
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

    const handleaddnewgrade=()=>{
      if(gradename==""||gradename==null){
        toast.warn("Enter University Name");
        return;
      }
      const data_send={
        gradename
      }
      axios.post("",JSON.stringify(data_send))
      .then((res)=>{
        if(res.status=='success'){
          window.location.reload();
          toast.success(res.message);
        }
        else if(res.status=='error'){
          toast.error(res.message);
        }
        else{
          toast.error("Something Went Error");
        }
      }).catch(err=>console.log(err))
    }


    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid={true}>
                    <Breadcrumbs title="Gradess" breadcrumbItem="Grade List" />

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
                                                                    // showModal();
                                                                    setshowadduni(true)
                                                                }
                                                            }>
                                                            <i className="mdi mdi-plus me-1"></i>
                                                            Add Unit
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
                                        <GradeListTable Units={Units}
                                            showHideUnit={showHideUnit}
                                            universitydata={
                                                location.state.universitydata
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

                <Modal isOpen={showadduni}>
                <ModalHeader
                    tag="h4">
                    <div style={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
                        <h4>Add New Grade</h4>
                        <CloseButton onClick={
                            () => {
                                setshowadduni(false);
                            }
                        }
                            style={
                                { marginLeft: "auto" }
                            } />
                    </div>
                </ModalHeader>
                <ModalBody>

                <form
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
                                // AssignVideo(e)
                                handleaddnewgrade()
                            }
                        }>



                        <div className="input_Field">
                            <label htmlFor="">University Name</label>
                            <Input
                              onChange={(e)=>{
                                setgradename(e.target.value)
                              }}
                            style={
                                {
                                    width: "100%",
                                    borderRadius: "4px",
                                    margin: "10px 0"
                                }
                            }
                                type="text"
                                name="new_title"
                                id="new_title"
                                placeholder="Enter Course Price"
                            />

                        </div>
                          <button className="btn btn-success"
                            style={
                                { margin: "10px 0 0 auto" }
                            }>
                            {" "}
                            Add {" "}
                          </button>
                    </form>


                </ModalBody>
                    </Modal>

                <ToastContainer />

            </div>
        </React.Fragment>
    );
};

export default Grade;
