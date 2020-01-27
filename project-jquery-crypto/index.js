$(() => {

// function for loading arrys
    if (sessionStorage.getItem("arr") == null && sessionStorage.getItem("symbolArr") == null) {
        sessionStorage.setItem("arr", JSON.stringify([]))
        sessionStorage.setItem("symbolArr", JSON.stringify([]))


    }



    // function for home button
    $("#home").on("click", (e) => {
        $("#coinsList").empty();
        $("#divLive").empty();
        $("#divAbout").empty();
        clearInterval(chartInterval);
        setDisplay(e)
        coinsList()
    })

    // function for search button
    $("#search").on("click", (e) => {
        $("#coinsList").empty();
        $("#divLive").empty();
        $("#divAbout").empty();
        clearInterval(chartInterval)
        setDisplay(e)
        searchFun()

    })

    // a buttuns rotate
    $("a").click(function () {
        if ($(this).css("transform") == 'none') {
            $(this).css("transform", "rotate(360eg)");
        } else {
            $(this).css("transform", "");
        }
    });

    // function for about button
    $("#about").on("click", (e) => {
        $("#coinsList").empty();
        $("#divLive").empty();
        $("#divAbout").empty();
        clearInterval(chartInterval)
        setDisplay(e)
        aboutme()

        // function for live reports page
    })
    $("#liveReports").on("click", (e) => {
        clearInterval(chartInterval)
        $("#coinsList").empty();
        $("#divLive").empty();
        $("#divAbout").empty();
        setDisplay(e)
        $("#divLive").append(` 
        <canvas id="chart" style="height:100% !important;">

        </canvas>`)

        chartLiveReports()
    })




})
let chartInterval


// function for page organization
function setDisplay(e) {

    switch ($(e.target)[0].id) {
        case "home":
            $("#divLive").css("display", "none")
            $("#divAbout").css("display", "none")
            $("#coinsList").css("display", "flex")
            $("body").removeClass("height")
            break;

        case "liveReports":

            $("#coinsList").css("display", "none")
            $("#divAbout").css("display", "none")
            $("#divLive").css("display", "flex")
            $("body").addClass("height")
            break;

        case "about":

            $("#coinsList").css("display", "none")
            $("#divLive").css("display", "none")
            $("#divAbout").css("display", "flex")
            $("body").removeClass("height")
            break;

        case "search":
            $("#divLive").css("display", "none")
            $("#divAbout").css("display", "none")
            $("#coinsList").css("display", "flex")
            $("body").addClass("height")
            break;

    }
}

// function for coins on the first page

function coinsList() {
    $.ajax({
        type: `GET`,
        url: `https://api.coingecko.com/api/v3/coins/list`,
        beforeSend: function () {
            $("body").append(` 
                <div id="mainDimond">
                <div class="loader loader-20">
                <div class="css-diamond"></div>
                </div>`);
        },
        complete: function () {
            $("#mainDimond").remove();
        },
        success: function (lists) {

            for (let i = 0; i < 100; i++) {
                $("#coinsList").append(`
                <div class="card main-card" style="width: 18rem;">
                <div id="${lists[i].id}" class="card-body">
                <h5 class="card-title">${lists[i].symbol}</h5>
                <hr>
                <span class="custom-control custom-switch">
                <input type="checkbox" class="custom-control-input" id="customSwitch${lists[i].id}">
                <label class="custom-control-label" for="customSwitch${lists[i].id}"></label>
                </span>
                <p class="card-text">${lists[i].name}</p>
                <button type="button" class="moreInfo btn btn-primary">more info</button>
                <div style="display:none"; > </div>
                </div>
                </div>
                
                `)
                refreshForToggle(lists[i].id)

            }
            $(".moreInfo").on("click", moreInfo)

            // toggle button

            $(".custom-control-input").on("change", (e) => {
                if ($(e.target).is(":checked")) {
                    switchCoin($(e.target).parent().parent()[0].id, "add")

                } else {
                    switchCoin($(e.target).parent().parent()[0].id, "remove")

                }

            })




        }

    });

}

// toggle function 
function switchCoin(id, type) {
    let arr = JSON.parse(sessionStorage.getItem("arr"))
    let symbolArr = JSON.parse(sessionStorage.getItem("symbolArr"))
    let symbol = $(`#${id}`).children(":first").text()
    if (type == "add") {
        if (arr.length == 5) {
            modalPop(id, symbol)
        } else {
            arr.push(id)
            symbolArr.push(symbol)
            sessionStorage.setItem("arr", JSON.stringify(arr))
            sessionStorage.setItem("symbolArr", JSON.stringify(symbolArr))


        }
    } else {
        arr = arr.filter(item => item !== id)
        symbolArr = symbolArr.filter(item => item !== symbol)
        sessionStorage.setItem("arr", JSON.stringify(arr))
        sessionStorage.setItem("symbolArr", JSON.stringify(symbolArr))

    }
}

