require('dotenv').config({ path: "../.env" });
const AuthenUtils = require("./utils/AuthenUtils");
const args = process.argv;
const data = AuthenUtils.decodeToken("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NjUwMTE5MDMsImlhdCI6MTU2MzgwMjMwMywic3ViIjoiOGU3NDg4MzgtNmYyZS00YTU4LTllYTUtMjkzM2JhZDQ5NGE1In0.yxlPBdJGIYfJDfTTTiX7PNBT5z3rGRVN2vxEq8WCyLA");
console.log(data, data.sub)