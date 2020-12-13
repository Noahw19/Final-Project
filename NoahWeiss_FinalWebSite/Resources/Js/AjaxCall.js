var pages = 0;
var counter = 0;
$(document).ready(function()
{
    function makeApiCall()
    {
        // var quantity = 50;
        var tagSearch = (document.getElementById("tags").value).split(' ').join('+');
        var url = 'http://universities.hipolabs.com/search?name='+tagSearch+'';  
        $.ajax({url: url, contentType: "application/json", dataType: 'json',}).then(function(data)
        {
            
            // console.log(data);
            function NewCards(counter)
            {
                return `<div class="card w-50">
                        <div class="card-body"> \
                        <h5 class = "card-title">`+data[counter].name+`</h5>\
                        <h6 class="card-text">`+data[counter].country+`</h6>\
                        <a href="`+data[counter].web_pages+`" class="btn btn-primary">University website</a>\
                        <button type="button" class="btn btn-warning" data-toggle="modal" data-target="#Modal">Add Review</button>\
                        <div class="modal fade" id="Modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">\
                        <div class="modal-dialog" role="document">\
                            <div class="modal-content">\
                            <div class="modal-header">\
                                <h5 class="modal-title" id="exampleModalLabel">Add Review</h5>\
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">\
                                <span aria-hidden="true">&times;</span>\
                                </button>\
                            </div>\
                            <div class="modal-body">\
                                <div class="form-group">\
                                        <label for="recipient-name" class="col-form-label">University Name:</label>\
                                        <p id = UniName1>`+data[counter].name+`</p>\
                                    </div>\
                                <form action="reveiw" method="get">\
                                    <input type="text" id="review_itself" placeholder="Review Here">\
                                    <button type="submit">Submit</button>\
                                </form>\
                            </div>\
                            </div>\
                        </div>\
                        </div>\
                        </div>\
                        </div>`;
            }

            console.log(data);
            var newCards = '';
            for(var i = 0; i < data.length; i++)
            {
                newCards += NewCards(i);
            }
            console.log("page: " + pages);
            pages++;
            $("#img_display").append(newCards);
        });
    }
    $("#query").submit(function(event)
    {
        event.preventDefault();
        pages=0;
        $("#img_display").html("");
        makeApiCall();
    });

    $(window).scroll(function() 
    {
        if($(window).scrollTop() >= ($(document).height() - $(window).height()))
        {
            makeApiCall();
        }
    });
});
