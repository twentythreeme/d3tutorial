function formatDate(date){
  return date.getDate() + "." + (date.getMonth()+1) + "." + date.getFullYear()
}
function getAge(dateString) {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
  }
  return age;
}

function getColor(d){
  if(d.team == "KAC") return "red"
  else if(d.team == "VSV") return "rgb(48, 66, 255)"
  else if(d.team == "Puck") return "black"
}
function getStrokeColor(d){
  if(d.team == "KAC") return "black"
  else if(d.team == "VSV") return "black"
  else if(d.team == "Puck") return "white"
}

function getPuckSize(d){
  if(d.team == "Puck") return 4;
  else return 8
  }

function getMean(team, variable){
  let mean = d3.mean(selectedPlayers.filter(d => d.team == team),d => d[variable])
  if(mean == undefined) return 0;
  else return mean;
}

//Time Functions

function timeplus(){
  if(increaseTime()){
    update();
  }
}

function increaseTime(){
  if(time < maxTime){
    time+=1;
    return true;
  } else return false;
}

function timeminus(){
  if(decreaseTime()){
    update();
  }
}

function decreaseTime(){
  if(time > 0){
    time -=1;
    return true;
  } return false;
}

function addTimePoint(){
  playerData.forEach((d, i) => {
    d.pos.push({x: d.pos[d.pos.length-1].x, y:d.pos[d.pos.length-1].y}
    )
  });
  maxTime += 1;
  time = maxTime;
  update()
}
