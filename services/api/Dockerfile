FROM node:10.16.0

# set working directory
RUN mkdir /usr/src/app

# make work dir as user/src/app
WORKDIR /usr/src/app

# install and cache app dependencies
ADD ./app /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

RUN npm install
RUN npm install --save babel-plugin-transform-decorators-legacy
RUN npm install -g sequelize-cli
RUN npm install -g babel-cli
RUN npm install -g nodemon

# start app
CMD ["npm", "run", "start"]
