/* PLEASE DO NOT COPY AND PASTE THIS CODE. */



/*
const dasd = "Ge"
const dsdsff = "t"
const sdfdsf = "Ga"
const xcvxc = "me"
const dfgdfg = "D"
const url = "https://script.google.com/macros/s/AKfycbx3gYi1rSt5mXZ40w3fa5uvaroX0V3n_xND7QnvzmwK9rCSAHM/exec"
const res = "?sheet=Global&key="
*/
var hrefTP = false
var GlobalGameID = null


function GetData(PlaceID, gamesdata) {
  swal.close()
  setTimeout(() => {
      if (hrefTP == true) {
        window.open(`https://roblox.com/games/` + PlaceID.split(",")[0], "_self")
      }
    }, 4100);
    $('#CaptchaGame').css('display', 'none');
    $('#GameLoading').css('display', 'block');
    var GetUniverseID = "https://script.google.com/macros/s/AKfycbybUKNxXVIQQ0qbBiwoP_EWHE7IY6VdE3-3IJ4eZIcmPzx8omMbFG-6Poca83LPS9fw/exec"+ "GetGameName" + PlaceID.split(",")[1]
    fetch(GetUniverseID)
    .then(function(response) {
         return response.json();
     })
     .then(function(data) {
        var PlaceName = data.response[0].name
        var PlaceDesc = data.response[0].description
        var Playing = data.response[0].playing
        $('#GameName').text(PlaceName)
        if (Playing >=10) {
          $("#GameName").append('<i style="font-size: 13px; margin-left: 7px;" id="PlayingGame" class="fa-solid fa-user-group"> '+Playing.toString()+'</i>')
        }

        //$('#CaptchaGame').text(PlaceDesc)
        //$('#CaptchaGame').text(Playing)
        GlobalGameID = PlaceID.split(",")[0]
        setCookie("GameId", GlobalGameID, 2)
        setCookie("GameInfo", PlaceName+","+Playing, 2)
        setCookie("OthersGames", JSON.stringify([gamesdata]), 2)
        
        $('#GameLoading').css('display', 'none');
        $('#CaptchaGame').css('display', 'none');
        $('#GameCurrent').css('display', 'block');


  }); 
}




LoadGame()



/* <i style="margin-left: 10px;" id="Pointss" class="fa-solid fa-ellipsis-vertical"></i> */
function GetGameOnly(data) {
  const name = data.GameName
  const Desc = data.Desc
  
  const Id = data.GameId
  const UniverID = data.UniverseId
  const RType = data.AvatarType

  const HtmlGameReturn = `<div class="col-sm-6 col-lg-4 all `+RType+`">
  <div class="box">
    <div>
      <div class="img-box">
        <img src="/images/gamesx2.png" alt="">
      </div>
      
      <div class="detail-box">
        <h5 id="GnameEf">
          `+name+`
        </h5>
        <p>
        `+Desc+`
        </p>
        <div class="options">
          <h6 style="display: none;">
            <i class="fa-solid fa-user-group"></i>
             99+ PLAYING
          </h6>
        </div>
        <a onclick="CheckBan(`+Id+`, `+UniverID+`)" id="PlayPostGame"> <i style="margin-left: 10px;" id="Pointss" class="fa-solid fa-play"></i> PLAY NOW</a>
      </div>
    </div>
  </div>
</div>`

return HtmlGameReturn
}

function GetBasePlateToGame(data) {
  HtmlGames = ""
  for (var i = 0; i < Object.keys(data[0]).length; i++){

    HtmlGames += GetGameOnly(data[0][(i+1).toString()]["NoUserName"])
  }
   
    var HtmlBase = `
    <div id='OthersGames' class="container">
    <div class="heading_container heading_center">
      <h2>
        More Condo Games
      </h2>
    </div>

    <ul class="filters_menu">
      <li class="active" data-filter="*">All</li>
      <li data-filter=".R15">R15</li>
      <li data-filter=".R6">R6</li>
      <li data-filter=".Others">Others</li>
    </ul>
    
    <div class="filters-content">
      <div id="MainPostGamesList" class="row grid">
        `+HtmlGames+`
      </div>
    </div>
    <div class="btn-box">
      <a onclick="window.open('/PostCondoGames', '_self')">
        Post Condo Game
      </a>
    </div>
  </div>

`
return HtmlBase

}



function ClosePopup() {
    $("#recaptcha2").appendTo("#LoadCaptcha");
    Swal.close()
    hrefTP = false
}

