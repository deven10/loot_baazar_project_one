import React, { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "./Profile.css";

export const Profile = () => {
  const [showProfile, setShowProfile] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("user ", user);

  const dummyAddress = {
    address1: "A/5 Keshav Kunj Building",
    address2: "Behind BMC School",
    street: "Dattapada Road, Borivali East",
    state: "Maharashtra",
    pincode: "400066",
  };

  return (
    <div className="profile container">
      <h2>Account</h2>
      <div className="tabs">
        <div className="tabs-heading">
          <p onClick={() => setShowProfile(true)}>Profile Details</p>
          <p onClick={() => setShowProfile(false)}>Manage Address</p>
        </div>
        <div className="tabs-content">
          {showProfile ? (
            <div className="myprofile">
              <div className="tab-div">
                <p>
                  <span>Firstname:</span> {user.firstName}
                </p>
              </div>
              <div className="tab-div">
                <p>
                  <span>Lastname:</span> {user.lastName}
                </p>
              </div>
              <div className="tab-div">
                <p>
                  <span>Email:</span> {user.email}
                </p>
              </div>
            </div>
          ) : (
            <div className="addresses">
              <p>Addresses added</p>
              <div className="added-addresses mb-3">
                <p>Username: {`${user.firstName} ${user.lastName}`}</p>
                <p>Address line 1: {dummyAddress.address1}</p>
                <p>Address line 2: {dummyAddress.address2}</p>
                <p>Street: {dummyAddress.street}</p>
                <p>
                  State & Pincode: {dummyAddress.state} - {dummyAddress.pincode}
                </p>
              </div>
              <button className="add-address">Add Address</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
