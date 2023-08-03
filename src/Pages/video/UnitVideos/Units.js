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
    CloseButton,
    Input,
    Button,
} from "reactstrap";

// Import Flatepicker
import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";

// Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";
import { MenuItem, Select } from "@mui/material";
// import VideoListTable from "../BooksList/VideoTable/bookListTable";
import VideoListTable from "../VideosList/VideoTable/videoListTable";
const UnitVideo = () => {
    document.title = "Courses | Matary - React Admin & Dashboard Template";
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [UnitVideos, setUnitVideos] = useState(false)
    const location = useLocation();

    const [showupdate,setshowupdate]=useState(false);
    const showHideUnitVideo = async (send_data) => {
        const units = await axios.post("https://camp-coding.tech/dr_elmatary/admin/courses/show_hide_unit.php", JSON.stringify(send_data));
    }

    const [selectedCourse, setSelectedCourse] = useState(false);
    const [Units, setUnits] = useState(false);

    const [rowdata,setrowdata]=useState({});


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


    const HandleUpdateVideo=()=>{
      const data_send={
        unit_video_id:rowdata.unit_video_id,
        new_title:rowdata.new_title,
        source_video_id:rowdata.source_video_id,
        unit_id:rowdata.unit_id,
        course_id:rowdata.course_id,
      }
      axios.post("https://camp-coding.tech/dr_elmatary/admin/videos/update_videos_info.php",JSON.stringify(data_send))
      .then((res)=>{
        if(res.status=='success'){
          toast.success(res.message);
        }
        else if(res.status=='error'){
          toast.error(res.message);
        }
        else{
          toast.error("something went error");
        }
      }).catch(err=>console.log(err))
    }

    const handleupdatefree=(data)=>{
      const data_send={
        unit_video_id:data.unit_video_id,
        free_value:data.free=='no'?'yes':'no'
      }
      axios.post("https://camp-coding.tech/dr_elmatary/admin/videos/update_free_video.php",JSON.stringify(data_send))
      .then((res)=>{
        if(res.status=='success'){
          toast.success(res.message);
        }
        else if(res.status=='error'){
          toast.error(res.message);
        }
        else{
          toast.error("something went error");
        }
      }).catch(err=>console.log(err))
    }

    useEffect(() => {
        getUnits();
    }, [selectedCourse])


    const [Videos, setVideos] = useState([]);
    const [showAssign, setShowAssign] = useState(false);
    const [item, setItem] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [selectedUnit, setSelectedUnit] = useState(false)
    const [Courses, setCourses] = useState(false);

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

    const getCourses = async () => {
        const courses = await axios.get("https://camp-coding.tech/dr_elmatary/admin/courses/select_courses.php");
        setCourses([...courses])
    }


    if (!location.state) {
        return navigate("/videos-list");
    }

    let videoData = location.state;
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
                            <DropdownItem
                              onClick={()=>{
                                setshowupdate(true);
                                setrowdata(cell.cell.row.original);
                                console.log(cell.cell.row.original)
                              }}
                            >Update</DropdownItem>
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
    console.log(videoData);
    const AssignVideo = async (e) => {
        const data_send = {
            "new_title": e.currentTarget.new_title.value, // not req
            "source_video_id": videoData.video_id,
            "unit_id": selectedUnit,
            "course_id": selectedCourse
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
                    <Breadcrumbs title="Videos" breadcrumbItem="Video Unit List" />
                    <Row>
                        <div className="videoData">
                            <div className="media">
                                <video src={videoData.vimeo_data}></video>
                                <div className="textData">

                                </div>
                            </div>
                        </div>
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
                                                            <i className="mdi mdi-plus me-1"></i> Assign Video to unit
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
                                        {Video && Video.length ?
                                            <VideoListTable videos={Video} columns={columns} /> : <div>
                                                <h2>No Units</h2>
                                            </div>
                                        }
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Modal isOpen={showupdate}>
                <ModalHeader
                    tag="h4">
                    <div style={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
                        <h4>  Update Video Data </h4>
                        <CloseButton onClick={
                            () => {
                                setshowupdate(false);
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
                                HandleUpdateVideo()
                            }
                        }>
                        <div className="input_Field">
                          <label htmlFor="">Old Title</label>
                            <Input style={
                                {
                                    width: "100%",
                                    borderRadius: "4px",
                                    margin: "10px 0"
                                }
                            }
                                type="text"
                                name="new_title"
                                onChange={(e)=>{
                                  setrowdata({...rowdata,new_title:e.target.value})
                                }}
                                value={rowdata.new_title}
                                id="new_title"
                                placeholder="Enter new_title"
                            />

                        </div>
                        <Button type="submit" color="danger">
                      Update
                    </Button>
                    </form>

                </ModalBody>
            </Modal>
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
                                    onChange={(e) => setSelectedUnit(e.target.value)}
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
            <ToastContainer />
        </React.Fragment>
    );
};

export default UnitVideo;
