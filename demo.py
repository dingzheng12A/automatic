#!/usr/bin/env python
#coding: utf-8
from flask import Flask,render_template,redirect
from flask import request,jsonify,session,url_for
from flask_sqlalchemy import SQLAlchemy
from User import User
from database import Users
app=Flask(__name__,static_folder='templates', static_url_path='')
app.config['SECRET_KEY']='automatic system'
app.config['SQLALCHEMY_DATABASE_URI']='mysql://automatic:automatic@localhost:3306/automatic'
#app.config['SQLALCHEMY_COMMIT_ON_TEARDOWN']=True
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=True
db=SQLAlchemy(app)
#def UserList():
#	userlist=Users.query.order_by(Users.create_time).all()
#	return userlist
@app.route('/')
def index_page():
	return render_template('login.html')

@app.route('/logincheck',methods=['POST','GET'])
def logi_check():
	if request.method == 'POST':
		print '- * '*10
		user=request.form['username']
		password=request.form['pwd']
		USER=User(user,password)
		result=USER.Auth()
		if result['result'] == 1:
			session['username']=user
		return jsonify(result)
	else:
		print '- * '*10
		return ''

@app.route('/logout',methods=['POST','GET'])
def logout():
	if request.method == 'GET':
		print session
		session.pop('username', None)
    		return redirect("/")
@app.route('/main')
def main_page():
	if 'username' in session:	
		USER=User()
		userlist=USER.ListUser()
		#userlist=UserList()
		return render_template('index.html',username=session['username'].upper(),userlist=userlist)
	else:
		return redirect(url_for('index_page'))

@app.route('/adduser',methods=['POST','GET'])
def adduser():
	if request.method == 'POST':
		username=request.form['username']
		nickname=request.form['nickname']
		password=request.form['passwd']
		email=request.form['email']
		USER=User(username=username,nickname=nickname,pwd=password,email=email,db=db)
		result=USER.AddUser()
		return jsonify(result)
	else:
		return ''

@app.route('/resetpass',methods=['POST','GET'])
def resetpass():
	if request.method == 'POST':
		print 'x - '*10
                username=request.form['username']
                oldpass=request.form['oldpass']
                password=request.form['password']
		USER=User(username,oldpass)
		result=USER.Auth()
		if result['result'] == 0:
			return jsonify(result)
		else:
			USER=User(username,password)
			USER.RestPass()
			result={'result':1}
			session.pop('username', None)
			return jsonify(result)
        else:
                return ''

app.secret_key = 'A0Zr98j/3yX R~XHH!jmN]LWX/,?RT'

if __name__=='__main__':
	app.run(host='0.0.0.0',port='6699')
