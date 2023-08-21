import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledDropdown,
} from "reactstrap";
// import TableContainer from "./../../../../components/Common/TableContainer";
// import { CourseData } from "../../../../CommonData/Data/Course";
import { useNavigate } from "react-router-dom";
import TableContainer from "../../../components/Common/TableContainer";
import { ExamData } from "../../../CommonData/Data/Exams";
import moment from "moment";
import axios from "axios";
import Breadcrumbs from "../../../components/Common/Breadcrumb";

const ResultExamListTable = () => {
  const navigate = useNavigate();
  const [exams, setExams] = useState(false);
  const [tabs, setTabs] = useState([
    { id: 1, label: "Examined Students" },
    { id: 2, label: "Not Examined Student" }
  ])
  
  const getExams = () => {
    axios.get("https://camp-coding.tech/dr_elmatary/admin/Exams/select_all_exams.php")
      .then((res) => {
        console.log(res)
        setExams(res.message);
      }).catch(err => console.log(err))
  }

  const [selected_tab, setSelectedTab] = useState("Examined Students");



  useEffect(() => {
    getExams()
  }, [selected_tab])

  const columns = [
    {
      Header: "Exam ID",
      accessor: "exam_id",
      Filter: false,
    },
    {
      Header: "exam_name",
      accessor: "exam_name",
      //   Filter: false,
    },
    // {
    //   Header: "exam_details",
    //   accessor: "exam_details",
    //   Filter: false,
    // },
    {
      Header: "Timer",
      accessor: "timer",
      Filter: false,
    },
    {
      Header: "start date",
      Cell: (cell) => {
        return (
          <span>{moment(cell.cell.row.original.start_date).format('Y-M-D H:m:s')}</span>
        )
      },
      Filter: false,
    },
    {
      Header: "end date",
      Cell: (cell) => {
        // {console.log(cell)}
        return (
          <span>{moment(cell.cell.row.original.end_date).format('Y-M-D H:m:s')}</span>
        )
      },
      Filter: false,
    },
    {
      Header: "Action",
      Cell: (cell) => {
        return (
          <>
            <UncontrolledDropdown>
              <DropdownToggle
                className="btn btn-light btn-sm"
                tag="button"
                data-bs-toggle="dropdown"
                direction="start"
              >
                <i className="bx bx-dots-horizontal-rounded"></i>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-end">
                <DropdownItem>Edit</DropdownItem>
                <DropdownItem
                  onClick={() => {
                    console.log(cell.cell.row.original);
                    const examdata = { ...cell.cell.row.original };
                    navigate("/examquestion", {
                      state: { examdata },
                    });
                  }}
                >
                  Show
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </>
        );
      },
    },
  ];

  const ex_columns = [
    {
      Header: "Exam ID",
      accessor: "exam_id",
    },
    {
      Header: "exam_name",
      accessor: "exam_name",
    },

    {
      Header: "Timer",
      accessor: "timer",
      Filter: false,
    },
    {
      Header: "start date",
      Cell: (cell) => {
        return (
          <span>{moment(cell.cell.row.original.start_date).format('Y-M-D H:m:s')}</span>
        )
      },
      Filter: false,
    },
    {
      Header: "Score",
      Cell: (cell) => {
        return (
          <span>66</span>
        )
      },
    },
    {
      Header: "end date",
      Cell: (cell) => {
        // {console.log(cell)}
        return (
          <span>{moment(cell.cell.row.original.end_date).format('Y-M-D H:m:s')}</span>
        )
      },
      Filter: false,
    },
    {
      Header: "Action",
      Cell: (cell) => {
        return (
          <>
            <UncontrolledDropdown>
              <DropdownToggle
                className="btn btn-light btn-sm"
                tag="button"
                data-bs-toggle="dropdown"
                direction="start"
              >
                <i className="bx bx-dots-horizontal-rounded"></i>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-end">
                <DropdownItem>Edit</DropdownItem>
                <DropdownItem
                  onClick={() => {
                    console.log(cell.cell.row.original);
                    const examdata = { ...cell.cell.row.original };
                    navigate("/examquestion", {
                      state: { examdata },
                    });
                  }}
                >
                  Show
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </>
        );
      },
    },
  ];


  return (
    <>
      {exams && exams.length ?
        <>
          <div className="page-content">
            <Container fluid={true}>
              <Breadcrumbs title="Results" breadcrumbItem="Results List" />
              <div className="tabs">
                {
                  tabs.map((item, index) => {
                    return <button className={item.label == selected_tab ? "btn btn-success" : "btn"} onClick={() => setSelectedTab(item.label)}>{item.label}</button>
                  })
                }
              </div>
              <Row>
                <Col lg={12}>
                  <Card>
                    <CardBody>
                      <div id="table-invoices-list">
                        {selected_tab == "Examined Students" ?
                          <TableContainer
                            columns={ex_columns}
                            data={exams}
                            isGlobalFilter={true}
                            customPageSize={10}
                            className="Invoice table"
                          /> : selected_tab == "Not Examined Student" ?
                            <TableContainer
                              columns={columns}
                              data={exams}
                              isGlobalFilter={true}
                              customPageSize={10}
                              className="Invoice table"
                            /> : null}
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
          </div>
        </> : null
      }
    </>
  );
};

export default ResultExamListTable;
