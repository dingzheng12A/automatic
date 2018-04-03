#!/usr/bin/env python
from remote_user_command import CmdManager
cmd="awk -F ':' '$3!=0{print $1}' /etc/passwd"
cmdmanager=CmdManager(remote_host='127.0.0.1',remote_user='root')
try:
	cmdmanager.Execute(cmd=cmd)
except Exception,e:
	print(e)
