#!/usr/bin/env python
from flask import jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine, MetaData,Table
from flask import Flask
from database import *
import hashlib
#app=Flask(__name__)
#app.config['SECRET_KEY']='automatic system'
#app.config['SQLALCHEMY_DATABASE_URI']='mysql://automatic:automatic@localhost:3306/automatic'
#app.config['SQLALCHEMY_COMMIT_ON_TEARDOWN']=True
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=True
#db=SQLAlchemy(app)
engine = create_engine('mysql://automatic:automatic@localhost:3306/automatic', convert_unicode=True)
metadata = MetaData(bind=engine)
users = Table('users', metadata, autoload=True)

class User:
	def __init__(self,username='',pwd='',nickname='',email='',db=None,status=''):
		self.username=username
		self.nickname=nickname
		self.pwd=pwd
		self.email=email
		self.db=db
		self.status=status
	def encrypt(self,password):
		m=hashlib.md5()
		m.update(password)
		return m.hexdigest()
	def AddUser(self):
		password=self.encrypt(self.pwd)
		user=Users(username=self.username,nickname=self.nickname,password=password,email=self.email)
		#try:
		self.db.session.add_all([user])
		self.db.session.commit()
		result={'result':1}
		#except Exception,e:
		#	print "failure,reson:%s" % e
		#	result={'result':0}
		return result
	def ListUser(self):
		
		userlist=engine.execute('select * from users').fetchall()
		return userlist
	    	
	def Auth(self):
#		print "username:%s pwd:%s" %(self.username,self.pwd)
		password=self.encrypt(self.pwd)
		user=Users.query.filter_by(username=self.username,password=password).first()
	#	if self.username=='admin' and self.pwd=='admin':
		if user is not None:
			if user.status == 1:
				result={'result':1}
				return result
			else:
				result={'result':2}
				return result
		else:
			result={'result':0}
			return result

	
	def RestPass(self):
	    password=self.encrypt(self.pwd)
	    user=Users.query.filter_by(username=self.username).first()
	    user.password=password
	    try:
	    	db.session.commit()
	    except Exception,e:
		raise ("has error",e)

	def SetPass(self,**kwargs):
	    if 'password' in kwargs:
	    	hash_password=self.encrypt(kwargs['password'])
	    else:
		hash_password=''
	    if 'status' in kwargs:
		self.status=kwargs['status']
		
            user=Users.query.filter_by(username=self.username).first()
	    if len(hash_password)!=0: 
	    	user.password=hash_password
	    user.status=self.status
	    try:
                db.session.commit()
            except Exception,e:
                raise ('has error',e)
		
			

