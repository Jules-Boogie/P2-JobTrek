

$(document).ready(function () {

    // $('.datepicker').datepicker();


    $(".createResumeSubmit").on("click", function (event) {
    //  event.preventDefault();

        console.log("on create")

        let fileName = $("#resumetitle").val();
        let version = $("#resumeversion").val();
        let role = $("#roletitle").val();
        let notes = $("#notesresume").val();
        let date = $("dateresume").val();
        let fileLocation = $("#resumeLink").val();
        
        $.ajax("/api/resume/create",
        {
            type: "POST",
            data:{
                fileName:fileName,
                version: version,
                role:role,
                note: notes,
                fileLocation: fileLocation,
                date: date
            }
        }).then(function(){
           // location.reload();
        });
    });


    
    $(".starBtn").on("click", function(event){
      
        let starId = $(this).data("id");
        let starValue = $(this).data("star");
        console.log(starId)
        console.log(starValue)

        $.ajax("/api/resume/update/star", 
        {
            type:"PUT",
            data:{
                starId: starId,
                starValue : starValue
            }
        }).then(function(dbResume){
            location.reload();
        });
    });

    $(".deleteResume").on("click", function(event){
        let delid = $(this).data("delete")
        console.log("del", delid)
       
        $.ajax("/api/resume/delete", {
            type: "DELETE",
            data:{id:delid}
        }).then(function(dbResume){
            location.reload();
        })
    })

    // view one resume
    $(".viewResume").on("click", function(e){
        let view = $(this).data("view");
        // console.log("view this resume", view)
        $.ajax("/api/resume/find/" + view, {
            type: "GET",
        }).then(function(view){
      
            $("#resumeTitle").text(view.fileName);
            $("#viewRole").text(view.role);
            $("#viewDate").text(view.date.toString());
            $("#viewNotes").text(view.notes);
            $("#viewFileLocation").text(view.fileLocation);
            $("#viewFileLocation").attr("href",view.fileLocation);
            $("#viewFileLocation").attr("_target","_blank");
            $("#updateresumecard").attr("data-cardid", view.id.toString());
            
            // console.log(view)

        })
    })

    // update selected resume

    $("#updateresumecard").on("click", function(event){
        let cardid = $(this).data("cardid");

        $.ajax("/api/resume/find/" + cardid, {
            type: "GET",
        }).then(function(view){
            $("#updateresumeTitle").val(view.fileName);
            $("#updateviewRole").val(view.role);
            $("#updateviewDate").val(view.date.toString());
            $("#updateviewNotes").val(view.notes);
            $("#updateviewFileLocation").val(view.fileLocation);
            $("#updateresumecardfinal").attr("data-cardid", view.id);
        })

    })

    $("#updateresumecardfinal").on("click", function(e){
        let objectCard = {
            idcard:$(this).data("cardid"),
            resumeTitle:$("#updateresumeTitle").val(),
            cardrole:$("#updateviewRole").val(),
            creationdate:$("#updateviewDate").val(),
            specialnotes:$("#updateviewNotes").val(),
            filelocation:$("#updateviewFileLocation").val(),
        }
        $.ajax("/api/resume/update/alldata", 
        {
            type:"PUT",
            data:objectCard
        }).then(function(dbResume){
            location.reload();
        });
    })

});