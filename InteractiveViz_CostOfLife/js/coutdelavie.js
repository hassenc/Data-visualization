		cdlv={};
		cdlv.colorPalette=new Array ("#E64C3B","#3B97D3","#EFC319","#24AD5F","#884A9D","pink","#E57D24","blue","#22AD5F","yellow");
		// wait until all the resources are loaded
		window.addEventListener("load", findSVGElements, false);
	

		


		// fetches the document for the given embedding_element
		function getSubDocument(embedding_element)
		{	
			if (embedding_element.contentDocument) 
			{
				return embedding_element.contentDocument;
			} 
			else 
			{
				var subdoc = null;
				try {
					subdoc = embedding_element.getSVGDocument();
				} catch(e) {}
				return subdoc;
			}
		}
		
		
		function findSVGElements()
		{	
			
			
			var elms = document.querySelectorAll("#coutdelavie");
			for (var i = 0; i < elms.length; i++)
			{	
				var subdoc = getSubDocument(elms[i]);
				if (subdoc)

					cdlv.gFrance=d3.select(subdoc).select("#gFrance");
					cdlv.gOther=d3.select(subdoc).select("#gSeaBase");
					cdlv.gLines=d3.select(subdoc).select("#gLines");
					cdlv.gAxe=d3.select(subdoc).select("#gAxe");
					cdlv.gText=d3.select(subdoc).select("#gText");
					cdlv.gPrices=d3.select(subdoc).select("#gPrices");
					cdlv.bouton1=d3.select(subdoc).select("#bouton1");
					cdlv.bouton2=d3.select(subdoc).select("#bouton2");
					cdlv.bouton3=d3.select(subdoc).select("#bouton3");
					cdlv.gInfo=d3.select(subdoc).select("#gInfo");
					cdlv.gInfoPrix=d3.select(subdoc).select("#gInfoPrix");
					cdlv.gIcones1=d3.select(subdoc).select("#gIcones1");
					cdlv.gIcones2=d3.select(subdoc).select("#gIcones2");
					cdlv.gIcones3=d3.select(subdoc).select("#gIcones3");
					cdlv.link=d3.select(subdoc).select("#link");
					
					cdlv.link.attr("transform", "translate(1000,0)");
					
					var clicked="";
					var str3="#gIconInfo3";
					var str2="#gIconInfo2";
					var str1="#gIconInfo1";
					var str=str1;
					
					var categorie3=new Array("Fitness Club, Monthly Fee for 1 Adult","Tennis Court Rent (1 Hour on Weekend)","Cinema, International Release, 1 Seat","1 Pair of Jeans (Levis 501 Or Similar)","1 Summer Dress in a Chain Store (Zara, H&M, ...)","1 Pair of Nike Shoes","1 Pair of Men Leather Shoes");
					var categorie2=new Array("Apartment (1 bedroom) in City Centre","Apartment (1 bedroom) Outside of Centre","Apartment (3 bedrooms) in City Centre","Apartment (3 bedrooms) Outside of Centre","Price per Square Meter to Buy Apartment in City Centre","Price per Square Meter to Buy Apartment Outside of Centre");
					var categorie1=new Array("Apples (1kg)","Oranges (1kg)","Potato (1kg)","Milk (regular), 1 liter","Loaf of Fresh White Bread (500g)","Rice (1kg)","Tomato (1kg)");
					var categorie=categorie1;
					
					d3.json("json/coutdelavie.json", function(error, data) {
					
					
					function linechart(categorie) {
					var xorigin=500;
					var yorigin=850;
					var height=300;
					var horigin=100;

					var catlength=categorie.length;
					max=4;
					min=0;						
					var scaley=d3.scale.linear().domain([min, max]).range([horigin, horigin+height]);
							
					for (var k = 0; k < catlength; k++)
						{
					
					
						
					var line = d3.svg.line()
						.x(function(d,i) { 
							return xorigin+150*k+150*i; })
						.y(function(d) { 
							return yorigin-scaley(d); });
							
						cdlv.gLines.append("g").selectAll("circle")
                          .data(data)
                          .enter()
						 .append("circle")
						 .attr("class",function(d) {return k+d["City"]})
						 .attr("r",6)
						 .attr("cx",function(d,c) {return xorigin+150*k})
						 .attr("cy",function(d,c) {return yorigin-scaley(d[categorie[k]])})
						 .style("fill",function(d,c) {return cdlv.colorPalette[c];});
						 cdlv.gLines.append("g").selectAll("path")
						  .data(data)
                          .enter()
						  .append("path")
						  .attr("d",function(d) {return line([d[categorie[k]],d[categorie[k+1]]])})
						  .attr("class",function(d) {return d["City"]})
						  .style("stroke",function(d,c) {return cdlv.colorPalette[c];}).style("stroke-width",2);
						  
						  
						}
					
					var scaleyInv=d3.scale.linear().domain([max, min]).range([horigin, horigin+height]);
					var yAxisRight2=d3.svg.axis().scale(scaleyInv).ticks(4).orient("right").tickSize(-920).tickSubdivide(true);
					var yAxisRight = d3.svg.axis().scale(scaleyInv).ticks(4).orient("right");
					cdlv.gAxe.append("g")
								.attr("class", "y axis")
								.attr("transform", "translate(1420,"+(yorigin-horigin-height-100)+")")
								.call(yAxisRight);
					cdlv.gAxe.append("g")
								.attr("class", "y axis2")	
								.attr("transform", "translate(1420,"+(yorigin-horigin-height-100)+")")
								.call(yAxisRight2);
					}
					
					
					function linechart2(categorie) {
					var xorigin=600;
					var yorigin=850;
					var height=500;
					var horigin=100;
					max=10000;
					min=200;
					
					var scaley=d3.scale.linear().domain([min, max]).range([horigin, horigin+height]);
					
					var catlength=categorie.length;
					
							
					for (var k = 0; k < catlength; k++)
						{
					
		
						
					var line = d3.svg.line()
						.x(function(d,i) { 
							return xorigin+150*k+150*i; })
						.y(function(d) { 
							return yorigin-scaley(d); });
							
						cdlv.gLines.append("g").selectAll("circle")
                          .data(data)
                          .enter()
						 .append("circle")
						 .attr("class",function(d) {return k+d["City"]})
						 .attr("r",6)
						 .attr("cx",function(d,c) {return xorigin+150*k})
						 .attr("cy",function(d,c) {return yorigin-scaley(d[categorie[k]])})
						 .style("fill",function(d,c) {return cdlv.colorPalette[c];});
						 cdlv.gLines.append("g").selectAll("path")
						  .data(data)
                          .enter()
						  .append("path")
						  .attr("d",function(d) {return line([d[categorie[k]],d[categorie[k+1]]])})
						  .attr("class",function(d) {return d["City"]})
						  .style("stroke",function(d,c) {return cdlv.colorPalette[c];}).style("stroke-width",2);
						}
					var scaleyInv=d3.scale.linear().domain([max, min]).range([horigin, horigin+height]);
					var yAxisRight2=d3.svg.axis().scale(scaleyInv).ticks(4).orient("right").tickSize(-920).tickSubdivide(true);
					var yAxisRight = d3.svg.axis().scale(scaleyInv).ticks(4).orient("right");
					cdlv.gAxe.append("g")
								.attr("class", "y axis")
								.attr("transform", "translate(1420,"+(yorigin-horigin-height-100)+")")
								.call(yAxisRight);
					cdlv.gAxe.append("g")
								.attr("class", "y axis2")	
								.attr("transform", "translate(1420,"+(yorigin-horigin-height-100)+")")
								.call(yAxisRight2);
					}
					
					
					
					function linechart3(categorie) {
					var xorigin=500;
					var yorigin=850;
					var height=300;
					var horigin=100;
					
					var catlength=categorie.length;
					max=200;
					min=0;						
					var scaley=d3.scale.linear().domain([min, max]).range([horigin, horigin+height]);
							
					for (var k = 0; k < catlength; k++)
						{
					
				
						
					var line = d3.svg.line()
						.x(function(d,i) { 
							return xorigin+150*k+150*i; })
						.y(function(d) { 
							return yorigin-scaley(d); });
							
						cdlv.gLines.append("g").selectAll("circle")
                          .data(data)
                          .enter()
						 .append("circle")
						 .attr("class",function(d) {return k+d["City"]})
						 .attr("r",6)
						 .attr("cx",function(d,c) {return xorigin+150*k})
						 .attr("cy",function(d,c) {return yorigin-scaley(d[categorie[k]])})
						 .style("fill",function(d,c) {return cdlv.colorPalette[c];});
						 cdlv.gLines.append("g").selectAll("path")
						  .data(data)
                          .enter()
						  .append("path")
						  .attr("d",function(d) {return line([d[categorie[k]],d[categorie[k+1]]])})
						  .attr("class",function(d) {return d["City"]})
						  .style("stroke",function(d,c) {return cdlv.colorPalette[c];}).style("stroke-width",2);
						}
					var scaleyInv=d3.scale.linear().domain([max, min]).range([horigin, horigin+height]);
					var yAxisRight2=d3.svg.axis().scale(scaleyInv).ticks(4).orient("right").tickSize(-920).tickSubdivide(true);
					var yAxisRight = d3.svg.axis().scale(scaleyInv).ticks(4).orient("right");
					cdlv.gAxe.append("g")
								.attr("class", "y axis")
								.attr("transform", "translate(1420,"+(yorigin-horigin-height-100)+")")
								.call(yAxisRight);
					cdlv.gAxe.append("g")
								.attr("class", "y axis2")	
								.attr("transform", "translate(1420,"+(yorigin-horigin-height-100)+")")
								.call(yAxisRight2);
					}
					
					
					
					
					function getPrice(subcat,city){
					data.forEach(function(d) {if (d["City"]==city) {value= d[subcat]}}); 
					return value;
					}
					
					function Initprices(categorie) {
					
					cdlv.gPrices.selectAll("text")
						.data(categorie)
						.enter()
						.append("text")
						.text("")
						.attr("x", 50)
						.attr("y",700)
						.attr("font-family", "sans-serif")
						.attr("font-size", "16px")                 
						.style("opacity","0")
						.attr("fill","white")
					}
					function updatePrices(city,categorie) {
					
					cdlv.gPrices.selectAll("text")
						.data(categorie)
						.transition()
						.text(function(d) {return d+" :"+getPrice(d,city)+"€"})
						.attr("x", 100)
						.attr("y",function (d,i) {return 600+20*i;alert("yo")})
						.attr("font-family", "sans-serif")
						.attr("font-size", "16px")                 
						.style("opacity",0.8)
						.attr("fill","white")
					}
					
					
					function InitInfo() {
					
					cdlv.gInfo.append("text")
						.text("")
						.attr("x", 670)
						.attr("y",360)
						.attr("font-family", "robotothin")
						.attr("font-size", "16px")                 
						.style("opacity","0")
						.attr("fill","white");
						
					cdlv.gInfoPrix.append("text")
						.text("")
						.attr("x", 670)
						.attr("y",330)
						.attr("font-family", "bebas_neueregular")
						.attr("font-size", "18px")                 
						.style("opacity","0")
						.attr("fill","white")
					}
					
					
					
					function updateInfo(city,subcategorie) {
					
					cdlv.gInfoPrix.selectAll("text")
						.text(function(d) {return getPrice(subcategorie,city)+" €"})
						.attr("x", 660)
						.attr("y",function (d) {return 370})
						.attr("font-family", "bebas_neueregular")
						.attr("font-size", "30px")                 
						.style("opacity","100")
						.attr("fill","white");
						
					cdlv.gInfo.selectAll("text")
						.text(function(d) {return subcategorie})
						.attr("x", 660)
						.attr("y",function (d) {return 330})
						.attr("font-family", "robotothin")
						.attr("font-size", "20px")                 
						.style("opacity","100")
						.attr("fill","white");
					}
					
					function showImage(str,subcategorie){
					
					cdlv.gIconInfo=d3.select(subdoc).select(str);
					cdlv.gIconInfo.selectAll("g").attr("opacity",function(d) {var j=d3.select(this).attr("id").substr(5,6);if (j==subcategorie) {return 100} else {return 0}});
					
					}
					function hideImage(str){
					
					cdlv.gIconInfo=d3.select(subdoc).select(str);
					cdlv.gIconInfo.selectAll("g").attr("opacity", 0);
					
					}
					
					
					function updateFrance(categorie){
					//change the size considering the category
					
					cdlv.gFrance.selectAll("g").on("mouseover", function(d) { 

																			var city=(d3.select(this).attr("id"));
																			
																			cdlv.gFrance.select("#"+city).selectAll("circle").style("fill","#22AD5F");  
																			
																			
																			if (clicked==""){
																			if (city) {
																			cdlv.gText.select("text").text(city.substr(1)).style("opacity",100);
																			cdlv.gLines.selectAll("g").selectAll("path ,circle").style("opacity" ,function (d) {if (city=="g"+d["City"]) {return(1)} else {return 0.2}});
																			//Initprices(categorie);
																			//updatePrices(city.substr(1),categorie);
																			}
																			else{}
																			
																			}
																			  });
					
					cdlv.gFrance.selectAll("g").on("mouseout", function(d) {	if (clicked=="") {
																				
																			var city=(d3.select(this).attr("id"));
																			
																			cdlv.gFrance.select("#"+city).selectAll("circle").style("fill","white");  
																			cdlv.gText.select("text").style("opacity",0);
																			cdlv.gLines.selectAll("g").selectAll("path ,circle").style("opacity" ,function (d) {return(1)});
																			
																			}
																			else {
																			var city=(d3.select(this).attr("id"));
																			if (clicked!=city) {
																			cdlv.gFrance.select("#"+city).selectAll("circle").style("fill","white"); 
																			}
																			}
																			
																			});
																			
																	
					cdlv.gFrance.selectAll("g").on("click", function(d) { 
																			if (clicked!="") {
																			cdlv.gText.select("text").style("opacity",0);
																			cdlv.gFrance.select("#"+clicked).selectAll("circle").style("fill","white"); 
																			
																			};
																			clicked=d3.select(this).attr("id");
																			
																			cdlv.gFrance.select("#"+clicked).selectAll("circle").style("fill","#22AD5F");
																			
																			var city=(d3.select(this).attr("id"));
																			if (city) {
																			cdlv.gLines.selectAll("g").selectAll("path ,circle").style("opacity" ,function (d) {if (city=="g"+d["City"]) {return(1)} else {return 0.2}});
																			cdlv.gText.select("text").text(city.substr(1)).style("opacity",100);
																			//Initprices(categorie);
																			//updatePrices(city.substr(1),categorie);
																			}
																			else{}																
																			
																			  });



					cdlv.gOther.on("click", function(d) {				 if (clicked=="") {}
																		else{
																			
																			cdlv.gFrance.select("#"+clicked).selectAll("circle").style("fill","white");
																			clicked="";
																			cdlv.gText.select("text").style("opacity",0);
																			cdlv.gLines.selectAll("g").selectAll("path ,circle").style("opacity" ,function (d) {return(1)});
																			}
																			
																			});
					
					
					
					}
					
					
					
					function hoverAxe(categorie)
					{
					cdlv.gLines.selectAll("g").selectAll("path").on("mouseover", function(d) {
																		var city1=(d3.select(this).attr("class"));
																		cdlv.gText.select("text").text(city1).style("opacity",100);
																		cdlv.gLines.selectAll("g").selectAll("path ,circle").style("opacity" ,function (d) {if (city1==d["City"]) {return(1)} else {return 0.2}}).transition();
																		cdlv.gFrance.selectAll("circle").style("fill","white");
																		cdlv.gFrance.select("#g"+city1).selectAll("circle").style("fill","#22AD5F");
																		//Initprices(categorie);
																		//updatePrices(city1,categorie);
																		
																		});
					
					cdlv.gLines.selectAll("g").selectAll("path ").on("mouseout", function(d) {
																		cdlv.gText.select("text").style("opacity",0);
																		var city1=(d3.select(this).attr("class"));
																		cdlv.gLines.selectAll("g").selectAll("path ,circle").style("opacity" ,function (d) {return 1}).transition();
																		cdlv.gFrance.select("#g"+city1).selectAll("circle").style("fill","white");
																		
																		});
					}
					
					
					
						function circleHover(str,categorie){
						
					cdlv.gLines.selectAll("g").selectAll("circle").on("mouseover", function(d) {
																		var city1=(d3.select(this).attr("class")).substr(1);
																		var subcategorie=((d3.select(this).attr("class")).substr(0,1));
																		cdlv.gText.select("text").text(city1).style("opacity",100);
																		cdlv.gLines.selectAll("g").selectAll("path ,circle").style("opacity" ,function (d) {if (city1==d["City"]) {return(1)} else {return 0.2}}).transition();
																		cdlv.gFrance.selectAll("circle").style("fill","white");
																		cdlv.gFrance.select("#g"+city1).selectAll("circle").style("fill","#22AD5F");
																		//Initprices(categorie);
																		//updatePrices(city1,categorie);
																		updateInfo(city1,categorie[subcategorie]);
																		showImage(str,subcategorie);
																		d3.select(this).transition().attr("r",7);
																		});
					cdlv.gLines.selectAll("g").selectAll("circle").on("mouseout", function(d) {
																		cdlv.gText.select("text").style("opacity",0);
																		cdlv.gInfo.select("text").style("opacity",0);
																		cdlv.gInfoPrix.select("text").style("opacity",0);
																		var city1=(d3.select(this).attr("class"));
																		cdlv.gLines.selectAll("g").selectAll("path ,circle").style("opacity" ,function (d) {return 1}).transition();
																		cdlv.gFrance.select("#g"+city1).selectAll("circle").style("fill","white");
																		d3.select(this).transition().attr("r",6);
																		hideImage(str)
																		});
					}
					
					
					InitInfo() 
					Initprices(categorie)
					updateFrance(categorie);
					linechart(categorie);
					hoverAxe(categorie);
					circleHover(str,categorie);												
					
					
					cdlv.bouton1.on("mouseover",function(d) {	(d3.select(this).selectAll("path").attr("opacity",0.9));});
					cdlv.bouton2.on("mouseover",function(d) {	(d3.select(this).selectAll("path").attr("opacity",0.9));});
					cdlv.bouton3.on("mouseover",function(d) {	(d3.select(this).selectAll("path").attr("opacity",0.9));});
					cdlv.bouton1.on("mouseout",function(d) {	(d3.select(this).selectAll("path").attr("opacity",1));});
					cdlv.bouton2.on("mouseout",function(d) {	(d3.select(this).selectAll("path").attr("opacity",1));});
					cdlv.bouton3.on("mouseout",function(d) {	(d3.select(this).selectAll("path").attr("opacity",1));});
					cdlv.bouton2.on("click", function(d) {	str=str2;
															categorie=categorie2;
															cdlv.gAxe.selectAll("g")
																			.remove();
															cdlv.gLines.selectAll("g")
																			.remove();
																		
															updateFrance(categorie);
															
															linechart2(categorie);
															hoverAxe(categorie);
															//Initprices(categorie);
															circleHover(str,categorie);
															cdlv.gIcones1.selectAll("g").attr("opacity",0);
															cdlv.gIcones2.selectAll("g").attr("opacity",100);
															cdlv.gIcones3.selectAll("g").attr("opacity",0);
															});
					
					cdlv.bouton1.on("click", function(d) {str=str1;
															categorie=categorie1;
															cdlv.gAxe.selectAll("g")
																			.remove();
															cdlv.gLines.selectAll("g")
																			.remove();
																		
															updateFrance(categorie);
															
															linechart(categorie);
															hoverAxe(categorie);
															//Initprices(categorie);
															circleHover(str,categorie);
															cdlv.gIcones1.selectAll("g").attr("opacity",100);
															cdlv.gIcones2.selectAll("g").attr("opacity",0);
															cdlv.gIcones3.selectAll("g").attr("opacity",0);
																			});
																			
					cdlv.bouton3.on("click", function(d) {str=str3;
															categorie=categorie3;
															cdlv.gAxe.selectAll("g")
																			.remove();
															cdlv.gLines.selectAll("g")
																			.remove();
																		
															updateFrance(categorie);
															
															linechart3(categorie);
															hoverAxe(categorie);
															//Initprices(categorie);
															circleHover(str,categorie);
															cdlv.gIcones1.selectAll("g").attr("opacity",0);
															cdlv.gIcones2.selectAll("g").attr("opacity",0);
															cdlv.gIcones3.selectAll("g").attr("opacity",100);
																			});
					
					});
					
					
					
					
					
					
					
			}
		}
		
		
		
		