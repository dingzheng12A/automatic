#!/usr/bin/env python
#coding: utf-8
from Mysible import *
from crypt import crypt
#import paramiko
import sys
class CmdManager:
	def __init__(self,remote_host='',remote_user='',ssh_port=22):
		self.remote_host=remote_host
		self.remote_user=remote_user
		self.ssh_port=ssh_port
	
	def Execute(self,**kwargs):
		if 'cmd' in kwargs:
			cmd=kwargs['cmd']
		try:
			ansibletask=AnsibleTask(self.remote_host)
			msg=ansibletask.ansiblePlay('shell','%s' % (cmd))
			msg=msg.replace(',','</br>')
			result={'result':msg}
			return result
		except:
			return ''

