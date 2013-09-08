		
		var years=['2008','2009','2010','2011'];
		var colorPalette=new Array ("#E64C3B","#3B97D3","#EFC319","#24AD5F","#884A9D","#34495D","#E57D24","blue","red","yellow");
		// wait until all the resources are loaded
		window.addEventListener("load", findSVGElements, false);
		var colorDon=new Array ("white","transparent");

		


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
			var code_index=0;
			var codes =new Array('VA.EST','CC.EST','GE.EST','PV.EST','RQ.EST','RL.EST');
			var codesDesc =new Array("Voice and Accountability captures perceptions of the extent\nto which a country's citizens are able to participate in \nselecting their  government, as well as freedom of expression,\nfreedom of association, and a free media."
								,"Control of Corruption captures perceptions of the extent to \nwhich public power is exercised for private gain, including \nboth petty and grand forms of corruption, as well as \n'capture' of the state by elites and private interests."
								,"Government Effectiveness captures perceptions of the \nquality of public services, the quality of the civil service and \nthe degree of its independence from political pressures, \nthe quality of policy formulation and implementation, and \nthe  credibility of the government's commitment to such\npolicies"
								,"Political Stability and Absence of Violence/Terrorism captures\nperceptions of the likelihood that the government will be \ndestabilized or overthrown by unconstitutional or violent\nmeans, including politically-motivated violence and terrorism."
								,"Regulatory Quality captures perceptions of the ability of the\ngovernment to formulate and implement sound policies \nand regulations that permit and promote private sector \ndevelopment."
								,"	Rule of Law captures perceptions of the extent to which \nagents have confidence in and abide by the rules of society, \nand in particular the quality of contract enforcement, property\nrights, the police, and the courts, as well as the likelihood \nof crime and violence."
								);
			
			var elms = document.querySelectorAll("#worldmap");
			for (var i = 0; i < elms.length; i++)
			{	
				var subdoc = getSubDocument(elms[i]);
				if (subdoc)

					gCountries=d3.select(subdoc).select("#gCountries");
					gText=d3.select(subdoc).select("#gText");
					gTextA=d3.select(subdoc).select("#gTextA");
					gBars=d3.select(subdoc).select("#gBars");
					gBarsDec=d3.select(subdoc).select("#gBarsDec");
					gBarsText=d3.select(subdoc).select("#gBarsText");
					gPop=d3.select(subdoc).select("#gPop");
					gArc=d3.select(subdoc).select("#gArc");
					gArc2=d3.select(subdoc).select("#gArc2");
					gLabelArc=d3.select(subdoc).select("#gLabelArc");
					gLabelArc2=d3.select(subdoc).select("#gLabelArc2");
					gLabelBars=d3.select(subdoc).select("#gLabelBars");
					gOther=d3.select(subdoc).select("#Layer_2");
					//gMenu=d3.select(subdoc).select("#menu");
					//gBoutons=d3.select(subdoc).select("#gBoutons");
					gInfo=d3.select(subdoc).select("#gInfo");
					gDescription=d3.select(subdoc).select("#gDescription");
					gPage1=d3.select(subdoc).select("#gPage1");
					gPage2=d3.select(subdoc).select("#gPage2");
					gbouton1=d3.select(subdoc).select("#gbouton1");
					gbouton2=d3.select(subdoc).select("#gbouton2");
					//subdoc.getElementById("gTUN").setAttribute("style", "fill:lime");
					//gCountries.selectAll("path").style("stroke-width","0px");
					//subdoc.getElementById("black").setAttribute("d", drawArcs(<?php echo $donnees['nbre_joueurs_max']; ?>));

					
					var clicked="";
					
					
					d3.json("json/worldmap.json", function(error, data) {
					d3.json("json/worldIndicators.json", function(error, data2) {
					
					
					// Nesting
					var countryNest = d3.nest()
					.key(function(d) { return d["Country Code"]; })
					.entries(data);
					
					var doubleNest = d3.nest()
							.key(function(d){return d["Country Code"];})
							.key(function(d){return d["Indicator Code"];})
							.entries(data);	
							
					
					var MaxindicNest = d3.nest()
							.key(function(d){return d["Indicator Code"];})
							.key(function(d){return (d["2011"]);})
							.sortKeys(d3.descending)
							.entries(data);	
							
					

					
					//initialisation des barres
					
					
						gBars.selectAll("rect")
						.data(years)
						.enter()
						.append("rect")
						.attr("x", "1200")
						.attr("y",function (d,i) {return 700+20*i;})
						.attr("width", "0")
						.attr("height", "10")
						.style("opacity","0")
						.style("fill","grey");
					
						gBarsDec.selectAll("rect")
						.data(years)
						.enter()
						.append("rect")
						.attr("x", "1200")
						.attr("y",function (d,i) {return 700+20*i;})
						.attr("width", "100")
						.attr("height", "10")
						.style("opacity","0")
						.style("fill","#DBDBDC");
						
						gBarsText.selectAll("text")
						.data(years)
						.enter()
						.append("text")
						.attr("x", "1165")
						.attr("y",function (d,i) {return 710+20*i;})
						.attr("font-family", "sans-serif")
						.attr("font-size", "13px")                 
						.style("opacity","0")
						.attr("fill","grey")
						.text(function (d,i) {return years[i];});
						
						var τ = 2 * Math.PI;
						
						var arcf=d3.svg.arc()
							.outerRadius(36)
							.innerRadius(32)
							.startAngle(0);
						
						var arc=d3.svg.arc()
							.outerRadius(37)
							.innerRadius(31)
							.startAngle(0);
							
		
						  function arcTween(transition, newAngle) {

								transition.attrTween("d", function(d) {

								var interpolate = d3.interpolate(d.endAngle, newAngle);

								return function(t) {

								d.endAngle = interpolate(t);

								return arc(d);
								};
								});
							}



						var backArc = gArc.append("path")
							.datum({endAngle: τ})
							.style("fill", "#DBDBDC")
							.attr("d", arcf)
							.style("opacity","0");


						var forArc = gArc.append("path")
							.datum({endAngle: 0 * τ})
							.style("fill", "#E64C3B")
							.attr("d", arc)
							.style("opacity","0");

						gArc.attr("transform", "translate(1200,450)");
						
						gArc.append("text")
						.attr("transform",  "translate(0,0)" )
						.attr("dy", ".35em")
						.attr("text-anchor", "middle")
						.attr("font-size", "25")
						.attr("font-family", "'BebasNeue','bebas_neueregular'")
						.text(Math.floor(0))
						.style("fill","#4F4F51")
						.style("opacity","0");

						




						var backArc2 = gArc2.append("path")
							.datum({endAngle: τ})
							.style("fill", "#DBDBDC")
							.attr("d", arcf)
							.style("opacity","0");


						var forArc2 = gArc2.append("path")
							.datum({endAngle: 0 * τ})
							.style("fill", "#945BA4")
							.attr("d", arc)
							.style("opacity","0");

						gArc2.attr("transform", "translate(1200,550)");
						
						gArc2.append("text")
						.attr("transform",  "translate(0,0)" )
						.attr("dy", ".35em")
						.attr("text-anchor", "middle")
						.attr("font-size", "25")
						.attr("font-family", "'BebasNeue','bebas_neueregular'")
						.text(Math.floor(0))
						.style("fill","#4F4F51")
						.style("opacity","0");








	
									
						
			
					//value to color
					function valueToColor(value,min,max){
					var tt=parseFloat((value).replace(",", "."));
					var hh=Math.floor(tt*10);
					
					var uu=((hh-min)/(max-min))*255;
					return Math.floor(uu);
					
					}
					
					//value to height
					function valueToHeightBar(value,min,max){
					var tt=parseFloat((value).replace(",", "."));
					var hh=Math.floor(tt*100)/10;					
					var uu=((hh-min)/(max-min))*100;
					return (uu);
					}					
					
					//return name from country code			
					function getName(countryCode){
					var value;							
					countryNest.forEach(function(d) {if (d.key==countryCode) {value= d.values[0]["Country Name"]}}); 									
					return value;					
					}
					
					//return the name of indicator from  code	
					function getNameCode(code){
					var value;							
					doubleNest.forEach(function(d) {if (d.key=="AFG") {d.values.forEach(function(g){ if (g.key==code) 
																											{value= g.values[0]["Indicator Name"]}																										
																										}) 
																			}
													}); 									
					return value;					
					}
					
					//return indicator
					function getIndicator(code,country,year){
					var value;							
					doubleNest.forEach(function(d) {if (d.key==country) {d.values.forEach(function(g){ if (g.key==code) 
																											{value= g.values[0][year]}																										
																										}) 
																			}
													});
					return value;					
					}
					
					function getFirstRank(code){
					var value;							
					MaxindicNest.forEach(function(d) {if (d.key==code) {value=(d.values[0]).values[0]["Country Name"]}
													});
					return value;					
					}
					
					/*
					function getLastRank(code){
					var value;							
					MaxindicNest.forEach(function(d) {if (d.key==code) {value=(d.values[d.values.length-1]).values[0]["Country Name"]}
													});
					return value;					
					}*/
					
					
					
					
					function getComplementaryIndicator(compCode,country){
					var value;
					
					data2.forEach(function(d) {if (d["Country Code"]==country) {value=d[compCode]}
													});
					return value;					
					}
					
					
					
					
					
					function   Arcupdate(x) {
					var angle=x/100;
					
					gArc.selectAll("path , text").style("opacity","100");
	
					gArc.selectAll("text")
						.text(Math.floor(x));
					
					forArc.transition()
						.duration(750)
						.call(arcTween, angle * τ);
					}
					
					function   Arc2update(x) {
					var angle=x/100;
					
					gArc2.selectAll("path , text").style("opacity","100");
	
					gArc2.selectAll("text")
						.text(Math.floor(x));
					
					forArc2.transition()
						.duration(750)
						.call(arcTween, angle * τ);
					}
					
					
					function formdate(y){
					
					var pop="         "+y+"";
					
					var ull1=pop.substr(pop.length-3,3);
					var ull2=pop.substr(pop.length-6,3);
					var ull3=pop.substr(pop.length-9,3);
					var ull4=pop.substr(pop.length-12,3);
					return (ull4+" "+ull3+" "+ull2+" "+ull1);
					}
							
					
					//affectation mais en vrac
					//gCountries.selectAll("g").data(countryNest).selectAll("path").style("fill",function (d,i){ return "lime"});
					function makeBars(code,country){
					
						
						
						gBars.selectAll("rect")
						.transition()
						.attr("width",function (d,j) {return valueToHeightBar(getIndicator(code,country.substr(1),years[j]),(-25),(25))})
						.attr("x",function (d,j) {return 1200})
						.style("opacity","100")
						.style("fill",function (d,j) {var colorC=valueToColor(getIndicator(code,country.substr(1),years[j]),(-25),(25));	return "rgb("+(255-colorC)+",210,0)"}) ;
						
						
						
						gBarsDec.selectAll("rect").transition().style("opacity","100");
						gBarsText.selectAll("text").transition().style("opacity","100");
					}
					
					
					
					
					
					
					function updateMap(code){
					countryNest.forEach(function(d) {   var colorC=valueToColor(getIndicator(code,d.key,"2011"),(-25),(25));
														gCountries.select("#g"+d.key).selectAll("path").style("fill","rgb("+(255-colorC)+",210,0)")
														});
					
					gCountries.selectAll("g").on("mouseover", function(d) { 

																			var country=(d3.select(this).attr("id"));
																			
																			gCountries.select("#"+country).selectAll("path").style("fill","#DDDDDD");  
																			
																			if (clicked==""){
																			if (country) {
																			gText.transition().style("opacity","100");
																			gText.select("text")
																					.text(getName(country.substr(1)));
																			gLabelBars.selectAll("text,rect,line").style("opacity","100");
																			
																			if (getComplementaryIndicator("Population, total",(country.substr(1)))) {
																			gPop.select("#textp").transition()
																					.text(formdate(getComplementaryIndicator("Population, total",(country.substr(1)))))
																					.style("opacity","100");
																			gPop.select("#popu").style("opacity","100");
																			
																					}
																			
																			else {gPop.selectAll("text").transition().style("opacity","0");};
																			
																			makeBars(code,country);
																			var life=getComplementaryIndicator("Life expectancy at birth, total (years)",(country.substr(1)))
																			if (life) {Arcupdate(life);
																				gLabelArc.style("opacity","100");		
																						} 
																			
																			else {gArc.selectAll("path , text").style("opacity","0");};
																			
																			var internet=getComplementaryIndicator("Internet users (per 100 people)",(country.substr(1)))
																			if (internet) {Arc2update(internet);
																				gLabelArc2.style("opacity","100");		
																						} 
																			
																			else {gArc2.selectAll("path , text").style("opacity","0");};
																			
																			}
																			else{}
																			
																			}
																			  });
					
					gCountries.selectAll("g").on("mouseout", function(d) {	if (clicked=="") {
					
																			var country=(d3.select(this).attr("id"));
																			var colorC=valueToColor(getIndicator(code,country.substr(1),"2011"),(-25),(25));
																			gCountries.select("#"+country).selectAll("path").style("fill","rgb("+(255-colorC)+",210,0)");
																			
																			gText.transition().style("opacity","0");
																			
																			
																			gBars.selectAll("rect").transition().style("opacity","0");
																			gBarsDec.selectAll("rect").transition().style("opacity","0");
																			gBarsText.selectAll("text").transition().style("opacity","0");
																			gPop.selectAll("#textp").transition().style("opacity","0");
																			gPop.select("#popu").style("opacity","0");
																			gArc.selectAll("path , text").style("opacity","0");
																			gLabelArc.style("opacity","0");
																			gArc2.selectAll("path , text").style("opacity","0");
																			gLabelArc2.style("opacity","0");
																			gLabelBars.selectAll("text,rect,line").style("opacity","0");
																			
																			}
																			else {
																			var country=(d3.select(this).attr("id"));
																			var colorC=valueToColor(getIndicator(code,country.substr(1),"2011"),(-25),(25));
																			if (clicked!=country) {
																			
																			gCountries.select("#"+country).selectAll("path").style("fill","rgb("+(255-colorC)+",210,0)"); 
																			}
																			}
																			
																			});
																			
																			
					gCountries.selectAll("g").on("click", function(d) { 
																			if (clicked!="") {
																			var colorC=valueToColor(getIndicator(code,clicked.substr(1),"2011"),(-25),(25));
																			gCountries.select("#"+clicked).selectAll("path").style("fill","rgb("+(255-colorC)+",210,0)"); 
																			
																			};
																			clicked=d3.select(this).attr("id");

																			var country=(d3.select(this).attr("id"));
																			if (country) {
																			gCountries.select("#"+country).selectAll("path").style("fill","#DDDDDD");  
																			gText.transition().style("opacity","100");
																			
																			gText.select("text")
																					.text(getName(country.substr(1)));
																					
																			gLabelBars.selectAll("text,rect,line").style("opacity","100");
																			
																			}
																			else{}
																			
																			if (getComplementaryIndicator("Population, total",(country.substr(1)))) {
																			gPop.select("#textp").transition()
																					.text(formdate(getComplementaryIndicator("Population, total",(country.substr(1)))))
																					.style("opacity","100");
																			gPop.select("#popu").style("opacity","100");
																			
																					}
																			
																			else {gPop.selectAll("text").transition().style("opacity","0");};
																			
																			makeBars(code,country);
																			var life=getComplementaryIndicator("Life expectancy at birth, total (years)",(country.substr(1)))
																			if (life) {Arcupdate(life);
																				gLabelArc.selectAll("text").style("opacity","100");		
																						} 
																			
																			else {gArc.selectAll("path , text").style("opacity","0");};
																			
																			var internet=getComplementaryIndicator("Internet users (per 100 people)",(country.substr(1)))
																			if (internet) {Arc2update(internet);
																				gLabelArc2.style("opacity","100");		
																						} 
																			
																			else {gArc2.selectAll("path , text").style("opacity","0");};																		
																			
																			  });



					gOther.on("click", function(d) { 				 if (clicked=="") {}
																		else{
																			var colorC=valueToColor(getIndicator(code,clicked.substr(1),"2011"),(-25),(25));
																			gCountries.select("#"+clicked).selectAll("path").style("fill","rgb("+(255-colorC)+",210,0)"); 
																			
																			gText.transition().style("opacity","0");
																			
																			gBars.selectAll("rect").transition().style("opacity","0");
																			gBarsDec.selectAll("rect").transition().style("opacity","0");
																			gBarsText.selectAll("text").transition().style("opacity","0");
																			gPop.selectAll("#textp").transition().style("opacity","0");
																			gPop.select("#popu").style("opacity","0");
																			gArc.selectAll("path , text").style("opacity","0");
																			gLabelArc.style("opacity","0");
																			gArc2.selectAll("path , text").style("opacity","0");
																			gLabelArc2.style("opacity","0");
																			gLabelBars.selectAll("text,rect,line").style("opacity","0");
																			
																			clicked="";
																			}
																			
																			});


					
					d3.select(subdoc).select("#textx").text(getNameCode(codes[code_index]));
					
					
					
					}
	
	
	
	
					
					
					
					
					
					
					
					
					
					
					
					
					
		
		
		


		
	function axometredata(data2,data) {
		
	
		var xorigin=332;
		var yorigin=595;
		var endPointY=yorigin-356;
		var endPointX=xorigin+470;
		var ColorOriginX=0; //initialisation à la position de TypeColor
		var ColorOriginY=0; //initialisation à la position de TypeColor
		var xAxe =new Array('Internet users (per 100 people)','GDP per capita (current US$)','Inflation, consumer prices (annual %)','Population, total','Life expectancy at birth, total (years)','Imports of goods and services (% of GDP)'); //must be an int maximum=100
		var yAxe =codes;

		var xaxe_index=0;
		var yaxe_index=0;
		var max=0;
		var min=0;
		
		function normalx(a,index){
		//if (index==3) {max =700000000};
		//if (index==2) {max =25};
		return(xorigin+ (((a-min)/(max-min))*(endPointX-xorigin)));
		}
		
		function normaly(a){
	
		//var max=d3.max(x, function(datum) { return datum[yAxe]; });
		return(yorigin - ((((a+2.5)*20)/100)*(yorigin-endPointY)));}
		
		
	
		
				// Containers selection
				var svgContainer = d3.select(subdoc).select("#Points");
				
				
				
				
				// Data 
										 
				var circles = svgContainer.selectAll("circle")
                          .data(data2)
                          .enter()
                         .append("circle"); 
				

				//alert(getIndicator("VA.EST",d["Country Code"],"2011"));
				// circle attribues
				//return the max with d3.max et map -------------------------------------------
				max=(d3.max(data2.map(function(d) {return d[xAxe[xaxe_index]];} )));
				min=(d3.min(data2.map(function(d) {return d[xAxe[xaxe_index]];} )));
				var circleAttributes = circles
                       .attr("cx", function (d) {if(d[xAxe[xaxe_index]])  {return (normalx(d[xAxe[xaxe_index]],xaxe_index)); } else {d3.select(this).remove()}})
                       .attr("cy", function (d) {var ind=(getIndicator(yAxe[yaxe_index],d["Country Code"],"2011")); if (ind) { var pp=parseFloat(ind.replace(",", ".")); return (normaly(pp)); } else{d3.select(this).remove()} } )
                       .attr("r", 6)
					   //.on("click", function(d,i) { alert("Hello world"); })							
                       .style("fill", function (d) {var ind2=(getIndicator(yAxe[yaxe_index],d["Country Code"],"2011"));
													if (ind2) {
													var colorC=valueToColor(ind2,(-25),(25));
													return "rgb("+(255-colorC)+",210,0)";}
													else {
													return "grey"
													}
													
													})
						.style("opacity",0.7);
				


				d3.select(subdoc).select("#textyA").text(getNameCode(yAxe[yaxe_index])).style("fill","#232323");
				// change text x Axe
				d3.select(subdoc).select("#textxA").text(xAxe[xaxe_index]).style("fill","#232323");	

				
					
				// next and precious xAxis
				d3.select(subdoc).select("#nextXaxisA").on("click", function (d) {
																	if (xaxe_index < xAxe.length -1 ) 
																	{
																	xaxe_index=xaxe_index+1; 
																	max=(d3.max(data2.map(function(d) {return d[xAxe[xaxe_index]];} )));
																	min=(d3.min(data2.map(function(d) {return d[xAxe[xaxe_index]];} )));
																	svgContainer.selectAll("circle")
																		.transition()
																		.attr("cx", function (d) {if(d[xAxe[xaxe_index]])  {return (normalx(d[xAxe[xaxe_index]],xaxe_index)); } else {d3.select(this).remove()}})
																	
																	d3.select(subdoc).select("#textxA").text(xAxe[xaxe_index]);
																	d3.select(subdoc).select("#previousButton_xaxeA").style("fill","#36B555");
																	};	
																	if (xaxe_index == xAxe.length -1) {d3.select(subdoc).select("#nextButton_xaxeA").style("fill","#BCBEC0");}										
																	
																			});
																			
																				
				d3.select(subdoc).select("#previousXaxisA").on("click", function (d) { if (xaxe_index > 0 )
																		{
																		xaxe_index=xaxe_index-1; 
																		max=(d3.max(data2.map(function(d) {return d[xAxe[xaxe_index]];} )));
																		min=(d3.min(data2.map(function(d) {return d[xAxe[xaxe_index]];} )));
																		svgContainer.selectAll("circle")
																			.transition()
																			.attr("cx", function (d) {if(d[xAxe[xaxe_index]])  {return (normalx(d[xAxe[xaxe_index]],xaxe_index)); } else {d3.select(this).remove()}})
																			
																		d3.select(subdoc).select("#textxA").text(xAxe[xaxe_index]);	
																		d3.select(subdoc).select("#nextButton_xaxeA").style("fill","#36B555");
																		};	
																		
																		if (xaxe_index == 0) {d3.select(subdoc).select("#previousButton_xaxeA").style("fill","#BCBEC0");}
																			
																	});
																	
																	
				d3.select(subdoc).select("#nextYaxisA").on("click", function (d) {
																	if (yaxe_index < yAxe.length -1 ) 
																	{
																	yaxe_index=yaxe_index+1; 
																	svgContainer.selectAll("circle")
																		.transition()
																		.attr("cy", function (d) {var ind=(getIndicator(yAxe[yaxe_index],d["Country Code"],"2011")); if (ind) { var pp=parseFloat(ind.replace(",", ".")); return (normaly(pp)); } else{d3.select(this).remove()} } )
																		.style("fill", function (d) {
																					var ind2=(getIndicator(yAxe[yaxe_index],d["Country Code"],"2011"));
																					if (ind2) {
																					var colorC=valueToColor(ind2,(-25),(25));
																					return "rgb("+(255-colorC)+",210,0)";}
																					else {
																					return "grey"
																					}
																					});
																	d3.select(subdoc).select("#textyA").text(getNameCode(yAxe[yaxe_index])).style("fill","#232323");
																	d3.select(subdoc).select("#previousButton_yaxeA").style("fill","#36B555");
																	};	
																	if (yaxe_index == yAxe.length -1) {d3.select(subdoc).select("#nextButton_yaxeA").style("fill","#BCBEC0");}										
																	
																			});
																			
																				
				d3.select(subdoc).select("#previousYaxisA").on("click", function (d) { if (yaxe_index > 0 )
																		{
																		yaxe_index=yaxe_index-1; 
																		svgContainer.selectAll("circle")
																			.transition()
																			.attr("cy", function (d) {var ind=(getIndicator(yAxe[yaxe_index],d["Country Code"],"2011")); if (ind) { var pp=parseFloat(ind.replace(",", ".")); return (normaly(pp)); } else{d3.select(this).remove()} } )
																			.style("fill", function (d) {
																					var ind2=(getIndicator(yAxe[yaxe_index],d["Country Code"],"2011"));
																					if (ind2) {
																					var colorC=valueToColor(ind2,(-25),(25));
																					return "rgb("+(255-colorC)+",210,0)";}
																					else {
																					return "grey"
																					}
																					});
																					
																		d3.select(subdoc).select("#textyA").text(getNameCode(yAxe[yaxe_index])).style("fill","#232323");	
																		d3.select(subdoc).select("#nextButton_yaxeA").style("fill","#36B555");
																		};	
																		
																		if (yaxe_index == 0) {d3.select(subdoc).select("#previousButton_yaxeA").style("fill","#BCBEC0");}
																			
																	});


																														
				svgContainer.selectAll("circle").on("mouseover" ,function (d) {svgContainer.selectAll("circle").transition().attr("r",function (g) {if (d==g) {return 8;}
																																					else {return 6;}
																																					});
																																														
																				gTextA.select("text").transition()
																					.text(function () {return getName(d["Country Code"])})
																					.style("opacity","100");																
																																								
																				});
				
				
																						
				svgContainer.selectAll("circle").on("mouseout" ,function (d) {svgContainer.selectAll("circle").transition().attr("r",6);
				
																			gTextA.select("text").transition()
																					.style("opacity","0");
																				});		

	
		

		
		}
					
					
					

					
					
					
					
				gPage2.attr("transform","translate(100,100)");	
				axometredata(data2,data);	
				
				updateMap(codes[code_index]);
					
					
					
					
					d3.select(subdoc).select("#nextXaxis").on("click", function (d) {
																	if (code_index < codes.length -1 ) 
																	{
																	
																	code_index=code_index+1; 
																	//alert(code_index);
																	updateMap(codes[code_index]);
																	
																    //gMenu.select("#gselectLine").transition().duration(600).attr("transform","translate("+code_index*100+",0)");
																	//gMenu.select("#selectMenu").attr("transform","translate("+code_index*100+",0)");
																	
																	d3.select(subdoc).select("#textx").text(getNameCode(codes[code_index]));
																	d3.select(subdoc).select("#previousButton_xaxe").style("fill","#36B555");
																	};	
																	if (code_index == codes.length -1) {d3.select(subdoc).select("#nextButton_xaxe").style("fill","#BCBEC0");}										
																	
																			});
																			
																				
					d3.select(subdoc).select("#previousXaxis").on("click", function (d) { if (code_index > 0 )
																		{
																		
																		code_index=code_index-1; 
																		updateMap(codes[code_index]);
																		
																	//gMenu.select("#gselectLine").transition().duration(600).attr("transform","translate("+code_index*100+",0)");
																	//gMenu.select("#selectMenu").attr("transform","translate("+code_index*100+",0)");
																			
																		d3.select(subdoc).select("#textx").text(getNameCode(codes[code_index]));
																		d3.select(subdoc).select("#nextButton_xaxe").style("fill","#36B555");
																		};	
																		
																		if (code_index == 0) {d3.select(subdoc).select("#previousButton_xaxe").style("fill","#BCBEC0");}
																			
																	});
					
					
					
					/*gBoutons.selectAll("g").on("mouseover", function (d,i) {
					
					
														var position=+d3.select(this).attr("id").substr(1);
														//d3.select(this).style("opacity","0");
														gMenu.select("#gselectLine").transition().duration(500).attr("transform","translate("+position*100+",0)");
														d3.select(subdoc).select("#textx").text(getNameCode(codes[position]));
						
												});
					
					
					gBoutons.selectAll("g").on("mouseout", function (d,i) {
					
														
														
														//var position=d3.select(this).attr("id").substr(1);
														//d3.select(this).style("opacity","0");
														gMenu.select("#gselectLine").transition().duration(500).attr("transform","translate("+code_index*100+",0)");
														d3.select(subdoc).select("#textx").text(getNameCode(codes[code_index]));
														
												});
					
					
					
					
					gBoutons.selectAll("g").on("click", function (d,i) {
					
														var position=+d3.select(this).attr("id").substr(1);
														
														code_index=position; 
														updateMap(codes[code_index]);
																	
														gMenu.select("#gselectLine").transition().duration(600).attr("transform","translate("+code_index*100+",0)");
														gMenu.select("#selectMenu").attr("transform","translate("+code_index*100+",0)");
																	
														d3.select(subdoc).select("#textx").text(getNameCode(codes[code_index]));
														d3.select(subdoc).select("#previousButton_xaxe").style("fill","#36B555");
														d3.select(subdoc).select("#nextButton_xaxe").style("fill","#36B555");
														
														if (code_index == codes.length -1) {d3.select(subdoc).select("#nextButton_xaxe").style("fill","#BCBEC0");};
														if (code_index == 0) {d3.select(subdoc).select("#previousButton_xaxe").style("fill","#BCBEC0");};
					
														//clickedbutton=position;
												});
					*/
					
					
					
					gInfo.on("mouseover",function (d,i) {
											//alert('hh');
											gInfo.select("#gInfoIcon").style("fill","white");
											gInfo.select("#gInfoCercle").style("fill","grey");
											
											var insertLinebreaks = function (d) {
											var el = d3.select(this);
											var words = codesDesc[code_index].split('\n');
											el.text('');

											for (var i = 0; i < words.length; i++) {
											var tspan = el.append('tspan').text(words[i]);
											if (i > 0)
											tspan.attr('x', 0).attr('dy', '15');
											}
											};

											
											gDescription.selectAll("text").each(insertLinebreaks);
											gDescription.style("opacity","100");
											});
					
					gInfo.on("mouseout",function (d,i) {
											
											gInfo.select("#gInfoIcon").style("fill","white");
											gInfo.select("#gInfoCercle").style("fill","#36B555");
											gDescription.style("opacity","0");
											});
					
					
					
					var pageclick=1;
					gbouton1.on("click",function (d,i) {
											
											gPage1.style("display","block");
											gPage2.style("display","none");
											gbouton1.selectAll("path").style("fill","#22AD5F");
											gbouton2.selectAll("path").style("fill","#B8B8B8");
											pageclick=1;
											});
											
											
					gbouton2.on("click",function (d,i) {
											gPage2.style("display","block");
											gPage1.style("display","none");
											gbouton2.selectAll("path").style("fill","#22AD5F");
											gbouton1.selectAll("path").style("fill","#B8B8B8");
											pageclick=2;
											});		
											
					gbouton2.on("mouseover",function (d,i) {if (pageclick==1) {gbouton2.selectAll("path").style("fill","#D1D1D1");};});
					gbouton2.on("mouseout",function (d,i) {if (pageclick==1) {gbouton2.selectAll("path").style("fill","#B8B8B8");}});
					gbouton1.on("mouseover",function (d,i) {if (pageclick==2) {gbouton1.selectAll("path").style("fill","#D1D1D1");};});
					gbouton1.on("mouseout",function (d,i) {if (pageclick==2) {gbouton1.selectAll("path").style("fill","#B8B8B8");};});
					
					});
					});
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
					
			}
		}
		
		
		
		