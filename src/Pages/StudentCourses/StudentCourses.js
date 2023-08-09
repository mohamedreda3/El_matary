import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {

  Container,

} from "reactstrap";

import './studentcourses.css'
import axios from 'axios';
const StudentCourses = () => {
  const navigate = useNavigate()
  const location = useLocation();
  // const { state } = location;
  // console.log(state)
  const [studentData, setStudentData] = useState(false);
  const [subs, setSubs] = useState(false)
  if (!location?.state) {
    navigate("/students")
  }

  const getStudentSub = async () => {
    const subStudent = await axios.post("https://camp-coding.tech/dr_elmatary/admin/students/select_student_subscription.php", JSON.stringify({ student_id: location?.state?.unitData?.student_id }));
    setSubs(subStudent?.message);
    console.log(location?.state?.unitData?.student_id);
  }

  useEffect(() => {
    getStudentSub();
  }, [])

  return (
    <Container className='contaciner courseStudent py-6' style={{
      marginTop: '100px'
    }} fluid={true}>
      <div className="student_info">
        <img src={location?.state?.unitData?.student_avater_url} alt="" />
        <div className="text">
          <span>{location?.state?.unitData?.student_name}</span>
          <span>{location?.state?.unitData?.student_email}</span>
          <span>{location?.state?.unitData?.phone}</span>
        </div>
      </div>
      <h2>Subscription Courses</h2>
      <div className="courses_student">
        {
          subs && subs.length ? subs.map((item, index) => {
            return <div
              style={{
                textAlign: "start"
              }}
              key={index}
            >
              {
                // <h5 style={{ marginBottom: "15px" }} className='sub_status active'>
                //   <span style={{ fontWeight: "900", fontSize: "18px" }}></span> <em style={{ fontStyle: "normal", fontWeight: "300" }}> Active </em>
                // </h5>
              }
              <img src={item.course_photo_url} alt="" />
              <h5 style={{ marginBottom: "15px" }}><span style={{ fontWeight: "900", fontSize: "15px" }}>Course : </span> <em style={{ fontStyle: "normal", fontWeight: "300", fontSize:"14.1px" }}> {item.course_name} </em></h5>
              <div>
                <p style={{ "margin": 0 }}><span style={{ fontWeight: "900", fontSize: "15px" }}>sub_start_date : </span> <em style={{ fontStyle: "normal" }}> {item.student_subscription_start} </em></p>
                <p style={{ "margin": 0 }}><span style={{ fontWeight: "900", fontSize: "15px" }}>sub_end_date : </span> <em style={{ fontStyle: "normal" }}>{item.subscription_end_date}</em></p>
                <p style={{ "margin": 0 }}><span style={{ fontWeight: "900", fontSize: "15px" }}>Category : </span> <em style={{ fontStyle: "normal" }}>{item.category}</em></p>
              </div>
              <button className='btn btn-danger'>Cancel Subscription</button>
            </div>
          }) : <h3> No Subscription </h3>
        }



      </div>
    </Container>
  )
}

export default StudentCourses
