#!/usr/bin/env python
import MySQLdb

class MonitorReport():
	def __init__(self,host='127.0.0.1',port=3306,user='root',passwd='root',db='zabbix'):
		self.host=host
		self.port=port
		self.user=user
		self.passwd=passwd
		self.db=db

	def ConnectCheck(self):
		try:
			self.connect=MySQLdb.connect(host=self.host,port=self.port,user=self.user,passwd=self.passwd,db=self.db,connect_timeout = 10)
			return 1
		except Exception,e:
			return 0
