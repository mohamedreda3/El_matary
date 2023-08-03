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
} from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";
import LessonsTableList from "../Lessons/LessonsTabel/LessonsTableList";
import { useCallback } from "react";
import Dropzone from "react-dropzone";
import { toast } from "react-toastify";
import axios from "axios"
import { useEffect } from "react";
import TweetsTableList from "../Lessons/LessonsTabel/TweetsTableList";
const Tweets = ({ CourseId, unitId }) => {
  const [type, setType] = useState(false);
  const [videoLink, setVideoLink] = useState(false);

  // console.log(data)
  const [modal, setmodal] = useState(false);

  /* ====================   Files   ===================*/
  const [selectedFiles, setselectedFiles] = useState([]);

  function handleAcceptedFiles(files) {
    files.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    );
    setselectedFiles(files);
  }

  /**
   * Formats the size
   */
  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  function tog_mod() {
    setmodal(!modal);
  }
  /* ====================   Files   ===================*/

  const toggle = useCallback(() => {
    if (modal) {
      setmodal(false);
    } else {
      setmodal(true);
    }
  }, [modal]);

  const [tweet_data, setTweetData] = useState(false);
  const [edit, setEdit] = useState(false);
  const [tweets, setTweets] = useState(false);
  const [item, setItem] = useState(false);
  const getTweets = async () => {
    const data_send = {
      "course_id": CourseId,
      "unit_id": unitId
    }
    const get = await axios.post("https://camp-coding.tech/dr_elmatary/admin/tweets/select_tweets.php", data_send)
    setTweets(get.message);
  }
  const addTweet = async (e) => {
    const data_send = {
      "tweet_value": e.currentTarget.tweet_value.value,
      "tweet_title": e.currentTarget.tweet_title.value,
      "course_id": CourseId,
      "unit_id": unitId
    }
    console.log(data_send);
    const add = await axios.post("https://camp-coding.tech/dr_elmatary/admin/tweets/insert_tweets.php", data_send);
    console.log(add);
    if (add.status == "success") {
      toast.success(add.message);
      await getTweets()
    } else {
      toast.error(add.message)
    }
  }
  const showHideTweets = async (send_data) => {
    const tweets_1 = await axios.post("https://camp-coding.tech/dr_elmatary/admin/tweets/update_tweets_hidden.php", send_data);
    console.log(send_data);
    if (tweets_1.status == "success") {
      toast.success(tweets_1.message);
      await getTweets();
      setEdit(false)
    } else {
      toast.error(tweets_1.message);
    }
  }

  const editTweet = async (e) => {
    const data_send = {
      "course_id": CourseId,
      "unit_id": unitId,
      "tweet_value": e.currentTarget.tweet_answar.value,
      "tweet_title": e.currentTarget.tweet_title.value,
      "tweet_id": item.tweet_id
    }
    const edit = await axios.post("https://camp-coding.tech/dr_elmatary/admin/tweets/update_tweet_info.php", data_send)

    if (edit.status == "success") {
      toast.success(edit.message);
      await getTweets();
    } else {
      toast.error(edit.message);
    }
  }

  // editTweet
  useEffect(() => { getTweets() }, [])
  const columns =
    [
      {
        Header: 'Tweet ID',
        accessor: 'tweet_id',
        Filter: false,
      },

      {
        Header: 'Tweet title',
        accessor: 'tweet_title',
      },
      {
        Header: 'Tweet Answer',
        accessor: 'tweet_value',
      },
      {
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
                  <DropdownItem onClick={() => { setEdit(true); setItem(cell.cell.row.original); }}>Edit</DropdownItem>
                  <DropdownItem onClick={() => {
                    const item = cell.cell.row.original;
                    const send_data = {
                      hidden_value: item.hidden == "no" ? "yes" : "no",
                      tweet_id: item.tweet_id
                    }
                    showHideTweets(send_data)
                  }}>Hide/Show</DropdownItem>
                  <DropdownItem onClick={()=>handlecopyitem(cell.cell.row.original)}>Copy</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </>
          )
        }
      },
    ]
  const handlecopyitem = (data) => {
    const data_send = {
      tweet_id: data.tweet_id
    }
    console.log(data_send)
    axios.post("https://camp-coding.tech/dr_elmatary/admin/tweets/make_copy_from_tweets.php", JSON.stringify(data_send))
      .then((res) => {
        if (res.status == 'success') {
          toast.success(res.message);
          getTweets();
        }
        else if (res.status == 'error') {
          toast.error(res.message);
        }
        else {
          toast.error("Something Went Error");
        }
      })
  }
  return (
    <React.Fragment>
      <Container fluid={true}>
        <Breadcrumbs title="tweets" breadcrumbItem="Tweets List" />

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
                            data-bs-target="#addCourseModal"
                            onClick={() => {
                              // showModal()
                              setmodal(true);
                            }}
                          >
                            <i
                              onClick={() => {
                                setmodal(true);
                              }}
                              className="mdi mdi-plus me-1"
                            ></i>{" "}
                            Add Tweet
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
                  {tweets && tweets.length ? <TweetsTableList showHideTweet={showHideTweets} data={tweets} columns={columns} /> : <h4>No Tweets</h4>}
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle} tag="h4">
          Add New Tweet
        </ModalHeader>
        <ModalBody>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              addTweet(e)
              return false;
            }}
          >
            <Row>
              <Col md={12}>
                <div className="mb-3">
                  <Label className="form-label">Tweet Title</Label>
                  <Input name="tweet_title" type="text" />
                </div>
                <div className="mb-3">
                  <Label className="form-label">Answer</Label>
                  <textarea
                    style={{ height: "100px" }}
                    id="hours"
                    name="tweet_value"
                    placeholder="Enter Explanation"
                    type="number"
                    className="form-control"
                  ></textarea>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="text-end">
                  <button type="submit" className="btn btn-success save-user">
                    Save
                  </button>
                </div>
              </Col>
            </Row>
          </Form>
        </ModalBody>
      </Modal>
      <Modal isOpen={edit} toggle={() => setEdit(false)}>
        <ModalHeader toggle={() => setEdit(false)} tag="h4">
          Edit Written Tweet
        </ModalHeader>
        <ModalBody>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              editTweet(e)
              return false;
            }}
          >
            <Row>
              <Col md={12}>
                <div className="mb-3">
                  <Label className="form-label">Tweet Title</Label>
                  <Input type="text" name="tweet_title" defaultValue={item?.tweet_title} />
                </div>
                <div className="mb-3">
                  <Label className="form-label">Answer</Label>
                  <textarea
                    style={{ height: "100px" }}
                    id="hours"
                    name="tweet_answar"
                    placeholder="Enter Explanation"
                    type="number"
                    className="form-control"
                    defaultValue={item?.tweet_value}
                  ></textarea>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="text-end">
                  <button type="submit" className="btn btn-success save-user">
                    Save
                  </button>
                </div>
              </Col>
            </Row>
          </Form>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default Tweets;
