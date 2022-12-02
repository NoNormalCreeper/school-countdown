import requests
import ujson as json
import time


def get_saying() -> str:
    url = "https://v1.hitokoto.cn/?encode.json"
    try:
        resp = requests.get(url)
        text = resp.json()
        content = f"「{text['hitokoto']}」\t——text['from'] "
        return content
    except Exception:
        return "「作业做完了吗？」\t——李铭远"


def get_current_confirmed_count() -> dict:
    url = "https://lab.isaaclin.cn/nCoV/api/area?province=广东省"
    time_zone = +8
    try:
        result = json.loads(requests.get(url).text)
        current_confirmed = result['results'][0]['cities'][1]['currentConfirmedCount']
        update_time = time.gmtime(
            int(str(result['results'][0]['updateTime'])[0:-3]))
        update_time = ("{0}/{1}/{2} {3}:{4}:{5}").format(update_time.tm_year, update_time.tm_mon,
                                                         update_time.tm_mday, update_time.tm_hour+time_zone, update_time.tm_min, update_time.tm_sec)
        return {"current_confirmed": current_confirmed, "update_time": update_time}
    except Exception:
        return {"current_confirmed": "--", "update_time": "--"}
