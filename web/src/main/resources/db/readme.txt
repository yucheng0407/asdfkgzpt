登陆plsql developer,执行以下脚本
脚本执行顺序：
step1: table.sql
step2: data.sql
step3: procedure.sql
脚本需在pl/sql developer中command命令窗口执行
格式：@C:\Users\Administrator\Desktop\table.sql;

###### REMARK ######
若需要创建用户和表空间,可用dba登陆数据库
参照以下步骤执行，如下创建dev用户(可自行指定数据dbf文件路径)
1.创建表空间
create tablespace dev_data datafile 'f:\oracle\product\10.2.0\oradata\baseorcl\dev_data.dbf' size 100m autoextend on next 10m;
2.创建临时表空间
create temporary tablespace dev_temp tempfile 'f:\oracle\product\10.2.0\oradata\baseorcl\dev_temp.dbf' size 100m autoextend on next 10m;
3.创建用户
create user dev identified by dev default tablespace dev_data temporary tablespace dev_temp;
4.给用户赋角色和权限
grant connect,resource to dev;
grant debug connect session to dev;

删除用户和表空间
1.删除表空间
drop tablespace dev_data including contents and datafiles;
2.删除临时表空间
drop tablespace dev_temp including contents and datafiles;
3.删除用户
drop user dev cascade;



