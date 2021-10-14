//Create the selection SVGs
function createSelectionSVG(width,height,name,variable){
  let sizeSVG = d3.select('#selection')
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .attr("id","SVG"+variable)

  sizeSVG.append("text")
  .text(name)
  .attr("x", width/2)
  .attr("y", 20)
  .style("text-anchor","middle")
}

//Create the bars of the selection SVGs
function createSelectionCharts(variable){

  let meanKAC = getMean("KAC",variable)
  let meanVSV = getMean("VSV",variable)

  let max = d3.max(playerData.filter(d => d.team != "Puck"), d => d[variable])

  let height = d3.select("#SVG" + variable).attr("height")
  let paddingTop = 50;
  let paddingBottom = 5;
  let diagramHeight = height - paddingTop - paddingBottom;
  let y = d3.scaleLinear()
  .domain([0,max])
  .range([diagramHeight,0])

  //left bar
  d3.select("#SVG" + variable)
  .append("rect")
  .attr("height", diagramHeight-y(meanKAC))
  .attr("width",45)
  .attr("x",50)
  .attr("y", y(meanKAC) + paddingTop - paddingBottom)
  .attr("fill", "red")
  .attr("id","KAC" + variable)

  //right bar
  d3.select("#SVG" + variable)
  .append("rect")
  .attr("height", diagramHeight-y(meanVSV))
  .attr("width",45)
  .attr("x",105)
  .attr("y", y(meanVSV) + paddingTop - paddingBottom)
  .attr("fill", "rgb(48, 66, 255)")
  .attr("id","VSV" + variable)

  //axis
  d3.select("#SVG" + variable)
  .append("g")
  .call(d3.axisLeft(y))
  .attr("transform","translate(30,"+ (paddingTop - paddingBottom) + ")")

}
//Update the bars of the selection SVGs
function updateSelectionCharts(variable){
  let height = d3.select("#SVG" + variable).attr("height")
  let paddingTop = 50
  let paddingBottom = 5;
  let diagramHeight = height - paddingTop - paddingBottom;

  let meanKAC = getMean("KAC",variable)
  let meanVSV = getMean("VSV",variable)

  let max = d3.max(playerData.filter(d => d.team != "Puck"), d => d[variable])

  let y = d3.scaleLinear()
  .domain([0,max])
  .range([diagramHeight,0])

  d3.select("#KAC"+variable)
  .transition()
  .duration(1000)
  .attr("height", diagramHeight-y(meanKAC))
  .attr("y", y(meanKAC) + paddingTop - paddingBottom)

  d3.select("#VSV"+variable)
  .transition()
  .duration(1000)
  .attr("height", diagramHeight-y(meanVSV))
  .attr("y", y(meanVSV) + paddingTop - paddingBottom)
}

//remove and create the table
function createSelectionTable(){
  d3.select("#selectionTable").remove()

  let table = d3.select('#selection').append('table').attr("id","selectionTable")

  let headers = ["Number","Name","Team","Position","Size","Weight","Birthday","Age"]
  // headers
  table.append("thead").append("tr")
  .selectAll("th")
  .data(headers)
  .enter().append("th")
  .text(function(d) { return d; })
  .style("padding", "5px")
  .style("background-color", "lightgray")
  .style("font-weight", "bold")

  // data
  let line = table.append("tbody")
  .selectAll("tr")
  .data(selectedPlayers)
  .enter()
  .append("tr") //Append a table line
  .on("mouseover", function(){
    d3.select(this).style("background-color", "powderblue");
  })
  .on("mouseout", function(){
    d3.select(this).style("background-color", "transparent");
  })
  //fill the lines with content
  line.append("td")
  .text(d => d.number)
  line.append("td")
  .text(d => d.name)
  line.append("td")
  .text(d => d.team)
  line.append("td")
  .text(d => d.position)
  line.append("td")
  .text(d => d.size)
  line.append("td")
  .text(d => d.weight)
  line.append("td")
  .text(d => formatDate(d.birthday))
  line.append("td")
  .text(d => getAge(d.birthday))
}
