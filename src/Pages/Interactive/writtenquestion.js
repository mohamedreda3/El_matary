import React, { useEffect, useState } from "react";
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
import axios from "axios";
import { toast } from "react-toastify";
import QuestionsTableList from "../Lessons/LessonsTabel/QuestionsTableList";
const WrittenQuestions = ({ CourseId, unitId }) => {
  const [type, setType] = useState(false);
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

  const addQuestion = async (e) => {
    const data_send = {
      "wq_value": e.currentTarget.question_answar.value,
      "wq_title": e.currentTarget.question_title.value,
      "course_id": CourseId,
      "unit_id": unitId
    }
    const add = await axios.post("https://camp-coding.tech/dr_elmatary/admin/wqs/insert_wqs.php", data_send);
    console.log(add);
    if (add.status == "success") {
      toast.success(add.message)
      getQuestions()
    } else {
      toast.error(add.message)
    }
  }

  const showHideQuestion = async (row) => {
    const data_send = {
      "hidden_value": row.hidden == "no" ? "yes" : "no",
      "wq_id": row.wq_id,
    }
    const add = await axios.post("https://camp-coding.tech/dr_elmatary/admin/wqs/update_wqs_hidden.php", data_send);
    console.log(add);
    if (add.status == "success") {
      toast.success(add.message);
      getQuestions()
    } else {
      toast.error(add.message)
    }
  }

  const [wq_data, setWqData] = useState(false);
  const [edit, setEdit] = useState(false);
  const [questions, setQuestions] = useState(false);
  const [item, setItem] = useState(false);
  const getQuestions = async () => {
    const data_send = {
      "course_id": CourseId,
      "unit_id": unitId
    }
    const get = await axios.post("https://camp-coding.tech/dr_elmatary/admin/wqs/select_question.php", data_send)
    setQuestions(get.message);
  }
  const showHideQuestions = async (send_data) => {
    const questions_1 = await axios.post("https://camp-coding.tech/dr_elmatary/admin/wqs/update_wqs_hidden.php", send_data);
    console.log(send_data);
    if (questions_1.status == "success") {
      toast.success(questions_1.message);
      await getQuestions();
      setEdit(false)
    } else {
      toast.error(questions_1.message);
    }
  }

  const editQuestion = async (e) => {
    const data_send = {
      "course_id": CourseId,
      "unit_id": unitId,
      "wq_value": e.currentTarget.question_answar.value,
      "wq_title": e.currentTarget.question_title.value,
      "wq_id": item.wq_id
    }
    const edit = await axios.post("https://camp-coding.tech/dr_elmatary/admin/wqs/update_wqs_info.php", data_send)

    if (edit.status == "success") {
      toast.success(edit.message);
      await getQuestions();
    } else {
      toast.error(edit.message);
    }
  }

  // editQuestion
  useEffect(() => { getQuestions() }, [])
  const columns =
    [
      {
        Header: 'Question ID',
        accessor: 'wq_id',
        Filter: false,
      },

      {
        Header: 'Question title',
        accessor: 'wq_title',
      },
      {
        Header: 'Question Answer',
        accessor: 'wq_value',
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
                      wq_id: item.wq_id
                    }
                    showHideQuestions(send_data)
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
      wq_id: data.wq_id
    }
    console.log(data_send)
    axios.post("https://camp-coding.tech/dr_elmatary/admin/wqs/make_copy_from_wqs.php", JSON.stringify(data_send))
      .then((res) => {
        if (res.status == 'success') {
          toast.success(res.message);
          getQuestions();
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
        <Breadcrumbs title="WrittenQuestions" breadcrumbItem="WrittenQuestions List" />

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
                              setModal(true);
                            }}
                          >
                            <i
                              onClick={() => {
                                setModal(true);
                              }}
                              className="mdi mdi-plus me-1"
                            ></i>{" "}
                            Add Written Question
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


                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
                <div id="table-invoices-list">
                  {questions && questions.length ? <QuestionsTableList showHideQuestion={showHideQuestion} data={questions} columns={columns} /> : <h4>No Questions</h4>}
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle} tag="h4">
          Add New WrittenQuestion
        </ModalHeader>
        <ModalBody>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              addQuestion(e)
              return false;
            }}
          >
            <Row>
              <Col md={12}>
                <div className="mb-3">
                  <Label className="form-label">Question Title</Label>
                  <Input type="text" name="question_title" />
                </div>
                <div className="mb-3">
                  <Label className="form-label">Answer</Label>
                  <textarea
                    style={{ height: "100px" }}
                    id="hours"
                    name="question_answar"
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
          Edit Written Question
        </ModalHeader>
        <ModalBody>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              editQuestion(e)
              return false;
            }}
          >
            <Row>
              <Col md={12}>
                <div className="mb-3">
                  <Label className="form-label">Question Title</Label>
                  <Input type="text" name="question_title" defaultValue={item?.wq_title} />
                </div>
                <div className="mb-3">
                  <Label className="form-label">Answer</Label>
                  <textarea
                    style={{ height: "100px" }}
                    id="hours"
                    name="question_answar"
                    placeholder="Enter Explanation"
                    type="number"
                    className="form-control"
                    defaultValue={item?.wq_value}
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

export default WrittenQuestions;
