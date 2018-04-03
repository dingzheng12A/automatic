#!/usr/bin/env python
#coding: utf-8
from flask import Flask,render_template,redirect
from flask import request,jsonify,session,url_for
from flask_sqlalchemy import SQLAlchemy
from User import User,Role,RoleUser,Host,Host_Group
from database import Users
from Menu import MenuInfo
from AuthPro import AuthPro
from remote_user_manager import UserManager
from remote_user_command import CmdManager
from monitor_reporting import *
from password_modify import *
import json
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
			HOST=Host()
			HOSTGROUP=Host_Group()
                	userlist=USER.ListUser()
                	rolelist=USER.ListRole()
			hostgroups=HOSTGROUP.ListGroup()
                	menu=MenuInfo()
                	menulist,menulist1=menu.GetMenu()
			hostlist=HOST.gethost()
                	username=session['username']
                	return render_template('admin_index.html',username=session['username'].upper(),userlist=userlist,rolelist=rolelist,menulist=menulist,menulist1=menulist1,hostlist=hostlist,hostgroups=hostgroups)
		else:
			USER=User()
			HOST=Host()
			userlist=USER.ListUser()
			rolelist=USER.ListRole()
			menu=MenuInfo()
			menulist,menulist1=menu.GetMenu()
			hostlist=HOST.gethost()
			HOSTGROUP=Host_Group()
			hostgroups=HOSTGROUP.ListGroup()
			#userlist=UserList()
			username=session['username']
			idslist=USER.GetIds(username=username)
			
			return render_template('index.html',username=session['username'].upper(),userlist=userlist,rolelist=rolelist,menulist=menulist,menulist1=menulist1,idslist=idslist,hostlist=hostlist,hostgroups=hostgroups)
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
		print("username:%s" %username)
		if 'pwd' in request.form:
                	password=request.form['pwd']
		enable=request.form['status']
		USER=User(username=username)
		if password !='':		
			USER.SetPass(password=password,status=enable)
		else:
			print(type(USER))
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
		menu_id=request.form['menu_id']
		menu=MenuInfo()
		menu.AddMenu(menu_name=menu_name,parent_menu=parent_menu,menu_id=menu_id)
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

@app.route('/getids',methods=['POST','GET'])
def getids():
	if request.method == 'POST':
		roleid=request.form['roleid']
		authpro=AuthPro(roleid=roleid)
		result=authpro.GetAuth()
		return jsonify(result)
	else:
		return ''

@app.route('/addhost',methods=['POST','GET'])
def addhost():
	if request.method == 'POST':
		host_ip=request.form['host_ip']
		hostname=request.form['hostname']
		sshport=request.form['sshport']
		groupname=request.form['hostgroup']
		groupid=request.form['hostgroupId']
		remote_user=request.form['remote_user']
		host_desc=request.form['host_desc']
		host=Host(host_ip=host_ip,hostname=hostname,sshport=sshport,remote_user=remote_user,host_desc=host_desc,db=db)
		
		result=host.addhost(groupid=groupid,groupname=groupname)
		print("Host operation result:%s" % result) 
		return jsonify(result)
	else:
		return ''

@app.route('/delhost',methods=['POST','GET'])
def delhost():
        if request.method == 'POST':
                hostid=request.form['hostId']
                USER=User()
		host=Host()
                if len(hostid.split(","))==1:
                        result=host.delhost(hostid=hostid)
                        return jsonify(result)
                else:
                        hostlist=hostid.split(",")
                        for host_id in hostlist:
                                host.delhost(hostid=host_id)
			result={'result':1}
                        return jsonify(result)
        else:
                return ''
		
			
@app.route('/addhostgroup',methods=['POST','GET'])
def addhostgroup():
	if request.method == 'POST':
		groupname=request.form['hostgroup_name']
		groupdesc=request.form['hostgroup_desc']
		hostgroup=Host_Group(group_name=groupname,group_desc=groupdesc,db=db)
		result=hostgroup.addhostgroup()
		return jsonify(result)
	else:
		return ''

