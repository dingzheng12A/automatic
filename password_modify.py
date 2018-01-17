#!/usr/bin/env python
import subprocess
import yaml
import time
def mkpasswd():
	Passwd=subprocess.Popen("/usr/bin/mkpasswd -l 32 -s 0 -d 5",shell=True,stdout=subprocess.PIPE)
	result=Passwd.stdout.read().decode('utf8').strip('/n')
	return result


class PasswordManager():
	def __init__(self,filename=".",outfile="out.yaml",passfile="templates/passfile.txt",iplist=[]):
		self.filename=filename
		self.outfile=outfile
		self.iplist=iplist
		self.passfile=passfile
		file=open(self.outfile,"w")
		file.truncate()
		file.close()
	def generate(self):
		file=open(self.filename,"r")
		contents=file.readlines()
		file.close()
		newfile=open(self.outfile,"a+")
		PassFile=open(self.passfile,"a+")
		print contents
		for line in contents:
			newfile.write(line)
		items=[]
		for ip in self.iplist:
			spaces=' '*5
			password=mkpasswd()
			item='%s- {"ip":%s,"password":%s}\n' %(spaces,ip,password)
			print("item:%s" % item)
			newfile.write(item)
			PassFile.write("%s\t%s\t%s\n" %(ip,password.strip("\n"),time.strftime("%y-%m-%d %H:%M:%S",time.localtime(time.time()))) )
		newfile.close()
	
	def execute(self):
		commands=subprocess.Popen("/usr/bin/ansible-playbook %s -f 10" % self.outfile,shell=True,stdout=subprocess.PIPE)
		#time.sleep(20)
		output=commands.stdout.read().decode('utf-8')
		print("Output:%s" %output) 

	def clearyaml(self):
		file=open(self.outfile,"w")
		file.truncate()
		file.close()

		
		
#a=PasswordManager(filename="mysite.yaml",outfile="aaa.yaml",iplist=["10.20.8.213","10.20.8.207"])	
#a.generate()
#a.execute()
#a.clearyaml()
