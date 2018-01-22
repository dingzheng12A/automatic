#!/usr/bin/env python
#coding: utf-8
from Mysible import *
from crypt import crypt
import sys
class UserManager:
	def __init__(self,remote_host='',remote_user=''):
		self.remote_host=remote_host
		self.remote_user=remote_user
	
	def add(self,**kwargs):
		if 'password' in kwargs:
			password=kwargs['password']
		newpass=crypt(password,'hexing')
		ansibletask=AnsibleTask(self.remote_host)
		msg=ansibletask.ansiblePlay('user','name=%s state=present password=%s' % (self.remote_user,newpass))
		msg=msg.replace(',','</br>')
		#verify_result=self.verify(password=password)
		#if verify_result <> 1:
		#	sys.exit(1)
		result={'result':msg}
		return result

	def verify(self,**kwargs):
		if 'password' in kwargs:
			password=kwargs['password']
		ansibletask=AnsibleTask(self.remote_host)
		result=ansibletask.ansiblePlay('shell',"awk -F : '/%s/{print $2}' /etc/shadow" % self.remote_user) 
		print 'result:%s' % result
		print '* - '*10
		#获取已经添加用户的密码字符串
		encrypted_pass=result.split(':')[2].split('"')[1].encode('utf8')
		#获取加密字符串前3个域作为加密参数
		encry_id='$'.join(encrypted_pass.split('$')[0:3])+'$'
		encrypt_pass=crypt(password,encry_id)
		if encrypt_pass == encrypted_pass:
			return 1
		else:
			return 0
