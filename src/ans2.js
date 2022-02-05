const BASE_URL = "https://api.github.com/search/repositories?q=";
let outputObject2 = {};
async function callSearchApi() {
  $("#ass1ans2").html(
    `<div class="loaderDiv"><img src="assets/loader.gif" alt="loader"/></div>`
  );
  let inputs = {};
  inputs["owner"] = document.getElementById("owner").value;
  inputs["repo"] = document.getElementById("repo").value;
  if (inputs["owner"] !== "" && inputs["repo"] !== "") {
    await axios
      .get(`${BASE_URL}repo:${inputs["owner"]}/${inputs["repo"]}`)
      .then((res) => {
        let item = res.data.items[0];
        let ownerInfo = {};
        let branchCount = 0;
        let branchesUrl = item.branches_url.replace("{/branch}", "");
        outputObject2["name"] = item.name;
        outputObject2["full_name"] = item.full_name;
        outputObject2["private"] = item.private;
        outputObject2["licenceName"] = item.license || null;
        outputObject2["score"] = item.score;
        getOwnerData(item);
        getBranchesData(branchesUrl);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    alert("Please enter owner and repo first!");
  }
}
async function getOwnerData(item) {
  await axios
    .get(item.owner.url)
    .then((res) => {
      ownerInfo = res.data;
      outputObject2["owner"] = {
        login: ownerInfo["login"],
        name: ownerInfo["name"],
        followersCount: ownerInfo["followers"],
        followingCount: ownerInfo["following"],
      };
    })
    .catch((err) => console.log(err));
}
async function getBranchesData(branchesUrl) {
  await axios
    .get(branchesUrl)
    .then((res) => {
      branchCount = res.data.length;
      outputObject2["numberOfBranches"] = branchCount;
      console.log(outputObject2);
      $("#ass1ans2").html(
        `<pre>${JSON.stringify(outputObject2, null, 4)}</pre>`
      );
    })
    .catch((err) => console.log(err));
}
async function renderAns2(e) {
  e.preventDefault();
  await callSearchApi();
}
document.getElementById("searchForm").addEventListener("submit", renderAns2);
