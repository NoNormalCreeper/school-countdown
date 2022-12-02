# -*- coding: utf-8 -*-
import os, time
from sys import argv
from getopt import getopt
from flask import Flask, render_template, request, url_for, redirect, session
from flask_bootstrap import Bootstrap
import getSaying


app = Flask(__name__)


@app.route("/debug")
def debug():
    return render_template("debug.html")


@app.route("/", methods=["GET", "POST"])
def index():
    return render_template("index.html")


@app.route("/en")
def en():
    return render_template("index_en.html")

@app.route("/covid_api", methods=["GET"])
def covid_api():
    c=getSaying.getCurrentConfirmedCount()
    return {"ccc": c['current_confirmed'], "ut": c['update_time']}

@app.route("/saying", methods=["GET"])
def _() -> str:
    return getSaying.getSaying()

@app.errorhandler(404)  # 404页面
def not_found(e):
    print('404')
    return render_template('404.html'), 404


if __name__ == "__main__":
    '''
    Usage:
        python main.py [-h <host>] [-p <port>] [-d <debug>]
    '''
    host = "0.0.0.0"
    port = 8080
    debug_on = False
    opts, args = getopt(argv[1:], "h:p:d")
    for k, v in opts:
        if k == "-h":
            host = v
        elif k == "-p":
            port = int(v)
        elif k == "-d":
            debug_on = True
    app.run(host=host, port=port, debug=debug_on)
