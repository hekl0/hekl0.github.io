var get_input = function() {
	var description = $("#ID").val();
	if (typeof(description) == "undefined" || description === "") return undefined;
	
	var lines = description.split("\n");
	var directed = $("#graph_type").val() === "Directed Graph";
	var sep = directed ? "->" : "--";

	var s = directed ? "digraph" : "graph";

	s += '{';
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
	s += '}';

	return s;
}

var render = function(graph) {
	d3.select("#graph-content").graphviz()
		.width($("#graph-content").width())
		.height($("#graph-content").height())
		.transition(function() {
			return d3.transition("main")
				.ease(d3.easeLinear)
				.delay(100)
				.duration(400);
		})
		.renderDot(graph);
}

var show = function() {
	var graph = get_input();
	if (graph !== undefined) {
		render(graph);
		history.pushState({query: "graph"}, "graph", "?q=" + graph);
	}
}

var parse_url_query = function() {
	var url = decodeURI(window.location.href);
	var question_mark = url.indexOf("?");
	if (question_mark < 0)
		return undefined
	else {
		equal_mark = url.indexOf("=");
		return url.substr(equal_mark + 1);
	}
}

var update_content = function(graph) {
	var graph_type = ""
	var data = "";
	var sep = "";
	
    if (graph.substr(0, 6) === "graph{") {
		graph_type = "Undirected Graph";
		data = graph.substr(6, graph.length - 8);
		sep = "--";
    } else if (graph.substr(0, 8) === "digraph{") {
		graph_type = "Directed Graph";
		data = graph.substr(8, graph.length - 10);
		sep = "->";
    } else {
		return;
	}
	
	$("#graph_type").val(graph_type);

	output = [];
	data.split(';').forEach(line => {
		line = line.trim();

		if (line.length < 0) return;

		var sep_position = line.indexOf(sep);
		if (sep_position < 1) return;
		var brace_position = line.indexOf('[');
		if (brace_position < 0) {
			var inNode = line.substr(0, sep_position).trim();
			var outNode = line.substr(sep_position + 2).trim();
			output.push(inNode + " " + outNode);
		} else {
			var inNode = line.substr(0, sep_position).trim();
			var outNode = line.substr(sep_position + 2, brace_position - sep_position - 2).trim();
			var equal_position = line.indexOf('=');
			var label = line.substr(equal_position + 1, line.length - equal_position - 2).trim();
			label = label.substr(1, label.length - 2);
			output.push(inNode + " " + outNode + " " + label);
		}
	});

	$("#ID").val(output.join("\n"));
}

$(document).ready(function() {
	var graph = parse_url_query();
	if (graph !== undefined) {
		update_content(graph);
		render(graph);
	}
	
	$("#show_button").click(show);
});

