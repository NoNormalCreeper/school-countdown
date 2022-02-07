// config
holiday_start = "2022/1/14 17:00:00"; // 放假时间
default_holiday_end = "2022/2/21 7:30:00"; // 默认开学时间
next_holiday = "2022/7/10 00:30:00"; // 下一次放假时间估算值


function format(num) { // 转换为2位数
    if (num >= 10) {
        return num;
    } else {
        return ("0" + (num.toLocaleString()));
    }
}

function countdown() {
    // init
    if (sessionStorage.getItem('holiday_end')) {
        holiday_end = sessionStorage.getItem('holiday_end');
    } else {
        holiday_end = default_holiday_end;
    }
    var date_n = new Date();
    var date_s = new Date(holiday_start);
    // var date_e_tmp=new Date(holiday_end);
    // var date_e=date_e_tmp.getFullYear()+'-'+(date_e_tmp.getMonth()+1)+'-'+date_e_tmp.getDate()+' '+date_e_tmp.getHours()+':'+date_e_tmp.getMinutes()+':'+date_e_tmp.getSeconds();
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
    var isAdded = ""; // 暂时通过是否更改开学时间判断是否为深圳
    if (holiday_end == default_holiday_end) {
        var isAdded = "<b style=\"color: #0d6efd; \"> (+8d!)</b>";
    } else {
        announceDiv = document.getElementById("announce");
        announceDiv.style.display = "none";
    }
    var output = ("<p class=\"info-text\">距离开学(<i>" + holiday_end + isAdded + "</i>)还有</p><p style=\"font-size:1.6em; font-family: DINCond-Black;\">" + days + "天" + hours + "小时" + minutes + "分钟" + seconds + "秒</p><p style=\"font-size:1.2em; font-family: DINCond-Black;\">（即" + ((diff_time.toFixed(3)).toLocaleString()) + "秒）</p>")
    var timerDiv = document.getElementById("timer");
    timerDiv.innerHTML = output;
    // var percentDiv=document.getElementById("percent");
    // percentDiv.innerHTML=(""+percent+" %");

    // generate progress bar
    var barDiv = document.getElementById("bar1");
    barDiv.setAttribute("style", ("width: " + percent + "%"));
    barDiv.innerHTML = ("" + percent + "%");

    // generate emotion
    var emotionDiv = document.getElementById("emotion");
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
    emotionDiv.setAttribute("src", res);
}

function submitEdit() {
    var get_res = document.getElementById("edit").value;
    holiday_end = get_res;
    // if(Object.is(seconds,NaN)){    // 我不会判断输入是否合法，所以只能这样曲线救国了qwq
    //     holiday_end=default_holiday_end;
    //     alert("请输入完整正确的时间日期 (╯>д<)╯");
    // }else{
    sessionStorage.setItem('holiday_end', get_res);
    // }
    // TODO: 判断输入是否合法
    document.getElementById("toast-body-1").innerHTML = ("成功修改开学时间为" + date_e + "！")
}

function resetHolidayEnd() {
    holiday_end = default_holiday_end;
    sessionStorage.removeItem('holiday_end');
}

function disappear() { // 渐隐效果，有bug
    var cardDiv = document.getElementById("edit_card");
    if (cardDiv.style.opacity > 0) {
        cardDiv.style.opacity = cardDiv.style.opacity - 0.1;
    } else {
        cardDiv.style.display = "none";
        clearInterval();
    }
}

function closeEditCard() {
    window.setInterval("disappear();", 100);
}

function start() {
    // window.setTimeout("",400);  // 展示加载环
    var width = document.body.offsetWidth;
    if (width > 700) {
        document.getElementById("bar1").setAttribute("style", ("width: 700px"));
    }

    document.getElementById("emotion").style.display = "inline-block";
    document.getElementById("covid").style.display = "inline-block";

    window.setInterval("countdown();", 7); // 延迟取7ms而非1ms，这样可以提高性能，反正肉眼无法分辨awa
}