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
  ModalHeader,
  ModalBody,
  Form,
  Label,
  Input,
  FormFeedback,
  CloseButton,
} from "reactstrap";
import axios from "axios"
//Import Flatepicker
import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";

// Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import CourseListTable from "../Courses/CoursesList/CourseTable/courseListTable";
import UnitListTable from "../Units/UnitTable/UnitTableList";
import LessonsTableList from "./LessonsTabel/LessonsTableList";
import { useCallback } from "react";
import { Fragment } from "react";
import Flash_Cards from "../Interactive/flashcards";
import Tweets from "../Interactive/tweets";
import WrittenQuestions from "../Interactive/writtenquestion";
import MCQQuestions from "./mcqquestion";
// import VideoListTable from "../video/BooksList/VideoTable/bookListTable";
import { MenuItem, Select } from "@mui/material";
import { useEffect } from "react";
import { Loader } from "rsuite";
import VideoListTable from "../video/VideosList/VideoTable/videoListTable";
import { ToastContainer, toast } from "react-toastify";
import Ebooks from "../Interactive/ebooks";

// import CourseListTable from "../CourseTable/courseListTable";

const Lessons = () => {
  document.title = "Courses | Matary - React Admin & Dashboard Template";

  const location = useLocation();
  // const {state}=location;
  const [type_2, setType_2] = useState(false);
  const [videoLink, setVideoLink] = useState(false);

  // console.log(data)
  const [modal, setModal] = useState(false);
  const toggle = useCallback(() => {
    if (modal) {
      setModal(false);
    } else {
      setModal(true);
    }
  }, [modal]);

  const navigate = useNavigate();

  function handelType_2Change(type_2_2) {
    setType_2(type_2_2);
  }
  function handelVideoLink(link) {
    setVideoLink(link);
  }
  const [title, setTitle] = useState("Flash Cards");
  const [type, setType] = useState("FlashCards");

  document.title = title + " | Matary - React Admin & Dashboard Template";

  const buttons = [
    { type: "Lessons", title: "Lessons" },
    { type: "FlashCards", title: "Flash Cards" },
    { type: "Tweets", title: "Tweets" },
    { type: "writtenquestion", title: "Written Questions" },
    { type: "mcqquestion", title: "MCQ Questions" },
    { type: "ebooks", title: "Ebooks" },
    // ebooks
  ];
  const [Videos, setVideos] = useState([]);
  const [showAssign, setShowAssign] = useState(false);
  const [item, setItem] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState(false)
  const [videoData, setVideoData] = useState(false);
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
      setUnits([...units]);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getUnits();
  }, [selectedCourse])
  const [rowdata, setrowdata] = useState({});
  const HandleUpdateVideo = () => {
    const data_send = {
      unit_video_id: rowdata.unit_video_id,
      new_title: rowdata.new_title,
      source_video_id: rowdata.source_video_id,
      unit_id: rowdata.unit_id,
      course_id: rowdata.course_id,
    }
    axios.post("https://camp-coding.tech/dr_elmatary/admin/videos/update_videos_info.php", JSON.stringify(data_send))
      .then((res) => {
        if (res.status == 'success') {
          toast.success(res.message);
        }
        else if (res.status == 'error') {
          toast.error(res.message);
        }
        else {
          toast.error("something went error");
        }
      }).catch(err => console.log(err))
  }

  const handleupdatestatus=(data)=>{
    console.log(data)
    const data_send={
      unit_video_id:data.unit_video_id,
      hidden_value:data.hidden=='no'?'yes':'no'
    }
    axios.post("https://camp-coding.tech/dr_elmatary/admin/videos/update_videos_hidden.php",JSON.stringify(data_send))
    .then((res)=>{
      console.log(res)
      if(res.status=='success'){
        toast.success(res.message);
        getVideos();

      }
      else if(res.status=='error'){
        toast.error(res.message);
      }
      else{
        toast.error("something went error");
      }
    }).catch(err=>console.log(err))
    console.log(data_send)
  }

  const handleupdatefree = (data) => {
    const data_send = {
      unit_video_id: data.unit_video_id,
      free_value: data.free == 'no' ? 'yes' : 'no'
    }
    axios.post("https://camp-coding.tech/dr_elmatary/admin/videos/update_free_video.php", JSON.stringify(data_send))
      .then((res) => {
        if (res.status == 'success') {
          toast.success(res.message);
          getVideos();
        }
        else if (res.status == 'error') {
          toast.error(res.message);
        }
        else {
          toast.error("something went error");
        }
      }).catch(err => console.log(err))
  }

  const columns = [{
    Header: "Video ID",
    accessor: "source_video_id",
    Filter: false,
  }, {
    Header: "Video Title",
    accessor: "new_title",
  },
  {
    Header: "Course Name",
    accessor: "course_name",
    Filter: false,
  },
  {
    Header: 'Free',
    Cell: (cell) => {
      switch (cell.cell.row.original.free) {
        case 'no':
          return <span className="badge badge-pill badge-soft-success font-size-12">
            {
              cell.cell.row.original.free
            }</span>;

        case 'yes':
          return <span className="badge badge-pill badge-soft-warning font-size-12">
            {
              cell.cell.row.original.free
            }</span>;

        default:
          return <span className="badge badge-pill badge-soft-success font-size-12">
            {
              cell.cell.row.original.free
            }</span>
      }
    }
  }, {
    Header: 'Status',
    Cell: (cell) => {
      switch (cell.cell.row.original.hidden) {
        case 'no':
          return <span className="badge badge-pill badge-soft-success font-size-12">
            {
              cell.cell.row.original.hidden
            }</span>;

        case 'yes':
          return <span className="badge badge-pill badge-soft-warning font-size-12">
            {
              cell.cell.row.original.hidden
            }</span>;

        default:
          return <span className="badge badge-pill badge-soft-success font-size-12">
            {
              cell.cell.row.original.hidden
            }</span>
      }
    }
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
              <DropdownItem>View</DropdownItem>
              {/* new_title */}
              <DropdownItem onClick={
                () => {
                  handleupdatestatus(cell.cell.row.original)
                  // console.log(cell.cell.row.original.hidden)
                }
              }>Show/Hide</DropdownItem>
              <DropdownItem onClick={
                () => {
                  handleupdatefree(cell.cell.row.original)
                  // console.log(cell.cell.row.original.hidden)
                }
              }>Free/paid</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </>
      )
    }
  },
  ]

  const Video = videoData.assign_data;


  const [unitVideos, setUnitVideos] = useState(false);
  useEffect(() => { getUnitsVideos() }, [Videos])
  if (!location.state) {
    return navigate(-1);
  }

  const unitData = location.state.unitData.unit_id;
  const courseData = location.state.coursedata.course_id;
  console.log(unitData);
  const getUnitsVideos = () => {
    const arr = [];
    Videos.map((item, index) => {
      if (item.assign_data && item.assign_data.length) {
        arr.push(...item.assign_data.filter((v_item, v_index) => {
          return v_item.unit_id == unitData
        }))
      }
    })
    console.log("arr", arr);
    if (arr && arr.length) {
      setUnitVideos([...arr])
    }
    console.log("arr", arr);
  };

  console.log(unitVideos);
  const AssignVideo = async (e) => {
    const data_send = {
      "new_title": e.currentTarget.new_title.value, // not req
      "course_id": courseData,
      "unit_id": unitData,
      "source_video_id": selectedCourse
    }
    console.log(data_send);
    const assign = await axios.post("https://camp-coding.tech/dr_elmatary/admin/videos/assign_videos_to_unit.php", data_send);
    if (assign.status == "success") {
      toast.success("Assigned");
      window.location.reload()
    } else {
      toast.error(assign.message);
    }
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <div className="header-btns">
            {buttons.map((buttonData, index) => (
              <button
                key={index}
                className={`btn btn-success ${type === buttonData.type ? "btn-danger" : ""
                  }`}
                onClick={() => {
                  setType(buttonData.type);
                  setTitle(buttonData.title);
                }}
              >
                {buttonData.title}
              </button>
            ))}
          </div>
          <div id="table-invoices-list">
            {type == "Lessons" ? (
              <Fragment>
                <Breadcrumbs title="Lessons" breadcrumbItem="Lesson List" />

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
                                    onClick={
                                      () => {
                                        console.log(Video);
                                        setItem(Video);
                                        setShowAssign(true)
                                        getCourses();
                                      }
                                    }
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
                        {console.log(unitVideos)}
                        <div id="table-invoices-list">
                          {unitVideos && unitVideos.length ?
                            <VideoListTable videos={unitVideos} columns={columns} /> : <div>
                              <h2>No Videos</h2>
                            </div>
                          }
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
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
                          AssignVideo(e)
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
                          name="video_id"
                          id="video_id"
                          placeholder="Choose Video"
                          onChange={(e) => setSelectedCourse(e.target.value)}
                          required>
                          {console.log(Videos)}
                          {
                            Videos && Videos.length ? Videos.map((item, index) => {
                              return <MenuItem value={item.video_id} key={index}>{item.video_title}</MenuItem>
                            }) : <h3>No Videos</h3>
                          }
                        </Select>
                      </div>

                      <button className="btn btn-success"
                        style={
                          { margin: "10px 0 0 auto" }
                        }>
                        {" "}
                        Assign To Unit{" "} </button>
                    </form>

                  </ModalBody>
                </Modal>
              </Fragment>
            ) : type == "FlashCards" ? (
              <Flash_Cards CourseId={courseData} unitId={unitData} />
            ) : type == "Tweets" ? (
              <Tweets CourseId={courseData} unitId={unitData} />
            ) : type == "writtenquestion" ? (
              <WrittenQuestions CourseId={courseData} unitId={unitData} />
            ) : type == "mcqquestion" ? (
              <MCQQuestions />
            ) : type == "ebooks" ? (
              <Ebooks CourseId={courseData} unitId={unitData} />) : null}
          </div>
        </Container>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle} tag="h4">
            Add New Lesson
          </ModalHeader>
          <ModalBody>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                // validation.handleSubmit();
                return false;
              }}
            >
              <Row>
                <Col md={12}>
                  <div className="mb-3">
                    <Label className="form-label">Lesson Name</Label>
                    <Input name="orderId" type_2="text" />
                  </div>
                  <div className="mb-3">
                    <Label className="form-label">video</Label>
                    <Input name="orderId" type_2="file" />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="text-end">
                    <button
                      type_2="submit"
                      className="btn btn-success save-user"
                    >
                      Save
                    </button>
                  </div>
                </Col>
              </Row>
            </Form>
          </ModalBody>
        </Modal>
        <ToastContainer />
      </div>
    </React.Fragment>
  );
};

export default Lessons;
