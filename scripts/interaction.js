//Brushing
let brush = d3.brush()
.extent( [ [0,0], [m(fieldWMeter),m(fieldHMeter)] ] )
.on("end", updateField)

field.append("g")
.attr("class", "brush")
.call(brush);

//Drag
function handlePlayerDrag(event,d,i){
  event.subject.pos[time].x = m.invert(event.x);
  event.subject.pos[time].y = m.invert(event.y);
  d3.select("#playerName")
  .attr("x", event.x)
  .attr("y", event.y)
  updateInstant();
}
//Mouseover
function playerOver(event,d,i){
  d3.select(this).attr("r",10)
  fillPlayerInfo(d)
}

function fillPlayerInfo(d){
  d3.select("#pName").text(d.name)
  d3.select("#pTeam").text(d.team)
  d3.select("#pPosition").text(d.position)
  d3.select("#pNumber").text(d.number)
  d3.select("#pSize").text(d.size)
  d3.select("#pWeight").text(d.weight)
  d3.select("#pBirthday").text(formatDate(d.birthday) + " (" + getAge(d.birthday) + ")")
}

function playerOut(event,d,i){
  d3.select(this)
  .attr("r", getPuckSize(d))
}

//Update players position
function update(){ //with transition
  d3.select("#time").text(time)
  players
  .transition()
  .duration(1000)
  .attr("cy", d => m(d.pos[time].y))
  .attr("cx", d => m(d.pos[time].x))
}

function updateInstant(){ //without transition
  players
  .attr("cy", d => m(d.pos[time].y))
  .attr("cx", d => m(d.pos[time].x))
}

//Handle Brush event
function updateField(event) {
  let extent = event.selection
  lastBrushEvent = event;

  selectedPlayers = [];

  if(!extent){
    players
    .transition()
    .duration(500)
    .attr("stroke-width",1.5);
    selectedPlayers = playerData;

  } else{
    players
    .transition()
    .duration(500)
    .attr("stroke-width", d => {
      let isBrushed = m.invert(extent[0][0]) <= d.pos[time].x && m.invert(extent[1][0]) >= d.pos[time].x && // Check X coordinate
      m.invert(extent[0][1]) <= d.pos[time].y && m.invert(extent[1][1]) >= d.pos[time].y  // And Y coordinate
      if(isBrushed) {
        if(d.team != "Puck"){
          selectedPlayers.push(d);
        }
        return 4
      }
      else return 1.5;
    })
  }
  createSelectionTable();
  updateSelectionCharts("size");
  updateSelectionCharts("weight");
  updateSelectionCharts("age");
}
