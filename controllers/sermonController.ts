import { Request, Response } from "express";
import * as sermonService from "../services/sermonService";
import { SermonInsert } from "../types/sermonTypes";

export const createSermon = async (req: Request, res: Response) => {
    try {
        const { title, date } = req.body;
        // Validate required fields
        if (!title || !date) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields: title, date",
            });
        }
        const sermonData: SermonInsert = {
            title,
            date,
        };

        const newSermon = await sermonService.createSermon(sermonData);

        return res.status(201).json({
            success: true,
            message: "Sermon created successfully",
            payload: newSermon,
        });
    } catch (error: any) {
        console.error("Error creating sermon:", error);
        return res.status(500).json({
            success: false,
            message: "Error creating sermon",
            error: error.message,
        });
    }
}

export const getSermons = async (req: Request, res: Response) => {
    try {
        const sermons = await sermonService.getSermons();
        return res.status(200).json({
            success: true,
            message: "Sermons retrieved successfully",
            payload: sermons,
        });
    } catch (error: any) {
        console.error("Error retrieving sermons:", error);
        return res.status(500).json({
            success: false,
            message: "Error retrieving sermons",
            error: error.message,
        });
    }
}
