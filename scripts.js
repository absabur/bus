const cities = ["Dhaka", "Chittagong", "Barisal", "Rajshahi"];
const fromOptions = document.getElementById("from");
const toOptions = document.getElementById("to");
const filterOptions = document.querySelectorAll(".filter-option");
const options = document.querySelector(".options");
const optionsf = document.querySelector(".optionsf");
const optionst = document.querySelector(".optionst");
const selectGoingFrom = document.querySelector(".select-going-from");
const selectGoingTo = document.querySelector(".select-going-to");
const switchPlace = document.querySelector(".switch-arrow");

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
const searchf = document.querySelector(".searchf");
const searcht = document.querySelector(".searcht");

searchf?.addEventListener("input", (e) => {
  let value = e.target.value;
  value = value.toLowerCase();
  const searchRegExp = new RegExp(".*" + value + ".*", "i");
  const newCities = cities.filter((tech) => {
    const techName = tech.toLowerCase();
    return searchRegExp.test(techName);
  });
  setOptions(newCities, 0);
  const option = document.querySelectorAll(".option");
  console.log(option);
  option.forEach((opt) => {
    opt.addEventListener("click", () => {
      selectGoingFrom.textContent = opt.textContent;
    });
  });
});

searcht?.addEventListener("input", (e) => {
  let value = e.target.value;
  value = value.toLowerCase();
  const searchRegExp = new RegExp(".*" + value + ".*", "i");
  const newCities = cities.filter((tech) => {
    const techName = tech.toLowerCase();
    return searchRegExp.test(techName);
  });
  setOptions(newCities, 1);
  const option = document.querySelectorAll(".option");
  option.forEach((opt) => {
    opt.addEventListener("click", () => {
      selectGoingTo.textContent = opt.textContent;
    });
  });
});

switchPlace.addEventListener("click", () => {
  let from = selectGoingFrom?.textContent;
  let to = selectGoingTo?.textContent;
  selectGoingFrom.textContent = to;
  selectGoingTo.textContent = from;
});

selectGoingFrom?.addEventListener("click", (event) => {
  event.stopPropagation();
  optionsf?.classList.add("options-from");
  optionst?.classList.remove("options-from");
  searchf.value = "";
  setOptions(cities, 0);
  const option = document.querySelectorAll(".option");
  option.forEach((opt) => {
    opt.addEventListener("click", () => {
      selectGoingFrom.textContent = opt.textContent;
    });
  });
});

searchf?.addEventListener("click", (event) => {
  event.stopPropagation();
  optionsf?.classList.add("options-from");
  optionst?.classList.remove("options-from");
});
searcht?.addEventListener("click", (event) => {
  event.stopPropagation();
  optionst?.classList.add("options-from");
  optionsf?.classList.remove("options-from");
});

selectGoingTo?.addEventListener("click", (event) => {
  event.stopPropagation();
  optionsf?.classList.remove("options-from");
  optionst?.classList.add("options-from");
  searcht.value = "";
  setOptions(cities, 1);
  const option = document.querySelectorAll(".option");
  option.forEach((opt) => {
    opt.addEventListener("click", () => {
      selectGoingTo.textContent = opt.textContent;
    });
  });
});

document.querySelector("body")?.addEventListener("click", (event) => {
  optionst?.classList.remove("options-from");
  optionsf?.classList.remove("options-from");
});

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
];

let tranding = document.querySelector(".tranding-places");
trendingPlace.forEach((place) => {
  let p = document.createElement("p");
  p.innerHTML = `${place.from} <i class="fa-solid fa-arrow-right"></i> ${place.to}`;
  p.classList.add("tranding-place");
  tranding.appendChild(p);
});

const searchBtn = document.querySelector(".search-btn");
const date = document.querySelector(".date");

searchBtn?.addEventListener("click", (event) => {
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
  if (new Date(date.value) < new Date()) {
    alert("Selected date must be gretter than today.");
    return;
  }

  const from = selectGoingFrom.textContent;
  const to = selectGoingTo.textContent;
  const selectedDate = date.value;
  console.log(from, to, selectedDate);
  window.location.href = `buses.html?from=${from}&to=${to}&date=${selectedDate}`;
});