// function for modal pop
function modalPop(id, symbol) {

    $("div#header").toggleClass("#headerS")
    let arr = JSON.parse(sessionStorage.getItem("arr"))
    let symbolArr = JSON.parse(sessionStorage.getItem("symbolArr"))
    for (let i = 0; i < 5; i++) {

        $(".modal-body").append(`
            <div class="row divRow">
            <div class="col-7">${arr[i]}</div>
            <div class = "col-5">
            <button type="button" class="popUpBtn">
            </button>
            </div>
            </div>
            `)
    }
    $("#popUp").on("hidden.bs.modal", () => {
        if (!arr.includes(id)) {

            popUpX(id)
        }
        $(".divRow").remove()
    })

    $(".popUpBtn").on("click", (e) => {
        let idToRemove = $(e.target).parent().prev().html()
        let symbolToRemove = $(`#${idToRemove}`).children(":first").text()
        let i=0
        arr.push(id)
        symbolArr.push(symbol)
                for(;i<arr.length;i++)if( idToRemove==arr[i]) break;
                    arr = arr.filter(item => item !== idToRemove)
                    symbolArr = symbolArr.filter(item => item !== symbolArr[i])
                
                    
        
        refreshForToggle(id)
        sessionStorage.setItem("arr", JSON.stringify(arr))
        sessionStorage.setItem("symbolArr", JSON.stringify(symbolArr))
        popUpX(idToRemove)
        $("#popUp").modal("hide")

    })

    $("#popUp").modal()


}


// refresh function for toggle
function refreshForToggle(id) {
    let arr = JSON.parse(sessionStorage.getItem("arr"))

    if (arr.includes(id)) {
        $(`#customSwitch${id}`).prop("checked", true)
    }

}
// function for exiting from popUp
function popUpX(id) {
    $(`#customSwitch${id}`).prop("checked", false)
}


// פונקציה לכפתור מידע
function moreInfo(e) {
    let id = $(e.target).parent()[0].id
    $.ajax({
        type: `GET`,
        url: `https://api.coingecko.com/api/v3/coins/${id}`,
        beforeSend: function () {
            $("body").append(` 
                <div id="mainDimond">
                <div class="loader loader-20">
                <div class="css-diamond"></div>
                </div>`);
        },
        complete: function () {
            $("#mainDimond").remove();
        },
        success: function (data) {


            // local storeg validation
            if (sessionStorage.getItem(id) != null) {
                let Ntime = JSON.parse(sessionStorage.getItem(id))[1]
                let time = (new Date()).getTime()
                time /= 1000
                // local storege, time check
                if (time - Ntime > 120) {
                    $.get(`https://api.coingecko.com/api/v3/coins/${id}`, (data) => {
                        sessionStorage.setItem(id, JSON.stringify([data, (new Date()).getTime() / 1000]))
                    })
                }
                // no local storage, maiking a new one 
            } else {
                $.get(`https://api.coingecko.com/api/v3/coins/${id}`, (data) => {
                    sessionStorage.setItem(id, JSON.stringify([data, (new Date()).getTime() / 1000]))
                })
            }
            let divB = $(e.target).next()
            divB.stop().slideToggle("fast", () => {
                divB.html(`
                <div class=divInfo>
                <div class="card border-dark mb-3" style="margin-top: 10px;">
                <div class="card-body text-dark">
                <h6 class="card-title">Dollars:${data.market_data.current_price.usd}$ </h6>
                <h6 class="card-title">Euro:${data.market_data.current_price.eur}€</h6>
                <h6 class="card-title">Ils:${data.market_data.current_price.ils}₪ </h6>
                <img src="${data.image.small}" alt="coin">
                </div>
                </div>
                </div>
                
                `)


            })



















        }

    });


}
// פונקציה לכפתור חיפוש
function searchFun() {
    $.ajax({
        type: `GET`,
        url: `https://api.coingecko.com/api/v3/coins/list`,
        beforeSend: function () {
            $("body").append(` 
            <div id="mainDimond">
            <div class="loader loader-20">
            <div class="css-diamond"></div>
            </div>`);
        },
        complete: function () {
            $("#mainDimond").remove();
        },
        success: function (lists) {


            for (let i = 0; i < lists.length; i++) {
                if (lists[i].symbol.includes($("#input").val())) {
                    $("#coinsList").append(`
            <div class="main-card card" style="width: 18rem;">
            <div id="${lists[i].id}" class="card-body">
            <h5 class="card-title">${lists[i].symbol}</h5>
            <hr>
            <span class="custom-control custom-switch">
            <input type="checkbox" class="custom-control-input" id="customSwitch${lists[i].id}">
            <label class="custom-control-label" for="customSwitch${lists[i].id}"></label>
            </span>
            <p class="card-text">${lists[i].name}</p>
            <button type="button" class="moreInfo btn btn-primary">more info</button>
            <div style="display:none";> </div>
            </div>
            </div>

            `)
                    refreshForToggle(lists[i].id)

                }

            }
            $(".moreInfo").on("click", moreInfo)
            $(".custom-control-input").on("change", (e) => {
                if ($(e.target).is(":checked")) {
                    switchCoin($(e.target).parent().parent()[0].id, "add")

                } else {
                    switchCoin($(e.target).parent().parent()[0].id, "remove")

                }

            })





        }
    })




}

