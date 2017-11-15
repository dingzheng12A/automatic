#!/usr/bin/env python
#coding: utf-8
from flask import Flask,render_template,redirect
from flask import request,jsonify,session,url_for
from flask_sqlalchemy import SQLAlchemy
from User import User,Role,RoleUser
from database import Users
from Menu import MenuInfo
from AuthPro import AuthPro
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
		user=request.form['username']
		password=request.form['pwd']
		USER=User(user,password)
		result=USER.Auth()
		if result['result'] == 1:
			session['username']=user
		return jsonify(result)
	else:
		return ''

@app.route('/logout',methods=['POST','GET'])
def logout():
	if request.method == 'GET':
		session.pop('username', None)
    		return redirect("/")
@app.route('/main')
def main_page():
	if 'username' in session:	
		username=session['username']
		if username=='admin':
			USER=User()
                	userlist=USER.ListUser()
                	rolelist=USER.ListRole()
                	menu=MenuInfo()
                	menulist,menulist1=menu.GetMenu()
                	username=session['username']
                	return render_template('admin_index.html',username=session['username'].upper(),userlist=userlist,rolelist=rolelist,menulist=menulist,menulist1=menulist1)
		else:
			USER=User()
			userlist=USER.ListUser()
			rolelist=USER.ListRole()
			menu=MenuInfo()
			menulist,menulist1=menu.GetMenu()
			#userlist=UserList()
			username=session['username']
			idslist=USER.GetIds(username=username)
			return render_template('index.html',username=session['username'].upper(),userlist=userlist,rolelist=rolelist,menulist=menulist,menulist1=menulist1,idslist=idslist)
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
		result={'result':1}
		return jsonify(result)
        else:
                return ''

@app.route('/resetpass',methods=['POST','GET'])
def resetpass():
	if request.method == 'POST':
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

@app.route('/delrole',methods=['POST','GET'])
def delrole():
	if request.method == 'POST':
		roleid=request.form['rolelist']
		ROLE=Role()

		if len(roleid.split(","))==1:
			result=ROLE.DropRole(roleid=roleid)
			return jsonify(result)
		else:
			rolelist=roleid.split(",")
			for role in rolelist:
				if len(role)==0:
					pass
				else:
					ROLE.DropRole(roleid=role)
			result={'result':1}
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
			if user!='':
				USER=User(username=user)
				uid=USER.GetUid()
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

@app.route('/addmenu',methods=['POST','GET'])
def addmenu():
	if request.method == 'POST':
		parent_menu=request.form['parent_menu']
		menu_name=request.form['menu_name']
		menu=MenuInfo()
		menu.AddMenu(menu_name=menu_name,parent_menu=parent_menu)
		result={'result':1}
		return jsonify(result)
	else:
		return ''

@app.route('/submenu',methods=['POST','GET'])
def submenu():
	if request.method == 'POST':
		menuid=request.form['menuid']
		menu=MenuInfo()
		result=menu.SubMenu(menuid=menuid)
		return jsonify(result)
	else:
		return ''
		
		
@app.route('/delmenu',methods=['POST','GET'])
def delmenu():
	if request.method == 'POST':
		menuid=request.form['menuid']
		pid=request.form['pid']
		menu=MenuInfo()
		result=menu.DelMenu(menuid=menuid,pid=pid)
		return jsonify(result)
	else:
		return ''

@app.route('/modifyauth',methods=['POST','GET'])	
def modifyauth():
	if request.method == 'POST':
		roleid=request.form['roleid']
		ids=request.form['ids']
		authpro=AuthPro(roleid=roleid,ids=ids)
		result=authpro.AuthMod()
		return jsonify(result)
	else:
		return ''
			

app.secret_key = 'A0Zr98j/3yX R~XHH!jmN]LWX/,?RT'

if __name__=='__main__':
	app.run(host='0.0.0.0',port='6699')
