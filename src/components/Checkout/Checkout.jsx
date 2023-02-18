import React, { useState } from "react";
import { useGamerdise } from "../../providers/GamerdiseProvider";
import { CheckoutItem } from "./CheckoutItem";
import "./Checkout.css";
import { useNavigate } from "react-router-dom";
import { CardInfoInputBase } from "./CardInfoInputBase";
import {
  cardExpirationValidation,
  cardHolderNameValidation,
  cardNumberValidation,
  cvvValidation,
  postcodeValidation,
  textValidation,
} from "./validations";
import { AddressInfoInputBase } from "./AddressInfoInputBase";

export const Checkout = () => {
  const [userCardInfo, setUserCardInfo] = useState({
    holderName: "",
    cardNumber: "",
    expirationDate: {
      expiryMonth: "01",
      expiryYear: String(new Date().getFullYear()),
    },
    cvv: "",
  });
  const [userAddressInfo, setUserAddressInfo] = useState({
    name: "",
    surname: "",
    streetAddress: "",
    city: "",
    postcode: "",
    country: "United States",
  });
  const [errorM, setErrorM] = useState({});

  const {
    marketItems,
    userCartItems,
    currentAccountID,
    removeCartItem,
    purchaseItem,
  } = useGamerdise();

  const navigate = useNavigate();

  const specificUserCartItems = userCartItems.filter(
    (cartItem) => cartItem.inCartForUser === currentAccountID
  );

  const rawUserCartItems = marketItems.filter((item) =>
    specificUserCartItems.map((item) => item.marketplaceID).includes(item.id)
  );

  const rawUserCartItemsTotal = rawUserCartItems
    .map((item) => item.price)
    .reduce((a, b) => a + b, 0);

  const shippingAndHandlingAmount =
    rawUserCartItemsTotal <= 100 && rawUserCartItemsTotal !== 0 ? 19.99 : 0;
  const taxAmount = rawUserCartItemsTotal * 0.08875;
  const grandTotalAmount =
    rawUserCartItemsTotal + taxAmount + shippingAndHandlingAmount;

  const updateUserCartInfoInputs = ({ target: { name, value } }) => {
    if (name === "cardNumber") {
      let mask = value.split(" ").join("");
      if (mask.length) {
        mask = mask.match(new RegExp("[0-9]{1,4}", "g")).join(" ");
      }
      setUserCardInfo((prevState) => ({ ...prevState, [`${name}`]: mask }));
    } else if (name === "cvv") {
      let mask = value.split(" ").join("");
      if (mask.length) {
        mask = mask.match(new RegExp("[0-9]{1,3}", "g")).join(" ");
      }
      setUserCardInfo((prevState) => ({ ...prevState, [`${name}`]: mask }));
    } else if (name === "expiryMonth" || name === "expiryYear") {
      setUserCardInfo((prevState) => ({
        ...prevState,
        expirationDate: { ...prevState.expirationDate, [`${name}`]: value },
      }));
    } else {
      setUserCardInfo((prevState) => ({ ...prevState, [`${name}`]: value }));
    }
  };

  const updateAddressInfoInputs = ({ target: { name, value } }) => {
    setUserAddressInfo((prevState) => ({ ...prevState, [`${name}`]: value }));
  };

  const onPurchaseItem = (e) => {
    e.preventDefault();
    const {
      holderName,
      cardNumber,
      expirationDate: { expiryMonth, expiryYear },
      cvv,
    } = userCardInfo;
    const { name, surname, streetAddress, city, postcode, country } =
      userAddressInfo;

    let allClear = true;
    Object.keys(userCardInfo).forEach((key) => {
      let errorText;
      switch (key) {
        case "holderName":
          errorText = cardHolderNameValidation(holderName);
          setErrorM((prevState) => ({
            ...prevState,
            [`${key}Error`]: errorText,
          }));
          if (errorText !== "") {
            allClear = false;
          }
          break;
        case "cardNumber":
          errorText = cardNumberValidation(cardNumber);
          setErrorM((prevState) => ({
            ...prevState,
            [`${key}Error`]: errorText,
          }));
          if (errorText !== "") {
            allClear = false;
          }
          break;
        case "expirationDate":
          errorText = cardExpirationValidation(expiryMonth, expiryYear);
          setErrorM((prevState) => ({
            ...prevState,
            [`${key}Error`]: errorText,
          }));
          if (errorText !== "") {
            allClear = false;
          }
          break;
        case "cvv":
          errorText = cvvValidation(cvv);
          setErrorM((prevState) => ({
            ...prevState,
            [`${key}Error`]: errorText,
          }));
          if (errorText !== "") {
            allClear = false;
          }
        default:
          break;
      }
    });
    Object.keys(userAddressInfo).forEach((key) => {
      let errorText;
      switch (key) {
        case "name":
          errorText = textValidation(name);
          setErrorM((prevState) => ({
            ...prevState,
            [`${key}Error`]: errorText,
          }));
          if (errorText !== "") {
            allClear = false;
          }
          break;
        case "surname":
          errorText = textValidation(surname);
          setErrorM((prevState) => ({
            ...prevState,
            [`${key}Error`]: errorText,
          }));
          if (errorText !== "") {
            allClear = false;
          }
          break;
        case "streetAddress":
          errorText = textValidation(streetAddress);
          setErrorM((prevState) => ({
            ...prevState,
            [`${key}Error`]: errorText,
          }));
          if (errorText !== "") {
            allClear = false;
          }
          break;
        case "city":
          errorText = textValidation(city);
          setErrorM((prevState) => ({
            ...prevState,
            [`${key}Error`]: errorText,
          }));
          if (errorText !== "") {
            allClear = false;
          }
          break;
        case "postcode":
          errorText = postcodeValidation(postcode);
          setErrorM((prevState) => ({
            ...prevState,
            [`${key}Error`]: errorText,
          }));
          if (errorText !== "") {
            allClear = false;
          }
          break;
        default:
          break;
      }
    });
    if (allClear) {
      for (let item of rawUserCartItems) {
        purchaseItem(item.id, item.name);
      }
      navigate("/confirmationPage");
    }
  };

  const summaryFields = [
    {
      label: "Subtotal:",
      name: "subtotalAmount",
      value: rawUserCartItemsTotal.toFixed(2),
    },
    {
      label: "Shipping and Handling:",
      name: "shippingAndHandlingAmount",
      value: shippingAndHandlingAmount.toFixed(2),
    },
    { label: "Tax:", name: "taxAmount", value: taxAmount.toFixed(2) },
    {
      label: "Grand Total:",
      name: "grandTotalAmount",
      value: grandTotalAmount.toFixed(2),
    },
  ];

  const addressInfoFields = [
    { label: "Name", name: "name", type: "text" },
    { label: "Surname", name: "surname", type: "text" },
    { label: "Street Address", name: "streetAddress", type: "text" },
    { label: "City", name: "city", type: "text" },
    { label: "Postcode/Zipcode", name: "postcode", type: "text" },
    {
      label: "Country",
      name: "country",
      type: "select",
      selectOptions: ["United States", "Canada", "Mexico", "United Kingdom"],
    },
  ];

  const cardInfoFields = [
    { label: "Holder Name", name: "holderName", type: "text" },
    { label: "Card Number", name: "cardNumber", type: "text", maxLength: 19 },
    {
      label: "Expiration Date",
      name: "expirationDate",
      type: "multiSelect",
      selects: [
        {
          label: "Month",
          name: "expiryMonth",
          type: "select",
          selectOptions: [...Array(12)].map((item, index) =>
            `${index + 1}`.length <= 1 ? `0${index + 1}` : index + 1
          ),
        },
        {
          label: "Year",
          name: "expiryYear",
          type: "select",
          selectOptions: [...Array(10)].map(
            (item, index) => new Date().getFullYear() + index
          ),
        },
      ],
    },
    { label: "CVV", name: "cvv", type: "text", maxLength: 3 },
  ];

  return (
    <div className="container checkoutPage">
      <div className="checkoutMainDisplay">
        <div className="userInfoSide">
          <div className="yourItemsSection">
            <h2>Your Items</h2>
            <div className="checkoutUserItems">
              {specificUserCartItems.length > 0 ? (
                rawUserCartItems.map((cartItem) => {
                  const userCartItemID = specificUserCartItems.find(
                    (item) =>
                      item.inCartForUser === currentAccountID &&
                      item.marketplaceID === cartItem.id
                  ).id;
                  return (
                    <CheckoutItem
                      key={cartItem.id}
                      name={cartItem.name}
                      image={cartItem.image}
                      category={cartItem.category}
                      id={userCartItemID}
                      price={cartItem.price}
                      removeCartItem={removeCartItem}
                    />
                  );
                })
              ) : (
                <div>No items in cart</div>
              )}
            </div>
          </div>
          <div className="addressSection">
            <h2 className="addressHeader">Billing Address</h2>
            <div className="addressInputFields">
              {addressInfoFields.map((field) => (
                <AddressInfoInputBase
                  key={field.name}
                  label={field.label}
                  name={field.name}
                  type={field.type}
                  selectOptions={
                    field.selectOptions ? field.selectOptions : null
                  }
                  value={
                    userAddressInfo[field.name] && userAddressInfo[field.name]
                  }
                  updateAddressInfoInputs={updateAddressInfoInputs}
                  errorM={
                    errorM[`${field.name}Error`] &&
                    errorM[`${field.name}Error`].length > 0
                      ? errorM[`${field.name}Error`]
                      : null
                  }
                />
              ))}
            </div>
          </div>
        </div>
        <div className="summarySectionSide">
          <div className="priceSummary">
            {summaryFields.map((field) => (
              <div
                key={field.name}
                className="priceSummaryField"
                name={field.name}
              >
                <div className={`pusher ${field.name}`}>{field.label}</div>
                <div className={field.name}>${field.value}</div>
              </div>
            ))}
          </div>
          <form className="userCardInfo" onSubmit={onPurchaseItem}>
            {cardInfoFields.map((field) => (
              <CardInfoInputBase
                key={field.name}
                label={field.label}
                name={field.name}
                type={field.type}
                maxLength={field.maxLength ? field.maxLength : null}
                value={userCardInfo[field.name] && userCardInfo[field.name]}
                selects={field.selects ? field.selects : null}
                updateUserCartInfoInputs={updateUserCartInfoInputs}
                errorM={
                  errorM[`${field.name}Error`] &&
                  errorM[`${field.name}Error`].length > 0
                    ? errorM[`${field.name}Error`]
                    : null
                }
              />
            ))}
            <button
              className="purchaseButton"
              disabled={specificUserCartItems.length > 0 ? false : true}
            >
              Pay ${grandTotalAmount.toFixed(2)}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
