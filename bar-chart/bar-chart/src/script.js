let data;
fetch("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json").then(response =>response.json().then(d=>{
data = d.data;
console.log(data)
drawBar(data)
}));

const drawBar=(data)=>{
  const datesArray = data.map(d=>new Date(d[0]))
  const minX = d3.min(datesArray,(d)=>d)
  const maxX = d3.max(datesArray,(d)=>d)
  const minY = d3.min(data,(d)=>d[1])
  const maxY = d3.max(data,(d)=>d[1])

  const margin = {top:50,bottom:50,left:50,right:50},
        width =900 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom;

  const xScale  = d3.scaleLinear()
  .domain([0,data.length-1])
  .range([0,width]),
        yScale = d3.scaleLinear()
  .domain([0,maxY])
  .range([height, margin.top]),
        xAxisScale = d3.scaleTime()
  .domain([minX,maxX])
  .range([0, width]),
        yAxisScale = d3.scaleLinear()
  .domain([0,maxY])
  .range([height, margin.top])

  const svg = d3.select("#bar-chart").append("svg")
  .attr("width", width)
  .attr("height", height)
  .attr("viewBox",[0,0,width+(margin.left+margin.right),height+(margin.top+ margin.bottom)])
  .append('g')
  .attr("transform", "translate(" + margin.left + "," + margin.top+ ")");
  
  const xAxis = d3.axisBottom(xAxisScale);
  const yAxis = d3.axisLeft(yAxisScale);
  
  svg.append('g')
  .attr('transform', `translate(0, ${height})`)
  .attr('id','x-axis')
  .call(xAxis)  
  svg.append('g')
  .attr('id','y-axis')
  .call(yAxis);
  
  const tooltip = d3.select('body')
  .append('div')
  .attr('id','tooltip')
  
  const bar = svg.selectAll('rect')
  .data(data)
  .enter().append("rect")
  .attr("class","bar")
  .attr("x",(d,i)=>xScale(i))
  .attr("y",(d)=>yScale(d[1]))
  .attr("width", (width-(margin.left+margin.right))/data.length)
  .attr("height",(d)=>height-yScale(d[1]))
  .attr('data-date', (d)=>d[0])
  .attr('data-gdp',(d)=>d[1])
  .on('mouseover', (event,d)=>{    
    tooltip.transition()
    .style('opacity','100')    
    tooltip.text(formatDateToQuarter(d[0]))    
    .attr('data-date',d[0])
    .append('p')
    .text(`$${d[1]} Billion`)
  })
  .on('mouseout',(event,d)=>{
    tooltip.transition()
    .style('opacity','0')
  })
  
  const formatDateToQuarter=(date)=>{
    const dateArray = date.split('-');
    const year = dateArray[0];
    const month = parseInt(dateArray[1]);
    return year + " " + (month > 9? 'Q4': month > 6? 'Q3': month > 3? 'Q2':'Q1');
  }

  //const dataPreview = d3.select("#data-preview").append('p').text(data)

  svg.node()
}
