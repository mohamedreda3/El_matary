import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import {

  Container,

} from "reactstrap";

import './studentcourses.css'
const StudentCourses = () => {

  const location=useLocation();
  const {state}=location;
  console.log(state)

  return (
    <Container className='contaciner py-6' style={{
      marginTop:'100px'
    }} fluid={true}>
      <div className="courses_student">

      {
                state?.unitData?.courses.map((item,index)=>{
                  return(
                    <div
                      style={{
                      }}
                    >
                      <h4>{item.course_name}</h4>
                      <h3>{item.course_price}{` `} L.E</h3>
                    </div>
                  )
                })
              }
      </div>
  </Container>
  )
}

export default StudentCourses
