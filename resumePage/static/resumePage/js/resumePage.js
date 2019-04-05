$(document).ready(function() {
  var $_btn_primary = $(".header-buttons .btn-primary");

  $_btn_primary
  .mouseover(function() {
    $(this).css("width", $(this).find(".hide-text").width() + 45);
  })
  .mouseout(function() {
    $(this).css("width", "37");
  });

  var $_profile_picture = $(".col-profile_pic");
  var $_bullets_point = $(".section_bullet .bullet_box");

  // Create bullet outer circle
  makeBulletCircle($_bullets_point)

  // Connect Profile picture with first bullet
  connectFirstBullet($_profile_picture, $_bullets_point.first());

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

  $_caroussel = $(".caroussel");

  $_caroussel.find(".project").click(function() {
    moveToSelected($(this));
  });

  $('.previous').click(function() {
    moveToSelected('prev');
  });

  $('.next').click(function() {
    moveToSelected('next');
  });

  // Place the carroussel on center element
  moveToSelected($(".selected"));

  $(".new_section .Contact").parent(".new_section").attr("id", "contact");

  // $(".modal_contact").click(function(e) {
  //   $('.modal').modal('hide');
  //   $('html, body').animate({
  //       scrollTop: $("#contact").offset().top
  //   }, 2000);
  // });

  var half_view = window.scrollY + window.visualViewport.height/2;

  // Coloring conect bars
  $_rect_svg = $("svg rect");
  for(var i = 0; i < $_rect_svg.length; i++) {
    colorProgressElement($_rect_svg.eq(i), half_view)
  }
  // Coloring circles
  $_circle_svg = $("svg circle");
  for(var i = 0; i < $_circle_svg.length; i++) {
    colorCircleElement($_circle_svg.eq(i), half_view)
  }

  // Coloring bullet
  $_bullet_svg = $(".bullet_box svg path")
  for (var i = 0; i < $_bullet_svg.length; i++) {
    setChildDefs($_bullet_svg.eq(i));
    colorBulletElement($_bullet_svg.eq(i), half_view)
  }

  // Coloring hr
  $_hr = $("hr")
  for (var i = 0; i < $_hr.length; i++) {
    colorHr($_hr.eq(i), half_view)
  }

  $(document).scroll(function() {
    var half_view = window.scrollY + window.visualViewport.height/2;
    for (var i = 0; i < $_rect_svg.length; i++) {
      colorProgressElement($_rect_svg.eq(i), half_view)
    }
    for(var i = 0; i < $_circle_svg.length; i++) {
      colorCircleElement($_circle_svg.eq(i), half_view)
    }
    for (var i = 0; i < $_bullet_svg.length; i++) {
      colorBulletElement($_bullet_svg.eq(i), half_view)
    }
    for (var i = 0; i < $_hr.length; i++) {
      colorHr($_hr.eq(i), half_view)
    }
  })
});


function setChildDefs(path) {
  var xmlns = "http://www.w3.org/2000/svg";
  var new_defs = document.createElementNS(xmlns, "defs");
  var new_gradient = document.createElementNS(xmlns, "linearGradient")

  path.attr("id", Math.round(path.offset().top))

  new_gradient.setAttributeNS(null,"id", "color" + Math.round(path.offset().top));
  new_gradient.setAttributeNS(null,"x1", "0%");
  new_gradient.setAttributeNS(null,"y1", "0%");
  new_gradient.setAttributeNS(null,"x2", "0%");
  new_gradient.setAttributeNS(null,"y2", "100%");

  var new_stop = document.createElementNS(xmlns, "stop")
  new_stop.setAttributeNS(null,"offset", 0);
  new_stop.setAttributeNS(null,"style", "stop-color:rgb(36,153,145);stop-opacity:1");
  new_stop.setAttributeNS(null,"class", "stop");
  new_gradient.appendChild(new_stop);
  var new_stop = document.createElementNS(xmlns, "stop")
  new_stop.setAttributeNS(null,"offset", 0);
  new_stop.setAttributeNS(null,"style", "stop-color:rgb(204,204,204);stop-opacity:1");
  new_stop.setAttributeNS(null,"class", "stop");
  new_gradient.appendChild(new_stop);

  new_defs.appendChild(new_gradient);
  path.after(new_defs);
  path.attr("fill", "url(#color" + Math.round(path.offset().top) + ")");
}

function colorHr(hr, half_view) {
  offset_top = hr.offset().top
  if(offset_top + 1 < half_view) {
    hr.css("border-color", "#249991")
  } else {
    hr.css("border-color", "#CCC")
  }
}

function colorBulletElement(svgEl, half_view) {
  id = svgEl.attr("id")
  var stop = $("#color"+ id + " .stop")

  offset_top = svgEl.offset().top
  offset_bottom = offset_top + svgEl.parent().width()
  height_svg = offset_bottom - offset_top
  heigth_to_fill = half_view - offset_top

  if(heigth_to_fill < 0) {
    heigth_to_fill = 0;
  } else if (heigth_to_fill > height_svg) {
     heigth_to_fill = height_svg
  }

  percentage = heigth_to_fill / height_svg

  stop.attr("offset", percentage);
}

