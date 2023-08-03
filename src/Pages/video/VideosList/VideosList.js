import React, { useEffect, useState } from "react";
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
  CloseButton,
  Input,
} from "reactstrap";

//Import Flatepicker
import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";

// Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import VideoListTable from "./VideoTable/videoListTable";
import axios from "axios";
import { Loader, SelectPicker } from "rsuite";
import { MenuItem, Select } from "@mui/material";


const Videos = () => {
  document.title = "Videos | Matary - React Admin & Dashboard Template";



  const navigate = useNavigate();
  const [Videos, setVideos] = useState([]);
  const [showAssign, setShowAssign] = useState(false);
  const [item, setItem] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const getVideos = async () => {
    const videos = await axios.get("https://camp-coding.tech/dr_elmatary/admin/videos/select_videos.php");
    setVideos([...videos])
  }
  useEffect(() => { getVideos() }, []);

  const [Courses, setCourses] = useState(false)
  const getCourses = async () => {
    const courses = await axios.get("https://camp-coding.tech/dr_elmatary/admin/courses/select_courses.php");
    setCourses([...courses])
  }

  const [selectedCourse, setSelectedCourse] = useState(false);
  const [Units, setUnits] = useState(false);
  const getUnits = async () => {
    const send_data = {
      course_id: selectedCourse
    };
    try {
      const units = await axios.post("https://camp-coding.tech/dr_elmatary/admin/courses/select_course_units.php", send_data);
      console.log(units);
      console.log(selectedCourse);
      setUnits([...units]);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getUnits();
  }, [selectedCourse])

  const columns = [{
    Header: "Video ID",
    accessor: "video_id",
    Filter: false,
  }, {
    Header: "Video Title",
    accessor: "video_title",
  }, {
    Header: "Video Duration",
    accessor: "video_duration",
    Filter: false,
  },
  {
    Header: 'Action',
    Cell: (cell) => {
      return (
        <>
          <UncontrolledDropdown>
            <DropdownToggle className="btn btn-light btn-sm" tag="button" data-bs-toggle="dropdown" direction="start">
              <i className="bx bx-dots-horizontal-rounded"></i>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-end">
              <DropdownItem onClick={
                () => {
                  console.log(cell.cell.row.original);
                  setItem(cell.cell.row.original);
                  setShowAssign(true)
                  getCourses();
                }
              }>Assign</DropdownItem>
              <DropdownItem onClick={
                () => {
                  navigate("/videos/unit-videos", { state: cell.cell.row.original });
                }
              }>View</DropdownItem>
              <DropdownItem>Delete</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </>
      )
    }
  },
  ]
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Videos" breadcrumbItem="Video List" />

          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <div className="position-relative">
                    <div className="modal-button mt-2">
                      <Row className="align-items-start">
                        <Col className="col-sm">
                          <div>
                            <button
                              type="button"
                              className="btn btn-success mb-4"
                              data-bs-toggle="modal"
                              data-bs-target="#addVideoModal"
                              onClick={() => {
                                navigate("add-video")
                              }}
                            >
                              <i className="mdi mdi-plus me-1"></i> Add Video
                            </button>
                          </div>
                        </Col>
                        <Col className="col-sm-auto">
                          <div className="d-flex gap-1">
                            <div className="input-group">
                              <Flatpickr
                                className="form-control"
                                placeholder="dd M, yyyy"
                                options={{
                                  mode: "range",
                                  dateFormat: "Y-m-d",
                                }}
                                id="datepicker-range"
                              />
                              <span className="input-group-text">
                                <i className="bx bx-calendar-event"></i>
                              </span>
                            </div>

                            <UncontrolledDropdown
                              className="dropdown"
                              direction="start"
                            >
                              <DropdownToggle
                                tag="a"
                                className="btn btn-link text-body shadow-none"
                              >
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
                    {Videos ?
                      <VideoListTable videos={Videos} columns={columns} /> : <Loader />
                    }
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <Modal isOpen={showAssign}>
        <ModalHeader
          tag="h4">
          <div style={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
            <h4>  Assign Video To Unit </h4>
            <CloseButton onClick={
              () => {
                setShowAssign(false);
                setSelectedCourse(false)
                setUnits(false);
              }
            }
              style={
                { marginLeft: "auto" }
              } />
          </div>
        </ModalHeader>
        <ModalBody>

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
              }
            }>
            <div className="input_Field">
              <Input style={
                {
                  width: "100%",
                  borderRadius: "4px",
                  margin: "10px 0"
                }
              }
                type="text"
                name="new_title"
                id="new_title"
                placeholder="Enter new_title"
              />

            </div>
            <div className="input_Field">
              <Select style={
                {
                  width: "100%",
                  borderRadius: "4px",
                  margin: "10px 0"
                }
              }
                type="text"
                name="course_id"
                id="course_id"
                placeholder="Choose Course"
                onChange={(e) => setSelectedCourse(e.target.value)}
                required>
                {
                  Courses && Courses.length ? Courses.map((item, index) => {
                    return <MenuItem value={item.course_id} key={index}>{item.course_name}</MenuItem>
                  }) : <h3>No Courses</h3>
                }
              </Select>
            </div>
            {
              selectedCourse && Units && Units.length ? <div className="input_Field">
                <Select style={
                  {
                    width: "100%",
                    borderRadius: "4px",
                    margin: "10px 0"
                  }
                }
                  type="text"
                  name="unit_id"
                  id="unit_id"
                  placeholder="Choose Unit"
                  required>
                  {
                    Units.map((item, index) => {
                      return <MenuItem value={item.unit_id} key={index}>{item.unit_name}</MenuItem>
                    })
                  }
                </Select>
              </div> : <h3>No Units In Course</h3>}
            <button className="btn btn-success"
              style={
                { margin: "10px 0 0 auto" }
              }>
              {" "}
              Assign To Unit{" "} </button>
          </form>

        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default Videos;
