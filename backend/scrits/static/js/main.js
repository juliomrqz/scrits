$(function() {
  $("[data-toggle='tooltip']").tooltip();
});

// Voting
// Get a cookie by a name
function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
      var cookie = jQuery.trim(cookies[i]);
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === (name + "=")) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

// Get csrftoken cookie value
var csrftoken = getCookie("csrftoken");

// Send csrftoken value to every Ajax request
$.ajaxSetup({
  beforeSend(xhr) {
    if (!this.crossDomain) {
      xhr.setRequestHeader("X-CSRFToken", csrftoken);
    }
  }
});

// Voting instruction for articles
$("#upvote-link, #downvote-link").click(function(e) {
  e.preventDefault();

  $.ajax({
    type: "POST",
    url: $(this).attr("href"),
    async: false,
    success(result) {
      $('#voting-box').html(result.message);
    },
    error(result) {
      $('#voting-box').html(result.message);
    }
  });
});
