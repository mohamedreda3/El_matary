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
} from "reactstrap";

//Import Flatepicker
import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";
import "./exam.css";
// Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import CourseListTable from "../Courses/CoursesList/CourseTable/courseListTable";
import ExamListTable from "./ExamTable/ExamTableList";
import { Slider, Stack } from "@mui/material";
// import CourseListTable from "../CourseTable/courseListTable";

const Exam = () => {
  document.title = "Courses | Matary - React Admin & Dashboard Template";

  const location = useLocation();
  // const {state}=location;
  // const { data } = useLocation().state;
  // console.log(data)

  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [timerChecked, setChecked] = useState(false);
  const [deadLineChecked, setDeadLineChecked] = useState(false);
  // deadLineChecked
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Exams" breadcrumbItem="Exam List" />

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
                                showModal();
                              }}
                            >
                              <i className="mdi mdi-plus me-1"></i> Add Exam
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
                    <ExamListTable />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>

        <Modal title="add exam" isOpen={isModalOpen}>
          <form
            action="#"
            style={{
              padding: "15px",
              display: "flex",
              flexDirection: "column",
              gap: "13px",
            }}
            onSubmit={(e) => {
              e.preventDefault();
              setIsModalOpen(false);
            }}
          >
            <CloseButton
              onClick={() => setIsModalOpen(false)}
              style={{ marginLeft: "auto" }}
            />

            <div className="inputField withtext">
              <label htmlFor="exam_name">Exam Name</label>
              <Input
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "4px",
                }}
                type="text"
                name="exam_name"
                id="exam_name"
                placeholder="exam_name"
                required
              />
            </div>
            <div className="inputField withtext">
              <label htmlFor="exam_details">Exam Details</label>
              <textarea
                style={{ height: "100px" }}
                id="hours"
                name="explanation"
                placeholder="Enter Explanation"
                type="number"
                className="form-control"
              ></textarea>
            </div>
            <div className="inputField withtext">
              <label htmlFor="exam_degree">Exam Degree</label>
              <Input
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "4px",
                }}
                type="text"
                name="exam_degree"
                id="exam_degree"
                placeholder="exam_degree"
                required
              />
            </div>
            <div className="checkedBoxes">
              <div className="inputField">
                <label
                  className={timerChecked ? "active" : null}
                  htmlFor="exam_istimed"
                >
                  {" "}
                  With timer ?
                </label>
                <Input
                  style={{
                    padding: "10px",
                    borderRadius: "4px",

                    display: "none",
                  }}
                  type="checkbox"
                  name="exam_istimed"
                  id="exam_istimed"
                  placeholder="exam_istimed"
                  required
                  checked={timerChecked}
                  onChange={(e) => setChecked(e.currentTarget.checked)}
                />
                {timerChecked ? (
                  <div className="inputField withtext">
                    <label htmlFor="time">Minutes</label>
                    <Stack
                      spacing={2}
                      direction="row"
                      sx={{ mb: 1 }}
                      alignItems="center"
                      style={{
                        padding:"0.47rem 0.75rem"
                      }}
                    >
                      <Slider
                        aria-label="time"
                        min={0}
                        max={200}
                        valueLabelDisplay="auto"
                        onChange={(e) => console.log(e.target.value)}
                      />
                    </Stack>
                  </div>
                ) : null}
              </div>

              <div className="inputField">
                <label
                  className={deadLineChecked ? "active" : null}
                  htmlFor="exam_isDeadLined"
                >
                  {" "}
                  With Deadline ?
                </label>
                <Input
                  style={{
                    padding: "10px",
                    borderRadius: "4px",

                    display: "none",
                  }}
                  type="checkbox"
                  name="exam_isDeadLined"
                  id="exam_isDeadLined"
                  placeholder="exam_isDeadLined"
                  required
                  checked={deadLineChecked}
                  onChange={(e) => setDeadLineChecked(e.currentTarget.checked)}
                />
                {deadLineChecked ? (
                  <div className="inputField withtext">
                    <label htmlFor="time">Deadline Date</label>
                    <Input type="date" />
                  </div>
                ) : null}
              </div>
            </div>
            <button
              className="btn btn-success"
              style={{ margin: "10px 0 0 auto" }}
            >
              {" "}
              Add Exam{" "}
            </button>
          </form>
        </Modal>
      </div>
    </React.Fragment>
  );
};

export default Exam;
