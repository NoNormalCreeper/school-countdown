// config
holiday_start="2022-1-14 17:00:00";    // 放假时间
default_holiday_end="2022-2-13 16:30:00";     // 默认开学时间
next_holiday="2022-7-10 00:30:00";    // 下一次放假时间估算值

if(sessionStorage.getItem('holiday_end')){
    holiday_end=sessionStorage.getItem('holiday_end');
}else{
    holiday_end=default_holiday_end;
}

function format(num){   // 转换为2位数
    if(num>=10){
        return num;
    }else{
        return ("0"+(num.toLocaleString()));
    }
}

function countdown(){
    // init
    var date_n=new Date();
    var date_s=new Date(holiday_start);
    var date_e=new Date(holiday_end);
    var date_x=new Date(next_holiday);
    var wrong_date=new Date("xadjij13");
    // var yyyy=date_n.getFullYear();
    // var MM=date_n.getMonth();
    // var dd=date_n.getDate();
    // var hh=date_n.getHours();
    // var mm=date_n.getMinutes();
    // var ss=date_n.getSeconds();
    // var ms=date_n.getMilliseconds();

    // calc
    diff_time0 = (date_e-date_n); // 时间差(ms)
    var diff_time = diff_time0/1000;      // 时间差(s)
    var days = parseInt(diff_time/86400); // 天  24*60*60*1000 
    var hours = format(parseInt(diff_time/3600)-24*days);    // 小时 60*60 总小时数-过去的小时数=现在的小时数 
    var minutes = format(parseInt(diff_time%3600/60)); // 分钟 -(day*24) 以60秒为一整份 取余 剩下秒数 秒数/60 就是分钟数
    var seconds = format(parseInt(diff_time%60));  // 以60秒为一整份 取余 剩下秒数
    var percent=(100-(diff_time0/(date_e-date_s)*100)).toFixed(5);

    // display
    var output=("距离开学(<i>"+holiday_end+"</i>)还有<b>"+days+"</b>天<b>"+hours+"</b>小时<b>"+minutes+"</b>分钟<b>"+seconds+"</b>秒 (即<b>"+((diff_time.toFixed(3)).toLocaleString())+"</b>秒)")
    var timerDiv=document.getElementById("timer");
    timerDiv.innerHTML=output;
    var percentDiv=document.getElementById("percent");
    percentDiv.innerHTML=("<b>"+(percent.toLocaleString())+"</b> %");
}

function submitEdit(){
    var get_res=document.getElementById("edit").value;
    holiday_end=get_res;
    // if(Object.is(seconds,NaN)){    // 我不会判断输入是否合法，所以只能这样曲线救国了qwq
    //     holiday_end=default_holiday_end;
    //     alert("请输入完整正确的时间日期 (╯>д<)╯");
    // }else{
        sessionStorage.setItem('holiday_end',get_res);
    // }
    // TODO: 判断输入是否合法
}

function resetHolidayEnd(){
    holiday_end=default_holiday_end;
    sessionStorage.removeItem('holiday_end');
}

function start(){
    window.setInterval("countdown();",7);   // 延迟取7ms而非1ms，这样可以提高性能，反正肉眼无法分辨awa
}