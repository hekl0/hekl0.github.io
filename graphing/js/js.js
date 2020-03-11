var show = function(){
	var s = "";
	var s2;
	var description = $("#ID").val();
	if (typeof(description) == "undefined" || description === "") return undefined;
	var lines = description.split("\n");
	var result = [];
	var directed = $("#graph_type").val() === "Directed Graph";
	var sep = directed ? "->" : "--";
	for (var i in lines) {
		var line = lines[i].trim();
		if (line.length < 1 || line[0] === "#") {
			continue;
		}
		var elems = line.split(/\s+/);
		if (elems.length < 2) return undefined;
		var from = elems[0];
		var to = elems[1];
		var edge = from +' ' + sep +' ' + to;
		if (elems.length > 2)
			edge += "[label=\"" + elems[2] + "\"]";
		s += from +'[shape="circle"; style="filled"; color="blue"]; '+ to +'[shape="circle" ; style="filled"; color = "blue"]; '+ edge + ';';
	}
	if(sep === "--") s2 = "graph";
	else s2 = "digraph";
	d3.select("#graph-content").graphviz()
		.width($("#graph-content").width())
		.height($("#graph-content").height())
		.transition(function() {
			return d3.transition("main")
				.ease(d3.easeLinear)
				.delay(100)
				.duration(400);
		})
		.renderDot(s2 + '  {' + s + '}');
}
$("#show_button").click(show);

