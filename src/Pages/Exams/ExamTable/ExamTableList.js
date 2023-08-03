import React from "react";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
// import TableContainer from "./../../../../components/Common/TableContainer";
// import { CourseData } from "../../../../CommonData/Data/Course";
import { useNavigate } from "react-router-dom";
import TableContainer from "../../../components/Common/TableContainer";
import { ExamData } from "../../../CommonData/Data/Exams";

const ExamListTable = () => {
  const navigate = useNavigate();
  const columns = [
    {
      Header: "Exam ID",
      accessor: "id",
      Filter: false,
    },
    {
      Header: "exam_name",
      accessor: "exam_name",
    //   Filter: false,
    },
    {
      Header: "exam_details",
      accessor: "exam_details",
      Filter: false,
    },
    {
      Header: "Date",
      accessor: "date",
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
                    navigate("/questions", {
                      state: { coursedata: cell.cell.row.original },
                    });
                  }}
                >
                  Show
                </DropdownItem>
                <DropdownItem>Delete</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </>
        );
      },
    },
  ];
  return (
    <React.Fragment>
      <TableContainer
        columns={columns}
        data={ExamData}
        isGlobalFilter={true}
        customPageSize={10}
        className="Invoice table"
      />
    </React.Fragment>
  );
};

export default ExamListTable;
