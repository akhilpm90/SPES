import HrEvaluation from "./hrEvaluation.js";
import TlEvaluation from "./TLevaluation.js";
import ManagerEvaluation from "./managerEvaluation.js";

export const getAverageScores = async () => {
    try {
        const hrData = await HrEvaluation.aggregate([
            { $group: { _id: { year: "$year", month: "$month" }, hr_total: { $avg: "$averageScore" } } }
        ]);
        console.log("HR Data:", hrData); // Debugging

        const tlData = await TlEvaluation.aggregate([
            { $group: { _id: { year: "$year", month: "$month" }, tl_total: { $avg: "$averageScore" } } }
        ]);
        console.log("TL Data:", tlData); // Debugging

        const managerData = await ManagerEvaluation.aggregate([
            { $group: { _id: { year: "$year", month: "$month" }, manager_total: { $avg: "$averageScore" } } }
        ]);
        console.log("Manager Data:", managerData); // Debugging

        const mergedData = {};

        hrData.forEach(item => {
            const key = `${item._id.year}-${item._id.month}`;
            mergedData[key] = { year: item._id.year, month: item._id.month, hr_total: item.hr_total || 0 };
        });

        tlData.forEach(item => {
            const key = `${item._id.year}-${item._id.month}`;
            if (!mergedData[key]) mergedData[key] = { year: item._id.year, month: item._id.month };
            mergedData[key].tl_total = item.tl_total || 0;
        });

        managerData.forEach(item => {
            const key = `${item._id.year}-${item._id.month}`;
            if (!mergedData[key]) mergedData[key] = { year: item._id.year, month: item._id.month };
            mergedData[key].manager_total = item.manager_total || 0;
        });

        console.log("Merged Data:", mergedData); // Debugging

        const result = Object.values(mergedData).map(item => {
            const hr = item.hr_total || 0;
            const tl = item.tl_total || 0;
            const manager = item.manager_total || 0;
            const count = (item.hr_total !== undefined) + (item.tl_total !== undefined) + (item.manager_total !== undefined);
            return {
                year: item.year,
                month: item.month,
                avg_total: count > 0 ? (hr + tl + manager) / count : 0  // Avoid division by zero
            };
        });

        console.log("Final Computed Averages:", result); // Debugging

        return result;
    } catch (error) {
        console.error("Error fetching average scores:", error.message);
        throw new Error("Error fetching average scores: " + error.message);
    }
};