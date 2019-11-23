## How to run

### Download Docker

1. Fork/Clone this repo
2. Download [Docker](https://docker.com) (if necessary)
3. Install and run it.

### Build and Run the App

1. Rename the `example.env` to `.env` befor run. Change `.env` content if you want.

2. Build the images:

```sh
$ docker-compose build
```

3. Run the containers:

```sh
$ docker-compose up -d
```

4. Login to webpage with account to test:`admin@demo.com/admin`

## Project Structure

| Name      | Folder          | Container | Tech                                       |
| --------- | --------------- | --------- | ------------------------------------------ |
| Web       | services/web    | XXX-web   | React, React-Redux, Material-UI            |
| Users API | services/api    | XXX-api   | Node, Express                              |
| User DB   | services/api/db | XXX-db    | PostgreSQL                                 |
**[XXX] is app name, setting in `.env` file**

### **Database Design:**

**User table**

```javascript
id: {
	allowNull: false,
  	primaryKey: true,
    type: DataTypes.STRING
},
email: DataTypes.STRING,
user_name: DataTypes.STRING,
password: DataTypes.STRING,
avatar: DataTypes.STRING,
role: DataTypes.INTEGER
```

### EndPoints

##### 1. Front End- http://localhost:8001

| Endpoint | Accessable | Result                            |
| -------- | ---------- | --------------------------------- |
| /        | Everyone   | render login page                 |
| /home    | Admin      | render users list                 |
| /home    | User       | ~~render ariticle list for user~~ |

##### 2. Back End - http://localhost:3001/v1/

###### **2.1 User API**

| Endpoint          | HTTP Method | Result                      |
| ----------------- | ----------- | --------------------------- |
| users/login       | POST        | login a user                |
| users/authen      | GET         | check user authen           |
| users/            | POST        | create a user               |
| users/            | PUT         | update a user               |
| users/            | GET         | get all users               |
| user/:user_id     | GET         | get user detail information |
| ~~user/:user_id~~ | ~~DELETE~~  | ~~delete user~~             |

**~~strike api~~ is not yet implemented**
