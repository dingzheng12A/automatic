#!/usr/bin/env python
#coding: utf-8
from flask import Flask,render_template,redirect
from flask import request,jsonify,session,url_for
from flask_sqlalchemy import SQLAlchemy
from User import User,Role,RoleUser
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
		print "result:%s" % result
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
		rolelist=USER.ListRole()
		#userlist=UserList()
		return render_template('index.html',username=session['username'].upper(),userlist=userlist,rolelist=rolelist)
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

@app.route('/setpass',methods=['POST','GET'])
def setpass():
	if request.method == 'POST':
		print 'x - '*10
                username=request.form['username']
		password=''
		if 'pwd' in request.form:
                	password=request.form['pwd']
		enable=request.form['status']
		USER=User(username)
		if password !='':		
			USER.SetPass(password=password,status=enable)
		else:
			USER.SetPass(status=enable)
		print 'status:%s' % enable
		result={'result':1}
		return jsonify(result)
        else:
                return ''

@app.route('/resetpass',methods=['POST','GET'])
def resetpass():
	if request.method == 'POST':
		print 'x - '*10
                username=request.form['username']
		if 'oldpass' in request.form:
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


@app.route('/deluser',methods=['POST','GET'])
def deluser():
	if request.method == 'POST':
		userid=request.form['userlist']
		USER=User()
		if len(userid.split(","))==1:
			result=USER.DropUser(userid=userid)
			return jsonify(result)
		else:
			userlist=userid.split(",")
			for userid in userlist:
				result=USER.DropUser(userid=userid)
                	return jsonify(result)
	else:
		return ''


@app.route('/addrole',methods=['POST','GET'])
def addrole():
	if request.method == 'POST':
		rolename=request.form['rolename']
		role_desc=request.form['role_desc']
		ROLE=Role(name=rolename,desc=role_desc,db=db)
		result=ROLE.AddRole()
		return jsonify(result)
	else:
		return ''


@app.route('/assign',methods=['POST','GET'])
def assign():
	if request.method == 'POST':
		roleid=request.form['roleid']
		rolename=request.form['rolename']
		userlist=request.form['userlist']
		for user in userlist.split(','):
			print "user is:%s" % user
			if user!='':
				USER=User(username=user)
				uid=USER.GetUid()
				print 'usernmae:%s uid:%s' %(user,uid)
				role_user=RoleUser(rid=roleid,rname=rolename,uid=uid,uname=user,db=db)
				role_user.assign()
		result={'result':1}
		return jsonify(result)
	else:
		return ''


@app.route('/remove_assign',methods=['POST','GET'])
def remove_assign():
        if request.method == 'POST':
                roleid=request.form['roleid']
                current_user=request.form['current_user']
		role_user=RoleUser(rid=roleid)
		result=role_user.remove_assign(current_user=current_user)
                return jsonify(result)
        else:
                return ''
		

app.secret_key = 'A0Zr98j/3yX R~XHH!jmN]LWX/,?RT'

if __name__=='__main__':
	app.run(host='0.0.0.0',port='6699')
