from email import contentmanager
import requests
import json

url="https://v1.hitokoto.cn/?encode.json"

def getSaying():
    r=requests.get(url)
    t=r.json()
    content="「"+t["hitokoto"]+"」\t——"+t["from"] 

    return content