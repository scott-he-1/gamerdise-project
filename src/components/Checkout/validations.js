export const cardHolderNameValidation = (name) => {
  if (name.length <= 0) {
    return "Please enter a name";
  } else {
    return /^[a-zA-Z]*( ?[a-zA-Z])+$/g.test(name)
      ? ""
      : "Please enter a valid name";
  }
};

export const cardNumberValidation = (cardNumber) => {
  const regexPattern = {
    MASTERCARD: /^5[1-5][0-9]{1,}|^2[2-7][0-9]{1,}$/,
    VISA: /^4[0-9]{2,}$/,
    AMERICAN_EXPRESS: /^3[47][0-9]{5,}$/,
    DISCOVER: /^6(?:011|5[0-9]{2})[0-9]{3,}$/,
  };
  for (const card in regexPattern) {
    if (cardNumber.replace(/[^\d]/g, "").match(regexPattern[card])) {
      if (cardNumber) {
        return cardNumber &&
          /^[1-6]{1}[0-9]{14,15}$/i.test(
            cardNumber.replace(/[^\d]/g, "").trim()
          )
          ? ""
          : "Please enter a valid card";
      }
    }
  }
  return "Enter a valid card";
};

export const cardExpirationValidation = (month, year) => {
  let validMonths = [];
  let validYears = [];
  for (let i = new Date().getMonth() + 1; i < 13; i++) {
    validMonths.push(`${`${i}`.length === 1 ? `0${i}` : i}`);
  }
  for (let i = 0; i < 10; i++) {
    validYears.push(`${new Date().getFullYear() + i}`);
  }
  if (validMonths.includes(month) && validYears[0] === year) {
    return "";
  } else if (validYears.slice(1).includes(year)) {
    return "";
  } else {
    return "Not a valid date";
  }
};

export const cvvValidation = (cvv) => {
  let cvvTester = /\d{3}/g;
  if (cvvTester.test(cvv)) {
    return "";
  } else {
    return "Please enter a valid CVV";
  }
};

export const textValidation = (input) => {
  return input.length > 0 ? "" : "Required";
};

export const postcodeValidation = (postcode) => {
  return /^[0-9]{5}$/g.test(postcode) ? "" : "Postcode not valid";
};
