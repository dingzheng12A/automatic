#!/usr/bin/env python
#coding: utf8
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
		try:
			self.db.session.add_all([user])
			self.db.session.commit()
			newuser=engine.execute("select id,username,email,status from users where username='%s'" % self.username).first()
			result={'result':1,'id':newuser.id,'username':newuser.username,'email':newuser.email,'status':newuser.status}

		except Exception,e:
			self.db.session.rollback()
			print "failure,reson:%s" % e
			result={'result':0,'reason':e}
		return result
	def DropUser(self,**kwargs):
		if 'userid' in kwargs:
			userid=kwargs['userid']
			#user=Users.query.filter_by(id=userid)
			#user.delete()
			#db.session.commit()
			sql="delete a,b from role_user a join users b on a.uid=b.id where b.id='%s'" % userid
			try:
				engine.execute(sql)
				result={'result':1}
			except:
				result={'result':0}
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
	    print("Find User:%s,username:%s" % (user,self.username))
	    if len(hash_password)!=0: 
	    	user.password=hash_password
	    user.status=self.status
	    try:
                db.session.commit()
            except Exception,e:
                raise ('has error',e)

	def GetIds(self,**kwargs):
		username=''
		if 'username' in kwargs:
			username=kwargs['username']
		sql="select group_concat(c.ids) as ids from users  a join role_user b  join sys_role_auth c where a.id=b.uid and b.roleid=c.roleid and a.username='%s' group by a.id;" % username
		idslist=engine.execute(sql).first() 
		result=[]
		if idslist is not None:
			Idslist=idslist.ids.encode('unicode-escape').decode('string_escape')
			for ids in Idslist.split(','):
				result.append(ids)
			#print "sql:%s idslist:%s user:%s" %(sql,result,username)
			return result
		else:
			return result
		
			
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
	def DropRole(self,**kwargs):
		if 'roleid' in kwargs:
			roleid=kwargs['roleid']
			print 'roleid is:%s' %roleid
			role=engine.execute('delete from role where id=%s' %(roleid))
			result={'result':1}
		else:
			result={'result':0}


class RoleUser:
	def __init__(self,rid='',rname='',uid='',uname='',db=None):
		self.rid=rid
		self.rname=rname
		self.uid=uid
		self.uname=uname
		self.db=db
	def assign(self):
		#role_user=Role_User.query.filter_by(roleid=self.rid,uid=self.uid)
		exists_num=engine.execute("select count(1) from role_user where roleid=%s and uid=%s" %(self.rid,self.uid)).first()[0]
		print "exists_num:%s.type:%s" %(exists_num,type(exists_num))
		if exists_num==0:	
			print 'z '*10
			role_user=Role_User(roleid=self.rid,rolename=self.rname,uid=self.uid,username=self.uname)
			self.db.session.add_all([role_user])
			self.db.session.commit()
		else:
			pass

	
	def remove_assign(self,**kwargs):
		if 'current_user' in kwargs:
			current_user=kwargs['current_user']
		if len(current_user)==0:
			sql="delete from role_user where roleid=%s;" % self.rid
			engine.execute(sql)
		else:
			sql="delete from role_user where roleid=%s and username not in (%s);" % (self.rid,'"'+current_user.replace(',','","').strip()+'"' )
			#print "Execute SQL:%s" % sql
			engine.execute(sql)
		try:
			res=engine.execute(sql)
			#print res
			result={'result':1}
		except Exception,e:
			print 'has error:%s' % e
			result={'result':0}
		return result




