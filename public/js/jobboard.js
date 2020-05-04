$(document).ready(function () {
  $("#createnewjobcard").on("click", function (event) {


    console.log("works")
    $.ajax("/api/jobboard/company", {
      type: "GET"

    }).then(function (companydata) {


      $.ajax("/api/jobboard/resume", {
        type: "GET"

      }).then(function (resumedata) {
        console.log(companydata)
      })


    })
  })


  $("#createnewjobcard").on("click", function (event) {
    console.log("works")

    $.ajax("/api/jobboard/resumeselect", {
      type: "GET"

    }).then(function (resumedata) {
      resumedata.forEach(element => {
        console.log("element:    ", element)
        let myOptionresume = $("<option>");
        myOptionresume.text(element.fileName)
        $("#resumelist").append(myOptionresume);
      });
        

    })

    $.ajax("/api/jobboard/companyselect", {
      type: "GET"
    }).then(function(companydata){
      
      companydata.forEach(element => {
        console.log("element: ", element)
        let myOptioncompany = $("<option>");
        myOptioncompany.text(element.company)
        $("#companylist").append(myOptioncompany);
      })
        
    })

     $.ajax("/api/jobboard/taskselect",{
          type: "GET"

        }).then(function(taskdata){
          taskdata.forEach(element => {
            console.log("element: ", element)
            let myOptiontask = $("<option>");
            myOptiontask.text(element.task);
            $("#tasklist").append(myOptiontask);
          })
    
        })
    
  })



  $(".createJobSubmit").on("click", function (event) {
    console.log("add button listens")
    var jobData = {
      job_title: $("#title").val(),
      describe: $("#jobdescription").val(),
      require: $("#jobrequirement").val(),
      locate: $("#location").val(),
      status: $("#newjobstatus").val(),
      company: $("#companylist").val(),
      task: $("#tasklist").val(),
      resume: $("#resumelist").val(),
      note: $("#jobNotes").val(),
      jobUrl: $("#jobUrl").val()
    };
    $.ajax("/api/jobboard",
      {
        type: "POST",
        data: jobData
      }).then(function () {
        location.reload();
      });
  });

});



$("#updatejobposting").on("click", function (event) {
  // Make sure to preventDefault on a submit event.

  // event.preventDefault();
  var recordId = $(this).data("update");

  console.log("update button working", recordId)

  var updatedData = {
    job_title: $("#title_edit").val(),
    describe: $("#jobdescription_edit").val(),
    require: $("#jobrequirement_edit").val(),
    locate: $("#location_edit").val(),
    statusUpdate: $("#newjobstatus_edit").val(),
    company: $("#companylist_edit").val(),
    task: $("#tasklist_edit").val(),
    resume: $("#resumelist_edit").val(),
    note: $("#jobNotes_edit").val(),
    jobUrl: $("#jobUrlEdit").val()
  };


  console.log("is it sending???", updatedData)
  // Send the POST request.
  $.ajax("/api/jobboard/change/" + recordId, {
    type: "PUT",
    data: updatedData
  }).then(function () {
    console.log("updated job");
    location.reload();
  }
  );
});

//delete button is working but nothing seems to be getting deleted.

$(".deleteJob").on('click', function (event) {

  var id = $(this).data("delete");
  // var userid = $(this).data("userid")

  console.log(id)
  // This is the client's way of sending the DELETE request to the server.
  $.ajax("/api/jobboard", {
    type: "DELETE",
    data: {
      jobId: id
    }
  }).then(
    function () {
      console.log("deleted id");
      // Reload the page to get the updated column
      location.reload();
    }
  );
});


// $.getJSON("/api/company", { user_id: 1 }, function (response, status) {
//   if (status == "success") {
//     //console.log(response);
//     for (var i = 0; i < response.length; i++) {
//       var str = response[i].company
//       var sid = response[i].id
//       $("#companylist").append("<option value=" + sid + ">" + str + "</option>")
//       $("#companylist_edit").append("<option value=" + sid + ">" + str + "</option>")

//     }
//   }
// });

// $.getJSON("/api/task", { user_id: 1 }, function (response, status) {
//   if (status == "success") {
//     //console.log(response);
//     for (var i = 0; i < response.length; i++) {
//       var str = response[i].task
//       var sid = response[i].id
//       $("#tasklist").append("<option value=" + sid + ">" + str + "</option>")
//       $("#tasklist_edit").append("<option value=" + sid + ">" + str + "</option>")

//     }
//   }
// });

// $.getJSON("/api/resume", { user_id: 1 }, function (response, status) {
//   if (status == "success") {
    
//     for (var i = 0; i < response.length; i++) {
//       var str = response[i].fileName
//       var sid = response[i].id
//       $("#resumelist").append("<option value=" + sid + ">" + str + "</option>")
//       $("#resumelist_edit").append("<option value=" + sid + ">" + str + "</option>")

//     }
//   }
// });

$(".updateonejob").on("click", function (event) {
  var jobId = $(this).data("id")

  console.log("jobId", jobId)
  // TODO
  $.ajax("/api/jobboard/" + jobId, {
    type: "GET",
  }).then(function (dataResponse) {
    console.log(dataResponse)

    $("#updatejobposting").attr("data-update", dataResponse.id);
    $("#newjobstatus_edit").val(dataResponse.status)
    $("#jobdescription_edit").val(dataResponse.description)
    $("#jobrequirement_edit").val(dataResponse.requirement),
    $("#newjobstatus_edit").val(dataResponse.status),
    $("#companylist_edit").val(dataResponse.company),
    $("#tasklist_edit").val(dataResponse.task),
    $("#resumelist_edit").val(dataResponse.resume),
    $("#jobNotes_edit").val(dataResponse.notes)
    $("#jobUrlEdit").val(dataResponse.url)
    $("#location_edit").val(dataResponse.location)
    $("#title_edit").val(dataResponse.job_title)

  })
})

