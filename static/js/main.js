// config
var 
    holidayStart = "2022/7/16 17:00:00";       // 放假时间
    defaultHolidayEnd = "2022/8/31 14:00:00";  // 默认开学时间
    nextHoliday = "2023/1/21 00:30:00";        // 下一次放假时间估算值


const format = (num) =>
    num >= 10 ? num : ("0" + num.toString()); // 转换为2位数

const setTexts = (object) => {
    Object.entries(object).forEach(([k, v]) => {
        $(`#${k}`).text(v);
    });
}


function countdown() {
    // init
    if (sessionStorage.getItem('holidayEnd')) {
        var holidayEnd = sessionStorage.getItem('holidayEnd');
    } else {
        var holidayEnd = defaultHolidayEnd;
    }
    var timeNow = new Date();
    var timeStart = new Date(holidayStart);
    var timeEnd = new Date(holidayEnd);

    // calc
    var diffTime0 = (timeEnd - timeNow); // 时间差(ms)
    var diffTime = diffTime0 / 1000; // 时间差(s)
    var leftDays = parseInt(diffTime / 86400); // 天  24*60*60*1000 
    var leftHours = format(parseInt(diffTime / 3600) - 24 * leftDays); // 小时 60*60 总小时数-过去的小时数=现在的小时数 
    var leftMinutes = format(parseInt(diffTime % 3600 / 60)); // 分钟 -(day*24) 以60秒为一整份 取余 剩下秒数 秒数/60 就是分钟数
    var leftSeconds = format(parseInt(diffTime % 60)); // 以60秒为一整份 取余 剩下秒数
    var leftMilliseconds = format(parseInt(diffTime0 % 1000));
    var percent = (100 - (diffTime0 / (timeEnd - timeStart) * 100)).toFixed(5);

    // display
    // if (holiday_end == default_holiday_end) {
    //     var isAdded = "";
    //     announce.seen = false;
    // } else {
    //     var isAdded = ""; // 暂时通过是否更改开学时间判断是否为深圳
    //     announce.seen = false;
    // }
    setTexts({
        "leftDay": leftDays,
        "leftHr": leftHours,
        "leftMin": leftMinutes,
        "leftSec": leftSeconds,
        "leftMs": leftMilliseconds,
        "totalSec": ((diffTime.toFixed(3)).toLocaleString()),
        "holidayEndTime": `(${holidayEnd})`
    });
    // var output = ("<p class=\"info-text\">距离开学(<i>" + holiday_end + isAdded + "</i>)还有</p><p style=\"font-size:1.6em; font-family: DINCond-Black;\">" + days + "天" + hours + "小时" + minutes + "分钟" + seconds + "秒</p><p style=\"font-size:1.2em; font-family: DINCond-Black;\">（即" + ((diff_time.toFixed(3)).toLocaleString()) + "秒）</p>")
    // timer.rawHtml = output;

    // generate progress bar
    const barDiv = $("#bar");
    barDiv.attr("style", (`width: ${percent}%`));
    barDiv.attr("aria-valuenow", (percent));
    barDiv.text((`${percent}%`));

    // generate emotion
    // const emotionDiv = $("#emotion");
    // var res = "../static/emotion-";
    // var percent2 = 100 - percent; // 发现逻辑写反了之后的补救
    // if (percent2 > 80) {
    //     var tmp = "5";
    // } else if (percent2 > 60) {
    //     var tmp = "4";
    // } else if (percent2 > 45) {
    //     var tmp = "3";
    // } else if (percent2 > 25) {
    //     var tmp = "2";
    // } else if (percent2 > 15) {
    //     var tmp = "1";
    // } else {
    //     var tmp = "0";
    // }
    // res = res + tmp + ".png";
    // emotionDiv.attr("src", res);
}


var submitButton = $("#submit-button");
submitButton.click(() => {
    var editedEndDate = $("#edit").val();
    // if(Object.is(seconds,NaN)){    // 我不会判断输入是否合法，所以只能这样曲线救国了qwq
    //     holiday_end=default_holiday_end;
    //     alert("请输入完整正确的时间日期 (╯>д<)╯");
    // }else{
    sessionStorage.setItem('holidayEnd', editedEndDate);
    holidayEnd = editedEndDate;
    // }
    // TODO: 判断输入是否合法
    // $(".toast-body-1").html("成功修改开学时间为" + get_res + "！");
})

var resetButton = $("#reset-button");
resetButton.click(() => {
    holidayEnd = defaultHolidayEnd;
    sessionStorage.removeItem('holidayEnd');
})

var closeBotton = $("#close_botton");
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
    // $("#emotion").attr("style", "display:inline-block");
    // $("#covid").attr("style", "display:inline-block");
    resetButton.attr("value", defaultHolidayEnd);

    // const url = "covisd_api";

    // $.ajax(url, {
    //     dataType: 'json',
    //     success: (data, status) => {
    //         confirmedCount.ccc = data.ccc;
    //         updateTime.ut = "更新时间: "+ data.ut;
    //     }
    // });
    $.ajax("saying", {
        dataType: 'text',
        success: (data, status) => {
            $("#saying").text(data);
        }
    })

    window.setInterval(countdown, 7); // 延迟取7ms而非1ms，这样可以提高性能，反正肉眼无法分辨awa
})
