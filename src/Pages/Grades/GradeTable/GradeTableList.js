import React, {useEffect, useState} from 'react';
import {DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from 'reactstrap';
// import TableContainer from "./../../../../components/Common/TableContainer";
// import { CourseData } from "../../../../CommonData/Data/Course";
import {Navigate, useLocation, useNavigate} from 'react-router-dom';
import TableContainer from '../../../components/Common/TableContainer';
import axios from 'axios';
import {Loader} from 'rsuite';
import {toastPlacements} from 'rsuite/esm/toaster/ToastContainer';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { toast } from 'react-toastify';
const UnitListTable = ({Units, universitydata, showHideUnit}) => {
    const navigate = useNavigate();

    const handleupdateshow=(rowdata)=>{
      const data_send={
        university_id:rowdata.university_id,
        show:rowdata.show==false?true:false
      }
      axios.post("",JSON.stringify(data_send))
      .then((res)=>{
        if(res.status=='success'){
          window.location.reload();
          // setshowcourseedit(false);
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
            Header: 'Grade ID',
            accessor: 'grade_id',
            Filter: false
        }, {
            Header: 'grade_name',
            accessor: 'grade_name',
            Filter: false
        }, {
            Header: 'Show',
            Cell: (cell) => {
                switch (cell.cell.row.original.hidden) {
                    case 'no':
                        return <AiFillEyeInvisible onClick={()=>{
                          handleupdateshow(cell.cell.original);
                        }} style={{cursor:'pointer',fontSize:'22px'}}/>;
                    case 'yes':
                        return <AiFillEye onClick={()=>{
                          handleupdateshow(cell.cell.original);
                        }}  style={{cursor:'pointer',fontSize:'22px'}}/>;

                    default:
                        return <span className="badge badge-pill badge-soft-success font-size-12">
                            {
                            cell.cell.row.original.hidden
                        }</span>
                }
            }
        },
        // {
        //     Header: 'Action',
        //     Cell: (cell) => {
        //         return (
        //             <>
        //                 <UncontrolledDropdown>
        //                     <DropdownToggle className="btn btn-light btn-sm" tag="button" data-bs-toggle="dropdown" direction="start">
        //                         <i className="bx bx-dots-horizontal-rounded"></i>
        //                     </DropdownToggle>
        //                     <DropdownMenu className="dropdown-menu-end">
        //                         <DropdownItem>Edit</DropdownItem>
        //                         <DropdownItem onClick={
        //                             () => {
        //                                 console.log(cell.cell.row.original);
        //                                 navigate("/lessons", {
        //                                     state: {
        //                                       universitydata: universitydata,
        //                                         unitData: cell.cell.row.original
        //                                     }
        //                                 })
        //                             }
        //                         }>View</DropdownItem>
        //                         <DropdownItem onClick={
        //                             () => {
        //                                 const item = cell.cell.row.original;
        //                                 const send_data = {
        //                                     status: item.hidden == "no" ? "yes" : "no",
        //                                     unit_id: item.unit_id
        //                                 }
        //                                 showHideUnit(send_data);
        //                             }
        //                         }>Show/Hide</DropdownItem>
        //                         <DropdownItem>Delete</DropdownItem>
        //                     </DropdownMenu>
        //                 </UncontrolledDropdown>
        //             </>
        //         )
        //     }
        // },
    ]
    console.log(Units)

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
