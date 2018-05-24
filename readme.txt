1、需要安装的扩展
pip install flask-sqlalchemy
yum install MySQL-python Mariadb-server
mysql > create database automatic;
mysql > grant all on automatic.* to automatic@localhost identified by 'automatic';
mysql > flush privileges;
cd automatic
git branch git checkout remotes/origin/Modify_Assign
python database.py
2、导入数据
mysql -uroot -p automatic < data.sql
3、启动程序
