import React, { useState, useContext, useEffect } from "react";
import { v4 as uuid } from "uuid";

import { ContextAddress } from "../../context/AddressContext";
import { ReactToastify } from "../../utility/ReactToastify";

export const EditAddressModal = ({ addressData }) => {
  const { addresses, setAddressess } = useContext(ContextAddress);

  // state for updating an existing address
  const [editAddress, setEditAddress] = useState({
    id: "",
    addressOne: "",
    addressTwo: "",
    street: "",
    state: "",
    pincode: "",
  });

  const updateAddressState = (e) => {
    const { id, value } = e.target;
    setEditAddress({
      ...editAddress,
      [id]: value,
    });
  };

  // helper function for updating a address
  const updateSingleAddress = (addressData) => {
    ReactToastify("Address Updated", "success");
    setAddressess(
      addresses.map((address) =>
        address.id === addressData.id ? addressData : address
      )
    );
  };

  return (
    <div>
      <button
        type="button"
        data-bs-toggle="modal"
        data-bs-target={`#EditAddress-${addressData.id}`}
        className="edit-address"
        onClick={() => {
          setEditAddress(() => ({
            id: addressData.id,
            addressOne: addressData.addressOne,
            addressTwo: addressData.addressTwo,
            street: addressData.street,
            state: addressData.state,
            pincode: addressData.pincode,
          }));
        }}
      >
        Edit Address
      </button>
      <div
        className="modal fade"
        id={`EditAddress-${addressData.id}`}
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Update Address
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
                    value={editAddress?.addressOne}
                    onChange={(e) => updateAddressState(e)}
                    id="addressOne"
                  />
                </div>
                <div className="profile-form-group">
                  <p className="form-label">Address line 2:</p>
                  <input
                    type="text"
                    required
                    value={editAddress?.addressTwo}
                    onChange={(e) => updateAddressState(e)}
                    id="addressTwo"
                  />
                </div>
                <div className="profile-form-group">
                  <p className="form-label">Street:</p>
                  <input
                    type="text"
                    required
                    value={editAddress?.street}
                    onChange={(e) => updateAddressState(e)}
                    id="street"
                  />
                </div>
                <div className="profile-form-group">
                  <p className="form-label">State:</p>
                  <input
                    type="text"
                    required
                    value={editAddress?.state}
                    onChange={(e) => updateAddressState(e)}
                    id="state"
                  />
                </div>
                <div className="profile-form-group">
                  <p className="form-label">Pincode:</p>
                  <input
                    type="number"
                    required
                    value={editAddress?.pincode}
                    onChange={(e) => updateAddressState(e)}
                    id="pincode"
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                data-bs-dismiss="modal"
                className="edit-address"
                onClick={() => updateSingleAddress(editAddress)}
              >
                Save new Address
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
