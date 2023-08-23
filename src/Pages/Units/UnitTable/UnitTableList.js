import React, { useEffect, useState } from 'react';
import { CloseButton, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown, Modal } from 'reactstrap';
// import TableContainer from "./../../../../components/Common/TableContainer";
// import { CourseData } from "../../../../CommonData/Data/Course";
import { useNavigate } from 'react-router-dom';
import TableContainer from '../../../components/Common/TableContainer';
import axios from 'axios';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Loader } from 'rsuite';
import { Icon } from '@iconify/react';
import transferUp from '@iconify/icons-mdi/transfer-up';
import transferDown from '@iconify/icons-mdi/transfer-down';
import { toast } from 'react-toastify';
import { MenuItem, Select } from '@mui/material';
const UnitListTable = ({ Units, courseData, setshowconf, setrowdata }) => {
    const navigate = useNavigate();
    const [unitData, setUnitData] = useState(false)
    const setStatus = async (unit_id, status) => {
        await axios.post("", {
            "status": status, // not req
            "unit_id": unit_id,
            "course_id": courseData.course_id
        }).then((res) => {
            if (res.status == "success") {
                toast.success("Updated");
                getCourses();
            } else {
                toast.error(res.message);
            }
        })
    }
    const columns = [
        {
            Header: "No",
            Cell: (cell) => {
                console.log(cell)
                return (
                    <b>
                        {cell?.cell?.row?.index + 1}
                        
                    </b>
                )
            }
        }, {
            Header: 'Unit Title',
            accessor: 'unit_name',
            Cell: (cell) => {
                return <div style={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
                    <span>{cell.cell.row.original.unit_name}</span>
                    <div className="sorts_u">
                        <span style={{ margin: "0 3px", cursor: "pointer" }} onClick={() => setStatus(cell.cell.row.original.unit_id, "up")}>
                            <Icon icon={transferUp} color="green" style={{ fontSize: "30px" }} />
                        </span>
                        <span style={{ margin: "0 3px", cursor: "pointer" }} onClick={() => setStatus(cell.cell.row.original.unit_id, "down")}>
                            <Icon icon={transferDown} color="red" style={{ fontSize: "30px" }} />
                        </span>
                    </div>
                </div>
            }
        },
        {
            Header: 'Hidden',
            Cell: (cell) => {
                return <button className="btn" onClick={
                    () => {
                        const item = cell.cell.row.original;
                        const send_data = {
                            status: item.hidden,
                            unit_id: item.unit_id
                        }
                        setshowconf(true);
                        setrowdata(send_data)
                    }
                }>
                    {
                        cell.cell.row.original.hidden == "yes" ? <VisibilityOff className="hidden" /> : <Visibility className="shown" />
                    }
                </button>
            }
        },

        // {
        //     Header: 'Questions',
        //     Cell: (cell) => {
        //         return <button className="btn btn-success" onClick={
        //             () => {
        //                 const item = cell.cell.row.original;
        //                 const send_data = {
        //                   status: item.hidden,
        //                   unit_id: item.unit_id
        //                 }
        //                 setshowconf(true);
        //                 setrowdata(send_data)
        //                 navigate("/unitquestion",{state:{unitdata:item}})
        //             }
        //         }>
        //             Questions
        //         </button>
        //     }
        // },

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
                        <button className="btn btn-primary" onClick={() => { setsetShowCopy(true); setSelectedUnit(cell.cell.row.original.unit_id) }}>Copy</button>
                    </>
                )
            }
        },
    ]
    const handlecopyitem = (data) => {
        const data_send = {
            unit_id: selectedUnit,
            course_id: selectedCourse
        }
        console.log(data_send)
        axios.post("https://camp-coding.tech/dr_elmatary/admin/unit/make_copy_from_unit_and_alldata.php", JSON.stringify(data_send))
            .then((res) => {
                if (res.status == 'success') {
                    toast.success("Success");
                }
                else if (res.status == 'error') {
                    toast.error(res.message);
                }
                else {
                    toast.error("Something Went Error");
                }
            })
    }
    const [Courses, setCourses] = useState(false);
    const [showCopy, setsetShowCopy] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(false);
    const [selectedUnit, setSelectedUnit] = useState(false);
    const getCourses = async () => {
        const courses = await axios.get("https://camp-coding.tech/dr_elmatary/admin/courses/select_courses.php");
        setCourses([...courses])
    }
    useEffect(() => {
        getCourses()
    }, []);
    // const [Units, setUnits] = useState(false);
    // const getUnits = async () => {
    //   const send_data = {
    //     course_id: selectedCourse
    //   };
    //   try {
    //     const units = await axios.post("https://camp-coding.tech/dr_elmatary/admin/courses/select_course_units.php", send_data);
    //     console.log(units);
    //     console.log(selectedCourse);
    //     setUnits([...units]);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // }
    // useEffect(() => {
    //   getUnits();
    // }, [selectedCourse])
    return (
        <React.Fragment> {
            Units && Units.length ? <TableContainer columns={columns}
                data={Units}
                isGlobalFilter={true}
                customPageSize={10}
                
                className="Invoice table" /> : !Units.length ? <h2>No Units</h2> : <Loader />
        }

            <Modal title="Copy Unit To Course"
                isOpen={showCopy}>
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
                            handlecopyitem(e)
                            setsetShowCopy(false);
                        }
                    }>
                    <CloseButton onClick={
                        () => setsetShowCopy(false)
                    }
                        style={
                            { marginLeft: "auto" }
                        } />

                    <div className="input_Field">
                        <label forHtml="course_id">Course Name</label>
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
                                        return <MenuItem value={item.course_id} key={index}>{item.course_name}  - {item.university_name} - {item.grade_name}</MenuItem>
                                    }) : <h3>No Courses</h3>
                                }
                            </Select>
                        </div></div>
                    <button className="btn btn-success"
                        style={
                            { margin: "10px 0 0 auto" }
                        }>
                        {" "}
                        Copy Unit{" "} </button>
                </form>
            </Modal>
        </React.Fragment>
    )
}

export default UnitListTable;
