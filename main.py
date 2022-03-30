# -*- coding: utf-8 -*-
import os, time
from flask import Flask, render_template, request, url_for, redirect, session
from flask_bootstrap import Bootstrap
import getSaying

app = Flask(__name__)


@app.route("/debug") 
def debug():
    return render_template("debug.html")

@app.route("/", methods=["GET", "POST"])
def index():
    s=getSaying.getSaying()
    c=getSaying.getCurrentConfirmedCount()
    data={
        "s":s,
    }
    return render_template("index.html",data=data)


@app.route("/covid_api", methods=["GET"])
def covid_api():
    c=getSaying.getCurrentConfirmedCount()
    data={
        "ccc":c['current_confirmed'],
        "ut": c['update_time']
    }
    return data
    

@app.errorhandler(404)  # 404页面
def not_found(e):
    print('404')
    return render_template('404.html'), 404 

if __name__ == "__main__":
    app.run(host="0.0.0.0",port=5000,debug=True)