@app.route('/hostassign',methods=['POST','GET'])
def hostassign():
	if request.method == 'POST':
                groupid=request.form['groupid']
                groupname=request.form['groupname']
                hostlist=request.form['hostlist']
                for host in hostlist.split(','):
                        if host!='':
                                HOST=Host(host_ip=host)
                                hostid=HOST.GetHostid()
                                host_group=Host_Group(db=db)
                                host_group.assign(groupid=groupid,groupname=groupname,host_ip=host,hostid=hostid)
                result={'result':1}
                return jsonify(result)
        else:
                return ''


@app.route('/removehost_assign',methods=['POST','GET'])
def removehost_assign():
        if request.method == 'POST':
                groupid=request.form['groupid']
                current_host=request.form['current_host']
                group_host=Host_Group()
                result=group_host.remove_assign(groupid=groupid,current_host=current_host)
                return jsonify(result)
        else:
                return ''


@app.route('/delhostgroup',methods=['POST','GET'])
def delhostgroup():
        if request.method == 'POST':
                groupid=request.form['grouplist']
                hostgroup=Host_Group()

                if len(groupid.split(","))==1:
                        result=hostgroup.DropHostGroup(groupid=groupid)
                        return jsonify(result)
                else:
                        grouplist=groupid.split(",")
                        for group in grouplist:
                                if len(group)==0:
                                        pass
                                else:
                                        hostgroup.DropHostGroup(groupid=group)
                        result={'result':1}
                        return jsonify(result)
        else:
                return ''


@app.route('/remote_user_manager',methods=['POST','GET'])
def remote_user_manager():
        if request.method == 'POST':
                remote_host=request.form['remote_host']
                username=request.form['username']
		if 'passwd' in request.form:
                	passwd=request.form['passwd']
		operateId=request.form['operateId']
		if operateId=='1':
			usermanager=UserManager(remote_user=username,remote_host=remote_host)
			result=usermanager.add(password=passwd)
			return jsonify(result)
		elif operateId=='2':
			usermanager=UserManager(remote_user=username,remote_host=remote_host)
			result=usermanager.rdel()
			return jsonify(result)
		else:
			return ''
			
        else:
                return ''


"""
@app.route('/change_root_passwd',methods=['POST','GET'])
def change_root_passwd():
	if request.method == 'POST':
		iplist=request.form['iplist']
		iplist=iplist.split('!')
		try:
			passwordmanager=PasswordManager(filename="mysite.yaml",outfile="aaa.yaml",iplist=iplist)
			passwordmanager.generate()
			passwordmanager.execute()
			passwordmanager.clearyaml()
			return jsonify({"result":1})
		except e:
			print("error:%s" %e) 
			return jsonify({"result":0})
	else:
		return ''
		

"""
@app.route('/change_root_passwd',methods=['POST','GET'])
def change_root_passwd():
	if request.method == 'POST':
		passwdfile=open("templates/passfile.txt","a+")
		iplist=request.form['iplist[]'].strip("[]").replace('},{','}!{')
		print "iplist:%s" %iplist
		errorlist=[]
		IpList=iplist.split('!')
		print("IpList:%s",IpList)
		for ip in IpList:
			if ip is not None:
				IP=eval(ip.encode('utf-8'))
				print "Host IP:%s" % IP.get('ip')
				ip=IP.get('ip')
				hostname=IP.get('hostName')
				try:
					usermanager=UserManager(remote_user='root',remote_host=ip)
					password=mkpasswd()
                        		result=usermanager.add(password=password)
					print("Error:%s" %result)
					passwdfile.write("%s\t%s\t%s\t%s\n" %(hostname,ip,password.strip("\n"),time.strftime("%y-%m-%d %H:%M:%S",time.localtime(time.time()))) )
			
				except Exception,e:
					errorlist.append(ip)
		passwdfile.close()
		if len(errorlist)==0:
			return jsonify({"result":1})
		else:
			msg=u"以下主机修改密码失败:</br>%s" % "  ".join(errorlist)
			return jsonify({"result":msg})
	else:
			return jsonify({'result':0})
		


