#!/usr/bin/env python
#coding: utf-8
from flask import jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine, MetaData,Table
from flask import Flask
from database import *
from Crypto.Cipher import AES
from binascii import a2b_hex,b2a_hex
from config.settings import *
#from Mysible import *
from Mysible_new import *
import hashlib
import MySQLdb
import xlsxwriter
import sys,os
reload(sys)
sys.setdefaultencoding('utf-8') 
#超时3600s
engine = create_engine("mysql://automatic:automatic@localhost:3306/automatic?charset=utf8", convert_unicode=True,pool_recycle=3600)
metadata = MetaData(bind=engine)

#定义当前路径
#BASE_DIR=os.getcwd()
BASE_DIR='/root/automatic/templates'

class AppDeploy():
	def __init__(self,remote_host='',remote_user='',ssh_port=22):
		self.remote_host=remote_host
		self.remote_user=remote_user
		self.ssh_port=ssh_port

	def add_product(self,**kwargs):
		product_name=''
		if 'product' in kwargs:
			product_name=kwargs['product']

		#查询sql
		sql="INSERT INTO sys_products(`pname`)values('%s')" %(product_name)
		try:
                	result=self.engine.execute(sql)
			result={'result':1}
		except Exception,e:
			print "Has an error:%s" % e
			result={'result':0}
		return result


	def upload_packet(self,**kwargs):
		product=''
		if 'product' in kwargs:
			product=kwargs['product'].encode('utf-8')
		appName=''
		if 'appName' in kwargs:
			appName=kwargs['appName']
		version=''
		if 'version' in kwargs:
			version=kwargs['version']
		unzipPath=''
		if 'unzipPath' in kwargs:
			unzipPath=kwargs['unzipPath']
		runCommand=''
		if 'runCommand' in kwargs:
			runCommand=kwargs['runCommand']
		packetFile=None
		if 'packetFile' in kwargs:
			packetFile=kwargs['packetFile']
		try:
			basePath=Install_app['Package_path']
			uploadPath=os.path.join(basePath,product,appName,version)
			print "uploadPath:%s" % uploadPath
			if not os.path.exists(uploadPath):
				os.makedirs(uploadPath)
			else:
				pass
			FilePath=os.path.join(uploadPath,packetFile.filename)
			file=open(FilePath,'wb')
			packetFile.save(file)
			sql="INSERT INTO sys_appdeploy(product,appname,version,package_path,unzippath,command)values('%s','%s','%s','%s','%s','%s')" %(product,appName,version,FilePath,unzipPath,runCommand)
			engine.execute(sql)
			
			result={'result':1}
			
		except Exception,e:
			print "Has an Error:%s" % e
			result={'result':0}
		return result

	
	def appList(self,**kwargs):
		sql=""
		product=""
		if 'product' in kwargs:
			product=kwargs['product']
			sql="select product,appname,version,package_path from sys_appdeploy where product='%s';" % (product)
		else:
			sql="select product,appname,version,package_path from sys_appdeploy;"
		print "Running SQL:%s" % sql
		result=engine.execute(sql).fetchall()
		return result
	#查看应用信息
	def appInfo(self,**kwargs):
		sql=""
		product=""
		appname=""
		version=""
		if 'product' in kwargs and 'appname' in kwargs and 'version' in kwargs :
			product=kwargs['product']
			appname=kwargs['appname']
			version=kwargs['version']
			sql="select product,appname,version,package_path,unzippath,command from sys_appdeploy where product='%s' and appname='%s' and version='%s';" % (product,appname,version)
		else:
			sql="select product,appname,version,package_path from sys_appdeploy;"
		print "Running SQL:%s" % sql
		result=engine.execute(sql).fetchall()
		return result


	def syncPacket(self,**kwargs):
		source=""
		dest=""
		ansibletask=AnsibleTask(self.remote_host)
		if 'source' in kwargs and 'dest' in kwargs:
			source=kwargs['source']
			dest=kwargs['dest']
		try:
			params='src="%s" dest="%s" force=yes mode=644' %(source,dest)
			msg=ansibletask.ansiblePlay('copy',params)
		except Exception,e:
			print "xxxx:%s" % e
                #msg=msg.replace(',','</br>')

	def unzipPacket(self,**kwargs):
		source=""
		dest=""
		ansibletask=AnsibleTask(self.remote_host)
		if 'source' in kwargs and 'dest' in kwargs:
			source=kwargs['source']
			dest=kwargs['dest']
		try:
			params='src="%s" dest="%s" copy=no mode=0755' %(source,dest)
			msg=ansibletask.ansiblePlay('unarchive',params)
		except Exception,e:
			print "xxxx:%s" % e
                #msg=msg.replace(',','</br>')


	def runDeploy(self,**kwargs):
		cmd=""
		ansibletask=AnsibleTask(self.remote_host)
		if 'cmd' in kwargs:
			cmd=kwargs['cmd']
		params='%s' %(cmd)
		msg=ansibletask.ansiblePlay('shell',params)
                #msg=msg.replace(',','</br>')

