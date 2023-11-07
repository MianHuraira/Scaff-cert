/* eslint-disable no-unused-vars */
/* eslint-disable import/no-anonymous-default-export */
// ** Icons Import
import inspection from "../../Admin/assests/side_icon/inspection_forms.svg";
import Logout from "../../Admin/assests/side_icon/logout.svg";
import subscriptions from "../../Admin/assests/side_icon/subscriptions_icon.svg";
import Payements from "../../Admin/assests/side_icon/payments.svg";
import Tutorials from "../../Admin/assests/side_icon/tutorials.svg";
import client from "../../Admin/assests/side_icon/client_icon.svg";
import job from "../../Admin/assests/side_icon/jobs_icon.svg";
import safety from "../../Admin/assests/side_icon/safety_equipments.svg";
import branches from "../../Admin/assests/side_icon/branches.png";
import employess from "../../Admin/assests/side_icon/employess.png";
import inventory_order from "../../Admin/assests/side_icon/inventory_order.png";
import reps from "../../Admin/assests/side_icon/reps.png";
import groups from "../../Admin/assests/side_icon/groups.png";
import jsa_activity from "../../Admin/assests/side_icon/jsa_activity.png";
import jsa_hazards from "../../Admin/assests/side_icon/jsa_hazards.svg";
import jsa_risk_control from "../../Admin/assests/side_icon/jsa_risk_control.svg";

const iconsize = {
  width: "20px",
  height: "20px",
  marginRight: "1.1rem",
};

export default [
  {
    title: "Clients",
    icon: <img style={iconsize} src={client} alt="" />,
    navLink: "/Clients",
  },
  {
    id: "Branch",
    title: "Branch",
    children: [
      {
        id: "branches",
        title: "Branches",
        icon: <img style={iconsize} src={branches} alt="" />,
        navLink: "/Branches",
      },
      {
        id: "InventoryOrder",
        title: "Inventory Sort Order",
        icon: <img style={iconsize} src={inventory_order} alt="" />,
        navLink: "/InventoryOrder",
      },
    ],
  },
  {
    title: "Job",
    icon: <img style={iconsize} src={job} alt="" />,
    navLink: "/Job",
  },
  {
    id: "employee",
    title: "Employee",
    children: [
      {
        id: "employees",
        title: "Employees",
        icon: <img style={iconsize} src={employess} alt="" />,

        navLink: "/Employees",
      },
      {
        id: "reps",
        title: "Reps",
        icon: <img style={iconsize} src={reps} alt="" />,
        navLink: "/Reps",
      },
      {
        id: "groups",
        title: "Groups",
        icon: <img style={iconsize} src={groups} alt="" />,
        navLink: "/Groups",
      },
    ],
  },
  {
    title: "Subscriptions",
    icon: <img style={iconsize} src={subscriptions} alt="" />,
    navLink: "/Subscriptions",
  },
  {
    title: "Safety Equipments",
    icon: <img style={iconsize} src={safety} alt="" />,
    navLink: "/Safety_equipments",
  },

  {
    id: "forms",
    title: "Forms",
    children: [
      {
        id: "jsaActivity",
        title: "JSA Activity",
        icon: <img style={iconsize} src={jsa_activity} alt="" />,
        navLink: "/Jsa_activity",
      },
      {
        id: "Jsa_hazard",
        title: "JSA Hazards",
        icon: <img style={iconsize} src={jsa_hazards} alt="" />,
        navLink: "/Jsa_hazard",
      },
      {
        id: "jsa_risk",
        title: "JSA Risk Control",
        icon: <img style={iconsize} src={jsa_risk_control} alt="" />,
        navLink: "/Jsa_risk",
      },
      {
        id: "delivery_forms",
        title: "Delivery Forms",
        icon: <img style={iconsize} src={inspection} alt="" />,
        navLink: "/Delivery_form",
      },
      {
        id: "return_forms",
        title: "Return Forms",
        icon: <img style={iconsize} src={inspection} alt="" />,
        navLink: "/Return_form",
      },
      {
        id: "inspection_forms",
        title: "Inspection Forms",
        icon: <img style={iconsize} src={inspection} alt="" />,
        navLink: "/InspectionForm",
      },
    ],
  },
  {
    title: "Payements",
    icon: <img style={iconsize} src={Payements} alt="" />,
    navLink: "/Payements",
  },

  {
    title: "Tutorials",
    icon: <img style={iconsize} src={Tutorials} alt="" />,
    navLink: "/Tutorials",
  },
  {
    title: "LogOut",
    icon: <img style={iconsize} src={Logout} alt="" />,
    navLink: "/Logout",
  },
];
