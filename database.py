#!/usr/bin/env python
#coding:utf-8
from werkzeug.security import generate_password_hash, check_password_hash
from flask_sqlalchemy import SQLAlchemy
from flask import Flask
import datetime
app=Flask(__name__)
app.config['SECRET_KEY']='automatic system'
app.config['SQLALCHEMY_DATABASE_URI']='mysql://automatic:automatic@localhost:3306/automatic'
app.config['SQLALCHEMY_COMMIT_ON_TEARDOWN']=True
db=SQLAlchemy(app)

class  Role(db.Model):
	__tablename__='role'
	id=db.Column(db.Integer,primary_key=True)
	name=db.Column(db.String(64),unique=True)
	desc=db.Column(db.String(200))
	
	def __repr__(self):
		return '<Role {}>'.format(self.name)


class Users(db.Model):
	__tablename__='users'
	id=db.Column(db.Integer,primary_key=True)
	username=db.Column(db.String(64),unique=True,index=True)
	nickname=db.Column(db.String(64),unique=True,index=True)
	password=db.Column(db.String(100))
	email=db.Column(db.String(100))
	status=db.Column(db.Integer,default=1)
	create_time=db.Column(db.DateTime,default=datetime.datetime.now())
	
	@property
	def text_password(self):
		#return self.password
		 raise AttributeError('password cannot be read')

	@text_password.setter
	def text_password(self,text_password):
		self.password=generate_password_hash(text_password)


class Role_User(db.Model):
        __tablename__='role_user'
        id=db.Column(db.Integer,primary_key=True)
        roleid=db.Column(db.Integer,index=True)
        rolename=db.Column(db.String(64))
        uid=db.Column(db.Integer,index=True)
        username=db.Column(db.String(64))
        create_time=db.Column(db.DateTime,default=datetime.datetime.now())


	def __repr__(self):
		return '<Role_User {}>'.format(self.id)


class Menu(db.Model):
	__tablename__='sys_menu'
	id=db.Column(db.Integer,primary_key=True)
        name=db.Column(db.String(64))
        parent_id=db.Column(db.Integer,index=True)
        url=db.Column(db.String(64))
	sort=db.Column(db.Integer)
	span_id=db.Column(db.String(64))
        create_time=db.Column(db.DateTime,default=datetime.datetime.now())

	def __repr__(self):
		return '<Menu {}>'.format(self.name)

class Auth(db.Model):
	__tablename__='sys_auth'
	id=db.Column(db.Integer,primary_key=True)
	name=db.Column(db.String(64))
	menu_id=db.Column(db.Integer)
	url=db.Column(db.String(200))
	code=db.Column(db.String(64))

class Role_Auth(db.Model):
	__tablename__='sys_role_auth'
	id=db.Column(db.Integer,primary_key=True)
	roleid=db.Column(db.Integer)
	ids=db.Column(db.String(200))
	
	

class Hosts(db.Model):
	__tablename__="sys_hosts"
	id=db.Column(db.Integer,primary_key=True)
	hostname=db.Column(db.String(256),default='')
	ipaddr=db.Column(db.String(256))
	sshport=db.Column(db.Integer,default=22)
	remote_user=db.Column(db.String(40))
	host_desc=db.Column(db.String(256))

class HostGroup(db.Model):
	__tablename__="sys_hostgroup"
	id=db.Column(db.Integer,primary_key=True)
        group_name=db.Column(db.String(256))
        group_desc=db.Column(db.String(256))
	def __repr__(self): 
        	return '<HostGroup {}>'.format(self.id) 

class HostinGroup(db.Model):
	__tablename__="sys_group_host"
        id=db.Column(db.Integer,primary_key=True)
        groupid=db.Column(db.Integer,index=True)
        groupname=db.Column(db.String(64))
        hostid=db.Column(db.Integer,index=True)
        host_ip=db.Column(db.String(64))
        create_time=db.Column(db.DateTime,default=datetime.datetime.now())
	

#监控源表
class MonitorSource(db.Model):
	__tablename__='sys_monitor_source'
	id=db.Column(db.Integer,primary_key=True)
        server_id=db.Column(db.String(100),unique=True)
        host=db.Column(db.String(64))
        port=db.Column(db.Integer,index=True)
        user=db.Column(db.String(64))
        passwd=db.Column(db.String(64))
        selectdb=db.Column(db.String(64))
	

#产品表
class Products(db.Model):
	__tablename__='sys_products'
	id=db.Column(db.Integer,primary_key=True)
	#产品名称
        pname=db.Column(db.String(100),unique=True)

	def __repr__(self): 
        	return '<Products {}>'.format(self.id) 


class Appdeploy(db.Model):
	__tablename__='sys_appdeploy'
	id=db.Column(db.Integer,primary_key=True)
	#应用名称
	product=db.Column(db.String(100))
	appname=db.Column(db.String(100))
	version=db.Column(db.String(100))
	package_path=db.Column(db.String(200))
	#解压路径
	unzippath=db.Column(db.String(100))
	#安装命令
	command=db.Column(db.String(100))
	
	


	


if __name__=='__main__':
	db.create_all()
	#admin_role=Role(name='admin')
	#db.session.add_all([admin_role])
	#db.session.commit()
