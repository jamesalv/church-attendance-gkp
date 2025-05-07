import { Request, Response } from 'express';
import * as userService from '../services/userService';
import { UserInsert } from '../types/userTypes';

export const createUser = async (req: Request, res: Response) => {
    try {
        const { name, address, phone, birth_date } = req.body;
        
        // Validate required fields
        if (!name || !address || !phone) {
            return res.status(400).json({
                success: false,
                message: 'Name, address, and phone are required fields',
            });
        }

        const userData: UserInsert = {
            name,
            address,
            phone: phone,
            birth_date: birth_date || null,
        };

        const newUser = await userService.createUser(userData);

        return res.status(201).json({
            success: true,
            message: 'User created successfully',
            payload: newUser
        });
    } catch (error: any) {
        console.error('Error creating user:', error);
        return res.status(500).json({
            success: false,
            message: 'Error creating user',
            error: error.message
        });
    }
}

export const getUserById = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const user = await userService.getUserById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        return res.status(200).json({
            success: true,
            message: 'User retrieved successfully',
            payload: user
        });
    } catch (error: any) {
        console.error('Error retrieving user:', error);
        return res.status(500).json({
            success: false,
            message: 'Error retrieving user',
            error: error.message
        });
    }
}

export const getInactiveUsers = async (req: Request, res: Response) => {
    try {
        const { timeThreshold } = req.query;
        if (!timeThreshold) {
            return res.status(400).json({
                success: false,
                message: 'Time threshold is required',
            });
        }

        const inactiveUsers = await userService.getInactiveUsers(new Date(timeThreshold as string));

        return res.status(200).json({
            success: true,
            message: 'Inactive users retrieved successfully',
            payload: inactiveUsers
        });
    } catch (error: any) {
        console.error('Error retrieving inactive users:', error);
        return res.status(500).json({
            success: false,
            message: 'Error retrieving inactive users',
            error: error.message
        });
    }
}
