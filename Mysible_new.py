# -*- coding:utf-8 -*-
# !/usr/bin/env python
#
# Author: Shawn.T
# Email: shawntai.ds@gmail.com
#
# this is the Interface package of Ansible2 API
#

from collections import namedtuple
from ansible.parsing.dataloader import DataLoader
from ansible.vars import VariableManager
from ansible.inventory import Inventory
from ansible.playbook.play import Play
from ansible.executor.task_queue_manager import TaskQueueManager
from tempfile import NamedTemporaryFile
from callback import MyCallback

import os

class AnsibleTask(object):
    def __init__(self, targetHost=[]):
	self.targetHost=targetHost
        Options = namedtuple(
                          'Options', [
                              'listtags', 'listtasks', 'listhosts', 'syntax', 'connection','module_path',
                              'forks', 'remote_user', 'private_key_file', 'ssh_common_args', 'ssh_extra_args',
                              'sftp_extra_args', 'scp_extra_args', 'become', 'become_method', 'become_user',
                              'verbosity', 'check'
                          ]
                       )

        # initialize needed objects
        self.variable_manager = VariableManager()
	self.callback=MyCallback()

        self.options = Options(
                          listtags=False, listtasks=False, listhosts=False, syntax=False, connection='smart',
                          module_path='/usr/lib/python2.7/site-packages/ansible/modules', forks=100,
                          remote_user='root', private_key_file=None, ssh_common_args=None, ssh_extra_args=None,
                          sftp_extra_args=None, scp_extra_args=None, become=False, become_method=None, become_user='root',
                          verbosity=None, check=False
                      )
        self.passwords = dict(vault_pass='secret')
        self.loader = DataLoader()

        # create inventory and pass to var manager
        self.hostsFile = NamedTemporaryFile(delete=False)
	for host in targetHost: 
		print "host:%s" % host
        	self.hostsFile.write(host+'\n')
        self.hostsFile.close()
        self.inventory = Inventory(loader=self.loader, variable_manager=self.variable_manager, host_list=self.hostsFile.name)
        self.variable_manager.set_inventory(self.inventory)

    def ansiblePlay(self, action,args):
        # create play with tasks
	if action =='user':
		tasks=[
                        dict(action=dict(module='user', args=args), register='shell_out'),
                        #dict(action=dict(module='debug', args=dict(msg='{{shell_out.stdout}}')))
                ]

	elif action == 'copy':
		tasks=[
                        dict(action=dict(module='copy', args=args), register=''),
                        #dict(action=dict(module='debug', args=dict(msg='{{shell_out.stdout}}')))
                ]
	elif action == 'unarchive':
		tasks=[
                        dict(action=dict(module='unarchive', args=args), register=''),
                        #dict(action=dict(module='debug', args=dict(msg='{{shell_out.stdout}}')))
                ]
	else:
		tasks = [
                        dict(action=dict(module='shell', args=args), register='shell_out'),
                        #dict(action=dict(module='debug', args=dict(msg='{{shell_out.stdout}}')))
                ]
        play_source =  dict(
                name = "Ansible Play",
                hosts = 'all',
                gather_facts = 'no',
                tasks = tasks
            )
        play = Play().load(play_source, variable_manager=self.variable_manager, loader=self.loader)
        # run it
        tqm = None
        try:
            stdout_callback=self.callback,
            self.tqm = TaskQueueManager(
                      inventory=self.inventory,
                      variable_manager=self.variable_manager,
                      loader=self.loader,
                      options=self.options,
                      passwords=self.passwords,
                      stdout_callback=self.callback,
                  )
	    print "Info:%s" % self.tqm
	    try:
            	result = self.tqm.run(play)
		print "inventory:%s" % self.inventory.get_hosts()
	    except Exception,e:
		print "Has an Error:%s" % e
            print("Msg: ",self.callback.Msg)
	    return self.callback.Msg
	    print '*- '*10
        finally:
            #print result
            if tqm is not None:
                tqm.cleanup()
                os.remove(self.hostsFile.name)
                self.inventory.clear_pattern_cache()
	    if result==0:
		print 'CCC '*10
		#return self.callback.Msg

#c=AnsibleTask('localhost')
#c.ansiblePlay('user','name=xyz')
