
console.log("linked");

const FRAME_HEIGHT = 450;
const FRAME_WIDTH = 450; 
const MARGINS = {left: 50, right: 50, top: 50, bottom: 50};

const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left -MARGINS.right;

const FRAME1 = d3.select("#scatter") 
                  .append("svg") 
                    .attr("height", FRAME_HEIGHT)   
                    .attr("width", FRAME_WIDTH)
                    .attr("class", "frame"); 


 function plot_scatter() {

  d3.csv("data/scatter-data.csv").then((data) => {
  const MAX_X1 = d3.max(data, (d) => { return parseInt(d.x)});
  const X_SCALE1 = d3.scaleLinear() 
                      .domain([0, MAX_X1])  
                      .range([0, VIS_WIDTH]); 

  const MAX_Y1 = d3.max(data, (d) => {return parseInt(d.y)});
  const Y_SCALE1 = d3.scaleLinear() 
                      .domain([0, MAX_Y1])  
                      .range([VIS_HEIGHT, 0]); 

  FRAME1.selectAll("points")  
        .data(data)
        .enter()       
        .append("circle")  
          .attr("cx", (d) => { return (X_SCALE1(d.x) + MARGINS.left); }) 
          .attr("cy", (d) => { return (Y_SCALE1(d.y) + MARGINS.top) }) 
          .attr("r", 10)
          .attr("class", "point");


   FRAME1.append("g")
            .attr("transform", "translate(" + MARGINS.left + "," + (VIS_HEIGHT + MARGINS.top) + ")")
            .call(d3.axisBottom(X_SCALE1).ticks(10))
            .attr("font-size", "20px");

    
    FRAME1.append("g")
            .attr("transform", "translate(" + MARGINS.left + "," + MARGINS.top + ")")
            .call(d3.axisLeft(Y_SCALE1).ticks(9))
            .attr("font-size", "20px");

 

     function add_point () {
     	const X_SCALE = d3.scaleLinear()
				  .domain([0,9])
				  .range([0, VIS_WIDTH]);

	     const Y_SCALE = d3.scaleLinear()
                        .domain([0, 9])
                        .range([VIS_HEIGHT, 0]);

		let addX = document.getElementById("xcoord").value;

		let addY = document.getElementById("ycoord").value;

		FRAME1 .append("circle")
	  		.attr("cx", () => {return  X_SCALE(addX) + MARGINS.left})
	  		.attr("cy", () => {return  Y_SCALE(addY) + MARGINS.top})
	  		.attr("r", 10)
	  		.attr("class", "point")

	   FRAME1.selectAll(".point")
          .on("mouseover", handleMouseover) 
          .on("mouseleave", handleMouseleave)
          .on("click", handleClick);


     }

    let pointButton = document.getElementById("point-button");
    pointButton.addEventListener("click", add_point);


     function handleMouseover(event, d) {
		d3.select(this).style("fill", "pink");
	}

	// un-highlight on mouseleace
	function handleMouseleave(event, d) {
		d3.select(this).style("fill", "black");
	}


	let points = []
	function handleClick(event,d) {
	 point = "(" + d.x + "," + d.y + ")";


	 // if clicked-> remove border 
	 if (d3.select(this).style("stroke") == "powderblue") {
	 	d3.select(this).style("stroke", "none");

	 	pt_id = points.indexOf(point);
	 	points.splice(pt_id, 1);
	 }
	  // if clicked -> add border
	 else {
	 	d3.select(this).style("stroke", "powderblue")
	 	d3.select(this).style("stroke-width", "4px")

	 	points.push(point);

	 }

	 d3.select("#selected_points").html(points)

	}

	FRAME1.selectAll(".point")
          .on("mouseover", handleMouseover) 
          .on("mouseleave", handleMouseleave)
          .on("click", handleClick);
 

});

 }
 plot_scatter();



// BAR GARPH

const FRAME2 = d3.select('#bar')
				 .append("svg")
				 .attr("height", FRAME_HEIGHT)
				 .attr("width", FRAME_WIDTH)
				 .attr("class", "frame")



function plot_bar() {

	d3.csv("data/bar-data.csv").then((data) => {
		const Y_MAX = d3.max(data, (d) => {return parseInt(d.amount)});
		const X_SCALE = d3.scaleBand()
						.range([0, VIS_WIDTH + 1])
						.domain(data.map(function(d) {return d.category}))
		const Y_SCALE = d3.scaleLinear()
							.domain([0, Y_MAX + 1])
							.range([VIS_HEIGHT, MARGINS.top]);

		
		FRAME2.selectAll("bars")
			  .data(data)
			  .enter()
			  .append('rect')
			  .attr("class", "bar")
			  .attr("x", (d) => { return X_SCALE(d.category) + MARGINS.left; })
			  .attr("y", (d) => { return Y_SCALE(d.amount) + MARGINS.bottom; })
			  .attr("width", 45)
			  .attr("height", (d) => {return VIS_HEIGHT - Y_SCALE(d.amount)})
			  .style("fill", "pink")



	FRAME2.append("g")
        .attr("transform", "translate(" + MARGINS.left + "," + (VIS_HEIGHT + MARGINS.top) + ")")
        .call(d3.axisBottom(X_SCALE).ticks(10))
        .attr("font-size", "15px");


    FRAME2.append("g")
        .attr("transform", "translate(" + MARGINS.left + "," + MARGINS.top + ")")
        .call(d3.axisLeft(Y_SCALE).ticks(9))
        .attr("font-size", "15px");


     const TOOLTIP = d3.select("#bar").append("div")
      								   .attr("class", "tooltip")
      								   .style("opacity", 0);



    function handleMouseover(event,d) {
    	d3.select(this).style("fill", "red");
    	TOOLTIP.style("opacity",1)
    }


    function handleMousemove(event,d) {
    	TOOLTIP.html("Category: " + d.category + " " + "Amount: " + d.amount)
    		   .style("left", (event.PageX + 10) + "px")
    		   .style("top", (event.PageY - 50) + "px");
    }

    function handleMouseleave(event,d) {
    	d3.select(this).style("fill", "pink");
    	TOOLTIP.style("opacity",0);
    }


    FRAME2.selectAll(".bar")
    	  .on("mouseover", handleMouseover)
    	  .on("mousemove", handleMousemove)
    	  .on("mouseleave", handleMouseleave)

});


}


plot_bar();









