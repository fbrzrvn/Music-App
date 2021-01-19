import { render as renderForm } from "./SearchForm.js";
import { getData } from './api.js';
import "../css/style.css";

renderForm();


const data = {
  type: "song",
  country: "",
  explicit: "",
  limit: "5",
  searchQuery: "bob marley",
};

getData(data);