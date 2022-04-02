// config
var 
    holiday_start = "2022/1/14 17:00:00"; // 放假时间
    default_holiday_end = "2022/4/18 7:30:00"; // 默认开学时间
    next_holiday = "2022/7/10 00:30:00"; // 下一次放假时间估算值


const format = (num) =>
    num >= 10 ? num : ("0" + num.toString()); // 转换为2位数

// vue init
var timer = new Vue({
    el: '#timer',
    data: {
        rawHtml: '<div class="spinner-border text-muted"><span class="visually-hidden"></span></div>'
    }
})

var announce = new Vue({
    el: '#announce',
    data: {
        seen: true
    }
})

var confirmedCount = new Vue({
    el: '#ccc',
    data: {
        ccc: "Loading..."
    }
})

var updateTime = new Vue({
    el: '#ut',
    data: {
        ut: "Loading..."
    }
})


function countdown() {
    // init
    if (sessionStorage.getItem('holiday_end')) {
        holiday_end = sessionStorage.getItem('holiday_end');
    } else {
        holiday_end = default_holiday_end;
    }
    var date_n = new Date();
    var date_s = new Date(holiday_start);
    var date_e = new Date(holiday_end);
    // var yyyy=date_n.getFullYear();
    // var MM=date_n.getMonth();
    // var dd=date_n.getDate();
    // var hh=date_n.getHours();
    // var mm=date_n.getMinutes();
    // var ss=date_n.getSeconds();
    // var ms=date_n.getMilliseconds();

    // calc
    var diff_time0 = (date_e - date_n); // 时间差(ms)
    var diff_time = diff_time0 / 1000; // 时间差(s)
    var days = parseInt(diff_time / 86400); // 天  24*60*60*1000 
    var hours = format(parseInt(diff_time / 3600) - 24 * days); // 小时 60*60 总小时数-过去的小时数=现在的小时数 
    var minutes = format(parseInt(diff_time % 3600 / 60)); // 分钟 -(day*24) 以60秒为一整份 取余 剩下秒数 秒数/60 就是分钟数
    var seconds = format(parseInt(diff_time % 60)); // 以60秒为一整份 取余 剩下秒数
    var percent = (100 - (diff_time0 / (date_e - date_s) * 100)).toFixed(5);

    // display
    if (holiday_end == default_holiday_end) {
        var isAdded = "<b style=\"color: #0d6efd; \"> (+8d!)</b>";
        announce.seen = true;
    } else {
        var isAdded = ""; // 暂时通过是否更改开学时间判断是否为深圳
        announce.seen = false;
    }
    var output = ("<p class=\"info-text\">距离开学(<i>" + holiday_end + isAdded + "</i>)还有</p><p style=\"font-size:1.6em; font-family: DINCond-Black;\">" + days + "天" + hours + "小时" + minutes + "分钟" + seconds + "秒</p><p style=\"font-size:1.2em; font-family: DINCond-Black;\">（即" + ((diff_time.toFixed(3)).toLocaleString()) + "秒）</p>")
    timer.rawHtml = output;

    // generate progress bar
    const barDiv = $("#bar1");
    barDiv.attr("style", ("width: " + percent + "%"));
    barDiv.html(("" + percent + "%"));

    // generate emotion
    const emotionDiv = $("#emotion");
    var res = "../static/emotion-";
    var percent2 = 100 - percent; // 发现逻辑写反了之后的补救
    if (percent2 > 80) {
        var tmp = "5";
    } else if (percent2 > 60) {
        var tmp = "4";
    } else if (percent2 > 45) {
        var tmp = "3";
    } else if (percent2 > 25) {
        var tmp = "2";
    } else if (percent2 > 15) {
        var tmp = "1";
    } else {
        var tmp = "0";
    }
    res = res + tmp + ".png";
    emotionDiv.attr("src", res);
}


var submitButton = $("#submit-button");
submitButton.click(() => {
    var get_res = $("#edit").val();
    // if(Object.is(seconds,NaN)){    // 我不会判断输入是否合法，所以只能这样曲线救国了qwq
    //     holiday_end=default_holiday_end;
    //     alert("请输入完整正确的时间日期 (╯>д<)╯");
    // }else{
    sessionStorage.setItem('holiday_end', get_res);
    holiday_end = get_res;
    // }
    // TODO: 判断输入是否合法
    // $(".toast-body-1").html("成功修改开学时间为" + get_res + "！");
})

var resetButton = $("#reset-button");
resetButton.click(() => {
    holiday_end = default_holiday_end;
    sessionStorage.removeItem('holiday_end');
})

var closeBotton = $("#close-botton");
closeBotton.click(() => {
    const cardDiv = $("#edit_card");
    cardDiv.hide("quick");
})

async function fetchAsync(url) {
    let response = await fetch(url);
    let data = await response.json();
    return data;
}

$(() => { // init
    var width = document.body.offsetWidth;
    if (width > 700) {
        $("#bar1").attr("style", ("width: 700px"));
    }

    $("#emotion").attr("style", "display:inline-block");
    $("#covid").attr("style", "display:inline-block");
    resetButton.attr("value", default_holiday_end);

    const url = "covid_api";

    $.ajax(url, {
        dataType: 'json',
        success: (data, status) => {
            confirmedCount.ccc = data.ccc;
            updateTime.ut = "更新时间: "+ data.ut;
        }
    });


    window.setInterval(countdown, 7); // 延迟取7ms而非1ms，这样可以提高性能，反正肉眼无法分辨awa
})