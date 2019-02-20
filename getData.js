//Run this function first after SharePoint functions all load
_spBodyOnLoadFunctionNames.push("getData");

//This grabs the data results and sends to dataTables library
//Send in the index and query results
//Access lookups as nested arrays with .
function addItem(index, item) {
    var html = 
        '<tr>' +
        '<td>' + [index +1] + '</td>' +
        '<td>' + item.Title + '</td>' +
        '<td>' + item.Customer_Name + '</td>'  +
        '<td>' + item.Description +  '</td>' +
        '<td>' + item.Request_Type +  '</td>' +
        '<td>' + item.Category +  '</td>' +
        '<td>' + item.Priority +  '</td>' +
        '<td>' + item.Status +  '</td>' +
        '<td></td>' +
        '</tr>';
    $('#tableTickets tbody').append(html);
} //end addItem

//initialize the datatable
function drawTable() {
    var table = $('#tableTickets').DataTable({
        "pageLength": 160 //sets the default #rows
    }); //end initialize datatable
}

function getRobData() {
    //console.log("loaded");
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/Web/Lists/GetByTitle('Service-Tickets')/items/?$select=Title,Description,Category,Priority,Status,Customer_Name,Request_Type",
        type: "GET",
        dataType: "json",
        headers: {
            "Accept": "application/json; odata=verbose",
        }, //end headers
        success: function (data) {
            $.each(data.d.results, function(index, item) {
                addItem(index, item);
            });
            drawTable(data)
        }, //end success
        error: function (error) {
            console.log(error.responseText);
        } //end error
    })
}