class Host():
	def __init__(self,host_ip="",hostname="",sshport=None,remote_user="",host_desc="",db=None):
		self.host_ip=host_ip
		self.hostname=hostname
		self.sshport=sshport
		self.remote_user=remote_user
		self.host_desc=host_desc
		self.db=db

	def addhost(self,**kwargs):
		hostId=engine.execute('select id from sys_hosts where  ipaddr="%s"' % self.host_ip).first()
		if hostId is None:
			try:
				host=Hosts(ipaddr=self.host_ip,hostname=self.hostname,sshport=self.sshport,remote_user=self.remote_user,host_desc=self.host_desc)
				self.db.session.add_all([host])
                		self.db.session.commit()
				hostId=engine.execute('select id from sys_hosts where  ipaddr="%s"' % self.host_ip).first()[0]
				print("hostId:%s" %hostId)
			except:
				result={'result':2}
			groupname=""
			groupId=""
			if 'groupname' in kwargs:
				groupname=kwargs['groupname']
			if 'groupid' in kwargs:
				groupId=kwargs['groupid']
			try:
				hostgroup=Host_Group(db=db)
				hostgroup.assign(groupid=groupId,groupname=groupname,hostid=hostId,host_ip=self.host_ip)
				result={'result':1}
			except Exception,e:
				print("reason:%s" % e)
				result={'result':0}
                	return result
		else:
			result={'result':2}
			return result
	
	def gethost(self):
		#hostlist=Hosts.query.filter_by()
		#修改处理方式，增加了对主机群组的读取
		
                hostlist=engine.execute('select a.id,a.hostname,a.ipaddr,a.sshport,a.remote_user,a.host_desc,b.groupid,b.groupname from sys_hosts a join sys_group_host b on a.id=b.hostid;').fetchall()
                #hostlist=engine.execute('select * from sys_hosts').fetchall()
		for host in hostlist:
			print("ip:%s.port:%s.remote_user:%s.host_desc:%s") %(host.ipaddr,host.sshport,host.remote_user,host.host_desc)
		return hostlist
			
	def delhost(self,**kwargs):
                if 'hostid' in kwargs:
                        hostid=kwargs['hostid']
                        #hosts=Hosts.query.filter_by(id=hostid)
                        #hosts.delete()
                        #db.session.commit()
                        #result={'result':1}
			sql=" delete a,b from sys_hosts a left  join sys_group_host b on a.id=b.hostid where a.id=%s;" % hostid
			try:
				print("SQL:%s" %sql)
				engine.execute(sql)
				result={'result':1}
			except:
				result={'result':2}
			print("delhost result:%s" %result)
                else:
                        result={'result':0}

	def GetHostid(self):
                hostid=engine.execute('select * from sys_hosts where ipaddr="%s"' %(self.host_ip)).first()
                #print 'hostid is:%s' % hostid.id
                return hostid.id


class Host_Group():
	def __init__(self,group_name="",group_desc="",db=None):
		self.group_name=group_name
		self.group_desc=group_desc
		self.db=db

	def addhostgroup(self):
		hostgroup=HostGroup(group_name=self.group_name,group_desc=self.group_desc)
		self.db.session.add_all([hostgroup])
                self.db.session.commit()
		result={'result':1}
                return result

	def gethostgroup(self):
		hostgroups=engine.execute('select * from sys_hostgroup').fetchall()
		return hostgroups

        def assign(self,**kwargs):
		groupid=None
		hostid=None
		groupname=None
		host_ip=None
		if 'groupid' in kwargs:
			groupid=kwargs['groupid']
		if 'hostid' in kwargs:
			hostid=kwargs['hostid']
		if 'groupname' in kwargs:
			groupname=kwargs['groupname']
		if 'host_ip' in kwargs:
			host_ip=kwargs['host_ip']
		if groupid is not None and hostid is not None:	
                	exists_num=engine.execute("select count(*) from sys_group_host where groupid=%s and hostid=%s" %(groupid,hostid)).first()[0]
                	print "exists_num:%s.type:%s" %(exists_num,type(exists_num))
                	if exists_num==0:
                        	print 'z '*10
                        	host_group=HostinGroup(groupid=groupid,groupname=groupname,hostid=hostid,host_ip=host_ip)
                        	self.db.session.add_all([host_group])
                        	self.db.session.commit()
                	else:
                        	pass
		else:
			pass
	def ListGroup(self):

        #       grouplist=engine.execute('select * from sys_hostgroup').fetchall()
                grouplist=engine.execute('select a.id,a.group_name,a.`group_desc`,group_concat(b.host_ip) as hostlist from sys_hostgroup a left join sys_group_host b on a.id=b.groupid group by a.id;').fetchall()
                return grouplist

	def remove_assign(self,**kwargs):
                if 'current_host' in kwargs:
                        current_host=kwargs['current_host']
                if 'groupid' in kwargs:
                        groupid=kwargs['groupid']
                if len(current_host)==0:
                        sql="delete from sys_group_host  where groupid=%s;" % groupid
                        engine.execute(sql)
                else:
                        sql="delete from sys_group_host where groupid=%s and host_ip not in (%s);" % (groupid,'"'+current_host.replace(',','","').strip()+'"' )
                        #print "Execute SQL:%s" % sql
                        engine.execute(sql)
                try:
                        res=engine.execute(sql)
                        #print res
                        result={'result':1}
                except Exception,e:
                        print 'has error:%s' % e
                        result={'result':0}
                return result
	
	def DropHostGroup(self,**kwargs):
		if 'groupid' in kwargs:
			groupid=kwargs['groupid']
			print 'groupid is:%s' %groupid
			role=engine.execute('delete from sys_hostgroup where id=%s' %(groupid))
			result={'result':1}
		else:
			result={'result':0}
