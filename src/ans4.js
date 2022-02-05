function renderAns4() {
  document.getElementById("ass1ans4").classList.remove("hide");
  getFlights();
}

async function getFlights() {
  $("#ass1ans4").html(
    `<div class="loaderDiv"><img src="assets/loader.gif" alt="loader"/></div>`
  );
  await axios
    .get("https://think.cs.vt.edu/corgis/datasets/json/airlines/airlines.json")
    .then((res) => {
      displayData(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
}
function validateSum(data) {
  if (
    data["Cancelled"] + data["Delayed"] + data["Diverted"] + data["On Time"] ===
    data["Total"]
  ) {
    return true;
  } else {
    return false;
  }
}
function displayData(data) {
  $("#ass1ans4").html("");
  data.forEach((item) =>
    $("#ass1ans4").append(`
    <div class="flightItem">
      <div class="airportDetails">
          <div class="aCode">${item.Airport.Code}</div>
          <div class="aName">${item.Airport.Name}</div>
      </div>
      <div class="flightDetails">
          <div class="flightNum">Cancelled - ${
            item.Statistics.Flights["Cancelled"]
          }</div>
          <div class="flightNum">Delayed - ${
            item.Statistics.Flights["Delayed"]
          }</div>
          <div class="flightNum">Diverted - ${
            item.Statistics.Flights["Diverted"]
          }</div>
          <div class="flightNum">On Time - ${
            item.Statistics.Flights["On Time"]
          }</div>
          <div class="flightNum"><strong>TOTAL - </strong>${
            item.Statistics.Flights["Total"]
          }</div>
      </div>
    <div class="aSum">Flights = total flights ? <span>${validateSum(
      item.Statistics.Flights
    )}</span></div>
    </div>  
  `)
  );
}
