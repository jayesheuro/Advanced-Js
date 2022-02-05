function renderAns3() {
  document.getElementById("ass1ans3").classList.remove("hide");
  getPrizesData();
}
async function getPrizesData() {
  $("#ass1ans3").html(
    `<div class="loaderDiv"><img src="assets/loader.gif" alt="loader"/></div>`
  );
  await axios
    .get("http://api.nobelprize.org/v1/prize.json")
    .then((res) => filterData(res.data.prizes))
    .catch((err) => console.log(err));
}

function filterData(data) {
  let data_list = [];
  data_list = data.filter((element) => {
    return (
      element.year >= 2000 &&
      element.year <= 2019 &&
      element.category === "chemistry"
    );
  });
  let laureates = [];
  for (let i = 0; i < data_list.length; i++) {
    data_list[i].laureates.map((l) => {
      let new_obj = {
        year: data_list[i].year,
        category: data_list[i].category,
        name: l.firstname + " " + l.surname,
      };
      laureates.push(new_obj);
    });
  }
  console.log(laureates);
  $("#ass1ans3").html("");
  laureates.forEach((l) =>
    $("#ass1ans3").append(`
  <div class="laureateItem">
    <div class="lName">${l.name}</div>
    <div class="lYear">${l.year}</div>
    <div class="lCategory">${l.category}</div>
  </div>  
`)
  );
}
