function getJokes() {
  //alert(' here to getJokes ');
  console.log("in here getJokes");
  $("#jokes_Details").html(
    '<img src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif"/>'
  );

  $.ajax({
    type: "GET",
    url: "/server/chuck_norris_jokes/getJokes",
    contentType: "application/json",
    success: function (data) {
      //	alert(data);
      $("#jokes_Details").html(data);
    },
    error: function (error) {
      alert(error);
    }
  });
}
