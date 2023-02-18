export const nameValidator = (name) => {
  return name.length > 0 ? "" : "Please enter a name";
};

export const descriptionValidator = (description) => {
  return description.length > 0 ? "" : "Please enter a description";
};

export const categoryValidator = (category) => {
  return category.length > 0 ? "" : "Please enter a category";
};

export const priceValidator = (price) => {
  return price.length > 0 ? "" : "Please enter an amount";
};
