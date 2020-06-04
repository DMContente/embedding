console.log("Hi from App");

let viz;

//get HTML elements and assign to variables
const hideButton = document.getElementById("hideButton");
const showButton = document.getElementById("showButton");
const exportButton = document.getElementById("exportButton");
const exportPPTButton = document.getElementById("exportPPTButton");
const vizContainer = document.getElementById("vizContainer");
const applyFilter = document.getElementById("applyFilter");

const url =
  "https://public.tableau.com/views/LearnEmbeddedAnalytics/SalesOverviewDashboard?:display_count=y&:origin=viz_share_link";

const options = {
  device: "desktop",
};

//Functions
function initViz() {
  console.log("My viz is loading...");
  viz = new tableau.Viz(vizContainer, url, options);
}

function hideViz() {
  console.log("Going to hide the viz...");
  viz.hide();
}
function showViz() {
  console.log("Going to show the viz...");
  viz.show();
}

function exportPDF() {
  console.log("Generating PDF export");
  viz.showExportPDFDialog();
}

function exportPPT() {
  console.log("Generating PPT");
  viz.showExportPowerPointDialog();
}

function getRangeValues() {
  //1. get the min and max values
  const minValue = document.getElementById("minValue").value;
  const maxValue = document.getElementById("maxValue").value;
  console.log(minValue, maxValue);
  console.log(
    `Your min value is ${minValue} and your max value is ${maxValue}`
  );
  //2. get workbook, active sheet, all sheets, shet with the sales bar chart
  const workbook = viz.getWorkbook();
  console.log(workbook);
  const activeSheet = workbook.getActiveSheet();
  const sheets = activeSheet.getWorksheets();
  const sheetToFilter = sheets[1];
  sheetToFilter
    .applyRangeFilterAsync("SUM(Sales)", { min: minValue, max: maxValue })
    .then(console.log("Your filter was applied!"));

  //sheets.map(sheet => console.log(sheet));

  //3. apply the range filter from 1 to the bar chart
}

//Listeners
hideButton.addEventListener("click", hideViz);

document.addEventListener("DOMContentLoaded", initViz);

showButton.addEventListener("click", showViz);

exportButton.addEventListener("click", exportPDF);

exportPPTButton.addEventListener("click", exportPPT);

applyFilter.addEventListener("click", getRangeValues);
