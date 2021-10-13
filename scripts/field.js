const fieldWMeter = 60;
const fieldHMeter = 30;
const curveMeter = 8.5;
const goalLineMeter = 4;
const goalLinePaddingMeter = 1.2868493150684932;
const blueLineMeter = 17.6;
const radiusCircleMeter = 4.57;
const smallLineWidthMeter = 0.05;
const bigLineWidthMeter = 0.3;
const circleWMeter = 10;
const circleHMeter = 8;
const faceOffPointRadiusMeter = 0.3;
const goalCreaseRadiusMeter = 1.21
const goalHeightMeter = 1.8;
const goalWidthMeter = 1;

let m = d3.scaleLinear()
  .domain([0,fieldWMeter])

function createField(svg){
  const svgWidth = svg.attr("width")
  const paddingL = 10;
  const paddingT = 10;
  // const paddingB = 10;
  const paddingR = 10;

  const fieldWidth = svgWidth - paddingL - paddingR;
  m.range([0,fieldWidth])
  const curve = m(curveMeter)
  const fieldHeight = m(fieldHMeter)


  const lineStrength = m(bigLineWidthMeter);
  const blue = "rgb(112, 148, 255)";
  const red = "rgb(255, 82, 82)";

  svg.append("rect")
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .attr("fill","gray")

  let field = svg.append("g").attr("transform","translate(" + paddingL + ","+ paddingT +")")

  field.append("rect")
    .attr("width", fieldWidth)
    .attr("height", fieldHeight)
    .attr("fill","white")
    .attr("rx", curve)
    .attr("ry", curve)

  //GoalLine Left
  field.append("line")
    .attr("x1",m(goalLineMeter))
    .attr("x2",m(goalLineMeter))
    .attr("y1",m(goalLinePaddingMeter))
    .attr("y2",fieldHeight - m(goalLinePaddingMeter))
    .attr("stroke",red)
    .attr("stroke-width", m(smallLineWidthMeter))

  //GoalLine Right
  field.append("line")
    .attr("x1",fieldWidth - m(goalLineMeter))
    .attr("x2",fieldWidth - m(goalLineMeter))
    .attr("y1", m(goalLinePaddingMeter))
    .attr("y2",fieldHeight - m(goalLinePaddingMeter))
    .attr("stroke",red)
    .attr("stroke-width", m(smallLineWidthMeter))

  //Middle Line
  field.append("line")
    .attr("x1",fieldWidth / 2)
    .attr("x2",fieldWidth / 2)
    .attr("y1",0)
    .attr("y2",fieldHeight)
    .attr("stroke",red)
    .attr("stroke-width",lineStrength)

  //Blue Line Left
  field.append("line")
    .attr("x1",m(blueLineMeter))
    .attr("x2",m(blueLineMeter))
    .attr("y1",0)
    .attr("y2",fieldHeight)
    .attr("stroke",blue)
    .attr("stroke-width",lineStrength)

  //Blue Line Left
  field.append("line")
    .attr("x1",fieldWidth - m(blueLineMeter))
    .attr("x2",fieldWidth - m(blueLineMeter))
    .attr("y1",0)
    .attr("y2",fieldHeight)
    .attr("stroke",blue)
    .attr("stroke-width",lineStrength)

  //Faceoff points
  function faceOffPoint(x,y){
    field.append("circle")
      .attr("cx",x)
      .attr("cy",y)
      .attr("r",m(radiusCircleMeter))
      .attr("fill","none")
      .attr("stroke",red)
      .attr("stroke-width", m(smallLineWidthMeter))

    field.append("circle")
      .attr("cx",x)
      .attr("cy",y)
      .attr("r",m(faceOffPointRadiusMeter))
      .attr("fill",red)

  }
  faceOffPoint(m(circleWMeter), m(circleHMeter))
  faceOffPoint(m(circleWMeter), fieldHeight - m(circleHMeter))
  faceOffPoint(fieldWidth - m(circleWMeter), m(circleHMeter))
  faceOffPoint(fieldWidth - m(circleWMeter), fieldHeight - m(circleHMeter))
  faceOffPoint(fieldWidth/2, fieldHeight/2)

  //Goal Arcs
  const arcGenerator = d3.arc()
    .outerRadius(m(goalCreaseRadiusMeter))
    .innerRadius(0)
    .startAngle(-Math.PI / 2)
    .endAngle(Math.PI / 2);

  field.append("path")
    .attr("transform", "rotate(90),translate(" + fieldHeight/2 + "," + -m(goalLineMeter) + ")")
    .attr("fill",blue)
    .attr("d", arcGenerator())
    .attr("stroke",red)
    .attr("stroke-width", m(smallLineWidthMeter))

  field.append("path")
    .attr("transform", "rotate(-90),translate(" + -fieldHeight/2 + "," + (fieldWidth - m(goalLineMeter))+ ")")
    .attr("fill",blue)
    .attr("d", arcGenerator())
    .attr("stroke",red)
    .attr("stroke-width", m(smallLineWidthMeter))

  //Goals
  field.append("rect")
    .attr("height", m(goalHeightMeter))
    .attr("width", m(goalWidthMeter))
    .attr("fill","none")
    .attr("stroke","red")
    .attr("stroke-width",m(0.03))
    .attr("y",fieldHeight/2 - m(goalHeightMeter)/2)
    .attr("x",m(goalLineMeter) - m(goalWidthMeter))

  field.append("rect")
    .attr("height", m(goalHeightMeter))
    .attr("width", m(goalWidthMeter))
    .attr("fill","none")
    .attr("stroke","red")
    .attr("stroke-width",m(0.03))
    .attr("y",fieldHeight/2 - m(goalHeightMeter)/2)
    .attr("x",fieldWidth - m(goalLineMeter))

  return field;
}
