import React, { useState } from "react";
import "./Profile.css";

export const Profile = () => {
  const [showProfile, setShowProfile] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));

  const [addresses, setAddressess] = useState([
    {
      address1: "A/5 Keshav Kunj Building",
      address2: "Behind BMC School",
      street: "Dattapada Road, Borivali East",
      state: "Maharashtra",
      pincode: "400066",
    },
    {
      address1: "Sky City Oberoi",
      address2: "Kanakia Aroha",
      street: "Dattapada Road, Borivali East",
      state: "Maharashtra",
      pincode: "400066",
    },
  ]);

  const AddAddressModal = () => {
    return (
      <>
        <button
          type="button"
          data-toggle="modal"
          data-target="#exampleModal"
          className="add-new-address"
          onClick={() => console.log("hi")}
        >
          Add New Address
        </button>

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Enter new Address information
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form action="" className="address-form">
                  <div className="profile-form-group">
                    <p className="form-label">Address line 1:</p>
                    <input type="text" />
                  </div>
                  <div className="profile-form-group">
                    <p className="form-label">Address line 2:</p>
                    <input type="text" />
                  </div>
                  <div className="profile-form-group">
                    <p className="form-label">Street:</p>
                    <input type="text" />
                  </div>
                  <div className="profile-form-group">
                    <p className="form-label">State:</p>
                    <input type="text" />
                  </div>
                  <div className="profile-form-group">
                    <p className="form-label">Pincode:</p>
                    <input type="number" />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  data-dismiss="modal"
                  type="button"
                  className="edit-address"
                >
                  Save new Address
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="profile container">
      <h2>Account</h2>
      <div className="tabs">
        <div className="tabs-heading">
          <p
            onClick={() => setShowProfile(true)}
            style={{ fontWeight: showProfile ? "600" : "" }}
          >
            Profile Details
          </p>
          <p
            onClick={() => setShowProfile(false)}
            style={{ fontWeight: showProfile ? "" : "600" }}
          >
            Manage Address
          </p>
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
              {addresses.map((address, index) => (
                <div key={index}>
                  <div className="added-addresses mb-3">
                    <p>{`${user.firstName} ${user.lastName}`}</p>
                    <p>{address.address1}</p>
                    <p>{address.address2}</p>
                    <p>{address.street}</p>
                    <p>
                      {address.state} - {address.pincode}
                    </p>
                  </div>
                  <button className="edit-address">Edit Address</button>
                  <button className="remove-address">Remove Address</button>
                  <hr />
                </div>
              ))}
              <AddAddressModal />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