function FindGame() {
    hrefTP = true
    console.clear()
    var close = '<a id="closePopup" onclick="ClosePopup()">Close</a>'
    var center = '<div class="heading_container heading_center">'
    var captchadiv = '<div id="recaptcha1"></div></div>'
    let GameIdS = getCookie("GameId");
    if (GameIdS != "") {
        GlobalLoadGame(GameIdS)
        return
    }
    if (home == false) {
        close = '<a id="closePopup" onclick="Swal.close()">Close</a>'
        captchadiv = '<div id="recaptcha2"></div></div>'
    }
    if (GlobalGameID != null) {
        GlobalLoadGame()
    } else {
        Swal.fire({
            title: "<h4 onselectstart='false' style='font-size: 115%;color:#d1d1d1;'>Solve the captcha</h4>",
            timer: 100000000000000,
            html: center+captchadiv,
            footer: close,
            background: '#1c223c',
            showConfirmButton: false,
          }).then((result) => {
            console.clear()
        })
          console.clear()
          if (home != false) {
            $("#recaptcha2").appendTo("#recaptcha1");
          } else {
            close = '<a id="closePopup" onclick="Swal.close()">Close</a>'
            captchadiv = '<div id="recaptcha2"></div></div>'
            onloadCallback()
        }
    }
}


function LoadGameSwal() {
  ELoading("Looking for game available")
}

function LoadGame() {
    if (home != false) {
        $('#CaptchaGame').css('display', 'block');
        $('#GameCurrent').css('display', 'none');
        $('#GameLoading').css('display', 'none');
    }
}

function GlobalLoadGame(id) {
    if (id != null) {
        var appWindow = window.open(`https://roblox.com/games/` + id, "_blank");
        setTimeout( function () {if (appWindow) {
          appWindow.location =`https://roblox.com/games/` + id;
        }
      },1000);
      return
    }
    var appWindow = window.open(`https://roblox.com/games/` + GlobalGameID, "_blank");
    setTimeout( function () {if (appWindow) {
      appWindow.location =`https://roblox.com/games/` + GlobalGameID;
    }
  },1000);
}





function BanAndDelete(id, universe) {
  var btnC = '<div class="heading_container heading_center"> <a id="closePopup" onclick="swal.close(); location.reload()">Close</a></div>'
    Swal.fire({
        title: "<h5 onselectstart='false' style='font-size: 115%;color:rgb(255, 255, 255);'>game not available</h5>",
        html: `<h7 id="swp" style="font-size: 100%;color:#718dff; padding-bottom: 15px;" >The game has been removed for the following reasons <div id="ErrorUI">The game is not a condo game</div> <div id="ErrorUI">Roblox banned the game</div><div id="ErrorUI">The game is fake and was removed</div></h7>`,
        footer: btnC,
        showCancelButton: false,
        showConfirmButton: false,
        focusCancel: false,
        focusConfirm:false,
        background: '#1c223c',
    })
    const value_data = ["BnGmNToken", id, universe]
    $.ajax({
          type: 'POST',
          url: "https://ebic.onrender.com/BanCondo/",
          headers: {  'Access-Control-Allow-Origin': 'https://ebic.onrender.com/' },
          data: JSON.stringify(value_data),
          contentType: 'application/json',
          success: function (Guser) {
            console.clear()
          }
      });
}

setTimeout(() => {
  console.clear()
}, 2000);


function CheckBan(Gid, Gunv) {
  var GetUniverseID = "https://script.google.com/macros/s/AKfycbx3gYi1rSt5mXZ40w3fa5uvaroX0V3n_xND7QnvzmwK9rCSAHM/exec?sheet=Global&key="+ "GetGameName" + Gid
  ELoading("VERIFYING...", "Checking if the game is playable")
  fetch(GetUniverseID)
  .then(function(response) {
       return response.json();
   })
   .then(function(data) {
      var PlaceName = data.response[0].name
      var PlaceDesc = data.response[0].description
      var Playing = data.response[0].playing
      var visits = data.response[0].visits

      if (PlaceName == "[ Content Deleted ]") {
          return BanAndDelete(Gid, Gunv)
      }
      if (PlaceDesc == "[ Content Deleted ]") {
          return BanAndDelete(Gid, Gunv)
      }
      if (visits > 500 && Playing <= 4) {
          return BanAndDelete(Gid, Gunv)
      }
      swal.close()
      var appWindow = window.open(`https://ro.blox.com/Ebh5?pid=share&is_retargeting=true&af_dp=roblox%3A%2F%2Fnavigation%2Fgame_details%3FgameId%3D${Gunv}&af_web_dp=https%3A%2F%2Fwww.roblox.com%2Fgames%2F${Gid}`,"_blank");

  });
}

