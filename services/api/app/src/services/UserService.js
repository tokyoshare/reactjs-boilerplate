import * as constants from "../constants";
import models, { sequelize } from '../models';
import to from 'await-to-js';
import * as AuthenUtils from "../utils/AuthenUtils";
const uuidv4 = require('uuid/v4');

const userModel = models.User;

export default class UserService {
    constructor() {
    }
    async createUser(user) {
        // create user template
        user.id = uuidv4();
        user.password = AuthenUtils.encryptString(user.password);
        user.createdAt = new Date();
        user.updatedAt = new Date();
        return await to(userModel.create(user));
    }

    async updateUser(user) {
        // Encrypt user password before save to data
        if (user.password) {
            user.password = AuthenUtils.encryptString(user.password);
        }
        user.updatedAt = new Date();
        // create user template
        return await to(userModel.update(user, { where: { id: user.id } }));
    }

    async getUserWithPassword(whereOption) {
        const query = {
            where: {
                ...whereOption,
            },
        };
        return await to(userModel.scope("withPassword").findOne(query));
    }

    async getUser(whereOption) {
        const query = {
            where: {
                ...whereOption,
            },
        };
        return await to(userModel.findOne(query));
    }

    async getAllUsers(pageNumber = 0, pageSize = constants.MAX_USER_PER_PAGE) {
        let startIndex = pageNumber * pageSize;
        const query = { offset: startIndex, limit: pageSize }
        return await to(userModel.findAll());
    }

    async deleteUser(id) {
        const query = {
            where: {
                id,
            },
        };
        return await to(userModel.deleteOne(query));
    }
}
