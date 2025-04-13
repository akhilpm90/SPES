import TeamProductivity from "../models/TeamProductivity.js";
import MonthlyEfficiency from "../models/MonthlyEfficiency.js";

export const getTeamProductivity = async (req, res) => {
    try {
        const data = await TeamProductivity.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: "Error fetching data", error: error.message });
    }
};

export const getMonthlyEfficiency = async (req, res) => {
    try {
        const data = await MonthlyEfficiency.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: "Error fetching monthly efficiency data", error: error.message });
    }
};