class Bar{
	
	
    constructor(data) 
	{
        this.data=data;

    }

    drawBar(activeYear,State) {
       
		let width=900;
		let height=600;






		

		let trialData=this.data.Gender.filter(d=>d.Year==activeYear && d.State==State);


		d3.selectAll(".switch").classed("hidden",true);



		

		let barChart = d3.select("#bar-plot").append("svg").attr("height",510).attr("width",1500);
		let barLayer=barChart.append("g").attr("id","barLayer").attr("transform", "translate(90,100)");

		
		

		
	}
	
	updateBar(activeYear,State) {
       
		let width=900;
		let height=400;



		let that=this;
		let trialData=that.data.Gender.filter(d=>d.Year==activeYear && d.State==State);

		
		
		let barLayer=d3.select("#barLayer");

		d3.selectAll(".axis-line").remove();

		d3.select(".switch").classed("hidden",false);
		
		d3.selectAll(".legend").remove()

		let categories=[]
		for(let i=0;i<trialData.length;i++){
			if(!categories.includes(trialData[i].Categories))
			categories.push(trialData[i].Categories)
		}


		var groups = ["Male", "Female"]

		barLayer.append("circle").attr("cx",900).attr("cy",50).attr("r", 6).style("fill", "#e41a1c").attr("class","legend");
        barLayer.append("circle").attr("cx",900).attr("cy",70).attr("r", 6).style("fill", "#377eb8").attr("class","legend");
        barLayer.append("text").attr("x", 920).attr("y", 55).text("Male").style("font-size", "15px").attr("alignment-baseline","right").attr("class","legend");
        barLayer.append("text").attr("x", 920).attr("y", 75).text("Female").style("font-size", "15px").attr("alignment-baseline","right").attr("class","legend");


		var x = d3.scaleBand()
		      .domain(categories)
		      .range([0, width])
		      .padding([0.2]);

		barLayer.append("g").attr("class","axis-line")
			.attr("transform","translate(21.5,300)")
		    .call(d3.axisBottom(x).tickSize(0));
			
		let ticklabel = d3.selectAll(".tick").selectAll("text").attr("transform","rotate(90)","translate(8,8)").style("text-anchor", "start");


	
	
		  // Add Y axis
		var y = d3.scaleLinear()
		    .domain([0,d3.max(trialData, d => parseInt(d.Total,10))])
		    .range([300,0]);

		barLayer.append("g").attr("class","axis-line")
			.attr("transform","translate(20.5,0)")
		    .call(d3.axisLeft(y));


        barLayer.append("text") 
        .attr("transform", "rotate(-90)")
      .attr("y", -40)
      .attr("x",-150)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("No. of Suicides");                  
      
		
		
		var xSubgroup = d3.scaleBand()
		    .domain(groups)
		    .range([0, x.bandwidth()-43])
		    .padding([0.05])

		  
		  var color = d3.scaleOrdinal()
		    .domain(groups)
		    .range(['#e41a1c','#377eb8'])


			
		   // barLayer.selectAll("myrect")
					// .data(trialData)
					// .join("rect")
					//   .attr("x", function(d,i) { return xSubgroup(d.Gender)+ x(d.Categories) ; })
					//   .attr("y",function(d){ return y(0);})
					//   .attr("width", 20)
					//   .attr("height",function(d){ return y(0);})
					//   .attr("fill", function(d) { return color(d.Gender); });



		   barLayer.selectAll("rect")
					.data(trialData)
					.join("rect")
					.merge(barLayer)
		            .transition()
		            .duration(2000)
					 .attr("x", function(d,i) { return xSubgroup(d.Gender)+ x(d.Categories) ; })
					  .attr("y",function(d){ return  y(d.Total)})
					 .attr("width", 20)
					  .attr("height",function(d){ return 300-y(d.Total)})
					  .attr("fill", function(d) { return color(d.Gender); });



		// buttonStatus=false;
		
		

		let toggle=d3.select("#boop").on("input",function(){



		if(!this.checked){



		

		let trialData=that.data.Gender.filter(d=>d.Year==activeYear && d.State==State);

		
		d3.selectAll(".legend").remove();
		let barLayer=d3.select("#barLayer");

		
		barLayer.append("circle").attr("cx",900).attr("cy",50).attr("r", 6).style("fill", "#e41a1c").attr("class","legend");
        barLayer.append("circle").attr("cx",900).attr("cy",70).attr("r", 6).style("fill", "#377eb8").attr("class","legend");
        barLayer.append("text").attr("x", 920).attr("y", 55).text("Male").style("font-size", "15px").attr("alignment-baseline","right").attr("class","legend");
        barLayer.append("text").attr("x", 920).attr("y", 75).text("Female").style("font-size", "15px").attr("alignment-baseline","right").attr("class","legend");


		

		let categories=[]
		for(let i=0;i<trialData.length;i++){
			if(!categories.includes(trialData[i].Categories))
			categories.push(trialData[i].Categories)
		}


		var groups = ["Male", "Female"]


		var x = d3.scaleBand()
		      .domain(categories)
		      .range([0, width])
		      .padding([0.2]);
	
		

		  // Add Y axis
		var y = d3.scaleLinear()
		    .domain([0,(d3.max(trialData, d => parseInt(d.Total,10))+200)])
		    .range([300,0]);
		
		let yAxis = d3.axisLeft(y).ticks(5);
        barLayer.selectAll(".Yaxis")
          .call(yAxis);
		
		var xSubgroup = d3.scaleBand()
		    .domain(groups)
		    .range([0, x.bandwidth()-43])
		    .padding([0.05])

		  
		  var color = d3.scaleOrdinal()
		    .domain(groups)
		    .range(['#e41a1c','#377eb8'])
			
		   barLayer.selectAll("rect")
					.data(trialData)
				
					.join("rect")
						.merge(barLayer)
		            .transition()
		            .duration(2000)
					  .attr("x", function(d,i) { return xSubgroup(d.Gender)+ x(d.Categories) ; })
					  .attr("y",function(d){ return  y(d.Total)})
					  .attr("width", 20)
					  .attr("height",function(d){ return 300-y(d.Total)})
					  .attr("fill", function(d) { return color(d.Gender); });


		

		}
		else{

	
		


		let AgeData=that.data.Age.filter(d=>d.Year==activeYear && d.State==State);

		
		
		let barLayer=d3.select("#barLayer");

		let categories=[]
		for(let i=0;i<AgeData.length;i++){
			if(!categories.includes(AgeData[i].Categories))
			categories.push(AgeData[i].Categories)
		}

		d3.selectAll(".legend").remove();

		barLayer.append("circle").attr("cx",1000).attr("cy",50).attr("r", 6).style("fill", "#e41a1c").attr("class","legend");
        barLayer.append("circle").attr("cx",1000).attr("cy",70).attr("r", 6).style("fill", "#377eb8").attr("class","legend");
        barLayer.append("text").attr("x", 1020).attr("y", 55).text("0-14").style("font-size", "15px").attr("alignment-baseline","right").attr("class","legend");
        barLayer.append("text").attr("x", 1020).attr("y", 75).text("15-29").style("font-size", "15px").attr("alignment-baseline","right").attr("class","legend");
        barLayer.append("circle").attr("cx",1000).attr("cy",90).attr("r", 6).style("fill", "#4daf4a").attr("class","legend");
        barLayer.append("circle").attr("cx",1000).attr("cy",110).attr("r", 6).style("fill", "#BDB821").attr("class","legend");
        barLayer.append("text").attr("x", 1020).attr("y", 95).text("30-44").style("font-size", "15px").attr("alignment-baseline","right").attr("class","legend");
        barLayer.append("text").attr("x", 1020).attr("y", 115).text("45-59").style("font-size", "15px").attr("alignment-baseline","right").attr("class","legend");
        barLayer.append("circle").attr("cx",1000).attr("cy",135).attr("r", 6).style("fill", "#21B3BD").attr("class","legend");
        barLayer.append("text").attr("x", 1020).attr("y", 140).text("60+").style("font-size", "15px").attr("alignment-baseline","right").attr("class","legend");


		var x = d3.scaleBand()
		      .domain(categories)
		      .range([0, width+20])
		      .padding([0.2]);
	
		

		 // Add Y axis
		console.log(AgeData)
		var groups=["0-14","15-29","30-44","45-59","60+"];
		var y = d3.scaleLinear()
		    .domain([0,d3.max(AgeData, d => parseInt(d.Total,10))])
		    .range([300,0]);


		var xSubgroup = d3.scaleBand()
		    .domain(groups)
		    .range([0, 100])
		    .padding([0.05])
		



		var color = d3.scaleOrdinal()
		    .domain(groups)
		    .range(['#e41a1c','#377eb8',"#4daf4a","#BDB821","#21B3BD"])
			
		barLayer.selectAll("rect")
					.data(AgeData)

					.join("rect")
					.merge(barLayer)
		            .transition()
		            .duration(2000)
					  .attr("x", function(d,i) {  return xSubgroup(d.Age_group)+x(d.Categories) ; })
					  .attr("y",function(d){ return  y(d.Total)})
					  .attr("width", 20)
					  .attr("height",function(d){ return 300-y(d.Total)})
					  .attr("fill", function(d) { return color(d.Age_group); });

		
		}

	
	});



		
	}
		
}