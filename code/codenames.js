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

$(document).ready(function(){

  $.ajax({
    type: "GET",
    url: "maps/myanimelist_most_popular_200.csv",
    //url: "maps/metal.csv",
    dataType: "text",
    success: function(response)
    {
      words = $.csv.toArrays(response, {"separator": ";"});
      shuffle(words);
      create_map(words.slice(0, num_of_cards));
    }
  });

});