// --------------------------------------------------------------live reorts page-------------------------------------------------------------------------------------



// function for chart base

function chartLiveReports() {

    let c = document.getElementById("chart");
    fitToContainer(c)
    let ctx = c.getContext("2d");
    let cfg = {
        type: 'line',
        data: { datasets: [] },

        options: {
            responsive: true,
            title: {
                display: true,
                text: 'RealTime Crypto'
            },
            scales: {
                xAxes: [{
                    type: 'time',
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Current Time'
                    },
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Current Coin Value'
                    }
                }]
            }
        }
    }
    let chart = new Chart(ctx, cfg);
    let promise = Promise.resolve(true);

    chartInterval = setInterval(function () {
        promise = promise.then(function () {
            return new Promise(function (resolve) {
                dataAdd(chart)
                resolve(true)

            });
        });
    }, 2000);

}

// function for setting data

async function dataAdd(chart) {
    let colors = [
          /*red*/ "rgb(255, 99, 132)",
          /*orange*/ "rgb(255, 159, 64)",
          /*yellow*/ "rgb(255, 205, 86)",
          /*green*/ "rgb(75, 192, 192)",
          /*blue*/ "rgb(54, 162, 235)"
    ];
    let symbolArr = JSON.parse(sessionStorage.getItem("symbolArr"));
    try {
        let resArr = await getCurrentCurrencyValue(symbolArr)
        console.log(chart)
        if (chart.data.datasets.length == 0) {
            for (let i = 0; i < resArr.length; i++) {
                chart.data.datasets.push({
                    label: resArr[i][0],
                    backgroundColor: colors[i],
                    borderColor: colors[i],
                    fill: false,
                    data: [{ x: resArr[i][2], y: resArr[i][1] }]
                });
            }
        }
        else {
            for (let i = 0; i < resArr.length; i++) {
                chart.data.datasets[i].data.push({ x: resArr[i][2], y: resArr[i][1] })
                if (chart.data.datasets[i].data.length == 11)
                    chart.data.datasets[i].data.shift()
            }
        }
        chart.update()

    }
    catch (error) {
        console.log(error)
        clearInterval(chartInterval)
        alert("There is no value for those coins.")
    }

}
function fitToContainer(canvas) {
    // Make it visually fill the positioned parent
    canvas.style.width = "100%";
    canvas.style.height = "80%";
    // then set the internal size to match
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}

function getCurrentCurrencyValue(sArr) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${sArr.join(",").toUpperCase()}&tsyms=USD`,
            type: "GET",
            success: res => {
                let arr = [];
                if (res.Response === "Error") reject();
                let i = 0;
                let time = moment();
                for (let symbol in res) {
                    arr[i] = [symbol, res[symbol]["USD"], time];
                    i++;
                }
                resolve(arr);
            }
        });
    });
}

//   function for x and y

function XY(symbolArr) {
    $.ajax({
        url: `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${symbolArr.join(",").toUpperCase()}&tsyms=USD`,
        type: `GET`,
        success: (api) => {
            let newArr = []

            if (api.Response == "Error") return false
            for (symbol in api) {
                let newArr = [api[symbol][`USD`]]
            }
        },




    })
}





















// ---------------------------------------------------------------about me page------------------------------------------------------------------------------


function aboutme() {
    $("#divAbout").append(` 
    <div class="title">Welcome to about page !</div>
<span class="row spanForCards">
<div class="flip-box">
  <div class="flip-box-inner">
    <div class="flip-box-front aboutProject">
     About projct
    </div>
    <div class="flip-box-back">
      <h2 class="flip-back-header">About project</h2>
      </br>
      <div class="flip-back-text">
      <p>how was the project you ask ?</p>
      <div class="fun">fun</div>
      <br>
      <div> very, very fun.. </div>
      </div>
    </div>
  </div>
</div>
<div class="flip-box">
  <div class="flip-box-inner">
    <div class="flip-box-front aboutMe">
     About me
    </div>
    <div class="flip-box-back">
      <h2 class="flip-back-header">About me</h2>
      </br>
      <div class="flip-back-text">
      <div>
      Name:&nbsp; Yam Gross
      </div>
      <div>
      City:&nbsp; Beit Dagan
      </div>
      <div>
      Age:&nbsp; 21
      </div>
      </div>
    </div>
  </div>
</div>
    </span>
  `)



}