function colorCircleElement(svgEl, half_view) {
  id = svgEl.attr("id")
  var stop = $("#color"+ id + " .stop")

  offset_top = svgEl.offset().top
  offset_bottom = offset_top + svgEl.attr("r") * 2
  height_svg = offset_bottom - offset_top
  heigth_to_fill = half_view - offset_top

  if(heigth_to_fill < 0) {
    heigth_to_fill = 0;
  } else if (heigth_to_fill > height_svg) {
     heigth_to_fill = height_svg
  }

  percentage = heigth_to_fill / height_svg

  stop.attr("offset", percentage);
}

function colorProgressElement(svgEl, half_view) {
  id = svgEl.attr("id")
  var stop = $("#color"+ id + " .stop")

  offset_top = svgEl.offset().top
  offset_bottom = offset_top + svgEl.outerHeight()
  height_svg = offset_bottom - offset_top
  heigth_to_fill = half_view - offset_top

  if(heigth_to_fill < 0) {
    heigth_to_fill = 0;
  } else if (heigth_to_fill > height_svg) {
     heigth_to_fill = height_svg
  }

  percentage = heigth_to_fill / height_svg

  stop.attr("offset", percentage);
}

// Moving the caroussel in Portfolio content
function moveToSelected(element) {

  if (element == "next") {
    var selected = $(".selected").nextAll(".project").eq(0);
  } else if (element == "prev") {
    var selected = $(".selected").prevAll(".project").eq(0);
  } else {
    var selected = element;
  }

  var next = $(selected).nextAll(".project").eq(0);
  var prev = $(selected).prevAll(".project").eq(0);

  $(selected).removeClass().addClass("project selected");

  $(prev).removeClass().addClass("project prev");
  $(next).removeClass().addClass("project next");

  $(next).nextAll(".project").removeClass().addClass('project hideRight');
  $(prev).prevAll(".project").removeClass().addClass('project hideLeft');
}

// Displaying the outter circle for the bullets
function makeBulletCircle($_bullets_point) {
  var xmlns = "http://www.w3.org/2000/svg";

  for (var i = 0; i < $_bullets_point.length; i++) {
    bullet = $_bullets_point.eq(i);
    new_svg = bullet.hasClass("new_svg")

    var svg = document.createElementNS(xmlns, "svg");
    y_center1 = bullet.offset().top + bullet.height()/2;

    var new_circle = document.createElementNS(xmlns, "circle");
    new_circle.setAttributeNS(null,"id", Math.round(bullet.offset().top));
    new_circle.setAttributeNS(null,"r", new_svg ? "37" : "25");
    new_circle.setAttributeNS(null,"cx", new_svg ? "40" : "28");
    new_circle.setAttributeNS(null,"cy", new_svg ? "40" : "28");
    new_circle.setAttributeNS(null,"stroke-width","6");
    new_circle.setAttributeNS(null, "stroke", "url(#color" + Math.round(bullet.offset().top) + ")");
    new_circle.setAttributeNS(null, "fill", "none");
    svg.appendChild(new_circle);

    var new_defs = document.createElementNS(xmlns, "defs");
    var new_gradient = document.createElementNS(xmlns, "linearGradient")

    new_gradient.setAttributeNS(null,"id", "color" + Math.round(bullet.offset().top));
    new_gradient.setAttributeNS(null,"x1", "0%");
    new_gradient.setAttributeNS(null,"y1", "-6%");
    new_gradient.setAttributeNS(null,"x2", "0%");
    new_gradient.setAttributeNS(null,"y2", "105%");

    var new_stop = document.createElementNS(xmlns, "stop")
    new_stop.setAttributeNS(null,"offset", 0);
    new_stop.setAttributeNS(null,"style", "stop-color:rgb(36,153,145);stop-opacity:1");
    new_stop.setAttributeNS(null,"class", "stop");
    new_gradient.appendChild(new_stop);
    var new_stop = document.createElementNS(xmlns, "stop")
    new_stop.setAttributeNS(null,"offset", 0);
    new_stop.setAttributeNS(null,"style", "stop-color:rgb(204,204,204);stop-opacity:1");
    new_stop.setAttributeNS(null,"class", "stop");
    new_gradient.appendChild(new_stop);

    new_defs.appendChild(new_gradient);
    svg.appendChild(new_defs);
    bullet.append(svg)
  }
}

