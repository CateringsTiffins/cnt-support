import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { agentVendorComments, fetchSupportFollowUpssList, updateAgentComment } from "../features/followUpsSlice";
import { useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import LoadingAnimation from "../components/LoadingAnimation";
import VendorDetails from "./VendorDetails";
import { fetchVendorShowDetailData } from "../features/menuSlice";
import LoadingSpinner from "../components/LoadingSpinner";
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { Card, CardContent, Typography, Box, Chip, Stack } from "@mui/material";
import moment from "moment";
import { IoMdArrowRoundBack } from "react-icons/io";


const FollowUpsUpdateComment = () => {
  const { agentVendorCommentsList, isLoading } = useSelector(
    (state) => state.followUps
  );

  const dispatch = useDispatch();
  const { id, companyId } = useParams();
  // const [activeAgent, setActiveAgent] = useState({})
  const [comment, setComment] = useState("")
  // const [title, setTitle] = useState("")

  // console.log(id, "id id ");
  

  // console.log(agentVendorCommentsList, "agentVendorCommentsList agentVendorCommentsList ");
  // console.log(activeAgent, "activeAgent activeAgent ");


  useEffect(() => {
    dispatch(agentVendorComments(id));
  }, [dispatch, id]);


  useEffect(() => {
    dispatch(fetchVendorShowDetailData(companyId));
  }, [dispatch, companyId]);

  // useEffect(() => {
  //   if (agentVendorCommentsList?.length > 0) {
  //     setActiveAgent(agentVendorCommentsList[0])
  //   }
  // }, [agentVendorCommentsList]);

  // useEffect(() => {
  //   if (activeAgent) {
  //     // setTitle(activeAgent.title || "");
  //     setComment(activeAgent.comment || "");
  //   }
  // }, [activeAgent]);

  const onHandleCommentSubmit = async () => {
    const data = {
      vendor_id: id,
      // title,
      comment: comment
    }
    try {
      await dispatch(updateAgentComment(data))
      dispatch(agentVendorComments(id));
      await dispatch(fetchSupportFollowUpssList());
      setComment("")
    } catch (error) {
      console.log(error);
    }
  }



  return (
    <>
      <div className="container-fluid my-5">
        <div className="mb-4 cursor-pointer">
        <button className="btn btn-success me-1"
          // onClick={() => navigate(-1)}
          onClick={() => window.close()}
        >
          <IoMdArrowRoundBack /> Back
        </button>
      </div>
        <h1 className="mb-4">FollowUp Updates</h1>


        <hr className="mb-3 mt-3" />

       
          <div>
            <h1 className="mb-2 text-center"> Comments </h1>
            {isLoading ? (
              <LoadingAnimation />
            ) : (
              <>
                <div className="my-3">
                  <div className="mt-4">

                    
                      <div>
                          <>
                            <div className="row ">
                              <div className="col-lg-12 mx-auto">
                                {/* Title Input */}
                                {/* <div className="col-md-12 mb-3">
                                  <Form.Control
                                    value={title || ""}
                                    onChange={(e) => setTitle(e.target.value)}
                                    name="Enter title"
                                    type="text"
                                    placeholder="Enter title"
                                  />
                                </div> */}

                                {/* Comment Input */}
                                <div className="col-md-12 mb-3">
                                  {/* <FloatingLabel label="Comment"> */}
                                  <Form.Control
                                    value={comment || ""}
                                    onChange={(e) => setComment(e.target.value)}
                                    name="comment"
                                    as="textarea"
                                    placeholder="Leave a comment here"
                                    style={{ height: "100px" }}
                                  />
                                  {/* </FloatingLabel> */}
                                </div>

                                <div className="d-flex justify-content-end">
                                  <button
                                    style={{ color: '#fff' }}
                                    disabled={isLoading}
                                    className="btn bg-success"
                                    onClick={() => onHandleCommentSubmit()}
                                  >
                                    {isLoading ? 'Loading...' : "Update"}
                                  </button>
                                </div>
                              </div>
                            </div>


                          </>
                      </div> 
                    


                  </div>
                </div>
                {agentVendorCommentsList.map((comment) => (
                  <Card
                    variant="outlined"
                    sx={{
                      borderRadius: 3,
                      mb: 2,
                      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <CardContent>
                      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                        {/* <Typography variant="h6" >
                          {comment.title ? comment.title : 'N/A'}
                        </Typography> */}
                        <Chip
                          label={comment.admin_username}
                          color={"success"}
                          variant="outlined"
                          size="small"
                          sx={{
                            fontWeight: "bold",
                            textTransform: "capitalize",
                          }}
                        />
                      </Stack>
                      <Typography variant="body2" color="textSecondary" mb={2}>
                        <p style={{ whiteSpace: "pre-line" }}>{comment.comment ? comment.comment : 'N/A'}</p>


                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {moment(comment.updated_at).format("M/D/YYYY, h:mm A")}
                      </Typography>
                    </CardContent>
                  </Card>

                ))}
              </>
            )}
          </div> 
    


      </div>
      <VendorDetails searchBox={false} companyId={companyId} />




    </>

  );
};

export default FollowUpsUpdateComment;