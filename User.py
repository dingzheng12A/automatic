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
engine = create_engine("mysql://automatic:automatic@localhost:3306/automatic?charset=utf8", convert_unicode=True)
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
	def DropUser(self,**kwargs):
		if 'userid' in kwargs:
			userid=kwargs['userid']
			user=Users.query.filter_by(id=userid)
			user.delete()
			db.session.commit()
			result={'result':1}
		else:
			result={'result':0}
	def ListUser(self):
		
		userlist=engine.execute('select * from users where id!=1').fetchall()
		return userlist
	def ListRole(self):
		
	#	rolelist=engine.execute('select * from role').fetchall()
		rolelist=engine.execute('select a.id,a.name,a.`desc`,group_concat(b.username) as userlist from role a left join role_user b on a.id=b.roleid group by a.id;').fetchall()
		return rolelist

	def GetUid(self):
		user=engine.execute('select * from users where username="%s"' %(self.username)).first()
		print 'uid is:%s' % user.id
		return user.id
	    	
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
		
			
class Role:
	def __init__(self,name='',desc='',db=None):
		self.name=name
		self.desc=desc
		self.db=db
	def AddRole(self):
		print "rolename:%s desc:%s" %(self.name,self.desc)
		#addrole=Role(name=self.name,desc=self.desc)
		#try:
		#self.db.session.add_all([addrole])
		#self.db.session.commit()
		#result={'result':1}
		#except Exception,e:
		#	print "failure,reson:%s" % e
		#	result={'result':0}
		role=engine.execute('insert into role(`name`,`desc`)values("%s","%s")' %(self.name,self.desc))
		result={'result':1}
		return result


class RoleUser:
	def __init__(self,rid='',rname='',uid='',uname='',db=None):
		self.rid=rid
		self.rname=rname
		self.uid=uid
		self.uname=uname
		self.db=db
	def assign(self):
		role_user=Role_User(roleid=self.rid,rolename=self.rname,uid=self.uid,username=self.uname)
		self.db.session.add_all([role_user])
		self.db.session.commit()

	
	def remove_assign(self,**kwargs):
		if 'current_user' in kwargs:
			current_user=kwargs['current_user']
		if len(current_user)==0:
			sql="delete from role_user where roleid=%s;" % self.rid
			engine.execute(sql)
		else:
			sql="delete from role_user where roleid=%s and username not in (%s);" % (self.rid,'"'+current_user.replace(',','","').strip()+'"' )
			print "Execute SQL:%s" % sql
			engine.execute(sql)
		try:
			res=engine.execute(sql)
			print res
			result={'result':1}
		except Exception,e:
			print 'has error:%s' % e
			result={'result':0}
		return result


