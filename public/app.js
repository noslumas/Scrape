//Grab the saved articles as json
$.getJSON("/saved", function(data){
  for (var i = 0; i < data.length; i++) {
    
  }
});

// Grab the articles as a json
$.getJSON("/articles", function(data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
    $("#articles").append("<h2 data-id='" + data[i]._id + "'>" + "<a href=" + data[i].link + ">" + data[i].title +"</a>" + "</h2><br>");
    }
});


// Whenever someone clicks a p tag
$(document).on("click", "h2", function() {
  // Empty the notes from the note section
  $("#notes").empty();
  // Save the id from the h2 tag
  var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .then(function(data) {
      console.log(data);
      // The title of the article
      $("#notes").append("<h2>" + data.title + "</h2>");
      // An input to enter a new title
      $("#notes").append("<input id='titleinput' name='title' >");
      // A textarea to add a new note body
      $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

      // If there's a note in the article
      if (data.note) {
        // Place the title of the note in the title input
        $("#titleinput").val(data.note.title);
        // Place the body of the note in the body textarea
        $("#bodyinput").val(data.note.body);
      }
    });
});

// When you click the savenote button
$(document).on("click", "#savenote", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});

//Scrape Articles for client to check
$(document).on("click", "#scrape-button", function() {
  $.ajax({
    method: "GET",
    url: "/scrape"
  })
  window.location.replace("/scrape");
});

//Delete an article
$(document).on("click", ".delete-article", function() {
    var thisId = $(this).attr("data-id");
    $.ajax({
      method: "DELETE",
      url: "/saved/" + thisId
    })
    .then(function(data) {
      // Log the response
      console.log(data);
      location.reload();
    });
});

//Save an article
$(document).on("click", ".save-article", function() {
  var thisId = $(this).attr("data-id");
  $(this).hide();
  var data = {}
  data.title =  $("#title-" + thisId).text();
  data.link = $("#link-" + thisId).text();
  data.excerpt = $("#excerpt-" + thisId).text();
  $.ajax({
    method: "POST",
    dataType: "json",
    url: "/api/saved",
    data: data
  })
});

//Go to the notes page for a particular article
$(document).on("click", ".note-comment", function() {
  var thisId = $(this).attr("data-id");
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
  window.location.replace("/articles/" + thisId);
});

  // Submit a note
  $(document).on("click", "#submit-note", function() {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");
      // Run a POST request to save the note
    $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        // Value taken from title input
        title: $("#title-note").val(),
        // Value taken from note textarea
        body: $("#note-description").val()
      }
    })
      .then(function(data) {
        // Log the response
        console.log(data);
        window.location.replace("/articles/" + data._id);
      });  
      // Also, remove the values entered in the input and textarea for note entry
      $("#title-note").val("");
      $("#note-description").val("");
  });
  
  //delete a note
  $(document).on("click", ".delete-note", function() {
    var thisId = $(this).attr("data-id");
    $.ajax({
      method: "DELETE",
      url: "/articles/" + thisId
    })
    .then(function(data) {
      // Log the response
      console.log(data);
      location.reload();
    }); 
});