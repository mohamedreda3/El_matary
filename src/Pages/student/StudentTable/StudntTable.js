import React, { useEffect, useState } from 'react';
import { CloseButton, DropdownItem, DropdownMenu, DropdownToggle, Modal, UncontrolledDropdown } from 'reactstrap';
// import TableContainer from "./../../../../components/Common/TableContainer";
import { StudentData } from '../../../CommonData/Data/Studentdata';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import TableContainer from '../../../components/Common/TableContainer';
import axios from 'axios';
import { Input, Loader, Toggle } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';

import { toastPlacements } from 'rsuite/esm/toaster/ToastContainer';
import { Icon } from '@mui/material';
import { toast } from 'react-toastify';
const StudntListTable = ({ getStudents, Units, courseData, showHideUnit }) => {
    const navigate = useNavigate();
    const [item, setItem] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);

    const changeSerial = async () => {
        const new_serial = await axios.post("https://camp-coding.tech/dr_elmatary/admin/students/update_serial_num_empty.php", { student_id: item.student_id });
        if (new_serial.status == "success") {
            toast.success("Updated");
            getStudents()
        } else {
            toast.error(new_serial.message);
        }
    }
    const changeBlock = async (id, value) => {
        console.log({ student_id: item.student_id, status: value });
        const blocked = await axios.post("https://camp-coding.tech/dr_elmatary/admin/students/update_ban_student.php", { student_id: id, status: value });
        if (blocked.status == "success") {
            toast.success("Updated")
            getStudents()
        } else {
            toast.error(blocked.message)
        }
    }
    const changeSimCard = async (id, value) => {
        console.log(value);
        const simCard = await axios.post("https://camp-coding.tech/dr_elmatary/admin/students/update_sim_card.php", { student_id: id, status: value });
        if (simCard.status == "success") {
            toast.success("Updated")
            getStudents()
        } else {
            toast.error(simCard.message)
        }
    }
    const changeHeadPhone = async (id, value) => {
        console.log(value);
        const headPhone = await axios.post("https://camp-coding.tech/dr_elmatary/admin/students/update_head_phone_jack.php", { student_id: id, status: value });
        if (headPhone.status == "success") {
            toast.success("Updated")
            getStudents()
        } else {
            toast.error(headPhone.message)
        }
    }

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
          },
        {
            Header: 'Student ID',
            accessor: 'student_id',
            Filter: false
        }, {
            Header: 'student_name',
            accessor: 'student_name',
            Filter: false
        },
        {
            Header: 'Email',
            accessor: 'student_email',
            Filter: false
        },
        {
            Header: 'Phone Number',
            accessor: 'phone',
            Filter: false
        },
        {
            Header: 'University Name',
            accessor: 'university_name',
            Filter: false
        },
        {
            Header: 'Device Serial',
            accessor: 'device_serial',
            Cell: (cell) => {
                const itemN = cell.cell.row.original;
                return <span>

                    {itemN.device_serial && itemN.device_serial.length ? <button className='btn btn-danger' style={{ whiteSpace: "nowrap" }} onClick={
                        () => {
                            setItem(cell.cell.row.original);
                            setIsModalOpen(true);
                        }
                    }>Reset Serial</button> : null}

                </span>;

            }
        },
        {
            Header: 'HeadPhone',
            Cell: (cell) => {
                const itemN = cell.cell.row.original;
                return <span>

                    <Toggle size="md" checked={itemN.skip_headphone == "no" ? false : true} onChange={() => changeHeadPhone(itemN.student_id, itemN.skip_headphone == "no" ? "yes" : "no")} />

                </span>;

            }
        },
        {
            Header: 'Sim Card',
            Cell: (cell) => {
                const itemN = cell.cell.row.original;
                return <span>

                    <Toggle size="md" checked={itemN.skip_sim == "no" ? false : true} onChange={() => changeSimCard(itemN.student_id, itemN.skip_sim == "no" ? "yes" : "no")} />

                </span>;

            }
        },
        {
            Header: 'Blocked',
            Cell: (cell) => {
                const itemN = cell.cell.row.original;
                return <span>

                    <Toggle size="md" checked={itemN.blocked == "no" ? false : true} onChange={() => changeBlock(itemN.student_id, itemN.blocked == "no" ? "yes" : "no")} />

                </span>;

            }
        },
        {
            Header: 'Action',
            Cell: (cell) => {
                return (
                    <>
                        
                                <button className='btn btn-primary' onClick={
                                    () => {
                                        console.log(cell.cell.row.original);
                                        navigate("/studentcourses", {
                                            state: {
                                                coursedata: StudentData,
                                                unitData: cell.cell.row.original
                                            }
                                        })
                                    }
                                }>View</button>
                          
                    </>
                )
            }
        },
    ]

    return (
        <React.Fragment>
            <div className="student_table" style={{ width: "100%", overflow: "auto", padding: "10px" }}>{
                Units && Units.length ? <TableContainer columns={columns}
                    data={Units}
                    isGlobalFilter={true}
                    customPageSize={10}
                    className="Invoice table" /> : !Units.length ? <h2>No Units</h2> : <Loader />
            } </div>

            <Modal title="add unit"
                isOpen={isModalOpen}>
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
                            changeSerial(e);
                            setIsModalOpen(false);

                        }
                    }>
                    <div className="modal-header">
                        <h5 className="modal-title" id="orderdetailsModalLabel" > Are You Sure Reset Serial For Student <span style={{ fontWeight: "700", color: "red" }}>({item?.student_name}) ?</span> </h5>
                        <CloseButton onClick={
                            () => setIsModalOpen(false)
                        }
                            style={
                                { marginLeft: "auto" }
                            } />
                    </div>

                    <button className="btn btn-danger"
                        style={
                            { margin: "10px 0 0 auto" }
                        }>
                        {" "}
                        Reset Serial{" "} </button>
                </form>
            </Modal>
        </React.Fragment>
    )
}

export default StudntListTable;
