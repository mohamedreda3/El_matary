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
    DropdownToggle,
    ModalHeader,
    ModalBody,
    Input,
    CloseButton
} from "reactstrap";

// Import Flatepicker
import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";

// Breadcrumb
// import Breadcrumbs from "../../../components/Common/Breadcrumb";
// import CourseListTable from "./CourseTable/courseListTable";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import CourseListTable from "../Courses/CoursesList/CourseTable/courseListTable";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import UniversityListTable from "./UniversityTable/UniversityListTable";
// import { CloseButton } from "react-toastify/dist/components";


const Universities = () => {
    document.title = "Courses | Matary - React Admin & Dashboard Template";
    const navigate = useNavigate();

    const [Univerisities, setUniverisities] = useState(false)

    const [showadduni,setshowadduni]=useState(false);

    const getUniversities = async () => {
        const University = await axios.get("https://camp-coding.tech/dr_elmatary/admin/universities/select_university.php");
        // console.log(University);
        setUniverisities([...University.message])
    }

    const showHideCourse = async (send_data) => {
        const courses = await axios.post("https://camp-coding.tech/dr_elmatary/admin/courses/show_hide_course.php", JSON.stringify(send_data));
        // console.log(courses);
        if (courses.status) {
            toast.success(courses.message);
            await getUniversities();
        } else {
            toast.error(courses.message);
        }
    }

    const [university_name,setuniversity_name]=useState("");

    const handleaddnewuni=()=>{
      if(university_name==""||university_name==null){
        toast.warn("Enter University Name");
        return;
      }
      const data_send={
        university_name
      }
      // console.log(data_send);
      axios.post("https://camp-coding.tech/dr_elmatary/admin/universities/insert_university.php",JSON.stringify(data_send))
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

    useEffect(() => {
        getUniversities();
    }, [])

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid={true}>
                    <Breadcrumbs title="Universitys" breadcrumbItem="University List" />
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
                                                                    setshowadduni(true)
                                                                }
                                                            }>
                                                            <i className="mdi mdi-plus me-1"></i>
                                                            Add University
                                                        </button>
                                                    </div>
                                                </Col>
                                               
                                            </Row>
                                        </div>
                                    </div>
                                    <div id="table-invoices-list">
                                        <UniversityListTable handleupdateparent={()=>{
                                          getUniversities();
                                        }} Univerisities={Univerisities}
                                            showHideCourse={showHideCourse} />
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Modal isOpen={showadduni}>
                <ModalHeader
                    tag="h4">
                    <div style={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
                        <h4>Add New University</h4>
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
                                handleaddnewuni()
                            }
                        }>



                        <div className="input_Field">
                            <label htmlFor="">University Name</label>
                            <Input
                              onChange={(e)=>{
                                setuniversity_name(e.target.value)
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
                                placeholder="Enter University Name"
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
                </Container>
                <ToastContainer />
            </div>

        </React.Fragment>
    );
};

export default Universities;
