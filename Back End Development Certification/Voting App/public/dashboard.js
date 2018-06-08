function getCookie(name) {
  var cookies = document.cookie.split("; ");
  for (var i = 0; i < cookies.length; i++) {
    if (cookies[i].split("=")[0] == name) {
      return cookies[i].split("=")[1];
    }
  }
  return "";
}

function loadPollsOf(username) {
  const apiPollsPath = "/api/getpollsof/" + username;
  $.getJSON(apiPollsPath, function(pollsArray) {
    let newHTML = "";
    
    for (let i = pollsArray.length - 1; i >= 0; i--) {
      let pollName = pollsArray[i]["poll-name"];
      
      if (i < 10) {
        newHTML += 
          "<div class=\"poll-btn\"> \
            <div class=\"row\"> \
              <div class=\"col-10\"> \
                <a class=\"poll-link\" href=\"/poll/" + pollName +  "\"> \
                  <h6 class=\"poll-name\">" + pollName + "</h6> \
                </a> \
              </div> \
              <div class=\"col-2 my-auto\"> \
                <a class=\"btn default-btn\" href=\"/poll/" + pollName + "/changepoll\">Edit</a> \
                <button class=\"btn btn-danger delete-modal-btn\">Delete</button> \
              </div> \
            </div> \
            <div class=\"modal\"> \
              <div class=\"modal-dialog modal-dialog-centered\"> \
                <div class=\"modal-content\"> \
                  <div class=\"modal-header\"> \
                    <h4 class=\"modal-title\">Do you really want to delete this poll?</h4> \
                    <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button> \
                  </div> \
                  <div class=\"modal-footer\"> \
                    <button type=\"button\" class=\"btn btn-danger delete-btn\">Yes</button> \
                    <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">No</button> \
                  </div> \
                </div> \
              </div> \
            </div> \
          </div>";
      } else {
        newHTML += 
          "<div class=\"poll-btn hidden\"> \
            <div class=\"row\"> \
              <div class=\"col-11\"> \
                <a class=\"poll-link\" href=\"/poll/" + pollName +  "\"> \
                  <h6 class=\"poll-name\">" + pollName + "</h6> \
                </a> \
              </div> \
              <div class=\"col-1 my-auto\"> \
                <a class=\"btn default-btn\" href=\"/poll/" + pollName + "/changepoll\">Edit</a> \
                <button class=\"btn btn-danger delete-modal-btn\">Delete</button> \
              </div> \
            </div> \
            <div class=\"modal\"> \
              <div class=\"modal-dialog modal-dialog-centered\"> \
                <div class=\"modal-content\"> \
                  <div class=\"modal-header\"> \
                    <h4 class=\"modal-title\">Do you really want to delete this poll?</h4> \
                    <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button> \
                  </div> \
                  <div class=\"modal-footer\"> \
                    <button type=\"button\" class=\"btn btn-danger delete-btn\">Yes</button> \
                    <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">No</button> \
                  </div> \
                </div> \
              </div> \
            </div> \
          </div>";
      }
    }
    if (newHTML == "") {
      newHTML += "<h3 class=\"text-center\">No polls found!</h3>";
    }
    $("#created-polls").html(newHTML);
    
    $(".delete-modal-btn").on("click", function() {
      $(this).closest(".poll-btn").find(".modal").modal();
    });
    
    $(".delete-btn").on("click", function() {
      const pollName = $(this).closest(".poll-btn").find(".poll-name").text();
      deletePoll(pollName);
      $(this).closest(".modal").modal("hide");
    });
  });
}

function deletePoll(pollName) {
  const apiPollPath = "/api/deletepoll/" + pollName;
  $.getJSON(apiPollPath, function() {
    location.reload();
  });
}

$(document).ready(function() {
  const username = getCookie("username");
  
  loadPollsOf(username);
});