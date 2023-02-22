


const FRAME_HEIGHT = 400;
const FRAME_WIDTH = 600; 
const MARGINS = {left: 50, right: 50, top: 50, bottom: 50};

const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left -MARGINS.right;

const FRAME1 = d3.select("#scatter") 
                  .append("svg") 
                    .attr("height", FRAME_HEIGHT)   
                    .attr("width", FRAME_WIDTH)
                    .attr("class", "frame"); 


 function plot_scatter{

  d3.csv("data/scatter-data.csv").then((data) => {
  const MAX_X3 = d3.max(data, (d) => { return parseInt(d.x); });
  const X_SCALE3 = d3.scaleLinear() 
                      .domain([0, (MAX_X3 + 10000)]) // add some padding  
                      .range([0, VIS_WIDTH]); 

  FRAME3.selectAll("points")  
        .data(data) // passed from .then  
        .enter()       
        .append("circle")  
          .attr("cx", (d) => { return (X_SCALE3(d.x) + MARGINS.left); }) 
          .attr("cy", MARGINS.top) 
          .attr("r", 20)
          .attr("class", "point");

   // Define event handler functions for tooltips
    function handleMouseover(event, d) {
      // on mouseover, make opaque 
      TOOLTIP.style("opacity", 1); 
      
    }

    function handleMousemove(event, d) {
      // position the tooltip and fill in information 
      TOOLTIP.html("Name: " + d.name + "<br>Value: " + d.x)
              .style("left", (event.pageX + 10) + "px") //add offset
                                                          // from mouse
              .style("top", (event.pageY - 50) + "px"); 
    }

    function handleMouseleave(event, d) {
      // on mouseleave, make transparant again 
      TOOLTIP.style("opacity", 0); 
    } 

    // Add event listeners
    FRAME3.selectAll(".point")
          .on("mouseover", handleMouseover) //add event listeners
          .on("mousemove", handleMousemove)
          .on("mouseleave", handleMouseleave);    






}





 }