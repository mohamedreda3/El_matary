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
import FlashCardsTableList from "../Lessons/LessonsTabel/FlashCardsTableList";

const Flash_Cards = ({ CourseId, unitId }) => {
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

  const [flashCard_data, setFlashCardData] = useState(false);
  const [edit, setEdit] = useState(false);
  const [flashCards, setFlashCards] = useState(false);
  const [item, setItem] = useState(false);
  const getFlashCards = async () => {
    const data_send = {
      "course_id": CourseId,
      "unit_id": unitId
    }
    const get = await axios.post("https://camp-coding.tech/dr_elmatary/admin/flash_cards/select_unit_flash_cards.php", data_send)
    setFlashCards(get.message.flash_card);
    console.log(get);
  }
  const addFlashCard = async (e) => {
    const data_send = {
      "flash_card_side_1": e.currentTarget.flashCard_value.value,
      "flash_card_side_2": e.currentTarget.flashCard_title.value,
      "course_id": CourseId,
      "unit_id": unitId,
      "author": ""
    }
    console.log(data_send);
    const add = await axios.post("https://camp-coding.tech/dr_elmatary/admin/flash_cards/add_flash_cards.php", data_send);
    console.log(add);
    if (add.status == "success") {
      toast.success(add.message);
      await getFlashCards()
    } else {
      toast.error(add.message)
    }
  }
  const showHideFlashCards = async (send_data) => {
    const flashCards_1 = await axios.post("https://camp-coding.tech/dr_elmatary/admin/flash_cards/update_flash_cards_hidden.php", send_data);
    console.log(send_data);
    if (flashCards_1.status == "success") {
      toast.success(flashCards_1.message);
      await getFlashCards();
      setEdit(false)
    } else {
      toast.error(flashCards_1.message);
    }
  }

  const editFlashCard = async (e) => {
    const data_send = {
      "course_id": CourseId,
      "unit_id": unitId,
      "flash_card_side_2": e.currentTarget.flashCard_answar.value,
      "flash_card_side_1": e.currentTarget.flashCard_title.value,
      "flash_card_id": item.flash_card_id
    }
    const edit = await axios.post("https://camp-coding.tech/dr_elmatary/admin/flash_cards/update_flash_cards_info.php", data_send)
    console.log(data_send);
    if (edit.status == "success") {
      toast.success(edit.message);
      await getFlashCards();
    } else {
      toast.error(edit.message);
    }
  }

  const handlecopyitem=(data)=>{
    const data_send={
      flash_card_id:data.flash_card_id
    }
    console.log(data_send)
    axios.post("https://camp-coding.tech/dr_elmatary/admin/flash_cards/make_copy_from_flash_cards.php",JSON.stringify(data_send))
    .then((res)=>{
        if(res.status=='success'){
          toast.success(res.message);
          getFlashCards()
        }
        else if(res.status=='error'){
          toast.error(res.message);
        }
        else {
          toast.error("Something Went Error");
        }
    })
  }
  // editFlashCard
  useEffect(() => { getFlashCards() }, [])
  const columns =
    [
      {
        Header: 'FlashCard ID',
        accessor: 'flash_card_id',
        Filter: false,
      },

      {
        Header: 'Flash Card Side 1',
        accessor: 'flash_card_side_1',
      },
      {
        Header: 'Flash Card Side 2',
        accessor: 'flash_card_side_2',
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
                      flash_card_id: item.flash_card_id
                    }
                    showHideFlashCards(send_data)
                  }}>Hide/Show</DropdownItem>
                  <DropdownItem
                    onClick={()=>{
                      handlecopyitem(cell.cell.row .original)
                    }}
                  
                  >Copy</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </>
          )
        }
      },
    ]
  return (
    <React.Fragment>
      <Container fluid={true}>
        <Breadcrumbs title="flashcards" breadcrumbItem="Flash Cards List" />

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
                            Add Flash Card
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
                  {flashCards && flashCards.length ? <FlashCardsTableList showHideFlashCard={showHideFlashCards} data={flashCards} columns={columns} /> : <h4>No FlashCards</h4>}
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle} tag="h4">
          Add New Flash Card
        </ModalHeader>
        <ModalBody>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              addFlashCard(e)
              return false;
            }}
          >
            <Row>
              <Col md={12}>
                <div className="mb-3">
                  <Label className="form-label">Tweet Title</Label>
                  <Input name="flashCard_title" type="text" />
                </div>
                <div className="mb-3">
                  <Label className="form-label">Answer</Label>
                  <textarea
                    style={{ height: "100px" }}
                    id="hours"
                    name="flashCard_value"
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
          Edit Written FlashCard
        </ModalHeader>
        <ModalBody>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              editFlashCard(e)
              return false;
            }}
          >
            <Row>
              <Col md={12}>
                <div className="mb-3">
                  <Label className="form-label">FlashCard Title</Label>
                  <Input type="text" name="flashCard_title" defaultValue={item?.flash_card_side_1} />
                </div>
                <div className="mb-3">
                  <Label className="form-label">Answer</Label>
                  <textarea
                    style={{ height: "100px" }}
                    id="hours"
                    name="flashCard_answar"
                    placeholder="Enter Explanation"
                    type="number"
                    className="form-control"
                    defaultValue={item?.flash_card_side_2}
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

export default Flash_Cards;
