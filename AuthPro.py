#!/usr/bin/env python
from flask import jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine, MetaData,Table
from flask import Flask
from database import *
import hashlib
class AuthPro:
        def __init__(self,roleid='',ids=''):
                self.roleid=roleid
                self.ids=ids

	def AuthMod(self):
		result={}
		Auth=Role_Auth.query.filter_by(roleid=self.roleid).first()
		print "Auth Result:%s" %Auth
		if Auth is None:
			print 'y - '*10
			Auth=Role_Auth(roleid=self.roleid,ids=self.ids)
			db.session.add_all([Auth])
			db.session.commit()
		else:
			print 'n - '*10
			Auth.ids=self.ids
			try:
				db.session.commit()
				result={'result':1}
			except Exception,e:
				result={'result':0}
		return result
				
