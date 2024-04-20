const busdata = [
  {
    from: "Dhaka",
    to: "Chittagong",
    fare: 1100,
    date: "11-06-24",
  },
  {
    from: "Dhaka",
    to: "Chittagong",
    fare: 1100,
    date: "30-04-24",
  },
  {
    from: "Dhaka",
    to: "Chittagong",
    fare: 1100,
    date: "01-05-24",
  },
  {
    from: "Barisal",
    to: "Chittagong",
    fare: 900,
    date: "11-05-24",
  },
  {
    from: "Barisal",
    to: "Chittagong",
    fare: 1200,
    date: "21-05-24",
  },
  {
    from: "Barisal",
    to: "Chittagong",
    fare: 900,
    date: "14-05-24",
  },
  {
    from: "Barisal",
    to: "Rajshahi",
    fare: 1900,
    date: "28-04-24",
  },
  {
    from: "Barisal",
    to: "Rajshahi",
    fare: 1900,
    date: "02-05-24",
  },
];

let showBuses = document.querySelector(".show-buses");

function convertDateFormat(dateString) {
  // Split the date string into year, month, and day components
  const components = dateString.split("-");
  const year = components[0].substring(2); // Extract the last two digits of the year
  const month = components[1];
  const day = components[2];

  // Assemble the date string in the format "dd-mm-yy"
  const convertedDateString = `${day}-${month}-${year}`;

  return convertedDateString;
}

const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

const from = urlParams.get("from")?.toLocaleLowerCase();
const to = urlParams.get("to")?.toLocaleLowerCase();
const selectedDate = urlParams.get("date");

if (from && to && selectedDate && selectedDate) {
  let availableBus = busdata.filter((bus) => {
    return (
      bus.from.toLowerCase() === from &&
      bus.to.toLowerCase() === to &&
      bus.date === convertDateFormat(selectedDate)
    );
  });
  if (availableBus.length === 0) {
    showBuses.innerHTML = `<div class="no-bus">
    <img src="https://bdtickets.com/images/404.svg" width="300px" />
    <h1 style="text-align: center;">Sorry, we didn't find any routes for your search.</h1>
    </div>`;
  } else {
    let displayBus = availableBus.map((bus) => {
      return `
        <div class="bus">
            <div class="bus-from">Starting Point: ${bus.from}</div>
            <div class="bus-to">End Point: ${bus.to}</div>
            <div class="bus-fare">Bus Fare: ${bus.fare}</div>
            <div class="bus-date">Date: ${bus.date}</div>
        </div>
        `;
    });
    showBuses.innerHTML = displayBus;
  }
} else {
  window.location.href = `index.html`;
}
