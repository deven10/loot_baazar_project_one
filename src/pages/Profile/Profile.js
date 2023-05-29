import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "./Profile.css";

export const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("user ", user);
  return (
    <div className="profile container">
      <h2>Account</h2>
      <div className="tabs">
        <Tabs>
          <TabList>
            <Tab>User Profile</Tab>
            <Tab>Manage Address</Tab>
          </TabList>

          <TabPanel className="tabPanel">
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
          </TabPanel>
          <TabPanel>
            <h2>Any content 2</h2>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};
