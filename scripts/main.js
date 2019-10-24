const app = $("#requirements").attr("form"),
    req = $("#requirements"),
    form = $("form#app"),
    options = form.children(".row");

$("#hello").onchange = function() {
  console.log($("#hello"));
}

function isComplete() {
  let inputs = $("form#app .form-group label"),
      i = 0;

  for(i = 0; i < inputs.length && $("form#app .form-group label").eq(i).hasClass("bg-success"); i++){}

  return (i == inputs.length) ? true : false;
}

function printReq(obj) {
  for(const key in obj) {
    if(obj[key].hasOwnProperty("list")) {

      let list = $("<ul/>").appendTo(req);
  
      $("<li/>",{
        detect: key,
        html: obj[key].list
      }).appendTo(list);
  
      let group = $("<div>", {
        class: "form-group"
      }).appendTo(options);

      let label = $("<label />",{
        class: "bg-primary p-3 rounded d-flex flex-row justify-content-around align-items-center text-white m-1",
        for: key
      }).appendTo(group);

      $("<span>", {
        class: "fas fa-file-upload mr-3"
      }).appendTo(label);

      $("<span>", {
        html: obj[key].label
      }).appendTo(label);

      $("<input>", {
        id: key,
        type: obj[key].type,
        change: function() {
          var list = $(`li[detect="${key}"]`);
          var URL = window.URL || window.webkitURL;
          var file = $(this)[0].files[0];
          
          if (file) {
            if(file.type.includes("image/")) {
              var image = new Image();

              image.onload = function() {
                if (this.width) {
                  list.removeClass("text-danger");
                  list.addClass("text-strike text-success");
                  label.removeClass("bg-primary bg-danger");
                  label.addClass("bg-success");
                  label.children("span:nth-child(2)").html(file.name);
                  if(isComplete()) {
                    console.log("Complete!");
                    $("<input>", {
                      class: "btn btn-outline-success px-5 mx-5 my-2",
                      type: "submit",
                      value: "Submit"
                    }).appendTo(form);
                  }
                } 
              };
  
              image.src = URL.createObjectURL(file);
            } else {
              list.removeClass("text-strike text-success");
              list.addClass("text-danger");
              label.removeClass("bg-primary bg-success");
              label.addClass("bg-danger");
              label.children("span:nth-child(2)").html(obj[key].label);
              $(this).value = "";
            }
          }
        }
      }).appendTo(group);
  
    } else {
      $("<div>", {
        class: "position-relative font-italic ml-3 mt-2",
        html: key
      }).appendTo(req);

      printReq(obj[key], true);
    }
  }
}

fetch("./scripts/requirements.json")
  .then(rec => {
    return rec.json();
  })
  .then(data => {
    for(const key of Object.keys(data[app])) {
      var obj = data[app][key];
      $("<div>", {
        class: "position-relative font-weight-bold text-purple font-weight-bold mt-4",
        html: key
      }).appendTo(req);

      printReq(obj);
    }
  })
  // .catch(err => {
  //   console.log(err);
  // })