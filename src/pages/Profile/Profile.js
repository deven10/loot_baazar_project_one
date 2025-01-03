import React, { useState, useContext } from "react";
import { v4 as uuid } from "uuid";
import { useLocation } from "react-router-dom";

import { ReactToastify } from "../../utility/ReactToastify";
import { ContextAddress } from "../../context/AddressContext";
import { EditAddressModal } from "./EditAddressModal";

import "./Profile.css";
import { useEffect } from "react";

export const Profile = () => {
  const location = useLocation();
  const [showProfile, setShowProfile] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));
  const { addresses, setAddressess } = useContext(ContextAddress);

  useEffect(() => {
    if (location?.state?.address) {
      setShowProfile(false);
    } else {
      setShowProfile(true);
    }
  }, [location]);

  // new address state
  const [newAddress, setNewAddress] = useState({
    id: "",
    addressOne: "",
    addressTwo: "",
    street: "",
    state: "",
    pincode: "",
  });

  // helper function for deleting address
  const removeAddress = (addressID) => {
    ReactToastify("Address Removed", "info");
    return setAddressess(addresses.filter(({ id }) => id !== addressID));
  };

  // helper function for maintaining the states when user enter texts in form
  const handleChange = (e) => {
    const { id, value } = e.target;
    setNewAddress({
      ...newAddress,
      [id]: value,
      id: uuid(),
    });
  };

  // function for adding new address
  const addNewAddress = () => {
    if (
      newAddress.addressOne === "" ||
      newAddress.addressTwo === "" ||
      newAddress.street === "" ||
      newAddress.state === "" ||
      newAddress.pincode === ""
    ) {
      ReactToastify("Please fill all address fields", "error");
    } else {
      setAddressess([...addresses, newAddress]);
      handleClear();
      ReactToastify("Address added successfully", "success");
    }
  };

  // helper function for filling dummy address
  const dummyAddress = () =>
    setNewAddress({
      id: uuid(),
      addressOne: "72, A-Wing, Sky City",
      addressTwo: "Oberoi Realty, Opposite to China Town",
      street: "Zudio Street, California, USA",
      state: "Alaska",
      pincode: "10155",
    });

  // helper function for clearing the form
  const handleClear = () =>
    setNewAddress({
      addressOne: "",
      addressTwo: "",
      street: "",
      state: "",
      pincode: "",
    });

  return (
    <div className="profile container">
      <h2 className="page-heading">Account</h2>
      <div className="tabs custom-block block-border-radius">
        <div className="tabs-heading">
          <p
            onClick={() => setShowProfile(true)}
            style={{ fontWeight: showProfile ? "600" : "400" }}
            className="border-right"
          >
            Profile Details
          </p>
          <p
            onClick={() => setShowProfile(false)}
            style={{ fontWeight: showProfile ? "400" : "600" }}
          >
            Manage Address
          </p>
        </div>
        <div className="tabs-content">
          {showProfile ? (
            <div className="myprofile">
              <div className="tab-div">
                <p>
                  <span>First Name:</span> {user?.firstName}
                </p>
              </div>
              <div className="tab-div">
                <p>
                  <span>Last Name:</span> {user?.lastName}
                </p>
              </div>
              <div className="tab-div">
                <p>
                  <span>Email:</span> {user?.email}
                </p>
              </div>
            </div>
          ) : (
            <div className="addresses">
              <p>Addresses added</p>
              {addresses.map((address) => {
                return (
                  <div key={address.id} className="mb-3">
                    <div className="added-addresses mb-2">
                      <p>{`${user?.firstName} ${user?.lastName}`}</p>
                      <p>{address?.addressOne}</p>
                      <p>{address?.addressTwo}</p>
                      <p>{address?.street}</p>
                      <p>
                        {address?.state} - {address?.pincode}
                      </p>
                    </div>
                    <div className="address-buttons mb-2">
                      <EditAddressModal addressData={address} />
                      <button
                        className="remove-address"
                        onClick={() => removeAddress(address.id)}
                      >
                        Remove Address
                      </button>
                    </div>
                    <hr />
                  </div>
                );
              })}
              <div>
                <button
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  className="add-new-address"
                >
                  Add New Address
                </button>
                <div
                  className="modal fade"
                  id="exampleModal"
                  tabIndex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">
                          Enter new Address information
                        </h1>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        <div className="address-form">
                          <div className="profile-form-group">
                            <p className="form-label">Address line 1:</p>
                            <input
                              type="text"
                              required
                              value={newAddress.addressOne}
                              onChange={(e) => handleChange(e)}
                              id="addressOne"
                            />
                          </div>
                          <div className="profile-form-group">
                            <p className="form-label">Address line 2:</p>
                            <input
                              type="text"
                              required
                              value={newAddress.addressTwo}
                              onChange={(e) => handleChange(e)}
                              id="addressTwo"
                            />
                          </div>
                          <div className="profile-form-group">
                            <p className="form-label">Street:</p>
                            <input
                              type="text"
                              required
                              value={newAddress.street}
                              onChange={(e) => handleChange(e)}
                              id="street"
                            />
                          </div>
                          <div className="profile-form-group">
                            <p className="form-label">State:</p>
                            <input
                              type="text"
                              required
                              value={newAddress.state}
                              onChange={(e) => handleChange(e)}
                              id="state"
                            />
                          </div>
                          <div className="profile-form-group">
                            <p className="form-label">Pincode:</p>
                            <input
                              type="number"
                              required
                              value={newAddress.pincode}
                              onChange={(e) => handleChange(e)}
                              id="pincode"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="edit-address"
                          onClick={dummyAddress}
                        >
                          Dummy Address
                        </button>
                        <button
                          type="button"
                          data-bs-dismiss="modal"
                          className="edit-address"
                          onClick={addNewAddress}
                        >
                          Save new Address
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
