import React, {Fragment, useEffect, useState} from 'react';
import {CloseButton, DropdownItem, DropdownMenu, DropdownToggle, Input, Modal, ModalBody, ModalHeader, UncontrolledDropdown} from 'reactstrap';
// import TableContainer from "./../../../../components/Common/TableContainer";
// import {CourseData} from "../../../../CommonData/Data/Course";
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import { toast } from 'react-toastify';
import Select from "react-select";
import TableContainer from '../../../components/Common/TableContainer';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

const UniversityListTable = ({Univerisities, showHideCourse}) => {
    const navigate = useNavigate();
    const [showuniedit,setshowuniedit]=useState(false);
    const [rowdata,setrowdata]=useState({});
    const [image,setimage]=useState(null);

    const handleupdateuniversity=()=>{
      const data_send={
        university_name:rowdata.university_name,
        university_id:rowdata.university_id,
      }
      axios.post("https://camp-coding.tech/dr_elmatary/admin/universities/update_university_info.php",JSON.stringify(data_send))
      .then((res)=>{
        if(res.status=="success"){
          toast.success(res.message);
          window.location.reload();
        }
        else if(res.status=="success"){
          toast.error(res.message);
        }
        else {
          toast.error("Something Went Error");
        }
      }).catch((err)=>console.log(err))
    }

    const handleupdateshow=(rowdata)=>{
      console.log(rowdata)
      const data_send={
        university_id:rowdata.university_id,
        hidden_value:rowdata.hidden=='no'?'yes':'no'
      }
      axios.post("https://camp-coding.tech/dr_elmatary/admin/universities/update_university_hidden.php",JSON.stringify(data_send))
      .then((res)=>{
        if(res.status=='success'){
          window.location.reload();
          setshowuniedit(false);
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


    const columns = [
        {
            Header: 'University ID',
            accessor: 'university_id',
            Filter: false
        },
        {
            Header: 'University Name',
            accessor: 'university_name'
        },
        {
            Header: 'Show',
            Cell: (cell) => {
                switch (cell.cell.row.original.hidden) {
                    case 'yes':
                        return <AiFillEyeInvisible onClick={()=>{
                          handleupdateshow(cell.cell.row.original);
                          // console.log(cell.cell.original,"ddd")
                        }} style={{cursor:'pointer',fontSize:'22px'}}/>;

                    case 'no':
                        return <AiFillEye onClick={()=>{
                          handleupdateshow(cell.cell.row.original);
                        }}  style={{cursor:'pointer',fontSize:'22px'}}/>;
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
                                    setshowuniedit(true);
                                    setrowdata(cell.cell.row.original);
                                    console.log(cell.cell.row.original)
                                  }}
                                >Edit</DropdownItem>
                                <DropdownItem onClick={
                                    () => {
                                        console.log(cell.cell.row.original);
                                        // navigate("/grade", {
                                        //     state: {
                                        //       universitydata: cell.cell.row.original
                                        //     }
                                        // })
                                    }
                                }>View</DropdownItem>
                                {/* <DropdownItem onClick={
                                    () => {
                                        const item = cell.cell.row.original;
                                        const send_data = {
                                            status: item.hidden == "no" ? "yes" : "no",
                                            course_id: item.course_id
                                        }
                                        showHideCourse(send_data);

                                    }
                                }>Show/Hide</DropdownItem>
                                <DropdownItem>Delete</DropdownItem>*/}
                            </DropdownMenu>

                        </UncontrolledDropdown>

                    </>
                )
            }
        },
    ]
    return (
        <React.Fragment>

          {Univerisities ?  <TableContainer columns={columns}
                data={Univerisities}
                isGlobalFilter={true}
                customPageSize={10}
                className="Invoice table"/> : <Fragment/>}
                <Modal isOpen={showuniedit}>
                <ModalHeader
                    tag="h4">
                    <div style={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
                        <h4>Edit University Data</h4>
                        <CloseButton onClick={
                            () => {
                                setshowuniedit(false);
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
                                handleupdateuniversity()
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
                              setrowdata({...rowdata,university_name:e.target.value})
                            }}
                            value={rowdata.university_name}
                                type="text"
                                name="new_title"
                                id="new_title"
                                placeholder="Enter Course Title"
                            />
                        </div>
                          <button className="btn btn-success"
                            style={
                                { margin: "10px 0 0 auto" }
                            }>
                            {" "}
                            Edit{" "}
                          </button>
                    </form>


                </ModalBody>
            </Modal>
        </React.Fragment>
    )
}

export default UniversityListTable;
