$.get('/scrape', data => {
    for (let i = 0; i < data.length; i++) {
        // $("#article").append("<p article-id='" + data[i]._id + "'>" + data[i].title + "<br />" + "<a href=" + data[i].link + ">" + data[i].link + "</a>" + "</p>");
        $("#article").append(`
        <p> 
        ${ data[i].title}<br />
        <a href="${data[i].link}" >${data[i].link}</a>
         <button data-article-id='${data[i]._id}'>Create Note</button> <br /> </p >`); 

    }

})

$.getJSON("/article", function (data) {
    for (let i = 0; i < data.length; i++) {
        $("#note").append("<p note-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");

    }
});


$(document).on("click", "#article button", function () {
    $("#note").empty();
    let thisId = $(this).attr("data-article-id");

    $.ajax({
        method: "GET",
        url: "/article/" + thisId
    }).then(function (data) {
        console.log(data);

        $("#note").append("<h2>" + data.title + "</h2>");
        $("#note").append("<input id ='titleInput' name='title' />");
        $("#note").append("<textarea id='bodyInput' name='body'></textarea>");
        $("#note").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");
        if (data.note) {
            $("#titleInput").val(data.note.title);
            $("#bodyInput").val(data.note.body);
        }
    });
});

$(document).on("click", "#savenote", function () {
    let thisId = $(this).attr("data-article-id");

    $.ajax({
        method: "POST",
        url: "/articles/" + thisId,
        data: {
            title: $("#titleInput").val(),
            body: $("#bodyInput").val()
        }
    }).then(function (data) {
        console.log(data);
        $("#note").empty();
    });

    $("#titleInput").val("");
    $("#bodyInput").val("");
});

