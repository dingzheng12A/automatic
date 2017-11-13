#!/usr/bin/env python
from flask import jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine, MetaData,Table
from flask import Flask
from database import *
import hashlib
engine = create_engine("mysql://automatic:automatic@localhost:3306/automatic?charset=utf8", convert_unicode=True)
metadata = MetaData(bind=engine)
class MenuInfo:
	def __init__(self,id='',name='',pid='',url='',db=None):
                self.id=id
                self.name=name
                self.pid=pid
                self.url=url
                self.db=db

	def GetMenu(self):
		#sql="select a.id as id,a.name as name,a.parent_id,group_concat(b.name) submenu from sys_menu a left join sys_menu b on a.id=b.parent_id  group by a.id  having a.parent_id=1;"
		sql="select id,name from sys_menu where parent_id=1"
		sql2="select id,name,parent_id from sys_menu"
		try:
			result=engine.execute(sql).fetchall()
			result2=engine.execute(sql2).fetchall()
			return result,result2
		except Exception,e:
			print 'has error:%s' % e

	def SubMenu(self,**kwargs):
		menuid=""
		if 'menuid' in kwargs:
			menuid=kwargs['menuid']
		sql="select id,name from sys_menu where parent_id=%s" %(menuid)
		result=engine.execute(sql).fetchall()
		newresult=[]
		for res in result:
			newresult.append({'id':res.id,'name':res.name})
		return newresult

	def AddMenu(self,**kwargs):
		parent_name=''
		menu_name=''
		result={}
		if 'parent_menu' in kwargs:
			parent_name=kwargs['parent_menu']
		if 'menu_name' in kwargs:
			menu_name=kwargs['menu_name']
		sql="insert into sys_menu(`name`,`parent_id`,`create_time`)values('%s',%s,now())" %(menu_name,parent_name)
		try:
			result=engine.execute(sql)
			return result
		except Exception,e:
			print 'has error:%s' % e

	def DelMenu(self,**kwargs):
		menuid=""
		pid=""
		if 'pid' in kwargs:
			pid=kwargs['pid']
		if 'menuid' in kwargs:
                        menuid=kwargs['menuid']
		sql="delete from sys_menu where id=%s" %(menuid)
		engine.execute(sql)
		sql="select id,name from sys_menu where parent_id=%s" % pid
		result=engine.execute(sql).fetchall()
                newresult=[]
                for res in result:
                        newresult.append({'id':res.id,'name':res.name})
                return newresult

a=MenuInfo()
print a.GetMenu()
