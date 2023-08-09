// import RichTextEditor from 'react-richtext';
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import './tweets.css'
import {
  Row,
  Col,
  Container,
  Modal,
  TabContent,
  TabPane,
  Tooltip,
  Card,
  CardBody,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  ModalHeader,
  ModalBody,
  Form,
  Label,
  Input,
  FormFeedback,
} from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";
import LessonsTableList from "../Lessons/LessonsTabel/LessonsTableList";
import { useCallback } from "react";
import Dropzone from "react-dropzone";
import { toast } from "react-toastify";
import axios from "axios"
import { useEffect } from "react";
import TweetsTableList from "../Lessons/LessonsTabel/TweetsTableList";
import { Button } from "rsuite";
import { AiOutlinePlus } from "react-icons/ai";
import ReactQuill from "react-quill";
import { Visibility, VisibilityOff } from "@mui/icons-material";
const Tweets = ({ CourseId, unitId,allunitdata }) => {
  const [type, setType] = useState(false);
  const [videoLink, setVideoLink] = useState(false);
  const [twetslistedit,settwetslistedit]=useState([]);
  const [tweetsedis,settweetsedis]=useState([]);
  // console.log(data)
  const [modal, setmodal] = useState(false);
  const [tweetanswerlist,settweetanswerlist]=useState([
    {id:'0',tweet_value:''}
  ]);
  const [edittweets,setedittweets]=useState([]);
  const [writelist,settwritelist]=useState([
    {id:'0',tweet_value:''}
  ]);
  /* ====================   Files   ===================*/
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

  function tog_mod() {
    setmodal(!modal);
  }
  /* ====================   Files   ===================*/

  const toggle = useCallback(() => {
    if (modal) {
      setmodal(false);
    } else {
      setmodal(true);
    }
  }, [modal]);

  const [tweet_data, setTweetData] = useState(false);
  const [edit, setEdit] = useState(false);
  const [tweets, setTweets] = useState(false);
  const [item, setItem] = useState(false);
  const getTweets = async () => {
    const data_send = {
      "course_id": CourseId,
      "unit_id": unitId
    }
    const get = await axios.post("https://camp-coding.tech/dr_elmatary/admin/tweets/select_tweets.php", data_send)
    setTweets(get.message);
    // console.log(get.message)
  }
  const addTweet = async (e) => {
    // console.log(tweetanswerlist);
    const tweets=[...tweetanswerlist];
    // console.log(tweets)
    let tweetstxt='';
    for(let i=0;i<tweets.length;i++){
      if(i==0){
        tweetstxt+=tweets[i]?.tweet_value;
      }
      else {
        tweetstxt+='//camp//'+tweets[i]?.tweet_value+'//camp//';
      }
    }
    console.log(tweetstxt);
    const data_send = {
      "tweet_value": tweetstxt,
      "tweet_title": e.currentTarget.tweet_title.value,
      "course_id": CourseId,
      "unit_id": unitId
    }
    // console.log(data_send);
    console.log(data_send);
    const add = await axios.post("https://camp-coding.tech/dr_elmatary/admin/tweets/insert_tweets.php", data_send);
    console.log(add);
    if (add.status == "success") {
      toast.success("Added");
      await getTweets();
      setmodal(false)
    } else {
      toast.error(add.message)
    }
  }
  const showHideTweets = async (send_data) => {
    const tweets_1 = await axios.post("https://camp-coding.tech/dr_elmatary/admin/tweets/update_tweets_hidden.php", send_data);
    console.log(send_data);
    if (tweets_1.status == "success") {
      toast.success(tweets_1.message);
      await getTweets();
      setEdit(false)
    } else {
      toast.error(tweets_1.message);
    }
  }
  const [convertedText, setConvertedText] = useState("");

  const editTweet = async (e) => {

    const tweets=[...edittweets];
    // console.log(tweets)
    let tweetstxt='';
    for(let i=0;i<tweets.length;i++){
      if(i==0){
        tweetstxt+=tweets[i]?.tweet_value;
      }
      else {
        tweetstxt+='//camp//'+tweets[i]?.tweet_value+'//camp//';
      }
    }

    const data_send = {
      "course_id": CourseId,
      "unit_id": unitId,
      "tweet_value": tweetstxt,
      "tweet_title": e.currentTarget.tweet_title.value,
      "tweet_id": item.tweet_id
    }
    const edit = await axios.post("https://camp-coding.tech/dr_elmatary/admin/tweets/update_tweet_info.php", data_send)

    if (edit.status == "success") {
      toast.success(edit.message);
      await getTweets();
      setEdit(false)
    } else {
      toast.error(edit.message);
    }
  }

  // editTweet
  useEffect(() => { getTweets() }, [])
  const columns =
    [
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
        Header: 'Tweet ID',
        accessor: 'tweet_id',
        Filter: false,
      },

      {
        Header: 'Tweet title',
        accessor: 'tweet_title',
      },
      {
        Header: 'Tweet Answer',
        Cell:(cell)=>{
          return <p >
            {cell.cell.row.original.tweet_value.split("//camp//")
            .map((item,index)=>{
            if(index<4){
              return (
                <p dangerouslySetInnerHTML={{ __html:item}}></p>
              )
            }
            else return null
            })}
          </p>
        }
      },
      {
        Header: 'Show',
        Cell: (cell) => {
          switch (cell.cell.row.original.hidden) {
            case 'no':
              return <div style={{ cursor:'pointer' }} onClick={()=>{
            const item = cell.cell.row.original;
                    const send_data = {
                      hidden_value: item.hidden == "no" ? "yes" : "no",
                      tweet_id: item.tweet_id
                    }
              showHideTweets(send_data)
          }}>
            <Visibility className="shown"/>
          </div>;

            case 'yes':
              return <div style={{ cursor:'pointer' }} onClick={()=>{
                const item = cell.cell.row.original;
                    const send_data = {
                      hidden_value: item.hidden == "no" ? "yes" : "no",
                      tweet_id: item.tweet_id
                    }
                    showHideTweets(send_data)
              }}>
            <VisibilityOff className="hidden"/>
          </div>;

            default:
              return <span className="badge badge-pill badge-soft-success font-size-12">
                {
                  cell.cell.row.original.hidden
                }</span>
          }
        }
      },
      {
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
                    onClick={() =>
                      {
                        setEdit(true);
                        setItem(cell.cell.row.original);
                        // console.log(cell.cell.row.original)
                        // let tweet_value=cell.cell.row.original.tweet_value;
                        let push1=[];
                        let pusharr=[];
                        let tweetslist=cell.cell.row.original.tweet_value.split('//camp//');
                        for(let k=0;k<tweetslist.length;k++){
                          if(tweetslist[k]!==""){
                            push1.push(tweetslist[k])
                          }
                        }
                        for(let i=0 ;i<push1.length;i++){
                          let obj={
                            id:i,
                            tweet_value:push1[i]
                          }
                          console.log(obj)
                          pusharr=[...pusharr,obj]
                          if(obj.id!==""){
                            setedittweets([...edittweets,obj]);
                          }
                        }
                        setedittweets(pusharr);
                        // console.log(pusharr);
                        // settwetslistedit()
                        // settwetslistedit([...pushedlist])
                      }}
                    >
                      Edit
                  </DropdownItem>
                  {/* <DropdownItem onClick={() => {
                    const item = cell.cell.row.original;
                    const send_data = {
                      hidden_value: item.hidden == "no" ? "yes" : "no",
                      tweet_id: item.tweet_id
                    }
                    showHideTweets(send_data)
                  }}>Hide/Show</DropdownItem> */}
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
      tweet_id: data.tweet_id
    }
    console.log(data_send)
    axios.post("https://camp-coding.tech/dr_elmatary/admin/tweets/make_copy_from_tweets.php", JSON.stringify(data_send))
      .then((res) => {
        if (res.status == 'success') {
          toast.success(res.message);
          getTweets();
        }
        else if (res.status == 'error') {
          toast.error(res.message);
        }
        else {
          toast.error("Something Went Error");
        }
      })
  }
  const handlesavetxt=(e,i,txt)=>{
    // console.log(i)
    // console.log(txt)
    // console.log(e);
    const list = [...tweetanswerlist];
    list[i][txt] = e;
    settweetanswerlist(list);
  }
  const handlesavetxtedit=(e,i,txt)=>{
    // console.log(i)
    // console.log(txt)
    // console.log(e);
    const list = [...edittweets];
    list[i][txt] = e;
    setedittweets(list);
  }
  return (
    <React.Fragment>
      <Container fluid={true}>
      <Breadcrumbs title="Lessons" breadcrumbItem={allunitdata.unit_name + " - Tweets List"} />
        <Row>
          <Col lg={12}>
            <Card>
              <CardBody>
                <div className="position-relative">
                  <div className="modal-button mt-2">
                    <Row className="align-items-start">
                      <Col className="col-sm">
                        <div>
                          <button
                            type="button"
                            className="btn btn-success mb-4"
                            data-bs-toggle="modal"
                            data-bs-target="#addCourseModal"
                            onClick={() => {
                              // showModal()
                              setmodal(true);
                            }}
                          >
                            <i
                              onClick={() => {
                                setmodal(true);
                              }}
                              className="mdi mdi-plus me-1"
                            ></i>{" "}
                            Add Tweet
                          </button>
                        </div>
                      </Col>
                      <Col className="col-sm-auto">
                        <div className="d-flex gap-1">
                          <div className="input-group">
                            <Flatpickr
                              className="form-control"
                              placeholder="dd M, yyyy"
                              options={{
                                mode: "range",
                                dateFormat: "Y-m-d",
                              }}
                              id="datepicker-range"
                            />
                            <span className="input-group-text">
                              <i className="bx bx-calendar-event"></i>
                            </span>
                          </div>

                          <UncontrolledDropdown
                            className="dropdown"
                            direction="start"
                          >
                            <DropdownToggle
                              tag="a"
                              className="btn btn-link text-body shadow-none"
                            >
                              <i className="bx bx-dots-horizontal-rounded"></i>
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-end">
                              <DropdownItem>Action</DropdownItem>
                              <DropdownItem>Another action</DropdownItem>
                              <DropdownItem>Something else here</DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
                <div id="table-invoices-list">
                  {tweets && tweets.length ? <TweetsTableList showHideTweet={showHideTweets} data={tweets} columns={columns} /> : <h4>No Tweets</h4>}
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle} tag="h4">
          Add New Tweet
        </ModalHeader>
        <ModalBody>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              addTweet(e)
              return false;
            }}
          >
            <Row>
              <Col md={12}>
                <div className="mb-3">
                  <Label className="form-label">Tweet Title</Label>
                  <Input name="tweet_title" type="text" />
                </div>
                <div className="mb-3">
                  <div className="add_newanstwee">
                    <Label className="form-label">Answer</Label>
                    <AiOutlinePlus
                      onClick={()=>{
                        settweetanswerlist([...tweetanswerlist,{id:tweetanswerlist.length,tweet_value:""}])
                      }}
                    />
                  </div>
                  {
                    tweetanswerlist.map((item,index)=>{
                      return(
                        <div className="tweet_ans">
                          <ReactQuill
                            theme='snow'
                            value={item.tweet_value}
                            onChange={(e)=>{
                              // console.log(item.id);
                              handlesavetxt(e,index,'tweet_value');
                            }}
                            style={{minHeight: '300px'}}
                          />
                          {index!==0?
                            ( <Button onClick={()=>{
                              // console.log(item.id)
                              settweetanswerlist(tweetanswerlist.filter((it)=>item.id!==it.id))
                            }} color="red" appearance="primary">
                                Delete
                              </Button>)
                              :
                            (null)
                          }
                        </div>
                      )
                    })
                  }
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="text-end">
                  <button type="submit" className="btn btn-success save-user">
                    Save
                  </button>
                </div>
              </Col>
            </Row>
          </Form>
        </ModalBody>
      </Modal>
      <Modal isOpen={edit} toggle={() => setEdit(false)}>
        <ModalHeader toggle={() => setEdit(false)} tag="h4">
          Edit Written Tweet
        </ModalHeader>
        <ModalBody>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              editTweet(e)
              return false;
            }}
          >
            <Row>
              <Col md={12}>
                <div className="mb-3">
                  <Label className="form-label">Tweet Title</Label>
                  <Input type="text" name="tweet_title" defaultValue={item?.tweet_title} />
                </div>
                <div className="mb-3">
                  <div className="add_newanstwee">
                    <Label className="form-label">Answer</Label>
                    <AiOutlinePlus
                      onClick={()=>{
                        setedittweets([...edittweets,{id:edittweets.length,tweet_value:""}])
                      }}
                    />
                  </div>
                  {/* <textarea
                    style={{ height: "100px" }}
                    id="hours"
                    name="tweet_answar"
                    placeholder="Enter Explanation"
                    type="number"
                    className="form-control"
                    defaultValue={item?.tweet_value}
                  ></textarea> */}
                  {/* {console.log(tweetsedis,"dfdf")} */}
                  {
                    edittweets.map((item,index)=>{
                      return(
                        <div className="tweet_ans">
                          {console.log(item,"Ererer")}
                          <ReactQuill
                            theme='snow'
                            value={item.tweet_value}
                            onChange={(e)=>{
                              // console.log(item.id);
                              handlesavetxtedit(e,index,'tweet_value');
                            }}
                            style={{minHeight: '300px'}}
                          />
                          {index!==0?
                            ( <Button onClick={()=>{
                              // console.log(item.id)
                              setedittweets(edittweets.filter((it)=>item.id!==it.id))
                            }} color="red" appearance="primary">
                                Delete
                              </Button>)
                              :
                            (null)
                          }
                        </div>
                      )
                    })
                  }
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="text-end">
                  <button type="submit" className="btn btn-success save-user">
                    Save
                  </button>
                </div>
              </Col>
            </Row>
          </Form>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default Tweets;
