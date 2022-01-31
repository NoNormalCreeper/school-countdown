# -*- coding: utf-8 -*-
import os, time
from flask import Flask, render_template, request, url_for, redirect, session
from flask_bootstrap import Bootstrap

app = Flask(__name__)


@app.route("/")  # 直接打开网站
def index():
    return render_template("index.html")

@app.errorhandler(404)  # 404页面
def not_found(e):
    print('404')
    return render_template('404.html'), 404 

if __name__ == "__main__":
    app.run(debug=True)