// Connect the Profile picture to the first bullet
function connectFirstBullet(col_profile_picture, el2) {
  var xmlns = "http://www.w3.org/2000/svg";

  profile_picture = col_profile_picture.find(".profile_pic")

  y_center1 = profile_picture.offset().top + profile_picture.height()/2
  y_center2 = el2.offset().top + el2.height()/2
  distance = y_center2 - y_center1
  width = Math.max(profile_picture.width(), el2.width())

  distance -= profile_picture.height()/2 + el2.height()/2 + 6;

  var svg = document.createElementNS(xmlns, "svg");
  svg.setAttributeNS(null,"width", width);
  svg.setAttributeNS(null,"height", distance);

  x = Math.max(profile_picture.outerWidth(true)/2,
              el2.outerWidth(true)/2 - parseInt(el2.css("borderWidth"))
            );

  var new_connection_rect = document.createElementNS(xmlns, "rect");
  new_connection_rect.setAttributeNS(null,"id", Math.round(profile_picture.offset().top + profile_picture.height()));
  new_connection_rect.setAttributeNS(null,"x", x-5);
  new_connection_rect.setAttributeNS(null,"y", 0);
  new_connection_rect.setAttributeNS(null,"width", "10");
  new_connection_rect.setAttributeNS(null,"height", distance);
  new_connection_rect.setAttributeNS(null,"stroke-width","0");
  new_connection_rect.setAttributeNS(null, "fill", "url(#color" + Math.round(profile_picture.offset().top + profile_picture.height()) + ")");
  svg.appendChild(new_connection_rect);

  var new_defs = document.createElementNS(xmlns, "defs");
  var new_gradient = document.createElementNS(xmlns, "linearGradient")

  new_gradient.setAttributeNS(null,"id", "color" + Math.round(profile_picture.offset().top + profile_picture.height()));
  new_gradient.setAttributeNS(null,"x1", "0%");
  new_gradient.setAttributeNS(null,"y1", "0%");
  new_gradient.setAttributeNS(null,"x2", "0%");
  new_gradient.setAttributeNS(null,"y2", "100%");

  var new_stop = document.createElementNS(xmlns, "stop")
  new_stop.setAttributeNS(null,"offset", 0);
  new_stop.setAttributeNS(null,"style", "stop-color:rgb(36,153,145);stop-opacity:1");
  new_stop.setAttributeNS(null,"class", "stop");
  new_gradient.appendChild(new_stop);
  var new_stop = document.createElementNS(xmlns, "stop")
  new_stop.setAttributeNS(null,"offset", 0);
  new_stop.setAttributeNS(null,"style", "stop-color:rgb(204,204,204);stop-opacity:1");
  new_stop.setAttributeNS(null,"class", "stop");
  new_gradient.appendChild(new_stop);

  new_defs.appendChild(new_gradient);
  svg.append(new_defs);

  col_profile_picture.append(svg);
}

// Connect the bullets between themselves
function connectBullet(el1, el2) {
  var xmlns = "http://www.w3.org/2000/svg";

  y_center1 = el1.offset().top + el1.height()/2
  y_center2 = el2.offset().top + el2.height()/2
  distance = y_center2 - y_center1
  width = el1.width()

  distance -= el2.height()/2 + el1.height()/2 - 2

  var svg = el1.children("svg");

  var new_connection_rect = document.createElementNS(xmlns, "rect")
  new_connection_rect.setAttributeNS(null,"id", Math.round(el1.offset().top + el1.height()));
  new_connection_rect.setAttributeNS(null,"x", width/2-5)
  new_connection_rect.setAttributeNS(null,"y", el1.height() - 1);
  new_connection_rect.setAttributeNS(null,"width", "10")
  new_connection_rect.setAttributeNS(null,"height", distance);
  new_connection_rect.setAttributeNS(null,"stroke-width", "0");
  new_connection_rect.setAttributeNS(null, "fill", "url(#color" + Math.round(el1.offset().top + el1.height()) + ")");
  svg.append(new_connection_rect)

  var new_defs = document.createElementNS(xmlns, "defs");
  var new_gradient = document.createElementNS(xmlns, "linearGradient")

  new_gradient.setAttributeNS(null,"id", "color" + Math.round(el1.offset().top + el1.height()));
  new_gradient.setAttributeNS(null,"x1", "0%");
  new_gradient.setAttributeNS(null,"y1", "0%");
  new_gradient.setAttributeNS(null,"x2", "0%");
  new_gradient.setAttributeNS(null,"y2", "100%");

  var new_stop = document.createElementNS(xmlns, "stop")
  new_stop.setAttributeNS(null,"offset", 0);
  new_stop.setAttributeNS(null,"style", "stop-color:rgb(36,153,145);stop-opacity:1");
  new_stop.setAttributeNS(null,"class", "stop");
  new_gradient.appendChild(new_stop);
  var new_stop = document.createElementNS(xmlns, "stop")
  new_stop.setAttributeNS(null,"offset", 0);
  new_stop.setAttributeNS(null,"style", "stop-color:rgb(204,204,204);stop-opacity:1");
  new_stop.setAttributeNS(null,"class", "stop");
  new_gradient.appendChild(new_stop);

  new_defs.appendChild(new_gradient);
  svg.append(new_defs);

  el1.append(svg)
}

// Checking if %age is overlapping progress bar
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
