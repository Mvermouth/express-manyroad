FROM node:8.10.0

#将当前文件夹下所有文件加入需要制作的镜像中, 在 'manage' 文件夹中.
ADD . /app
#  下载所需要的包
RUN cd /app
RUN apt-get update 
RUN apt-get install npm -y
RUN cd /app && npm install 
# 定义程序默认端口
EXPOSE 3000
# 运行程序命令(manage是ADD添加的文件夹名称, server.js是自己的程序启动入口文件)
RUN cd /app && npm run start 
