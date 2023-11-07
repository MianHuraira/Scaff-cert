// ** React Imports
import { Fragment, useState, useEffect } from "react";
import ClientDataTable from "./table";
import "./table.css";
import Select from "react-select";
import check from "../../Admin/assests/check.png";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import checkWihte from "../../Admin/assests/check-white.png";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
// for spinner
import Spinerr from "../../views/components/spinners/SpinnerGrowing";
import SignatureCanvas from "react-signature-canvas";

// ** Reactstrap Imports
import {
  Form,
  Modal,
  ModalHeader,
  ModalBody,
  TabContent,
  Button,
  TabPane,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";

const JobAdd = () => {
  const history = useHistory();
  const queryParams = new URLSearchParams(history.location.search);
  const tabKey = queryParams.get("tabKey");
  // url id get
  const { id } = useParams();

  // states
  const [jobData, setJobData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [quantityValues, setQuantityValues] = useState({});
  const [pickModal, setPickModal] = useState(false);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalWeight, setTotalWeight] = useState([]);
  const [yourRowArray, setYourRowArray] = useState([]);
  const [activeTabSection2, setActiveTabSection2] = useState("5");
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [successModalS, setSuccessModalS] = useState(false);

  // use effects

  useEffect(() => {
    getDataJob();
    getData();
    getDataJob();
  }, []);

  const moveToPickJobs = async (e, newStatus) => {
    e.preventDefault();
    const inventoryItemsString = JSON.stringify(yourRowArray);
    await axios
      .post(`${global.BASEURL}updateRecord/jobs`, {
        inventory_items: inventoryItemsString,
        status: newStatus,
        id: id,
      })
      .catch((error) => {
        console.error("Error updating data: ", error);
        toast.error("Failed to update data.");
      });
    history.push({
      pathname: `/job_notify/${id}`,
      state: {
        totalQuantity: totalQuantity,
        totalWeightSum: totalWeightSum,
      },
    });
  };

  const confirmDelivery = async (e, newStatus) => {
    e.preventDefault();
    const calculatedTotalQuantity = jobData.reduce(
      (total, item) => total + item.quantity,
      0
    );
    const calculatedTotalWeightSum = jobData.reduce(
      (total, item) => total + item.weight,
      0
    );

    console.log("okk", calculatedTotalQuantity);
    await axios
      .post(`${global.BASEURL}updateRecord/jobs`, {
        status: newStatus,
        id: id,
      })
      .catch((error) => {
        console.error("Error updating data: ", error);
        toast.error("Failed to update data.");
      });

    history.push({
      pathname: `/job_notify/${id}`,
      state: {
        totalQuantity: calculatedTotalQuantity,
        totalWeightSum: calculatedTotalWeightSum,
      },
    });
  };

  // job data get
  function getDataJob() {
    setIsLoading(true);
    axios
      .post(`${global.BASEURL}getRecords/jobs`)
      .then((res) => {
        const filteredData = res.data.data.filter((item) => item._id === id);

        if (filteredData.length > 0) {
          const parsedInventoryItems = JSON.parse(
            filteredData[0]?.inventory_items
          );
          setJobData(parsedInventoryItems);
        }
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  // get inventory data from api

  function getData() {
    setIsLoading(true);
    axios
      .post(`${global.BASEURL}getInventory`)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      })
      .finally(() => {
        setIsLoading(false); // Hide spinner after data is fetched
      });
  }

  const totalWeightSum = Object.values(totalWeight).reduce(
    (acc, itemWeight) => acc + itemWeight,
    0
  );

  // Now, you can use totalWeightSum in your JSX to display the total weight.

  const handleQuantityChange = (row, value) => {
    const parsedValue = parseInt(value) || 0;

    setQuantityValues((prevQuantityValues) => ({
      ...prevQuantityValues,
      [row._id]: parsedValue,
    }));

    const newWeight = row.weight * parsedValue;
    const newRow = { ...row, quantity: parsedValue, weight: newWeight };

    const newRowArray = [...yourRowArray, newRow];

    setYourRowArray(newRowArray);

    const newTotalQuantity = Object.values({
      ...quantityValues,
      [row._id]: parsedValue,
    }).reduce((acc, currentValue) => acc + currentValue, 0);

    setTotalQuantity(newTotalQuantity);
    const updatedTotalWeight = { ...totalWeight };

    updatedTotalWeight[row._id] = row.weight * (parsedValue || 0);

    setTotalWeight(updatedTotalWeight);
  };

  ////////

  const pickListModal = () => {
    const selectedQuantity = Object.values(quantityValues).reduce(
      (acc, currentValue) => acc + currentValue,
      0
    );

    if (selectedQuantity > 0) {
      setPickModal(!pickModal);
    } else {
      toast.error("Must fill atleast 1 Qty.");
    }
  };

  /////////////////////////////////////////////////////////////////////////////

  let counter = 0;
  const columns = [
    {
      name: "Sr.no",
      selector: (row) => ++counter,
      sortable: "true",
      // maxWidth:"6rem"
    },
    {
      name: "Item Name",
      selector: (row) => row.name,
      sortable: "true",
      // maxWidth:"6rem"
    },
    {
      name: "On Hand",
      selector: (row) => (
        <>
          {row.quantity === "0" ? (
            <div className="actionCss">out of stock</div>
          ) : (
            row.quantity
          )}
        </>
      ),
      sortable: "true",
      // maxWidth:"6rem"
    },
    {
      name: "Qty",
      cell: (row) => (
        <>
          {row.quantity === "0" ? (
            <input
              value={
                quantityValues[row._id] !== undefined
                  ? quantityValues[row._id]
                  : 0
              }
              onChange={(e) => handleQuantityChange(row, e.target.value)}
              className="form-control"
              type="number"
              readOnly
            />
          ) : (
            <input
              value={
                quantityValues[row._id] !== undefined
                  ? quantityValues[row._id]
                  : 0
              }
              onChange={(e) => handleQuantityChange(row, e.target.value)}
              className="form-control"
              type="number"
            />
          )}
        </>
      ),
      sortable: "true",
      // maxWidth:"6rem"
    },
    {
      name: "Weight(Kg)",
      selector: (row) => row.weight * (quantityValues[row._id] || 0),
      sortable: "true",
      // maxWidth:"6rem"
    },
  ];

  // secound tab column data start

  const columnsB = [
    {
      name: "Sr.no",
      selector: (row, index) => index + 1,
      sortable: "true",
      // maxWidth:"6rem"
    },
    {
      name: "Item Name",
      selector: (row) => row.name,
      sortable: "true",
      // maxWidth:"6rem"
    },
    {
      name: "On Hand",
      selector: (row) => (
        <>
          {row.quantity === "0" ? (
            <div className="actionCss">out of stock</div>
          ) : (
            row.quantity
          )}
        </>
      ),
      sortable: "true",
      // maxWidth:"6rem"
    },
    {
      name: "Qty",
      selector: (row) => {
        const matchedItem = jobData.find((item) => item._id === row._id);

        if (matchedItem) {
          return <>{matchedItem.quantity}</>;
        } else {
          return 0;
        }
      },
      sortable: "true",
      // maxWidth:"6rem"
    },
    {
      name: "Actuals",
      cell: (row) => (
        <>
          {row.quantity === "0" ? (
            <input
              value={
                quantityValues[row._id] !== undefined
                  ? quantityValues[row._id]
                  : 0
              }
              onChange={(e) => handleQuantityChange(row, e.target.value)}
              className="form-control"
              type="number"
              readOnly
            />
          ) : (
            <input
              value={
                quantityValues[row._id] !== undefined
                  ? quantityValues[row._id]
                  : 0
              }
              onChange={(e) => handleQuantityChange(row, e.target.value)}
              className="form-control"
              type="number"
            />
          )}
        </>
      ),
      sortable: "true",
      // maxWidth:"6rem"
    },
    {
      name: "Weight(Kg)",
      selector: (row) => row.weight * (quantityValues[row._id] || 0),
      sortable: "true",
      // maxWidth:"6rem"
    },
  ];

  // secound tab column data start
  const columnsC = [
    {
      name: "Sr.no",
      selector: (row, index) => index + 1,
      sortable: "true",
      // maxWidth:"6rem"
    },
    {
      name: "Item Name",
      selector: (row) => row.name,
      sortable: "true",
      // maxWidth:"6rem"
    },
    {
      name: "Delivery Qty",
      selector: (row) => row.quantity,
      sortable: "true",
      // maxWidth:"6rem"
    },
    {
      name: "Bal Qty",
      selector: (row) => row.quantity,
      sortable: "true",
      // maxWidth:"6rem"
    },
    {
      name: "Actuals",
      cell: (row) => (
        <>
          <input
            value={
              quantityValues[row._id] !== undefined
                ? quantityValues[row._id]
                : 0
            }
            onChange={(e) => {
              const inputValue = parseInt(e.target.value, 10);
              if (inputValue <= row.quantity) {
                // If user input is less than or equal to row.quantity
                handleQuantityChange(row, inputValue);
              } else {
                // If user input is greater than row.quantity, show an error message
                toast.error("Please select less than or equal to row.quantity.");
              }
            }}
            className="form-control"
            type="number"
          />
        </>
      ),
      sortable: "true",
    },    
    {
      name: "Weight(Kg)",
      selector: (row) => row.weight * (quantityValues[row._id] || 0),
      sortable: "true",
      // maxWidth:"6rem"
    },
  ];
  // secound tab data

  const columnsk = [
    {
      name: "Sr.no",
      selector: (row) => row.srno,
      sortable: "true",
      // maxWidth:"6rem"
    },
    {
      name: "Item Name",
      selector: (row) => row.item_name,
      sortable: "true",
      // maxWidth:"6rem"
    },
    {
      name: "Qty",
      selector: (row) => row.qty,
      sortable: "true",
      // maxWidth:"6rem"
    },

    {
      name: "Action",
      cell: (row) => (
        <div className="d-flex align-items-center">
          {row.action === "Out of Stock" ? (
            <>
              <div className="actionCss">
                <span>{row.action}</span>
              </div>
            </>
          ) : (
            <>
              <div className="actionCssA">
                <span>{row.action}</span>
              </div>
            </>
          )}
        </div>
      ),
      sortable: true,
    },
  ];

  let datak = [
    {
      srno: "09",
      item_name: "Standard 3.0m",
      qty: "10",
      action: "Out of Stock",
    },
    {
      srno: "09",
      item_name: "Standard 3.0m",
      qty: "10",
      action: "Add to Picklist",
    },
    {
      srno: "09",
      item_name: "Standard 3.0m",
      qty: "10",
      action: "Add to ojko",
    },
  ];

  const [activeTabSection1, setActiveTabSection1] = useState(() => {
    if (tabKey === "desiredKey") {
      return "1";
    } else if (tabKey === "cube") {
      return "2";
    } else if (tabKey === "deli") {
      return "3";
    } else if (tabKey === "ret") {
      return "4";
    }
  });

  const toggleTabSection1 = (tab) => {
    if (activeTabSection1 !== tab) {
      setActiveTabSection1(tab);
    }
  };

  const toggleTabSection2 = (tab) => {
    if (activeTabSection2 !== tab) {
      setActiveTabSection2(tab);
    }
  };

  const selectBranch = [
    { label: "Active", value: "Active" },
    { label: "Un Active", value: "Un Active" },
  ];
  const selectSign = [
    { label: "Signature", value: "Signature" },
    { label: "Text", value: "Text" },
  ];

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  const [items, setItems] = useState([
    {
      itemName: "",
      quantity: "",
      supplier: "",
    },
  ]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setSelectedImage(imageUrl);
  };

  const handleItemChange = (e, index, field) => {
    const updatedItems = [...items];
    updatedItems[index][field] = e.target.value;
    setItems(updatedItems);
  };

  const addMore = () => {
    const newItem = {
      itemName: "",
      quantity: "",
      supplier: "",
    };
    setItems([...items, newItem]);
  };

  // success modal

  const successModal = () => {
    setSuccessModalS(!successModalS);
  };

  // cancel btn css

  const cancelBtn = {
    background: "white",
    color: "#2873B9",
    border: "0px",
  };
  return (
    <Fragment>
      <ToastContainer />
      <Nav tabs justified>
        <NavItem>
          <NavLink
            className={activeTabSection1 === "1" ? "active" : ""}
            onClick={() => {
              toggleTabSection1("1");
            }}
            disabled={tabKey !== "desiredKey"}
          >
            <div className="numCount">
              <span>1</span>
            </div>
            Create Picklist
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={activeTabSection1 === "2" ? "active" : ""}
            onClick={() => {
              toggleTabSection1("2");
            }}
            disabled={tabKey !== "cube"}
          >
            <div className="numCount">
              <span>2</span>
            </div>
            Pick Order
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={activeTabSection1 === "3" ? "active" : ""}
            onClick={() => {
              toggleTabSection1("3");
            }}
            disabled={tabKey !== "deli"}
          >
            <div className="numCount">
              <span>3</span>
            </div>
            Complete Delivery
          </NavLink>
        </NavItem>
        <NavItem style={{ display: tabKey === "ret" ? "block" : "none" }}>
          <NavLink
            className={activeTabSection1 === "4" ? "active" : ""}
            onClick={() => {
              toggleTabSection1("4");
            }}
          >
            <div className="numCount">
              <span>4</span>
            </div>
            Return
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent className="py-50" activeTab={activeTabSection1}>
        <TabPane tabId="1">
          <div className="d-flex align-align-items-center justify-content-between mt-3 mb-3">
            <h5 className="head_title"> Inventory Items</h5>
            <div className="ms-2">
              <input
                placeholder="Search..."
                className="form-control"
                type="search"
              />
            </div>
          </div>
          <div className="table_main p-1 mt-2 pb-3">
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
            <div className="d-flex align-items-center justify-content-start md_mt_5rem sm_column">
              <h5 style={{ fontSize: "20px" }} className="head_title">
                Total Item(s): {totalQuantity} : Total Weight : {totalWeightSum}
              </h5>

              <Button
                onClick={() => pickListModal()}
                className="default_btn ms-2 sm_mt-10"
              >
                Create Picklist
              </Button>

              {/* picklist modal */}

              <Modal
                className="modal_lg_resize"
                isOpen={pickModal}
                toggle={pickListModal} // Use the correct toggle function for the large modal
                size="lg"
              >
                <ModalHeader
                  toggle={pickListModal} // Use the correct toggle function for the large modal
                ></ModalHeader>
                <ModalBody style={{ padding: "50px 0px" }}>
                  <div className="check_div">
                    <div className="d-flex align-items-center justify-content-between md_column">
                      <div className="circle_div d-flex align-items-center justify-content-center">
                        <img src={check} alt="" />
                      </div>
                      <div className="md_mt-10">
                        <div className="def_li"></div>
                        <div className="def_li mt-1"></div>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-center flex-column mt-1">
                    <h5 className="modal_title">Picklist Created</h5>
                    <span className="modal_subtitle">
                      Do you want Quick Delivery?
                    </span>
                  </div>
                  <div className="d-flex align-items-center justify-content-center sm_column  mt-2">
                    <Button
                      onClick={(e) => {
                        moveToPickJobs(e, "Move to Picklist");
                        // successModal();
                      }}
                      type="submit"
                      className="default_btn2 me-2 sm_mr_none"
                    >
                      Move to Pick Jobs
                    </Button>
                    <Button
                      onClick={(e) => {
                        moveToPickJobs(e, "Create Delivery Docket");
                        // successModal();
                      }}
                      type="submit"
                      className="default_btn sm_mt-10"
                    >
                      Yes, Create Delivery Docket
                    </Button>
                  </div>
                </ModalBody>
              </Modal>

              {/* success modal*/}

              <Modal
                className="modal_lg_resize"
                isOpen={successModalS}
                toggle={successModal} // Use the correct toggle function for the large modal
                size="lg"
              >
                <ModalHeader
                  toggle={successModal} // Use the correct toggle function for the large modal
                ></ModalHeader>
                <ModalBody style={{ padding: "50px 0px" }}>
                  <div
                    className="d-flex align-items-center justify-content-center flex-column"
                    style={{ width: "50%", margin: "auto" }}
                  >
                    <div
                      style={{ marginLeft: "auto" }}
                      className="check_div2 sm_mr_none"
                    >
                      <div className="d-flex align-items-center justify-content-between sm_column">
                        <div className="circleW_div d-flex align-items-center justify-content-center">
                          <img
                            style={{
                              width: "20px",
                              height: "20px",
                              objectFit: "contain",
                            }}
                            src={checkWihte}
                            alt=""
                          />
                        </div>
                        <div className="md_mt-10">
                          <div
                            style={{ width: "50%" }}
                            className="def_li2"
                          ></div>
                          <div className="def_li2 mt-1"></div>
                        </div>
                      </div>
                    </div>
                    <div className="blank_divW mt-2"></div>
                    <div
                      style={{ marginRight: "auto" }}
                      className="checo check_div2 sm_mr_none"
                    >
                      <div className="d-flex align-items-center justify-content-between sm_column">
                        <div className="circleW_div d-flex align-items-center justify-content-center">
                          <img
                            style={{
                              width: "20px",
                              height: "20px",
                              objectFit: "contain",
                            }}
                            src={checkWihte}
                            alt=""
                          />
                        </div>
                        <div className="md_mt-10">
                          <div
                            style={{ width: "50%" }}
                            className="def_li2"
                          ></div>
                          <div className="def_li2 mt-1"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-center flex-column mt-1">
                    <h5 className="modal_title">Success</h5>
                    <span className="modal_subtitle">
                      Your Picklist moved to Quick Delivery Docket
                    </span>
                  </div>
                </ModalBody>
              </Modal>
            </div>
          </div>

          <div className="d-flex align-items-center justify-content-between mt-2">
            <div>
              <Nav tabs>
                <NavItem>
                  <NavLink
                    className={activeTabSection2 === "5" ? "active" : ""}
                    onClick={() => {
                      toggleTabSection2("5");
                    }}
                  >
                    Other Branch Items
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={activeTabSection2 === "6" ? "active" : ""}
                    onClick={() => {
                      toggleTabSection2("6");
                    }}
                  >
                    Cross Hire Items
                  </NavLink>
                </NavItem>
              </Nav>
            </div>
            <div className="d-flex align-items-center dropCss">
              <span className="me-2">Branch</span>|
              <div style={{ width: "10rem" }}>
                <Select
                  isClearable={false}
                  classNamePrefix="select"
                  options={selectBranch}
                />
              </div>
            </div>
          </div>
          <TabContent className="py-50" activeTab={activeTabSection2}>
            <TabPane tabId="5">
              <div className="table_main p-1 mt-2 pb-31">
                <ClientDataTable columns={columnsk} data={datak} />
                <div className="mt-4"></div>
              </div>
            </TabPane>
            <TabPane tabId="6">
              <div
                className="p-2"
                style={{ border: "1px solid #E0E0E0", borderRadius: "5px" }}
              >
                {items.map((item, index) => (
                  <div key={index} className="d-flex align-items-center mb-2">
                    <div className="me-2">
                      <label htmlFor="" className="value_font input_label">
                        Item Name*
                      </label>
                      <input
                        type="text"
                        className="form-control mt-1"
                        value={item.itemName}
                        onChange={(e) => handleItemChange(e, index, "itemName")}
                      />
                    </div>
                    <div className="me-2">
                      <label htmlFor="" className="value_font input_label">
                        Quantity*
                      </label>
                      <input
                        type="number"
                        className="form-control mt-1"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(e, index, "quantity")}
                      />
                    </div>
                    <div>
                      <label htmlFor="" className="value_font input_label">
                        Supplier*
                      </label>
                      <input
                        type="text"
                        className="form-control mt-1"
                        value={item.supplier}
                        onChange={(e) => handleItemChange(e, index, "supplier")}
                      />
                    </div>
                  </div>
                ))}

                <h5
                  style={{ color: "#2873B9", cursor: "pointer" }}
                  onClick={addMore}
                >
                  Add More
                </h5>

                <div className="mt-1 d-flex align-items-center justify-content-end">
                  <Button type="submit" className="default_btn me-2">
                    Add
                  </Button>
                  <Button type="submit" className="default_btn">
                    Add Picklist
                  </Button>
                </div>
              </div>
            </TabPane>
          </TabContent>
        </TabPane>
        <TabPane tabId="2">
          <div className="d-flex align-align-items-center justify-content-between mt-3 mb-3">
            <h5 className="head_title"> Inventory Items 90</h5>
            <div className="ms-2">
              <input
                placeholder="Search..."
                className="form-control"
                type="search"
              />
            </div>
          </div>
          <div className="table_main p-1 mt-2 pb-3">
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
                <ClientDataTable columns={columnsB} data={data} />
              )}
            </div>
          </div>
          <div className="mt-2">
            <div className="d-flex align-items-center justify-content-between sm_column">
              <div>
                <label htmlFor="" className="value_font input_label">
                  Picked By
                </label>
                <input
                  placeholder="Picked By"
                  type="text"
                  style={{ width: "20rem" }}
                  className="form-control mt-1"
                />
              </div>
              <div className="sm_mt-10">
                <label htmlFor="" className="value_font input_label">
                  Signature
                </label>
                <div style={{ width: "20rem" }}>
                  <Select
                    isClearable={false}
                    className="mt-1"
                    classNamePrefix="select"
                    options={selectSign}
                    value={selectedOption}
                    onChange={handleChange}
                  />
                </div>
                {selectedOption && selectedOption.value === "Signature" ? (
                  <div className="d-flex flex-column singDiv">
                    <label
                      htmlFor=""
                      className="value_font input_label mt-2 mb-1"
                    >
                      Sign Here
                    </label>
                    {/* Burada imza kısmı */}
                    <SignatureCanvas
                      penColor="black"
                      canvasProps={{
                        width: 270,
                        height: 65,
                        className: "sigCanvas",
                      }}
                    />
                  </div>
                ) : selectedOption && selectedOption.value === "Text" ? (
                  <div>
                    <input
                      placeholder="Name"
                      className="form-control mt-2"
                      type="text"
                    />
                  </div>
                ) : null}
                <hr style={{ width: "20rem" }} className="mt-1" />
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-end sm_column mb-3">
              <h5 style={{ fontSize: "20px" }} className="head_title">
                Total Item(s): {totalQuantity} : Total Weight : {totalWeightSum}
              </h5>
              <div className="sm_mt-10 d-flex align-items-center">
                <Button style={cancelBtn} className="ms-2">
                  Cancel
                </Button>
                <Button
                  onClick={(e) => {
                    moveToPickJobs(e, "Create Delivery Docket");
                    // successModal();
                  }}
                  className="default_btn border-0 ms-2"
                >
                  Create Delivery Docket
                </Button>
              </div>
            </div>
          </div>
        </TabPane>
        <TabPane tabId="3">
          <div className="d-flex align-align-items-center justify-content-between mt-3 mb-3">
            <h5 className="head_title">Delivery</h5>
            <div className="ms-2">
              <input
                placeholder="Search..."
                className="form-control"
                type="search"
              />
            </div>
          </div>
          <div className="table_main p-1 mt-2 pb-3">
            <ClientDataTable columns={columnsC} data={jobData} />
            <div className="mt-2">
              <div className="d-flex justify-content-between sm_column">
                <div>
                  <label htmlFor="" className="value_font input_label">
                    Image Upload
                  </label>
                  <div className="mt-2">
                    <input type="file" onChange={handleImageChange} />
                  </div>
                  {selectedImage && (
                    <div className="mt-2">
                      <img
                        src={selectedImage}
                        alt="Selected"
                        style={{
                          width: "80px",
                          height: "80px",
                          borderRadius: "8px",
                        }}
                      />
                    </div>
                  )}
                </div>
                <div className="sm_mt-10">
                  <label htmlFor="" className="value_font input_label">
                    Client Name
                  </label>
                  <input
                    type="text"
                    className="form-control mt-1"
                    placeholder="Client Name"
                  />
                  <label htmlFor="" className="value_font input_label mt-2">
                    Client Signature
                  </label>
                  <Select
                    isClearable={false}
                    className="mt-1"
                    classNamePrefix="select"
                    options={selectSign}
                  />

                  <label htmlFor="" className="value_font input_label mt-2">
                    Sign Here
                  </label>
                  <hr className="mt-1" />
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-end sm_column">
                <h5 style={{ fontSize: "20px" }} className="head_title">
                  Total Item(s): 100 Total Weight : 1800{" "}
                </h5>
                <div className="sm_mt-10 d-flex align-items-center">
                  <Button
                    style={{
                      background: "white",
                      color: "#2873B9",
                      border: "0px",
                    }}
                    className="ms-2"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={(e) => {
                      confirmDelivery(e, "Delivery Succesfully");
                    }}
                    className="default_btn border-0 ms-2"
                  >
                    Confirm Delivery
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </TabPane>
        <TabPane tabId="4">
          <div className="d-flex align-align-items-center justify-content-between mt-3 mb-3">
            <h5 className="head_title">Return Item</h5>
            <div className="ms-2">
              <input
                placeholder="Search..."
                className="form-control"
                type="search"
              />
            </div>
          </div>
          <div className="table_main p-1 mt-2 pb-3">
            <ClientDataTable columns={columnsC} data={jobData} />
            <div className="mt-2">
              <label htmlFor="" className="value_font input_label">
                Received By
              </label>
              <input
                style={{ width: "20rem" }}
                className="form-control mt-1"
                type="text"
              />
              <label htmlFor="" className="value_font input_label mt-2">
                Client Signature
              </label>
              <div style={{ width: "20rem" }}>
                <Select
                  isClearable={false}
                  className="mt-1"
                  classNamePrefix="select"
                  options={selectSign}
                />
              </div>
              <label htmlFor="" className="value_font input_label mt-1">
                Sign Here ,
              </label>
              <hr style={{ width: "20rem" }} />
            </div>
            <div className="d-flex align-items-center justify-content-end sm_column">
              <h5 style={{ fontSize: "20px" }} className="head_title">
                Total Item(s): 100 Total Weight : 1800{" "}
              </h5>
              <div className="sm_mt-10 d-flex align-items-center">
                <Button
                  style={{
                    background: "white",
                    color: "#2873B9",
                    border: "0px",
                  }}
                  className="ms-2"
                >
                  Cancel
                </Button>
                <Button
                  onClick={(e) => {
                    moveToPickJobs(e, "Item(s) successfully Returned");
                    // successModal();
                  }}
                  className="default_btn border-0 ms-2"
                >
                  Complete Return
                </Button>
              </div>
            </div>
          </div>
        </TabPane>
      </TabContent>

      {/* secound tab start */}
    </Fragment>
  );
};

export default JobAdd;
