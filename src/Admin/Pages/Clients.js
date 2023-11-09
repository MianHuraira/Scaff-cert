import "@styles/react/apps/app-users.scss";
import ClientDataTable from "./table";
// import './client.css';
import "@styles/react/libs/tables/react-dataTable-component.scss";
import React, { useEffect, useState } from "react";
import "./table.css";
import Select from "react-select";
import { Col, Row } from "react-bootstrap";
import active from "../../Admin/assests/icons/active.png";
import block from "../../Admin/assests/icons/block.png";
import userIcon from "../../Admin/assests/client_icon_modal.png";
// import AutoComplete from "react-google-autocomplete";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import {
  UncontrolledButtonDropdown,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Form,
  Input,
  Label,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  InputGroup,
} from "reactstrap";
import { MoreHorizontal } from "react-feather";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
// for spinner
import Spinerr from "../../views/components/spinners/SpinnerGrowing";
import { log } from "@craco/craco/lib/logger";

const AutoFill = ({
  setAddress,
  setPhone,
  setCity,
  setState,
  selectState,
  setZip_code,
  setStatus,
  AutoComplete,
  setCountry,
  setEmail,
  setEmailSecondary,
  postData,
  isLargeModalOpen,
  toggleLargeModal,
  GooglePlacesAutocomplete,
  selectStaus,
  setName,
  iseditOpen,
  editModal,
  defaultData_,
  state,
  status,
  updateData,
  city,
  address,
  country,
  zip_code,
  isEmailValid,
  setEmailError,
  emailError,
  isPhoneValidAustralia,
  setPhoneError,
  phoneError,
  isSEmailValid,
  setSEmailError,
  sEmailError,
  setJoining_date,
  joining_date,
}) => {
  const [value, setValue] = useState(null);

  return (
    <>
      {/* add client data modal */}
      <Modal isOpen={isLargeModalOpen} toggle={toggleLargeModal} size="lg">
        <ModalHeader toggle={toggleLargeModal}></ModalHeader>
        <ModalBody>
          <div className="icon_div_main mb-2">
            <img className="icon_sizee" src={userIcon} alt="" />
          </div>
          <h5 className="modal_title">Add New Client</h5>
          <span className="modal_subtitle">
            Eneter the correct details of your client which you want to add.
          </span>
          <Form className="d-flex flex-column p-1">
            <Row>
              <Col className="mb-2" lg="6" md="12">
                <Label className="value_font input_label">Name</Label>
                <Input
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Name"
                />
              </Col>
              <Col className="mb-2" lg="6" md="12">
                <Label className="value_font input_label">Email Address</Label>

                <Input
                  onBlur={(e) => {
                    const emailValue = e.target.value;
                    setEmail(emailValue);
                    if (!isEmailValid(emailValue)) {
                      setEmailError(true);
                    } else {
                      setEmailError(false);
                    }
                  }}
                  type="email"
                  placeholder="Email Address"
                />
                {emailError && (
                  <div className="error_mssg">Invalid email address</div>
                )}
              </Col>

              <Col className="mb-2" lg="6" md="12">
                <Label className="value_font input_label">
                  Secondary Email Address
                </Label>
                <Input
                  onChange={(e) => setEmailSecondary(e.target.value)}
                  onBlur={(e) => {
                    const emailValue = e.target.value;
                    setEmailSecondary(emailValue);
                    if (!isSEmailValid(emailValue)) {
                      setSEmailError(true);
                    } else {
                      setSEmailError(false);
                    }
                  }}
                  type="email"
                  placeholder="Secondary Email Address"
                />
                {sEmailError && (
                  <div className="error_mssg">Invalid email address</div>
                )}
              </Col>
              <Col className="mb-2" lg="6" md="12">
                <Label className="value_font input_label">Joining Date</Label>
                <Input
                  onChange={(e) => setJoining_date(e.target.value)}
                  type="date"
                />
              </Col>
              <Col className="mb-2" lg="6" md="12">
                <Label className="value_font input_label">Phone Number</Label>
                <Input
                  onBlur={(e) => {
                    const phoneValue = e.target.value;
                    setPhone(phoneValue);
                    if (!isPhoneValidAustralia(phoneValue)) {
                      setPhoneError(true);
                    } else {
                      setPhoneError(false);
                    }
                  }}
                  type="tel"
                  placeholder="Phone Number"
                />
                {phoneError && (
                  <div className="error_mssg">Invalid phone number</div>
                )}
              </Col>
              <Col className="mb-2" lg="6" md="12">
                <Label className="value_font input_label">Address</Label>
                <GooglePlacesAutocomplete
                  className="form-control"
                  apiKey="AIzaSyBH0Ey-G2PbWkSCLyGG1A9TCg9LDPlzQpc"
                  onChange={(e) => setAddress(e.target.value)}
                  selectProps={{
                    value: address,
                    onChange: (selectedPlace) => {
                      const label = selectedPlace.label; // Extract the 'label' property
                      setAddress(label); // Set the 'address' state with the extracted label
                    },
                  }}
                  autocompletionRequest={{
                    componentRestrictions: {
                      country: "AU",
                    },
                  }}
                />

                {/* <AutoComplete
                  onChange={(e) => setAddress(e.target.value)}
                  className="form-control"
                  apiKey="AIzaSyBH0Ey-G2PbWkSCLyGG1A9TCg9LDPlzQpc"
                  onPlaceSelected={(place) => {
                    const addressComponents = place.address_components;
                    console.log(place.address_components);
                    const city = addressComponents.find((component) =>
                      component.types.includes("locality")
                    );

                    const state = addressComponents.find((component) =>
                      component.types.includes("administrative_area_level_1")
                    );

                    const postalCode = addressComponents.find((component) =>
                      component.types.includes("postal_code")
                    );

                    const country = addressComponents.find((component) =>
                      component.types.includes("country")
                    );

                    if (city) {
                      setCity(city.long_name);
                    }
                    if (state) {
                      setState(state.short_name);
                    }
                    if (postalCode) {
                      setZip_code(postalCode.long_name);
                    }
                    if (country) {
                      setCountry(country.long_name);
                    }

                    setAddress(place.formatted_address);
                  }}
                  options={{
                    types: ["(regions)"],
                    componentRestrictions: { country: "au" },
                  }}
                /> */}
              </Col>
              <Col className="mb-2" lg="6" md="12">
                <Label className="value_font input_label">City</Label>
                <Input
                  onChange={(e) => setCity(e.target.value)}
                  type="text"
                  placeholder="City"
                />
              </Col>
              <Col className="mb-2" lg="6" md="12">
                <Label className="value_font input_label">State</Label>
                <Select
                  onChange={(selectedOption) => setState(selectedOption.value)}
                  isClearable={false}
                  classNamePrefix="select"
                  options={selectState}
                />
              </Col>
              <Col className="mb-2" lg="6" md="12">
                <Label className="value_font input_label">Zip Code</Label>
                <Input
                  onChange={(e) => setZip_code(e.target.value)}
                  type="number"
                  placeholder="Zip Code"
                />
              </Col>
              <Col className="mb-2" lg="6" md="12">
                <Label className="value_font input_label">Country</Label>
                <Input
                  onChange={(e) => setCountry(e.target.value)}
                  type="text"
                  placeholder="Country"
                />
              </Col>
              <Col className="mb-2" lg="6" md="12">
                <Label className="value_font input_label">Status</Label>
                <Select
                  onChange={(selectedOption) => setStatus(selectedOption.value)}
                  isClearable={false}
                  classNamePrefix="select"
                  options={selectStaus}
                />
              </Col>
              <Col className="mb-2" lg="6" md="12">
                <Label className="value_font input_label">Password</Label>
                <Input type="password" placeholder="Password" />
              </Col>
              <Col className="mb-2" lg="6" md="12">
                <Label className="value_font input_label">Re Password</Label>
                <Input type="password" placeholder="Re Password" />
              </Col>
            </Row>
            <div className="mx-auto">
              <Button
                onClick={postData}
                type="submit"
                className="mt-2 default_btn"
              >
                Add Client
              </Button>
            </div>
          </Form>
        </ModalBody>
      </Modal>

      {/* edit client data modal  */}

      <Modal isOpen={iseditOpen} toggle={editModal} size="lg">
        <ModalHeader toggle={editModal}></ModalHeader>
        <ModalBody>
          <div className="icon_div_main mb-2">
            <img className="icon_sizee" src={userIcon} alt="" />
          </div>
          <h5 className="modal_title">Edit New Client</h5>
          <span className="modal_subtitle">
            Eneter the correct details of your client which you want to edit.
          </span>

          <Form className="d-flex flex-column p-1">
            <Row>
              <Col className="mb-2" lg="6" md="12">
                <Label className="value_font input_label">Name</Label>
                <Input
                  type="text"
                  placeholder="Name"
                  defaultValue={defaultData_?.name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Col>
              <Col className="mb-2" lg="6" md="12">
                <Label className="value_font input_label">Email Address</Label>
                <Input
                  onBlur={(e) => {
                    const emailValue = e.target.value;
                    setEmail(emailValue);
                    if (!isEmailValid(emailValue)) {
                      setEmailError(true);
                    } else {
                      setEmailError(false);
                    }
                  }}
                  defaultValue={defaultData_?.email}
                  type="email"
                  placeholder="Email Address"
                />
                {emailError && (
                  <div className="error_mssg">Invalid email address</div>
                )}
              </Col>

              <Col className="mb-2" lg="6" md="12">
                <Label className="value_font input_label">
                  Secondary Email Address
                </Label>
                <Input
                  onChange={(e) => setEmailSecondary(e.target.value)}
                  onBlur={(e) => {
                    const emailValue = e.target.value;
                    setEmailSecondary(emailValue);
                    if (!isSEmailValid(emailValue)) {
                      setSEmailError(true);
                    } else {
                      setSEmailError(false);
                    }
                  }}
                  defaultValue={defaultData_?.emailSecondary}
                  type="email"
                  placeholder="Secondary Email Address"
                />
                {sEmailError && (
                  <div className="error_mssg">Invalid email address</div>
                )}
              </Col>
              <Col className="mb-2" lg="6" md="12">
                <Label className="value_font input_label">Joining Date</Label>
                <Input
                  onChange={(e) => setJoining_date(e.target.value)}
                  defaultValue={defaultData_?.joining_date}
                  type="date"
                />
              </Col>
              <Col className="mb-2" lg="6" md="12">
                <Label className="value_font input_label">Phone Number</Label>
                <Input
                  onBlur={(e) => {
                    const phoneValue = e.target.value;
                    setPhone(phoneValue);
                    if (!isPhoneValidAustralia(phoneValue)) {
                      setPhoneError(true);
                    } else {
                      setPhoneError(false);
                    }
                  }}
                  defaultValue={defaultData_?.phone}
                  type="tel"
                  placeholder="Phone Number"
                />

                {phoneError && (
                  <div className="error_mssg">Invalid phone number</div>
                )}
              </Col>
              <Col className="mb-2" lg="6" md="12">
                <Label className="value_font input_label">Address</Label>

                <GooglePlacesAutocomplete
                  className="form-control"
                  apiKey="AIzaSyBH0Ey-G2PbWkSCLyGG1A9TCg9LDPlzQpc"
                  onChange={(e) => setAddress(e.target.value)}
                  defaultValue={defaultData_?.address}
                  selectProps={{
                    value: address,
                    onChange: (selectedPlace) => {
                      const label = selectedPlace.label;
                      setAddress(label);
                    },
                  }}
                  autocompletionRequest={{
                    componentRestrictions: {
                      country: "AU",
                    },
                  }}
                />

                {/* <AutoComplete
                  onChange={(e) => setAddress(e.target.value)}
                  defaultValue={defaultData_?.address}
                  className="form-control"
                  apiKey="AIzaSyBH0Ey-G2PbWkSCLyGG1A9TCg9LDPlzQpc"
                  onPlaceSelected={(place) => {
                    const addressComponents = place.address_components;
                    console.log(place.address_components);

                    const newCity = addressComponents.find((component) =>
                      component.types.includes("locality")
                    );

                    const newState = addressComponents.find((component) =>
                      component.types.includes("administrative_area_level_1")
                    );

                    const newPostalCode = addressComponents.find((component) =>
                      component.types.includes("postal_code")
                    );

                    const newCountry = addressComponents.find((component) =>
                      component.types.includes("country")
                    );
                      console.log(newCity);
                    if (newCity) {
                      setCity(newCity.long_name);
                    }
                    if (newState) {
                      setState(newState.short_name);
                    }
                    if (newPostalCode) {
                      setZip_code(newPostalCode.long_name);
                    }
                    if (newCountry) {
                      setCountry(newCountry.long_name);
                    }

                    setAddress(place.formatted_address);
                  }}
                  options={{
                    types: ["(regions)"],
                    componentRestrictions: { country: "au" },
                  }}
                /> */}
              </Col>
              <Col className="mb-2" lg="6" md="12">
                <Label className="value_font input_label">City</Label>
                <Input
                  onChange={(e) => setCity(e.target.value)}
                  defaultValue={defaultData_?.city}
                  type="text"
                  placeholder="City"
                />
              </Col>
              <Col className="mb-2" lg="6" md="12">
                <Label className="value_font input_label">State</Label>
                <Select
                  onChange={(selectedOption) => setState(selectedOption.value)}
                  value={selectState.find((option) => option.value === state)}
                  isClearable={false}
                  classNamePrefix="select"
                  options={selectState}
                />
              </Col>
              <Col className="mb-2" lg="6" md="12">
                <Label className="value_font input_label">Zip Code</Label>
                <Input
                  onChange={(e) => setZip_code(e.target.value)}
                  defaultValue={defaultData_?.zip_code}
                  type="number"
                  placeholder="Zip Code"
                />
              </Col>
              <Col className="mb-2" lg="6" md="12">
                <Label className="value_font input_label">Country</Label>
                <Input
                  onChange={(e) => setCountry(e.target.value)}
                  defaultValue={defaultData_?.country}
                  type="text"
                  placeholder="Country"
                />
              </Col>
              <Col className="mb-2" lg="6" md="12">
                <Label className="value_font input_label">Status</Label>
                <Select
                  onChange={(selectedOption) => setStatus(selectedOption.value)}
                  value={selectStaus.find((option) => option.value === status)}
                  isClearable={false}
                  classNamePrefix="select"
                  options={selectStaus}
                />
              </Col>
            </Row>
            <div className="mx-auto">
              <Button
                onClick={updateData}
                type="submit"
                className="mt-2 default_btn"
              >
                Update
              </Button>
            </div>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
};

const Clientpage = () => {
  const [defaultData_, setDefaultData_] = useState("");

  // states for update and insert data

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailSecondary, setEmailSecondary] = useState("");
  const [phone, setPhone] = useState("");
  const [joining_date, setJoining_date] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip_code, setZip_code] = useState("");
  const [country, setCountry] = useState("");
  const [status, setStatus] = useState("");

  // verror handle

  // eror
  useEffect(() => {
    if (defaultData_) {
      setName(defaultData_.name);
      setEmail(defaultData_.email);
      setEmailSecondary(defaultData_.emailSecondary);
      setJoining_date(defaultData_.joining_date);
      setPhone(defaultData_.phone);
      setAddress(defaultData_.address);
      setCity(defaultData_.city);
      setState(defaultData_.state);
      setZip_code(defaultData_.zip_code);
      setCountry(defaultData_.country);
      setStatus(defaultData_.status);
    }
  }, [defaultData_]);

  // post data

  // validatpn email and phone number
  const [emailError, setEmailError] = useState(false);
  const [sEmailError, setSEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  const isEmailValid = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return emailRegex.test(email);
  };
  const isSEmailValid = (semail) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return emailRegex.test(semail);
  };

  const isPhoneValidAustralia = (phone) => {
    // Regular expression for Australian phone numbers (example: +61 1234567890)
    const phoneRegex = /(?:\+?61)?(?:\(0\)[23478]|\(?0?[23478]\)?)\d{8}/i;
    return phoneRegex.test(phone);
  };

  // ended  validation

  const postData = (e) => {
    e.preventDefault();
    // if (
    //   !name ||
    //   !email ||
    //   !emailSecondary ||
    //   !joining_date ||
    //   !phone ||
    //   !address ||
    //   !city ||
    //   !state ||
    //   !zip_code ||
    //   !country ||
    //   !status
    // ) {
    //   toast.error("Please fill out all  fields.");
    //   return;
    // }

    // if (!isEmailValid(email)) {
    //   toast.error("Enter valid email address.");
    //   return;
    // }
    // if (!isSEmailValid(email)) {
    //   toast.error("Enter valid email address.");
    //   return;
    // }
    // if (!isPhoneValidAustralia(phone)) {
    //   toast.error("Enter valid Phone address.");
    //   return;
    // }

    setName("");
    setEmail("");
    setEmailSecondary("");
    setPhone("");
    setJoining_date("");
    setAddress("");
    setCity("");
    setState("");
    setZip_code("");
    setCountry("");
    setStatus("");

    axios
      .post(`${global.BASEURL}createRecord/client`, {
        name,
        email,
        joining_date,
        emailSecondary,
        phone,
        address,
        city,
        state,
        zip_code,
        country,
        status,
      })
      .then(() => {
        toggleLargeModal();
        getData();
        toast.success("Data added successfully.");
      })
      .catch((error) => {
        console.error("Error adding data: ", error);
        toast.error("Failed to add data."); // Show error toast
      });
  };

  // insert data end
  // spinnere for get data

  const [isLoading, setIsLoading] = useState(true);

  // show data start code
  const [data, setData] = useState([]);
  const [selectedOption, setSelectedOption] = useState("All");

  function getData() {
    setIsLoading(true);
    axios
      .post(`${global.BASEURL}getClients`)
      .then((res) => {
        const data = res.data.data;

        if (selectedOption === "New User") {
          const last5Records = data.slice(0, 3); // Get the last 5 records
          setData(last5Records);
        } else {
          const filteredData = data.filter(
            (item) => item.status === selectedOption || selectedOption === "All"
          );
          setData(filteredData);
        }
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      })
      .finally(() => {
        setIsLoading(false); // Hide spinner after data is fetched
      });
  }

  useEffect(() => {
    getData();
  }, [selectedOption]);

  // delete api
  // update data

  const updateData = (e) => {
    e.preventDefault();
    const itemId = defaultData_?._id;
    if (!isEmailValid(email)) {
      toast.error("Enter valid email address.");
      return;
    }
    if (!isSEmailValid(email)) {
      toast.error("Enter valid email address.");
      return;
    }
    if (!isPhoneValidAustralia(phone)) {
      toast.error("Enter valid Phone address.");
      return;
    }

    axios
      .post(`${global.BASEURL}updateRecord/client`, {
        id: itemId,
        name,
        email,
        emailSecondary,
        joining_date,
        phone,
        address,
        city,
        state,
        zip_code,
        country,
        status,
      })
      .then(() => {
        editModal();
        getData();
        toast.success("Data updated successfully.");
      })
      .catch((error) => {
        console.error("Error updating client:", error);
      });
  };

  // delet api start

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);

  const handleDelete = (id) => {
    setDeleteItemId(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    // Close the delete confirmation modal
    setIsDeleteModalOpen(false);

    // Delete the item
    if (deleteItemId) {
      axios
        .post(`${global.BASEURL}deleteClient`, {
          id: deleteItemId,
        })
        .then(() => {
          getData();
          toast.success("Data deleted successfully."); // Show success toast
        })
        .catch((error) => {
          console.error("Error deleting data:", error);
          toast.error("Failed to delete data."); // Show error toast
        });
    }
  };

  // end delet api

  let counter = 0;
  const columns = [
    {
      name: "Sr.no",
      selector: (row) => ++counter,
      sortable: "true",
      maxWidth: "2rem",
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: "true",
      maxWidth: "3rem",
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: "true",
      //   // maxWidth:"6rem"
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
      sortable: "true",
      // maxWidth:"4rem"
    },
    {
      name: "Adress",
      selector: (row) => row.address,
      sortable: "true",
      // maxWidth:"6rem"
    },
    {
      name: "State",
      selector: (row) => row.state,
      sortable: "true",
      maxWidth: "2rem",
    },
    {
      name: "Joining Date",
      cell: (row) => row.joining_date,
      sortable: "true",
      maxWidth: "4rem",
      width: "10rem",
    },
    {
      name: "Status",
      cell: (row) => (
        <div className="d-flex align-items-center">
          {row.status === "Active" ? (
            <>
              <img
                src={active}
                alt="active"
                width="11"
                height="11"
                className="me-1"
              />
              <span>{row.status}</span>
            </>
          ) : (
            <>
              <img
                src={block}
                alt="block"
                width="11"
                height="11"
                className="me-1"
              />
              <span>{row.status}</span>
            </>
          )}
        </div>
      ),
      sortable: true,
      with: "5rem",
    },
    {
      name: "Action",
      allowOverflow: true,
      // maxWidth: "7rem",
      // minWidth: "2rem",
      cell: (row) => {
        // modal edit

        return (
          <div className="d-flex  w-100">
            <UncontrolledDropdown className="">
              <DropdownToggle className="pe-1 " tag="span">
                <MoreHorizontal size={15} />
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem>
                  <div
                    onClick={() => editModal(row)}
                    outlinex
                    className="btn btn-white w-100 p-0 m-0"
                  >
                    <span className="align-middle ms-50">Edit</span>
                  </div>
                </DropdownItem>

                <DropdownItem>
                  <div
                    onClick={() => handleDelete(row._id)}
                    className="btn btn-white w-100 p-0 m-0"
                  >
                    <span className="align-middle ms-50">Delete</span>
                  </div>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        );
      },
    },
  ];

  // sleect  option
  const selectState = [
    { label: "NSW", value: "NSW" },
    { label: "VIC", value: "VIC" },
    { label: "QLD", value: "QLD" },
    { label: "WA", value: "WA" },
    { label: "SA", value: "SA" },
    { label: "TAS", value: "TAS" },
  ];
  const selectStaus = [
    { label: "Active", value: "Active" },
    { label: "Block", value: "Block" },
  ];

  // Step 2: Add state for managing modal visibility
  const [iseditOpen, setiseditOpen] = useState(false);

  const editModal = (result) => {
    setDefaultData_(result);
    setiseditOpen(!iseditOpen);
  };

  const [isLargeModalOpen, setIsLargeModalOpen] = useState(false);

  const toggleLargeModal = () => {
    setIsLargeModalOpen(!isLargeModalOpen);
  };

  return (
    <>
      {/* tostify  */}

      <ToastContainer />

      <div className="d-flex align-align-items-center justify-content-between mt-3 mb-3">
        <h5 className="head_title"> Clients</h5>

        <div className="d-flex align-items-center">
          <div>
            <Button className="default_btn" outline onClick={toggleLargeModal}>
              Add Client
            </Button>

            {/* add client modal */}

            <AutoFill
              toggleLargeModal={toggleLargeModal}
              isLargeModalOpen={isLargeModalOpen}
              GooglePlacesAutocomplete={GooglePlacesAutocomplete}
              setName={setName}
              setEmail={setEmail}
              setEmailSecondary={setEmailSecondary}
              setPhone={setPhone}
              setAddress={setAddress}
              setCity={setCity}
              setState={setState}
              setZip_code={setZip_code}
              setCountry={setCountry}
              setStatus={setStatus}
              selectState={selectState}
              selectStaus={selectStaus}
              postData={postData}
              city={city}
              country={country}
              zip_code={zip_code}
              state={state}
              // validaion
              emailError={emailError}
              setEmailError={setEmailError}
              isEmailValid={isEmailValid}
              isPhoneValidAustralia={isPhoneValidAustralia}
              setPhoneError={setPhoneError}
              phoneError={phoneError}
              setSEmailError={setSEmailError}
              isSEmailValid={isSEmailValid}
              sEmailError={sEmailError}
              setJoining_date={setJoining_date}
            />

            {/* delete modal */}

            <AutoFill
              iseditOpen={iseditOpen}
              editModal={editModal}
              defaultData_={defaultData_}
              state={state}
              GooglePlacesAutocomplete={GooglePlacesAutocomplete}
              selectState={selectState}
              setName={setName}
              setEmail={setEmail}
              setEmailSecondary={setEmailSecondary}
              setPhone={setPhone}
              setAddress={setAddress}
              setCity={setCity}
              setState={setState}
              setZip_code={setZip_code}
              setCountry={setCountry}
              setStatus={setStatus}
              selectStaus={selectStaus}
              status={status}
              // AutoComplete={AutoComplete}
              updateData={updateData}
              // validation

              emailError={emailError}
              setEmailError={setEmailError}
              isEmailValid={isEmailValid}
              isPhoneValidAustralia={isPhoneValidAustralia}
              setPhoneError={setPhoneError}
              phoneError={phoneError}
              setSEmailError={setSEmailError}
              isSEmailValid={isSEmailValid}
              sEmailError={sEmailError}
              joining_date={joining_date}
              setJoining_date={setJoining_date}
            />

            <Modal isOpen={isDeleteModalOpen}>
              <ModalHeader>Delete Confirmation</ModalHeader>
              <ModalBody>Are you sure you want to delete this item?</ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  onClick={() => handleDeleteConfirm(deleteItemId)}
                >
                  Yes
                </Button>
                <Button
                  color="secondary"
                  onClick={() => setIsDeleteModalOpen(false)}
                >
                  No
                </Button>
              </ModalFooter>
            </Modal>
          </div>
          <div className="ms-2">
            <UncontrolledButtonDropdown>
              <DropdownToggle className="filter_btn">
                <img className="filter_img" src="./icons/filter_icon.png" />
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem
                  tag="a"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedOption("All");
                  }}
                >
                  All
                </DropdownItem>
                <DropdownItem
                  tag="a"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedOption("New User");
                  }}
                >
                  New User
                </DropdownItem>
                <DropdownItem
                  tag="a"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedOption("Active");
                  }}
                >
                  Active User
                </DropdownItem>
                <DropdownItem
                  tag="a"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedOption("Block");
                  }}
                >
                  Blocked User
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledButtonDropdown>
          </div>
        </div>
      </div>
      {/* table start */}
      <div>
        {isLoading ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <Spinerr />
          </div>
        ) : data.length === 0 ? (
          <p>There is no data to show.</p>
        ) : (
          <ClientDataTable columns={columns} data={data} />
        )}
      </div>
    </>
  );
};

export default Clientpage;
