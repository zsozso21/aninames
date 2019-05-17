//var colors = ["#46ffaf", "#ff6246", "#7a46ff", "#ffbb46"]
var colors = ["#f5b422", "#f20205", "#57a4b8", "#ffffff"]
var num_of_cards = 20

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function show_map(file_name) {
  $("#card_container").empty();
  $("#menu_container").hide();
  $("#card_container").show();
  
  $.ajax({
    type: "GET",
    url: file_name,
    //url: "maps/metal.csv",
    dataType: "text",
    success: function(response)
    {
      words = $.csv.toArrays(response, {"separator": ";"});
      shuffle(words);
      create_map(words.slice(0, num_of_cards));
    }
  });
}

function create_map(words) {
  words.forEach(function(element) {
    var card_div = $("<span>", {"class": 'card'})
    card_div.appendTo($("#card_container"));
    if (element.length > 1) {
      card_div.addClass("image_card");
      card_image_container = $("<div>", {"class": "card_image_container"});
      card_image_container.append($("<img />", {"src": element[1], "class": "card_img"}));
      card_div.append(card_image_container);
    } else {
      card_div.addClass("text_card");
    }
    card_text_span = $("<span>");
    card_text_span.text(element[0]);
    card_div.append(card_text_span);
    card_div.css('background-color', colors[0]);
    var count = 0;
    card_div.click(function() {
      count++;
      $(this).css('background-color', colors[count % 4]);
    })
  });
}

function init_map_size_selector() {
  $("#map_size_4x5").click(function(){
	  num_of_cards = 20;
	  $("#map_size_4x5").addClass("map_size_selected");
	  $("#map_size_5x5").removeClass("map_size_selected");
  });
  
  $("#map_size_5x5").click(function(){
	  num_of_cards = 25;
	  $("#map_size_5x5").addClass("map_size_selected");
	  $("#map_size_4x5").removeClass("map_size_selected");
  });
}

function init_game_list() {
  $.ajax({
    type: "GET",
    url: "maps/maps.csv",
    dataType: "text",
    success: function(response)
    {
      maps = $.csv.toArrays(response, {"separator": ";"});
      create_game_list(maps);
    }
  });
}

function create_game_list(maps) {
  maps.forEach(function(map) {
    var map_list_item = $("<span>", {"class": 'map_list_item card text_card'});
	map_list_item.data("map_url", map[1]);
    map_list_item.appendTo($("#game_list_container"));
    map_list_item.click(function() {
      show_map($(this).data("map_url"));
    });
	
	map_list_item_text_span = $("<span>");
	map_list_item_text_span.appendTo(map_list_item);
	map_list_item_text_span.text(map[0]);
  });
}

$(document).ready(function(){
  $("#menu_container").show();
  $("#card_container").hide();

  init_map_size_selector();
  init_game_list();
});
