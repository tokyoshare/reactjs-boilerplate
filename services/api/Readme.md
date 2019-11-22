#install sequelize
npm install --save sequelize-cli

#init project
npx sequelize-cli init

```config```, contains config file, which tells CLI how to connect with database
```models```, contains all models for your project
```migrations```, contains all migration files
```seeders```, contains all seed files

#create model
npx sequelize-cli model:generate --name User --attributes user_name:string,password:string,email:string,avatar:string,role:integer

#migrate the model into database
npx sequelize-cli db:migrate

#create seed for admin 
npx sequelize-cli seed:generate --name admin-user

#gen data for admin
npx sequelize-cli db:seed:all