#!/usr/bin/env python
#coding: utf-8
from Mysible import *
from crypt import crypt
#import paramiko
import sys
class UserManager:
	def __init__(self,remote_host='',remote_user='',ssh_port=22):
		self.remote_host=remote_host
		self.remote_user=remote_user
		self.ssh_port=ssh_port
	
	def add(self,**kwargs):
		if 'password' in kwargs:
			password=kwargs['password']
		newpass=crypt(password,'hexing')
		ansibletask=AnsibleTask(self.remote_host)
		msg=ansibletask.ansiblePlay('user','name=%s state=present password=%s' % (self.remote_user,newpass))
		msg=msg.replace(',','</br>')
		#print("error msg:%s" %msg)
		#verify_result=self.verify(password=password)
		#if verify_result <> 1:
		#	sys.exit(1)
		result={'result':msg}
		return result

	def verify(self,**kwargs):
		if 'password' in kwargs:
			password=kwargs['password']
		transport=paramiko.Transport((self.remote_host,self.ssh_port)) 
		try:
			transport.connect(username='root', password=password) 
			trnasport.close()
		except:
			return 0

	#删除远端用户
	def rdel(self,**kwargs):
		ansibletask=AnsibleTask(self.remote_host)
		
		try:
			msg=ansibletask.ansiblePlay('user','name=%s state=absent remove=yes' % (self.remote_user))
			msg=msg.replace(',','</br>')
		except Exception,e:
			msg="%s" % e
		finally:
			result={'result':msg}
		return result
