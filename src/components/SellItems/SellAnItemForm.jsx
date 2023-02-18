import React, { useState } from "react";
import { SellItemInputBase } from "./SellItemInputBase";
import "./SellAnItemForm.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { addItemToMarket } from "../../fetch/addItemToMarket";
import { useGamerdise } from "../../providers/GamerdiseProvider";

const INIT_SELL_ITEM_INPUTS = {
  name: "",
  description: "",
  category: "accessory",
  price: "",
  image: "",
};

export const SellAnItemForm = () => {
  const [formInputs, setFormInputs] = useState(INIT_SELL_ITEM_INPUTS);
  const [error, setError] = useState({});
  const { reFetchMarketItems } = useGamerdise();

  const updateInputFields = ({ target: { name, value } }) => {
    setFormInputs((prevState) => ({ ...prevState, [`${name}`]: value }));
  };

  const categoriesList = [
    "accessory",
    "apparel",
    "food",
    "game",
    "prop",
    "electronic",
  ];

  const submitItem = (e) => {
    e.preventDefault();
    let allClear = true;
    const { name, description, category, price, image } = formInputs;
    Object.keys(formInputs).forEach((input) => {
      let errorText;
      switch (input) {
        case "name":
          errorText = name.length <= 0 ? "Please add a name" : "";
          setError((prevState) => ({
            ...prevState,
            [`${input}Error`]: errorText,
          }));
          if (errorText !== "") {
            allClear = false;
          }
          break;
        case "description":
          errorText = description.length <= 0 ? "Please add a description" : "";
          setError((prevState) => ({
            ...prevState,
            [`${input}Error`]: errorText,
          }));
          if (errorText !== "") {
            allClear = false;
          }
          break;
        case "price":
          if (String(price).length <= 0) {
            errorText = "Please enter a value";
          } else if (!String(price).match(/^\d{1,}.?\d{1,2}$/g)) {
            errorText = "Please enter a valid value";
          } else {
            errorText = "";
          }
          setError((prevState) => ({
            ...prevState,
            [`${input}Error`]: errorText,
          }));
          if (errorText !== "") {
            allClear = false;
          }
          break;
        case "image":
          errorText = image.length <= 0 ? "Please enter an image address" : "";
          setError((prevState) => ({
            ...prevState,
            [`${input}Error`]: errorText,
          }));
          if (errorText !== "") {
            allClear = false;
          }
        default:
          break;
      }
    });

    if (allClear) {
      let currentAccount = JSON.parse(localStorage.getItem("loggedInAs"));
      let item = {
        name: name,
        description: description,
        image: image,
        category: category,
        price: Number(price),
        postedBy: currentAccount.username,
        sellerID: currentAccount.id,
      };
      if (price <= 0) {
        const response = confirm(
          "The price of the item you are going to sell is 0; meaning its FREE. Are you sure?"
        );
        if (response) {
          addItemToMarket(item)
            .then(() => {
              setFormInputs(INIT_SELL_ITEM_INPUTS);
              reFetchMarketItems();
            })
            .catch(() =>
              alert("Something went wrong with submitting your item")
            );
        } else {
          return;
        }
      } else {
        addItemToMarket(item)
          .then(() => {
            setFormInputs(INIT_SELL_ITEM_INPUTS);
            reFetchMarketItems();
          })
          .catch(() => alert("Something went wrong with submitting your item"));
      }
    }
  };

  const formFields = [
    { label: "Name Of Item", name: "name", type: "text" },
    {
      label: "Description",
      name: "description",
      type: "textArea",
    },
    {
      label: "Category",
      name: "category",
      type: "select",
      selectOptions: categoriesList,
    },
    {
      label: "Price",
      name: "price",
      type: "text",
      specialSymbol: <FontAwesomeIcon icon={faDollarSign} />,
    },
    { label: "Image Address", name: "image", type: "text" },
  ];

  return (
    <div className="sellYourItemFormContainer">
      <div className="header">Sell An Item Form</div>
      <form action="" className="sellYourItemForm" onSubmit={submitItem}>
        {formFields.map((field) => (
          <SellItemInputBase
            key={field.name}
            name={field.name}
            label={field.label}
            type={field.type}
            value={formInputs[field.name]}
            selectOptions={field.selectOptions && field.selectOptions}
            specialSymbol={field.specialSymbol ? field.specialSymbol : null}
            updateInputFields={updateInputFields}
            errorM={
              error[`${field.name}Error`] &&
              error[`${field.name}Error`].length > 0
                ? error[`${field.name}Error`]
                : null
            }
          />
        ))}
        <button className="sellItemButton">Sell Your Item!</button>
      </form>
    </div>
  );
};
