#!/usr/bin/env python
from werkzeug.security import generate_password_hash, check_password_hash
from flask_sqlalchemy import SQLAlchemy
from flask import Flask
import datetime
app=Flask(__name__)
app.config['SECRET_KEY']='automatic system'
app.config['SQLALCHEMY_DATABASE_URI']='mysql://automatic:automatic@localhost:3306/automatic'
app.config['SQLALCHEMY_COMMIT_ON_TEARDOWN']=True
db=SQLAlchemy(app)

class  Role(db.Model):
	__tablename__='role'
	id=db.Column(db.Integer,primary_key=True)
	name=db.Column(db.String(64),unique=True)
	desc=db.Column(db.String(200))
	
	def __repr__(self):
		return '<Role {}>'.format(self.name)


class Users(db.Model):
	__tablename__='users'
	id=db.Column(db.Integer,primary_key=True)
	username=db.Column(db.String(64),unique=True,index=True)
	nickname=db.Column(db.String(64),unique=True,index=True)
	password=db.Column(db.String(100))
	email=db.Column(db.String(100))
	status=db.Column(db.Integer,default=1)
	create_time=db.Column(db.DateTime,default=datetime.datetime.now())
	
	@property
	def text_password(self):
		#return self.password
		 raise AttributeError('password cannot be read')

	@text_password.setter
	def text_password(self,text_password):
		self.password=generate_password_hash(text_password)


class Role_User(db.Model):
        __tablename__='role_user'
        id=db.Column(db.Integer,primary_key=True)
        roleid=db.Column(db.Integer,index=True)
        rolename=db.Column(db.String(64))
        uid=db.Column(db.Integer,index=True)
        username=db.Column(db.String(64))
        create_time=db.Column(db.DateTime,default=datetime.datetime.now())


	def __repr__(self):
		return '<Role_User {}>'.format(self.name)

#if __name__=='__main__':
	#db.create_all()
	#admin_role=Role(name='admin')
	#db.session.add_all([admin_role])
	#db.session.commit()