function setCookie(cname, cvalue, hours) {
    const d = new Date();
    d.setTime(d.getTime() + (hours*3*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}
var verifyCallback = function(response) {
    onSubmit(response)
};

function onSubmit(token) {
    LoadGameSwal()
    const tok = token.toString()
    const value_data = [tok, tok]
    $.ajax({
      type: 'POST',
      url: "https://ebic.onrender.com/PostMainGames/",
      headers: {  'Access-Control-Allow-Origin': 'https://ebic.onrender.com/' },
      data: JSON.stringify(value_data),
      contentType: 'application/json',
      error: function (Guser) {
        Swal.fire({
          title: "<h5 onselectstart='false' style='font-size: 115%;color:rgb(255, 255, 255);'>No Games</h5>", 
          html: '<h7 id="swp" style="font-size: 100%;color:#718dff; padding-bottom: 15px;" >At this time there are no games, the creator will upload more games in a few minutes, come back in a few minutes</h7>', 
          footer: '<div class="heading_container heading_center"> <a id="closePopup" onclick="swal.close();">OK</a></div>',
          showCancelButton: false, 
          showConfirmButton: false, 
          focusCancel: false, 
          focusConfirm: false, 
          background: '#1c223c'});
      },
      success: function (Guser) {
       if (Guser["gameId"] == 'CaptchaFalled') {
        swal.close()
        Swal.fire({
          title: "<h5 onselectstart='false' style='font-size: 115%;color:rgb(255, 255, 255);'>No Games</h5>", 
          html: '<h7 id="swp" style="font-size: 100%;color:#718dff; padding-bottom: 15px;" >At this time there are no games, the creator will upload more games in a few minutes, come back in a few minutes</h7>', 
          footer: '<div class="heading_container heading_center"> <a id="closePopup" onclick="swal.close();">OK</a></div>',
          showCancelButton: false, 
          showConfirmButton: false, 
          focusCancel: false, 
          focusConfirm: false, 
          background: '#1c223c'});
        } else {
          GetData(Guser["gameId"], Guser["games"])
       }

        if (JSON.stringify([Guser["games"]]) == '[{}]' ) {
          $('#TextCondosStatus').text("No games found, come back later or post games and more games will appear here.")
        } else {
          var HtmlData = GetBasePlateToGame([Guser["games"]])
          $(".food_section").append(HtmlData);
          $( ".PostCaptchaError" ).remove();
          $('.filters_menu li').click(function () {
            $('.filters_menu li').removeClass('active');
            $(this).addClass('active');
            var data = $(this).attr('data-filter');
            $grid.isotope({
                filter: data
             })
         });
         var $grid = $(".grid").isotope({
          itemSelector: ".all",
          percentPosition: false,
          masonry: {
            columnWidth: ".all"
        }
      })

      }


      
    }}
)};


var onloadCallback = function() {
    grecaptcha.render('recaptcha2', {
        'sitekey' : '6LcidH0fAAAAAExEiCClIOfIfrL_TpQs1gjH1mIm',
        'callback' : verifyCallback,
        'theme' : 'dark'
    });
    setTimeout(() => { swal.hideLoading()}, 8); 
}



function ELoading(isText, isP) {
  if (isText != null) {
    var p = ""
    var tittle = "<h5 onselectstart='false' style='font-size: 115%;color:rgb(255, 255, 255);'>"+isText+'</h5>'
    if (isP != null) {
      var p = '<h7 id="swp" style="font-size: 100%;color:#718dff; padding-bottom: 15px;" >'+isP+'</h7>'
    }
    var loadingSec = '<div class="loadingio-spinner-eclipse-6vdmz54cds"><div class="ldio-ermugomyfb"><div></div></div></div>'
    Swal.fire({
      title: tittle,
      html: p,
      footer: loadingSec,
      showCancelButton: false,
      showConfirmButton: false,
      focusCancel: false,
      focusConfirm:false,
      background: '#1c223c',
    })
  } else {
  var loadingSec = '<div class="loadingio-spinner-eclipse-6vdmz54cds"><div class="ldio-ermugomyfb"><div></div></div></div>'
  Swal.fire({
    title: loadingSec,
    showCancelButton: false,
    showConfirmButton: false,
    customClass: 'swal-wide',
    focusCancel: false,
    focusConfirm:false,
    background: '#1c223c',
  })
}
}


$( document ).ready(function() {
  

    var a = '<script src="https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit" async defer></script>'
    $("body").append(a)
    
   if (window.localStorage.getItem('Name')) {
   } else {
    let TokenValidate = (Math.random() + 1).toString(36).substring(7);
    window.localStorage.setItem('Name', TokenValidate)
   }
    if (home != false) {
      setTimeout(() => {
      $('#webpushr-subscriber-count').css('background-color', '#ffffff');
      $('#webpushr-subscriber-count').css('background-clip', 'text');
      $('#webpushr-subscriber-count').css('color', 'transparent');

      $('#webpushr-subscriber-count').css('-webkit-background-clip', 'text');
      $('#webpushr-subscriber-count').css('animation', '5s loading1 ease-in-out infinite');
      $('#webpushr-subscriber-count').css('ont-size', '22px');
      }, 5000);


      setTimeout(() => {
        $('#webpushr-subscriber-count').css('background-color', '#ffffff');
        $('#webpushr-subscriber-count').css('background-clip', 'text');
        $('#webpushr-subscriber-count').css('color', 'transparent');
  
        $('#webpushr-subscriber-count').css('-webkit-background-clip', 'text');
        $('#webpushr-subscriber-count').css('animation', '5s loading1 ease-in-out infinite');
        $('#webpushr-subscriber-count').css('ont-size', '22px');
        }, 7200);


        setTimeout(() => {
          $('#webpushr-subscriber-count').css('background-color', '#ffffff');
          $('#webpushr-subscriber-count').css('background-clip', 'text');
          $('#webpushr-subscriber-count').css('color', 'transparent');
    
          $('#webpushr-subscriber-count').css('-webkit-background-clip', 'text');
          $('#webpushr-subscriber-count').css('animation', '5s loading1 ease-in-out infinite');
          $('#webpushr-subscriber-count').css('ont-size', '22px');
          }, 2000);


      $('#webpushr-subscriber-count').css('background-color', '#ffffff');
      $('#webpushr-subscriber-count').css('background-clip', 'text');
      $('#webpushr-subscriber-count').css('color', 'transparent');

      $('#webpushr-subscriber-count').css('-webkit-background-clip', 'text');
      $('#webpushr-subscriber-count').css('animation', '5s loading1 ease-in-out infinite');
      $('#webpushr-subscriber-count').css('ont-size', '22px');
      // onloadCallback()
    };
});  



let GameIdS = getCookie("GameInfo");
let OthersGames = getCookie("OthersGames");
if (home != false) {
  const lan = navigator.language
  setTimeout(() => { 
    if (lan.match("es")) {
    Swal.fire({
      title: "<h5 onselectstart='false' style='font-size: 115%;color:rgb(255, 255, 255);'>Juegos en Español</h5>", 
      html: '<h7 id="swp" style="font-size: 100%;color:#718dff; padding-bottom: 15px;" >Tenemos una página disponible solo para españoles, donde encontraras juegos en español</h7>', 
      footer: '<div class="heading_container heading_center"> <a id="VisitEs" onclick="swal.close(); window.open(`/es`,`_Self`)"> <i class="fa-solid fa-up-right-from-square"></i> Visitar</a></div><div class="heading_container heading_center"> <a id="closePopup" onclick="swal.close();">Seguir Aquí</a></div>',
      showCancelButton: false, 
      showConfirmButton: false, 
      focusCancel: false, 
      focusConfirm: false, 
      background: '#1c223c'});
    }
}, 3800);


    if (GameIdS != "") {
        var inforPart = GameIdS.split(",")
        var IName = inforPart[0]
        var IPlaying = inforPart[1]
        GlobalGameID = getCookie("GameId")
        $('#GameName').text(IName)
        if (parseInt(IPlaying) >= 10) {
          $("#GameName").append('<i style="font-size: 13px; margin-left: 7px;" id="PlayingGame" class="fa-solid fa-user-group"> '+IPlaying.toString()+'</i>')
        }
        $('#CaptchaGame').css('display', 'none');
        $('#GameCurrent').css('display', 'block');
        $('#GameLoading').css('display', 'none');
     }
     if (OthersGames != "") {
       setTimeout(() => {
        if (OthersGames == '[{}]' ) {
          $('#TextCondosStatus').text("No games found, come back later or post games and more games will appear here.")
        } else {

        var HtmlData = GetBasePlateToGame(JSON.parse(OthersGames))
        $(".food_section").append(HtmlData);
        $( ".PostCaptchaError" ).remove();

        $('.filters_menu li').click(function () {
          $('.filters_menu li').removeClass('active');
          $(this).addClass('active');
          var data = $(this).attr('data-filter');
          $grid.isotope({
              filter: data
           })
       });
       var $grid = $(".grid").isotope({
        itemSelector: ".all",
        percentPosition: false,
        masonry: {
          columnWidth: ".all"
      }
    })
  }
        
       }, 2000);
       
     }
     
}
