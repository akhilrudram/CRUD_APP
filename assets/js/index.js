
$("#add_user").submit(function(event){
    console.log('Form submitted');
    alert("Data Inserted Successfully!");
});

$("#update_user").submit(function(event){
    console.log('Update form submitted');

    event.preventDefault();

    let unindexed_array = $(this).serializeArray();
    let data = {}

    $.map(unindexed_array, function(n, i){
        data[n['name']] = n['value']
    });


    let request = {
        "url" : `https://medisyncelite.onrender.com/api/users/${data.id}`,
        "method" : "PUT",
        "data" : data
    };
    console.log('Request URL:', request.url);

    $.ajax(request).done(function(response){
        alert("Data Updated Successfully!");
    });

});

if(window.location.pathname == "/"){
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function(){
        let id = $(this).attr("data-id")

        let request = {
            "url" : `https://medisyncelite.onrender.com/api/users/${id}`,
            "method" : "DELETE"
        };
        console.log('Delete request URL:', request.url);

        if(confirm("Do you really want to delete this record?")){
            $.ajax(request).done(function(response){
                console.log('Delete response:', response);
                alert("Data Deleted Successfully!");
                location.reload();
            });
        }

    });
}