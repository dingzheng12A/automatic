#!/usr/bin/env python
#coding: utf-8
from flask import jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine, MetaData,Table
from flask import Flask
from database import *
from Crypto.Cipher import AES
from binascii import a2b_hex,b2a_hex
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
	def __init__(self):
		pass

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

	
