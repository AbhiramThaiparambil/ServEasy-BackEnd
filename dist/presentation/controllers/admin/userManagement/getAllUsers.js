"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = void 0;
const tsyringe_1 = require("tsyringe");
const getAllUsersUseCase_1 = require("../../../../application/use-case/admin/userManagement/getAllUsersUseCase");
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const page = parseInt(req.query.page) || 0;
        const skip = page * limit;
        const getAdminProfileUseCase = tsyringe_1.container.resolve(getAllUsersUseCase_1.getAllUsersUseCase);
        const { users, count } = yield getAdminProfileUseCase.execute(skip, limit);
        console.log(users);
        res.status(200).json({ users, count });
    }
    catch (error) { }
});
exports.getAllUsers = getAllUsers;
