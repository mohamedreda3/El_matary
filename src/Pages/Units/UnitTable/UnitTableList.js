import React, {useEffect, useState} from 'react';
import {DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from 'reactstrap';
// import TableContainer from "./../../../../components/Common/TableContainer";
// import { CourseData } from "../../../../CommonData/Data/Course";
import {Navigate, useLocation, useNavigate} from 'react-router-dom';
import TableContainer from '../../../components/Common/TableContainer';
import axios from 'axios';
import {Loader} from 'rsuite';
import {toastPlacements} from 'rsuite/esm/toaster/ToastContainer';
import { toast } from 'react-toastify';
const UnitListTable = ({Units, courseData, showHideUnit}) => {
    const navigate = useNavigate();

// https://camp-coding.tech/dr_elmatary/admin/unit/make_copy_from_unit_and_alldata.php

    const columns = [
        {
            Header: 'Unit ID',
            accessor: 'unit_id',
            Filter: false
        }, {
            Header: 'unit_name',
            accessor: 'unit_name',
            Filter: false
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
        }, {
            Header: 'Action',
            Cell: (cell) => {
                return (
                    <>
                        <UncontrolledDropdown>
                            <DropdownToggle className="btn btn-light btn-sm" tag="button" data-bs-toggle="dropdown" direction="start">
                                <i className="bx bx-dots-horizontal-rounded"></i>
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-end">
                                <DropdownItem>Edit</DropdownItem>
                                <DropdownItem onClick={
                                    () => {
                                        console.log(cell.cell.row.original);
                                        navigate("/lessons", {
                                            state: {
                                                coursedata: courseData,
                                                unitData: cell.cell.row.original
                                            }
                                        })
                                    }
                                }>View</DropdownItem>
                                <DropdownItem onClick={
                                    () => {
                                        const item = cell.cell.row.original;
                                        const send_data = {
                                            status: item.hidden == "no" ? "yes" : "no",
                                            unit_id: item.unit_id
                                        }
                                        showHideUnit(send_data);
                                    }
                                }>Show/Hide</DropdownItem>
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
        unit_id: data.unit_id
    }
    console.log(data_send)
    axios.post("https://camp-coding.tech/dr_elmatary/admin/unit/make_copy_from_unit_and_alldata.php", JSON.stringify(data_send))
      .then((res) => {
        if (res.status == 'success') {
          toast.success(res.message);
          window.location.reload()
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
        <React.Fragment> {
            Units && Units.length ? <TableContainer columns={columns}
                data={Units}
                isGlobalFilter={true}
                customPageSize={10}
                className="Invoice table"/> : !Units.length ? <h2>No Units</h2> : <Loader/>
        } </React.Fragment>
    )
}

export default UnitListTable;
