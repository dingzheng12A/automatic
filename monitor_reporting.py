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

class MonitorReport():
	def __init__(self,host='127.0.0.1',port=3306,user='root',passwd='root',db='zabbix'):
		self.host=host
		self.port=port
		self.user=user
		self.passwd=passwd
		self.db=db
		self.engine = create_engine("mysql://%s:%s@%s:%d/%s?charset=utf8" % (self.user,self.passwd,self.host,int(self.port),self.db), convert_unicode=True,pool_recycle=3600)
		self.metadata = MetaData(bind=self.engine)

	def ConnectCheck(self):
		try:
			self.connect=MySQLdb.connect(host=self.host,port=self.port,user=self.user,passwd=self.passwd,db=self.db,connect_timeout = 10)
			return 1
		except Exception,e:
			print("has an error:%s" % e)
			return 0

	def serviceQuery(self,**kwargs):
		server_id=''
		if 'server_id' in kwargs:
			server_id=kwargs['server_id']
		if len(server_id)>0: 
			sql="select server_id,host,port,user,passwd,selectdb from sys_monitor_source where server_id='%s'" % server_id
		else:
			sql="select server_id,host,port,user,selectdb from sys_monitor_source"
                try:
                        result=engine.execute(sql).fetchall()
			return result
		except:
			return ''


	def serviceAdd(self,**kwargs):
		server_id=""
		if 'server_id' in kwargs:
			server_id=kwargs['server_id']
		if 'server_name' in kwargs:
			server_name=kwargs['server_name']
		db=server_name.split('/')[-1]
                host=server_name.split(':')[0]
                port=server_name.split(':')[1].split('/')[0]
		passwd=MonitorReport.encrypt('UZeftsT2Cdj2r4B8',self.passwd)
		sql="INSERT INTO sys_monitor_source(server_id,host,port,user,passwd,selectdb)values('%s','%s',%d,'%s','%s','%s')" %(server_id,host,int(port),self.user,passwd,db)
                try:
                        result=engine.execute(sql).fetchall()
			print 'Result:%s' % result
		except Exception,e:
			return ''

	def serviceDel(self,**kwargs):
		server_id=""
		if 'server_id' in kwargs:
			server_id=kwargs['server_id']
		sql="DELETE FROM  sys_monitor_source WHERE server_id='%s'" %(server_id)
                try:
                        result=engine.execute(sql).fetchall()
			return 1
		except Exception,e:
			return 0
	#统计故障次数
	def countOfFail(self,**kwargs):
		start_date=''
		end_date=''
		products=''
		if 'start_date' in kwargs:
			start_date=kwargs['start_date']
		if 'end_date' in kwargs:
			end_date=kwargs['end_date']
		if 'products' in kwargs:
			products=kwargs['products']
		sql="SELECT h.host,count(distinct e.eventid) AS cnt_event FROM triggers t inner join events e inner join hosts h inner join items i inner join functions f WHERE t.triggerid=e.objectid and h.hostid=i.hostid AND i.itemid=f.itemid AND f.triggerid=t.triggerid AND e.source=0 AND e.object=0 AND e.clock>=unix_timestamp('%s') AND e.clock < unix_timestamp(date_add('%s',interval 1 day )) AND t.flags IN ('0','4') AND e.value=1 AND h.host like '%s" %(start_date,end_date,products) +r"%%' GROUP BY h.host ORDER BY cnt_event desc;"

		try:
                	result=self.engine.execute(sql).fetchall()
		except Exception,e:
			print "Has an error:%s" % e
		return result

	#根据故障等级统计故障次数
	def countOfFailLevel(self,**kwargs):
		start_date=''
		end_date=''
		products=''
		if 'start_date' in kwargs:
			start_date=kwargs['start_date']
		if 'end_date' in kwargs:
			end_date=kwargs['end_date']
		if 'products' in kwargs:
			products=kwargs['products']


		sql="SELECT h.host,case t.priority when 5 then '灾难' when 4 then '严重'  when 3 then '一般严重' when 2 then '警告' else '资讯' END as level,count(distinct e.eventid) AS cnt_event FROM triggers t inner join events e inner join hosts h inner join items i inner join functions f WHERE t.triggerid=e.objectid and h.hostid=i.hostid AND i.itemid=f.itemid AND f.triggerid=t.triggerid AND e.source=0 AND e.object=0 AND e.clock>=unix_timestamp('%s') AND e.clock < unix_timestamp(date_add('%s',interval 1 day )) AND t.flags IN ('0','4') AND e.value=1 AND h.host like '%s" %(start_date,end_date,products) +r"%%' GROUP BY  h.host,t.priority  ORDER BY h.host desc;"

		try:
                	result=self.engine.execute(sql).fetchall()
		except Exception,e:
			print "Has an error:%s" % e
		return result


	#统计系统资源情况
	def analyzer_source(self,**kwargs):
		start_date=''
		end_date=''
		products=''
		if 'start_date' in kwargs:
			start_date=kwargs['start_date']
		if 'end_date' in kwargs:
			end_date=kwargs['end_date']
		if 'products' in kwargs:
			products=kwargs['products']

		#查询sql
		sql="select h.hostid,h.host,it_1.itemid,sum(case when it_1.key_='vm.memory.size[available]' then t.value_avg else 0 end)/count(case when it_1.key_='vm.memory.size[available]' then t.value_avg else null end)/1024/1024 as mem,sum(case when it_1.key_='vfs.fs.size[/data,free]' then t.value_avg else 0 end )/count(case when it_1.key_='vfs.fs.size[/data,free]' then t.value_avg else null end)/1024/1024  as disk  from (select distinct(itemid),hostid,key_ from items where key_='vm.memory.size[available]' or key_='vfs.fs.size[/data,free]' or key_='system.cpu.util[,idle]') it_1 inner join hosts h inner join trends_uint t  on h.hostid=it_1.hostid  and it_1.itemid=t.itemid  and t.clock>=unix_timestamp('%s') and t.clock < unix_timestamp(date_add('%s',interval 1 day )) group by h.hostid  having h.host like '%s" %(start_date,end_date,products)+r"%%"+"'order by h.host desc"
		try:
                	result=self.engine.execute(sql).fetchall()
		except Exception,e:
			print "Has an error:%s" % e
		return result

	
	#统计系统CPU资源情况
	def analyzer_source_cpu(self,**kwargs):
		start_date=''
		end_date=''
		products=''
		if 'start_date' in kwargs:
			start_date=kwargs['start_date']
		if 'end_date' in kwargs:
			end_date=kwargs['end_date']
		if 'products' in kwargs:
			products=kwargs['products']

		#查询sql
		sql="select h.hostid,h.host,it_1.itemid,sum(case when it_1.key_='system.cpu.util[,idle]' then t.value_avg else 0 end )/count(case when it_1.key_='system.cpu.util[,idle]' then t.value_avg else NULL end)  as cpu  from (select distinct(itemid),hostid,key_ from items where key_='vm.memory.size[available]' or key_='vfs.fs.size[/data,free]' or key_='system.cpu.util[,idle]') it_1 inner join hosts h inner join trends t  on h.hostid=it_1.hostid  and it_1.itemid=t.itemid  and t.clock>=unix_timestamp('%s') and t.clock < unix_timestamp(date_add('%s',interval 1 day )) and h.host like '%s" %(start_date,end_date,products)+r"%%"+"'group by h.hostid  order by h.host desc;"
		try:
                	result=self.engine.execute(sql).fetchall()
		except Exception,e:
			print "Has an error:%s" % e
		return result


	def export(self,**kwargs):
		if 'filename' in kwargs:
			filename=kwargs['filename']
		else:
			filename='demo.xlsx'

		if 'data' in kwargs:
			data=kwargs['data']

		else:
			data=''

		self.workbook=xlsxwriter.Workbook(os.path.join(BASE_DIR,filename))
		bold=self.workbook.add_format({'bold':True})
		self.worksheet=[]

		if len(data)>0:
			i=0
			while i<len(data):
				self.worksheet=self.workbook.add_worksheet(data[i]['title'])
				j=0
				while j<len(data[i]['keys']):
					self.worksheet.write(0,j,data[i]['keys'][j],bold)
					j=j+1
			
				#定义行数
				h=0
				while h<len(data[i]['data']):
					#定义列
					k=0
					for name,value in data[i]['data'][h].items():
						self.worksheet.set_column(h+1,k,20)
						self.worksheet.write(h+1,k,value)
						k=k+1
					h=h+1
				else:
					pass

				del self.worksheet
				i=i+1
		self.workbook.close()
		
					

		



	#使用AES算法加密字符串
	@staticmethod
	def encrypt(key,string):
		char_length=len(string)
		add_count=16-(char_length%16)
		string=string+'\0'*add_count
		print "string length:%s" % len(string)
		obj=AES.new(key,AES.MODE_CBC,key)
		return b2a_hex(obj.encrypt(string))
	
	#使用AES算法解密字符串
	@staticmethod
	def decrypt(key,string):
		obj=AES.new(key,AES.MODE_CBC,key)
		return obj.decrypt(a2b_hex(string)).rstrip('\0')
