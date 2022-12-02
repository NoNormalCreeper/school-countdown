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

Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "H+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S": this.getMilliseconds()
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}


function countdown() {
    // init
    if (sessionStorage.getItem('holidayEnd')) {
        var holidayEnd = sessionStorage.getItem('holidayEnd');
    } else {
        var holidayEnd = defaultHolidayEnd;
    }

    var timeNow = new Date();
        timeStart = new Date(holidayStart);
        timeEnd = new Date(holidayEnd);

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
        "holidayEndTime": `(${timeEnd.Format("yyyy/MM/dd HH:mm:ss")})`
    });

    // generate progress bar
    const barDiv = $("#bar");
    barDiv.attr("style", (`width: ${percent}%`));
    barDiv.attr("aria-valuenow", (percent));
    barDiv.text((`${percent}%`));
}


var submitButton = $("#submit-button");
submitButton.click(() => {
    var editedEndDate = $("#dateInput").val();
    if (editedEndDate === "" || editedEndDate === null) {
        if ($("html").attr("lang") === "en") {
            alert("Invaid date, please check and try again");
            return;
        }
        alert("日期格式错误，请检查后重试。");
        return;
    }
    editedEndDateObj = new Date(editedEndDate);
    editedEndDateObj.setHours(14);
    sessionStorage.setItem('holidayEnd', editedEndDateObj);
    holidayEnd = editedEndDateObj;
})

var resetButton = $("#reset-button");
resetButton.click(() => {
    holidayEnd = defaultHolidayEnd;
    sessionStorage.removeItem('holidayEnd');
})

var closeBotton = $("#edit_card .btn-close");
closeBotton.click(() => {
    $("#edit_card").hide("quick");
});


async function fetchAsync(url) {
    let response = await fetch(url);
    let data = await response.json();
    return data;
}

$(() => { // init
    if ($("html").attr("lang") != "en") {
        $.ajax("saying", {
            dataType: 'text',
            success: (data, status) => {
                $("#saying").text(data);
            },
            error: (xhr, status, error) => {
                console.log(error);
            }
        })
    }

    window.setInterval(countdown, 7); // 延迟取7ms而非1ms，这样可以提高性能，反正肉眼无法分辨awa
})
