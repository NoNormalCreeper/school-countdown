import requests
import ujson as json
import time

def getSaying():
    url="https://v1.hitokoto.cn/?encode.json"
    try:
        r=requests.get(url)
        t=r.json()
        content="「"+t["hitokoto"]+"」\t——"+t["from"] 
        return content
    except:
        return "「作业做完了吗？」\t——李铭远"

def getCurrentConfirmedCount():
    url="https://lab.isaaclin.cn/nCoV/api/area?province=广东省"
    time_zone=+8
    try:
        result=json.loads(requests.get(url).text)
        current_confirmed=result['results'][0]['cities'][1]['currentConfirmedCount']
        uT=time.gmtime(int(str(result['results'][0]['updateTime'])[0:-3]))
        update_time=("{0}/{1}/{2} {3}:{4}:{5}").format(uT.tm_year,uT.tm_mon,uT.tm_mday,uT.tm_hour+time_zone,uT.tm_min,uT.tm_sec)
        return {"current_confirmed":current_confirmed, "update_time":update_time}
    except:
        return {"current_confirmed":"--", "update_time":"--"}
