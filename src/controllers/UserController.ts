import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../models/User";

class UserController {

    async create(request: Request, response: Response){
        const { name, email } = request.body;
        
        const usersRespository = getRepository(User);

        const userAlreadyExists = await usersRespository.findOne({
            email
        });

        if(userAlreadyExists){
            return response.status(400).json({
                error: "User already exists."
            })
        }
        const user  = usersRespository.create({
            name, email
        });

        await usersRespository.save(user);

        return response.json(user);
    }
}

export { UserController };