const cities = ["Dhaka", "Chittagong", "Barisal", "Rajshahi"];
let trendingPlace = [
  {
    from: "Dhaka",
    to: "Chittagong",
  },
  {
    from: "Barisal",
    to: "Rajshahi",
  },
  {
    from: "Chittagong",
    to: "Rajshahi",
  },
  {
    from: "Dhaka",
    to: "Rajshahi",
  },
];

// selecting elements
const fromOptions = document.getElementById("from");
const toOptions = document.getElementById("to");

const filterOptions = document.querySelectorAll(".filter-option");

const options = document.querySelector(".options");
const optionsf = document.querySelector(".optionsf");
const optionst = document.querySelector(".optionst");
const selectGoingFrom = document.querySelector(".select-going-from");
const selectGoingTo = document.querySelector(".select-going-to");
const switchPlace = document.querySelector(".switch-arrow");
const searchf = document.querySelector(".searchf");
const searcht = document.querySelector(".searcht");
const searchBtn = document.querySelector(".search-btn");
const date = document.querySelector(".date");
const dateReturn = document.querySelector(".date-return");
let tranding = document.querySelector(".tranding-places");

// set default select options
const setOptions = (data, index) => {
  filterOptions[index].innerHTML = "";
  data.forEach(function (city) {
    let option = document.createElement("p");
    option.className = "option";
    option.textContent = city.toUpperCase();
    filterOptions[index].appendChild(option);
  });
};
setOptions(cities, 0);
setOptions(cities, 1);

// set place when click to options
const setPlace = (place) => {
  const option = document.querySelectorAll(".option");
  option.forEach((opt) => {
    opt.addEventListener("click", () => {
      place.textContent = opt.textContent;
    });
  });
};

// searching options for from place
searchf?.addEventListener("input", (e) => {
  let value = e.target.value;
  value = value.toLowerCase();
  const searchRegExp = new RegExp(".*" + value + ".*", "i");
  const newCities = cities.filter((tech) => {
    const techName = tech.toLowerCase();
    return searchRegExp.test(techName);
  });
  setOptions(newCities, 0);
  setPlace(selectGoingFrom);
});

// searching options for to place
searcht?.addEventListener("input", (e) => {
  let value = e.target.value;
  value = value.toLowerCase();
  const searchRegExp = new RegExp(".*" + value + ".*", "i");
  const newCities = cities.filter((tech) => {
    const techName = tech.toLowerCase();
    return searchRegExp.test(techName);
  });
  setOptions(newCities, 1);
  setPlace(selectGoingTo);
});

// show options to select from place
selectGoingFrom?.addEventListener("click", (event) => {
  event.stopPropagation();
  optionsf?.classList.add("options-from");
  optionst?.classList.remove("options-from");
  searchf.value = "";
  setOptions(cities, 0);
  setPlace(selectGoingFrom);
});

// show options to select to place
selectGoingTo?.addEventListener("click", (event) => {
  event.stopPropagation();
  optionsf?.classList.remove("options-from");
  optionst?.classList.add("options-from");
  searcht.value = "";
  setOptions(cities, 1);
  setPlace(selectGoingTo);
});

// option show and hide functionality
searchf?.addEventListener("click", (event) => {
  event.stopPropagation();
  optionsf?.classList.add("options-from");
  optionst?.classList.remove("options-from");
});

// option show and hide functionality
searcht?.addEventListener("click", (event) => {
  event.stopPropagation();
  optionst?.classList.add("options-from");
  optionsf?.classList.remove("options-from");
});

// option show and hide functionality
document.querySelector("body")?.addEventListener("click", (event) => {
  optionst?.classList.remove("options-from");
  optionsf?.classList.remove("options-from");
});

// switch place
switchPlace.addEventListener("click", () => {
  let from = selectGoingFrom?.textContent;
  let to = selectGoingTo?.textContent;
  selectGoingFrom.textContent = to;
  selectGoingTo.textContent = from;
});

// setting up trending place
trendingPlace.forEach((place) => {
  let p = document.createElement("p");
  p.innerHTML = `${place.from} <i class="fa-solid fa-arrow-right"></i> ${place.to}`;
  p.classList.add("tranding-place");
  tranding?.appendChild(p);
});

// set date reference
const setDateReference = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-based, so we add 1 and pad with leading zeros if necessary
  const day = String(today.getDate()).padStart(2, "0"); // Pad with leading zeros if necessary
  const formattedDate = `${year}-${month}-${day}`;
  date.value = formattedDate;
  dateReturn.value = formattedDate;
};
setDateReference();

// search for buses
searchBtn?.addEventListener("click", () => {
  if (selectGoingFrom?.textContent === "Select Place") {
    alert("Please select your a place");
    return;
  }
  if (selectGoingTo?.textContent === "Select Place") {
    alert("Please select a destination place");
    return;
  }
  if (selectGoingFrom?.textContent === selectGoingTo?.textContent) {
    alert("Please select different places");
    return;
  }
  if (date.value === "") {
    alert("Please select a date");
    return;
  }
  if (
    new Date(date.value).getTime() / (1000 * 3600 * 24) <
    Math.floor(new Date().getTime() / (1000 * 3600 * 24))
  ) {
    alert("Selected date must be gretter or equal than today.");
    return;
  }
  const from = selectGoingFrom.textContent;
  const to = selectGoingTo.textContent;
  const selectedDate = date.value;
  window.location.href = `buses.html?from=${from}&to=${to}&date=${selectedDate}`;
});
