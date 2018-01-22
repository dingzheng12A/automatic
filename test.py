#!/usr/bin/env python
from remote_user_manager import UserManager
usermanager=UserManager("127.0.0.1","root")
usermanager.add(password="abcdefg")
