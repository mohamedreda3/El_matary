import React, { useRef, useState } from "react";
import classnames from "classnames";
import { Container, Row, Col, Card, Collapse, Form, Modal } from "reactstrap";
import { Form as FormT } from "rsuite";
import { Link, useNavigate } from "react-router-dom";
import Dropzone from "react-dropzone";

// Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Radio, RadioGroup } from "rsuite";

const AddVideo = () => {
  document.title = "Add Video | Matary - React Admin & Dashboard Template";

  const [col1, setcol1] = useState(true);
  const [col2, setcol2] = useState(false);
  const [col3, setcol3] = useState(false);

  const t_col1 = () => {
    setcol1(!col1);
    setcol2(false);
    setcol3(false);
  };

  const t_col2 = () => {
    setcol2(!col2);
    setcol1(false);
    setcol3(false);
  };



  const [selectedFiles, setselectedFiles] = useState([]);

  function handleAcceptedFiles(files) {
    files.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    );
    setselectedFiles(files);
  }

  /**
   * Formats the size
   */
  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  const [modal, setmodal] = useState(false);

  function tog_mod() {
    setmodal(!modal);
  }

  const formRef = useRef();
  const navigate = useNavigate()
  const addVideo = async () => {
    const send_data =
    {
      "video_title": formRef.current.video_title.value,
      "video_duration": formRef.current.video_duration.value,
      "vimeo_data": formRef.current.vimeo_data.value,
      "publitio_data": formRef.current.publitio_data.value
    }

    const units = await axios.post("https://camp-coding.tech/dr_elmatary/admin/videos/insert_video.php", send_data);
    console.log(units);
    if (units.status == "success") {
      toast.success("Added");
      navigate("/videos");
    } else {
      toast.error(units.message);
    }
  };

  const [pub, setPub] = useState(false);
  const [vim, setVim] = useState(true);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Ecommerce" breadcrumbItem="Add Video" />
          <Row>
            <Col lg={12}>
              <div className="custom-accordion" id="addvideo-accordion">
                <Card>
                  <Link
                    to="#addvideo-videoinfo-collapse"
                    className={classnames("text-dark", { collapsed: !col1 })}
                    type="button"
                    onClick={t_col1}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="p-4">
                      <div className="d-flex align-items-center">
                        <div className="flex-shrink-0 me-3">
                          <div className="avatar-sm">
                            <div className="avatar-title rounded-circle bg-soft-primary text-primary">
                              01
                            </div>
                          </div>
                        </div>
                        <div className="flex-grow-1 overflow-hidden">
                          <h5 className="font-size-16 mb-1">Video Info</h5>
                          <p className="text-muted text-truncate mb-0">
                            Fill all information below
                          </p>
                        </div>
                        <div className="flex-shrink-0">
                          <i className="mdi mdi-chevron-up accor-down-icon font-size-24"></i>
                        </div>
                      </div>
                    </div>
                  </Link>
                  <Collapse isOpen={col1} id="checkout-billinginfo-collapse">
                    <div className="p-4 border-top">
                      <form ref={formRef}>
                        <div className="mb-3">
                          <label className="form-label" htmlFor="videoname">
                            Video Name
                          </label>
                          <input
                            id="videoname"
                            name="video_title"
                            placeholder="Enter Video Name"
                            type="text"
                            className="form-control"
                            required
                          />
                        </div>

                        <div className="mb-0">
                          <label className="form-label" htmlFor="videodesc">
                            Video Duration
                          </label>
                          <input
                            className="form-control"
                            id="videodesc"
                            placeholder="Enter Duration ( hh : mm : ss )"
                            rows="4"
                            name="video_duration"
                          />
                        </div>

                        
                          <div className="mb-0">
                            <label className="form-label" htmlFor="videodesc">
                              Vimeo Link
                            </label>
                            <input
                              className="form-control"
                              id="videodesc"
                              placeholder="Enter Link"
                              rows="4"
                              name="vimeo_data"
                            />
                          </div> 
                        
                          <div className="mb-0">
                            <label className="form-label" htmlFor="videodesc">
                              publitio Link
                            </label>
                            <input
                              className="form-control"
                              id="videodesc"
                              placeholder="Enter Link"
                              rows="4"
                              name="publitio_data"
                            />
                          </div></form>
                    </div>
                  </Collapse>
                </Card>


              </div>
            </Col>
          </Row>

          <Row className="mb-4">
            <Col className="col text-end">
              <Link to="#" className="btn btn-danger me-1">
                {" "}
                <i className="bx bx-x me-1"></i> Cancel{" "}
              </Link>
              <Link
                to="#"
                className="btn btn-success"
                data-bs-toggle="modal"
                data-bs-target="#success-btn"
                onClick={() => {
                  addVideo()
                }}
              >
                {" "}
                <i className=" bx bx-file me-1"></i> Save{" "}
              </Link>
            </Col>
          </Row>
        </Container>
      </div>
      <Modal
        isOpen={modal}
        toggle={() => {
          tog_mod();
        }}
        id="success-btn"
        centered
      >
        <div className="modal-content">
          <div className="modal-body">
            <div className="text-center">
              <i className="bx bx-check-circle display-1 text-success"></i>
              <h3 className="mt-3">Video Added Successfully</h3>
            </div>
          </div>
        </div>
      </Modal>
      <ToastContainer />
    </React.Fragment>
  );
};

export default AddVideo;
