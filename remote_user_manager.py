#!/usr/bin/env python
from Mysible import *
from crypt import crypt
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
		result={'result':msg}
		return result