@app.route('/list_remote_user',methods=['POST','GET'])
#查询远端主机上的用户
def list_remote_User():
	cmd="cat /etc/passwd|cut -d : -f1|grep -v root"
	remote_host=request.form['remote_host']
	try:
		cmdmanager=CmdManager(remote_host=remote_host,remote_user='root')
		result=cmdmanager.Execute(cmd=cmd)
		results=result['result'].decode('string_escape')
		results=results.split('"msg":')[1].replace('}]','').replace(' ','').replace('"','')
	except:
		results=''
	userlist=[]
	for user in results.split('\n'):
		user_dict={}
		if len(user)>0:
			user_dict['user']=user
			userlist.append(user_dict)
	return jsonify(userlist)
	

	
	

@app.route('/queryUser',methods=['POST','GET'])
def queryUser():
	if 'username' in session:
		USER=User()
		userlist=USER.ListUser()
		UserList=[]
		for user in userlist:
			User_dict={}
			User_dict['id']=user.id
			User_dict['username']=user.username
			User_dict['email']=user.email
			User_dict['status']=user.status
			UserList.append(User_dict)
		return jsonify(UserList)
	else:
		return ''

@app.route('/queryRole',methods=['POST','GET'])
def queryRole():
	if 'username' in session:
		USER=User()
		rolelist=USER.ListRole()
		RoleList=[]
		for role in rolelist:
			role_dict={}
			role_dict['id']=role.id
			role_dict['rolename']=role.name
			role_dict['roledesc']=role.desc
			role_dict['userlist']=role.userlist
			RoleList.append(role_dict)
		return jsonify(RoleList)
	else:
		return ''
@app.route('/queryHost',methods=['POST','GET'])
def queryHost():
	if 'username' in session:
		HOST=Host()
		hostlist=HOST.gethost()
		HostList=[]
		for host in hostlist:
			host_dict={}
			host_dict['id']=host.id
			host_dict['hostname']=host.hostname
			host_dict['ipaddr']=host.ipaddr
			host_dict['sshport']=host.sshport
			host_dict['remote_user']=host.remote_user
			host_dict['host_desc']=host.host_desc
			HostList.append(host_dict)
		return jsonify(HostList)
	else:
		return ''

@app.route('/queryHostGroup',methods=['POST','GET'])
def queryHostGroup():
	if 'username' in session:
		HOSTGROUP=Host_Group()
		hostgroups=HOSTGROUP.ListGroup()
		HostGroupList=[]
		for hostgroup in hostgroups:
			hostgroup_dict={}
			hostgroup_dict['id']=hostgroup.id
			hostgroup_dict['group_name']=hostgroup.group_name
			hostgroup_dict['group_desc']=hostgroup.group_desc
			hostgroup_dict['hostlist']=hostgroup.hostlist
			HostGroupList.append(hostgroup_dict)
		return jsonify(HostGroupList)
	else:
		return ''

@app.route('/ConnectCheck',methods=['POST','GET'])
def ConnectCheck():
	if 'username' in session:
		db=request.form['server_info'].split('/')[-1]
		host=request.form['server_info'].split(':')[0]
		port=request.form['server_info'].split(':')[1].split('/')[0]
		user=request.form['account']
		passwd=request.form['passwd']
		monitor=MonitorReport(host=host,port=int(port),user=user,passwd=passwd,db=db)
		result=monitor.ConnectCheck()
		print 'host:%s port:%s Result:%s' % (host,port,result)
		return jsonify({'result':result})
		
	else:
		return ''

app.secret_key = 'A0Zr98j/3yX R~XHH!jmN]LWX/,?RT'

if __name__=='__main__':
	app.run(host='0.0.0.0',port=6699,debug=True)
