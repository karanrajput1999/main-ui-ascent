import React, { useEffect, useState } from "react";
import axios from "axios";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
} from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import IVRCampaignFormModal from "./IVRCampaignFormModal";
import IVRCampaignRemoveModal from "./IVRCampaignRemoveModal";
import { useDispatch } from "react-redux";
import {
  getIVRCampaigns,
  createIVRCampaign,
  removeIVRCampaign,
  updateIVRCampaign,
} from "../../slices/IVRCampaign/thunk";
import { logoutUser } from "../../slices/auth/login/thunk";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const IVRCampaign = () => {
  // register / edit campaign modal state whether modal is open or not
  const [modal_list, setmodal_list] = useState(false);
  // this state triggers when editing the campaign
  const [isEditingCampaign, setIsEditingCampaign] = useState(false);
  // delete campaign confirmation modal state
  const [modal_delete, setmodal_delete] = useState(false);
  // when we click on edit / delete campaign button this state stores that campaign's id, had to make this state because I needed to have that campaign's id to make changes to it
  const [listCampaignId, setListCampaignId] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { ivrCampaigns, alreadyExistsError, error } = useSelector(
    (state) => state.IVRCampaign
  );

  console.log();

  useEffect(() => {
    if (error) {
      console.log("campaign error called");
      dispatch(logoutUser());
      navigate("/login");
      window.location.reload();
    }
  }, [dispatch, error]);

  // toggles register / edit campaign modal
  function tog_list() {
    setmodal_list(!modal_list);
    setIsEditingCampaign(false);
  }

  // toggles delete campaign confirmation modal
  function tog_delete() {
    setmodal_delete(!modal_delete);
  }

  useEffect(() => {
    if (alreadyExistsError) {
      setmodal_list(!modal_list);
    }
  }, [alreadyExistsError]);

  useEffect(() => {
    dispatch(getIVRCampaigns());
  }, [dispatch]);

  // formik setup
  const validation = useFormik({
    initialValues: {
      // campaignName: "",
      ivrCampaignName: "",
      // campaignDescription: "",
      ivrCampaignDescription: "",
    },
    validationSchema: Yup.object({
      ivrCampaignName: Yup.string().required("Please enter campaign name"),
      ivrCampaignDescription: Yup.string().required(
        "Please enter campaign description"
      ),
    }),
    onSubmit: (values) => {
      isEditingCampaign
        ? dispatch(updateIVRCampaign({ values, listCampaignId }))
        : dispatch(createIVRCampaign(values));

      setmodal_list(false);
    },
  });

  // this function also gets triggered (with onSubmit method of formik) when submitting the register / edit campaign from
  function formHandleSubmit(e) {
    e.preventDefault();
    validation.handleSubmit();
    return false;
  }

  // to update the values of register form when editing the campaign
  function handleEditCampaign(campaignData) {
    setIsEditingCampaign(true);
    setmodal_list(!modal_list);
    setListCampaignId(campaignData.id);

    validation.values.ivrCampaignName = campaignData.ivrCampaignName;
    validation.values.ivrCampaignDescription =
      campaignData.ivrCampaignDescription;
  }

  document.title = "IVR Campaign";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="IVR Campaign" pageTitle="IVR Admin" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">Create a IVR campaign</h4>
                </CardHeader>

                <CardBody>
                  <div className="listjs-table" id="campaignList">
                    <Row className="g-4 mb-3">
                      <Col className="col-sm-auto">
                        <div>
                          <Button
                            color="primary"
                            className="add-btn me-1"
                            onClick={() => tog_list()}
                            id="create-btn"
                          >
                            <i className="ri-add-line align-bottom me-1"></i>{" "}
                            Add IVR Campaign
                          </Button>
                        </div>
                      </Col>
                      {/* search input for future if needed */}
                      {/* <Col className="col-sm">
                        <div className="d-flex justify-content-sm-end">
                          <div className="search-box ms-2">
                            <input
                              type="text"
                              className="form-control search"
                              placeholder="Search..."
                            />
                            <i className="ri-search-line search-icon"></i>
                          </div>
                        </div>
                      </Col> */}
                    </Row>

                    <div className="table-responsive table-card mt-3 mb-1">
                      <table
                        className="table align-middle table-nowrap"
                        id="customerTable"
                      >
                        <thead className="table-light">
                          <tr>
                            <th scope="col" style={{ width: "50px" }}>
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="checkAll"
                                  value="option"
                                />
                              </div>
                            </th>
                            <th className="sort" data-sort="campaign_name">
                              Campaign Name
                            </th>
                            <th
                              className="sort"
                              data-sort="campaign_description"
                            >
                              Campaign Description
                            </th>

                            <th className="sort" data-sort="action">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody className="list form-check-all">
                          {ivrCampaigns?.map((campaign) => (
                            <tr key={campaign?.id}>
                              <th scope="row">
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    name="checkAll"
                                    value="option1"
                                  />
                                </div>
                              </th>
                              <td className="campaign-name">
                                {campaign.ivrCampaignName}
                              </td>
                              <td className="campaign-description">
                                {campaign.ivrCampaignDescription}
                              </td>
                              <td>
                                <div className="d-flex gap-2">
                                  <div className="edit">
                                    <button
                                      className="btn btn-sm btn-primary edit-item-btn"
                                      data-bs-toggle="modal"
                                      data-bs-target="#showModal"
                                      onClick={() => {
                                        handleEditCampaign(campaign);
                                      }}
                                    >
                                      Edit
                                    </button>
                                  </div>
                                  <div className="remove">
                                    <button
                                      className="btn btn-sm btn-success remove-item-btn"
                                      data-bs-toggle="modal"
                                      data-bs-target="#deleteRecordModal"
                                      onClick={() => {
                                        setListCampaignId(campaign.id);
                                        setmodal_delete(true);
                                      }}
                                    >
                                      Remove
                                    </button>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div className="noresult" style={{ display: "none" }}>
                        <div className="text-center">
                          <lord-icon
                            src="https://cdn.lordicon.com/msoeawqm.json"
                            trigger="loop"
                            colors="primary:#25a0e2,secondary:#00bd9d"
                            style={{ width: "75px", height: "75px" }}
                          ></lord-icon>
                          <h5 className="mt-2">Sorry! No Result Found</h5>
                          <p className="text-muted mb-0">
                            We've searched more than 150+ Orders We did not find
                            any orders for you search.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex justify-content-end">
                      <div className="pagination-wrap hstack gap-2">
                        <Link
                          className="page-item pagination-prev disabled"
                          to="#"
                        >
                          Previous
                        </Link>
                        <ul className="pagination listjs-pagination mb-0"></ul>
                        <Link className="page-item pagination-next" to="#">
                          Next
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
        <ToastContainer />
      </div>

      {/* Add Modal */}
      <IVRCampaignFormModal
        modal_list={modal_list}
        tog_list={tog_list}
        formHandleSubmit={formHandleSubmit}
        alreadyExistsError={alreadyExistsError}
        validation={validation}
        isEditingCampaign={isEditingCampaign}
      />

      {/* Remove Modal */}
      <IVRCampaignRemoveModal
        modal_delete={modal_delete}
        tog_delete={tog_delete}
        setmodal_delete={setmodal_delete}
        handleDeleteCampaign={() => {
          dispatch(removeIVRCampaign(listCampaignId));
          setmodal_delete(false);
        }}
      />
    </React.Fragment>
  );
};

export default IVRCampaign;
