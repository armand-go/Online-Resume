$(document).ready(function() {
  var $_btn_primary = $(".btn-primary");

  $_btn_primary
  .mouseover(function() {
    $(this).css("width", $(this).find(".hide-text").width() + 45);
  })
  .mouseout(function() {
    $(this).css("width", "37");
  });

  var $_profile_picture = $(".col-profile_pic")
  var $_bullets_point = $(".section_bullet .bullet_box")

  // Connect Profile picture with first bullet
  connectFirstBullet($_profile_picture, $_bullets_point.first())

  // Connect all bullets together
  for(var i = 0; i < $_bullets_point.length - 1; i++) {
    bullet1 = $_bullets_point.eq(i);
    bullet2 = $_bullets_point.eq(i+1);

    connectBullet(bullet1, bullet2);
  }

  $_progress = $(".progress")
  for(var i = 0; i < $_progress.length; i++) {
    progressBar = $_progress.eq(i).find(".progress-bar");
    percentage = $_progress.eq(i).find(".percentage");

    if(isColliding(progressBar, percentage)) {
      percentage.css("color", "white");
    }
  }

});

function connectFirstBullet(col_profile_picture, el2) {
  var xmlns = "http://www.w3.org/2000/svg";
  var svg = document.createElementNS(xmlns, "svg");

  profile_picture = col_profile_picture.find(".profile_pic")

  y_center1 = profile_picture.offset().top + profile_picture.height()/2
  y_center2 = el2.offset().top + el2.height()/2
  distance = y_center2 - y_center1
  width = Math.max(profile_picture.width(), el2.width())

  distance -= profile_picture.height()/2 + el2.height()/2 + parseInt(el2.css("borderWidth"));

  svg = document.createElementNS(xmlns, "svg");
  svg.setAttributeNS(null,"width", width);
  svg.setAttributeNS(null,"height", distance);

  x = Math.max(profile_picture.outerWidth(true)/2,
              el2.outerWidth(true)/2 - parseInt(el2.css("borderWidth"))
            );

  var new_connection_line = document.createElementNS(xmlns, "line");
  new_connection_line.setAttributeNS(null,"x1", x);
  new_connection_line.setAttributeNS(null,"y1", 0);
  new_connection_line.setAttributeNS(null,"x2", x);
  new_connection_line.setAttributeNS(null,"y2", distance);
  new_connection_line.setAttributeNS(null,"stroke-width","10");
  new_connection_line.setAttributeNS(null,"stroke","currentColor");
  svg.appendChild(new_connection_line);

  col_profile_picture.append(svg);
}

function connectBullet(el1, el2) {
  var xmlns = "http://www.w3.org/2000/svg";
  var svg = document.createElementNS(xmlns, "svg");

  y_center1 = el1.offset().top + el1.height()/2
  y_center2 = el2.offset().top + el2.height()/2
  distance = y_center2 - y_center1
  width = Math.max(el1.width(), el2.width())

  svg = document.createElementNS(xmlns, "svg");
  svg.setAttributeNS(null,"width", width);
  svg.setAttributeNS(null,"height", distance);

  var new_connection_line = document.createElementNS(xmlns, "line")
  new_connection_line.setAttributeNS(null,"x1", el1.outerWidth(true)/2 - parseInt(el1.css("borderWidth")))
  new_connection_line.setAttributeNS(null,"y1", parseInt(el1.css("borderWidth")));
  new_connection_line.setAttributeNS(null,"x2", el2.outerWidth(true)/2 - parseInt(el2.css("borderWidth")))
  new_connection_line.setAttributeNS(null,"y2", distance - (parseInt(el1.css("borderBottomWidth")) + parseInt(el2.css("borderTopWidth")) + el2.outerHeight()/2));
  new_connection_line.setAttributeNS(null,"stroke-width","10");
  new_connection_line.setAttributeNS(null,"stroke","currentColor");
  svg.appendChild(new_connection_line)

  el1.append(svg)
}

var isColliding = function(el1, el2) {
	var el1_offset = el1.offset();
	var el1_height = el1.outerHeight(true);
	var el1_width = el1.outerWidth(true);
	var el1_distance_from_top = el1_offset.top + el1_height;
	var el1_distance_from_left = el1_offset.left + el1_width;

	var el2_offset = el2.offset();
	var el2_height = el2.outerHeight(true);
	var el2_width = el2.outerWidth(true);
	var el2_distance_from_top = el2_offset.top + el2_height;
	var el2_distance_from_left = el2_offset.left + el2_width;

	var not_colliding = (el1_distance_from_top < el2_offset.top
                      || el1_offset.top > el2_distance_from_top
                      || el1_distance_from_left < el2_offset.left
                      || el1_offset.left > el2_distance_from_left);

	// Return whether it IS colliding
	return !not_colliding;
};
