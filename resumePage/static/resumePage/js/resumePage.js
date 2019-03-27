$(document).ready(function() {
  $_btn_primary = $(".btn-primary");

  $_btn_primary
  .mouseover(function() {
    $(this).css("width", $(this).find(".hide-text").width() + 45);
  })
  .mouseout(function() {
    $(this).css("width", "37");
  });
});
