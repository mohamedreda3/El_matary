import React, {Fragment, useEffect, useState} from 'react';
import {CloseButton, DropdownItem, DropdownMenu, DropdownToggle, Input, Modal, ModalBody, ModalHeader, UncontrolledDropdown} from 'reactstrap';
import TableContainer from "./../../../../components/Common/TableContainer";
import {CourseData} from "../../../../CommonData/Data/Course";
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import { toast } from 'react-toastify';
import Select from "react-select";

const CourseListTable = ({Courses, showHideCourse}) => {
    const navigate = useNavigate();
    const [showcourseedit,setshowcourseedit]=useState(false);
    const [rowdata,setrowdata]=useState({});
    const [image,setimage]=useState(null);

    const handleupdatecourse=()=>{
      const formdata=new FormData();
      formdata.append("image",image);
      axios.post("https://camp-coding.tech/dr_elmatary/admin/image_uplouder.php",formdata)
      .then((res)=>{
        console.log(res)
        if(res!==null||res!==""){
          const data_send={
            course_name:rowdata.course_name,
            course_price:rowdata.course_price,
            course_content:rowdata.course_content,
            course_photo_url:res,
            course_id:rowdata.course_id,
          }
          console.log(data_send)
          axios.post("http://camp-coding.tech/dr_elmatary/admin/courses/edit_course.php",JSON.stringify(data_send))
      .then((res)=>{
        console.log(res)
        if(res.status=='success'){
          setshowcourseedit(false);
          toast.success(res.message);
        }
        else if(res.status=='error'){
          toast.error(res.message);
        }
        else {
          toast.error("Something Went Error");
        }
      }).catch(err=>console.log(err))
        }
        else {
          toast.error("Something Went Error")
        }
      }).catch(err=>console.log(err))
      // formdata.append("course_name",rowdata.course_name);
      // formdata.append("course_price",rowdata.course_price);
      // formdata.append("course_content",rowdata.course_content);
      // formdata.append("course_id",rowdata.course_id);
      // console.log(formdata)

    }

    const columns = [
        {
            Header: 'Course ID',
            accessor: 'course_id',
            Filter: false
        },
        {
            Header: 'Course Name',
            accessor: 'course_name'
        },
        {
            Header: 'Course Price',
            accessor: 'course_price',
            Filter: false
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
                                <DropdownItem
                                  onClick={()=>{
                                    setshowcourseedit(true);
                                    setrowdata(cell.cell.row.original);
                                    console.log(cell.cell.row.original)
                                  }}
                                >Edit</DropdownItem>
                                <DropdownItem onClick={
                                    () => {
                                        console.log(cell.cell.row.original);
                                        navigate("/units", {
                                            state: {
                                                coursedata: cell.cell.row.original
                                            }
                                        })
                                    }
                                }>View</DropdownItem>
                                <DropdownItem onClick={
                                    () => {
                                        const item = cell.cell.row.original;
                                        const send_data = {
                                            status: item.hidden == "no" ? "yes" : "no",
                                            course_id: item.course_id
                                        }
                                        showHideCourse(send_data);

                                    }
                                }>Show/Hide</DropdownItem>
                               
                            
                            </DropdownMenu>

                        </UncontrolledDropdown>

                    </>
                )
            }
        },
    ]

    return (
        <React.Fragment>

          {Courses ?  <TableContainer columns={columns}
                data={Courses}
                isGlobalFilter={true}
                customPageSize={10}
                className="Invoice table"/> : <Fragment/>}
                <Modal isOpen={showcourseedit}>
                <ModalHeader
                    tag="h4">
                    <div style={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
                        <h4>Update Course Data</h4>
                        <CloseButton onClick={
                            () => {
                                setshowcourseedit(false);
                            }
                        }
                            style={
                                { marginLeft: "auto" }
                            } />
                    </div>
                </ModalHeader>
                <ModalBody>

                <form
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
                                // AssignVideo(e)
                                handleupdatecourse()
                            }
                        }>
                        <div className="input_Field">
                            <label htmlFor="">Title</label>
                            <Input style={
                                {
                                    width: "100%",
                                    borderRadius: "4px",
                                    margin: "10px 0"
                                }
                            }
                            onChange={(e)=>{
                              setrowdata({...rowdata,course_name:e.target.value})
                            }}
                            value={rowdata.course_name}
                                type="text"
                                name="new_title"
                                id="new_title"
                                placeholder="Enter Course Title"
                            />

                        </div>


                        <div className="input_Field">
                            <label htmlFor="">Course Price</label>
                            <Input style={
                                {
                                    width: "100%",
                                    borderRadius: "4px",
                                    margin: "10px 0"
                                }
                            }
                            onChange={(e)=>{
                              setrowdata({...rowdata,course_price:e.target.value})
                            }}
                            value={rowdata.course_price}
                                type="text"
                                name="new_title"
                                id="new_title"
                                placeholder="Enter Course Price"
                            />

                        </div>

                        <div className="input_Field">
                            <label htmlFor="">Course URL</label>
                            <Input style={
                                {
                                    width: "100%",
                                    borderRadius: "4px",
                                    margin: "10px 0"
                                }
                            }
                            onChange={(e)=>{
                              setimage(e.target.files[0]);
                              // setrowdata({...rowdata,course_photo_url:e.target.files[0]})
                            }}
                                type="file"
                                name="new_title"
                                id="new_title"
                                placeholder="Enter new_title"
                            />

                        </div>

                        <div className="input_Field">
                            <label htmlFor="">Course Content</label>
                            <Input style={
                                {
                                    width: "100%",
                                    borderRadius: "4px",
                                    margin: "10px 0"
                                }
                            }
                            onChange={(e)=>{
                              setrowdata({...rowdata,course_content:e.target.value})
                            }}
                            value={rowdata.course_content}
                                type="text"
                                name="new_title"
                                id="new_title"
                                placeholder="Enter Course Content"
                            />

                        </div>




                          <button className="btn btn-success"
                            style={
                                { margin: "10px 0 0 auto" }
                            }>
                            {" "}
                            Update {" "}
                          </button>
                    </form>


                </ModalBody>
            </Modal>
        </React.Fragment>
    )
}

export default CourseListTable;
