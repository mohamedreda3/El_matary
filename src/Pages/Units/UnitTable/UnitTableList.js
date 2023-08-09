import React, { useEffect, useState } from 'react';
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
// import TableContainer from "./../../../../components/Common/TableContainer";
// import { CourseData } from "../../../../CommonData/Data/Course";
import { useNavigate } from 'react-router-dom';
import TableContainer from '../../../components/Common/TableContainer';
import axios from 'axios';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Loader } from 'rsuite';
import { toast } from 'react-toastify';
const UnitListTable = ({ Units, courseData, showHideUnit }) => {
    const navigate = useNavigate();

    // https://camp-coding.tech/dr_elmatary/admin/unit/make_copy_from_unit_and_alldata.php

    const columns = [
        {
            Header: "No",
            Cell: (cell) => {
              return (
                <b>
                  {cell.cell.row.index + 1}
                </b>
              )
            }
          }, {
            Header: 'Unit ID',
            accessor: 'unit_id',
            Filter: false
        }, {
            Header: 'Unit Title',
            accessor: 'unit_name',
        }, {
            Header: 'Hidden',
            Cell: (cell) => {
                return <button className="btn" onClick={
                    () => {
                        const item = cell.cell.row.original;
                        const send_data = {
                            status: item.hidden == "no" ? "yes" : "no",
                            unit_id: item.unit_id
                        }
                        showHideUnit(send_data);
                    }
                }>
                    {
                        cell.cell.row.original.hidden == "yes" ? <VisibilityOff className="hidden" /> : <Visibility className="shown" />
                    }
                </button>
            }
        },
        {
            Header: "View Unit",
            Cell: (cell) => {
                return (

                    <button class="btn btn-success" onClick={
                        () => {
                            console.log(cell.cell.row.original);
                            navigate("/lessons", {
                                state: {
                                    coursedata: courseData,
                                    unitData: cell.cell.row.original
                                }
                            })
                        }
                    }>View</button>

                )
            }
        },
        {
            Header: 'Action',
            Cell: (cell) => {
                return (
                    <>

                        <button className="btn btn-primary" onClick={() => handlecopyitem(cell.cell.row.original)}>Copy</button>

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
                    toast.success("Success");
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
                className="Invoice table" /> : !Units.length ? <h2>No Units</h2> : <Loader />
        } </React.Fragment>
    )
}

export default UnitListTable;
