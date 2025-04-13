import HrEvaluation from "../models/hrEvaluation.js"

export const addHrEvaluation= async(req, res)=>{
    try{
        const newEvaluation= new HrEvaluation(req.body);
        await newEvaluation.save();
        res.status(201).json({message:"HR evaluation added successfully"})
    }catch(error){
        if (error.code===11000){
            return res.status(400).json({ message: "Evaluation for this month already exists!" });
        }
        res.status(500).json({ message: "Error adding HR evaluation", error: error.message });
    }
}

export const getAllHrEvaluations=async(req, res)=>{
    try{
        const evaluations=await HrEvaluation.find();
        res.json(evaluations);
    }catch(error){
        res.status(500).json({message:'error fetching evaluations', error:error.message})
    }
}

export const getHrEvaluationByEmployee=async(req, res)=>{
    try{
        const {employee_id}= req.params;
        const evaluations=await HrEvaluation.find({employee_id})
        if (evaluations.length===0){
            return res.status(404).json({message:"No evaluations found for this employee."})
        }
        res.json(evaluations)

    }catch (error) {
        res.status(500).json({ message: "Error fetching evaluation", error: error.message });
      }
}

export const updateHrEvaluation = async (req, res) => {
    try {
      const { id } = req.params;
      const {
        employee_id,
        month,
        year,
        leaveCount,
        unplannedLeaveCount,
        policyComplianceIncident,
        punctuality,
        attendanceRegularity,
        discipline,
        teamCollaboration,
        initiative,
        comments,
      } = req.body;
  
      const updateData = {
        employee_id,
        month,
        year,
        leaveCount,
        unplannedLeaveCount,
        policyComplianceIncident,
        punctuality,
        attendanceRegularity,
        discipline,
        teamCollaboration,
        initiative,
        comments,
      };
      console.log("Update request received for ID:", id);
console.log("Update data:", req.body);
      // ✅ Recalculate averageScore if relevant fields are present
      if (
        punctuality !== undefined &&
        attendanceRegularity !== undefined &&
        discipline !== undefined &&
        teamCollaboration !== undefined &&
        initiative !== undefined
      ) {
        updateData.averageScore =
          (punctuality +
            attendanceRegularity +
            discipline +
            teamCollaboration +
            initiative) / 5;
      }
  
      // 🔄 Check for duplicate (excluding current one)
      const duplicate = await HrEvaluation.findOne({
        _id: { $ne: id },
        employee_id,
        month,
        year,
      });
  
      if (duplicate) {
        return res.status(400).json({
          message: "An evaluation for this employee, month, and year already exists.",
        });
      }
  
      // ✅ Update with the modified updateData object
      const updatedEval = await HrEvaluation.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      });
  
      if (!updatedEval) {
        return res.status(404).json({ message: "Evaluation not found" });
      }
  
      res.json({ message: "Evaluation updated successfully", updatedEval });
    } catch (error) {
      console.error("Error updating evaluation:", error);
      res.status(500).json({
        message: "Error updating evaluation",
        error: error.message,
      });
    }
  };
  
  
  

export const deleteHrEvaluation = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedEval = await HrEvaluation.findByIdAndDelete(id);
      if (!deletedEval) {
        return res.status(404).json({ message: "Evaluation not found!" });
      }
      res.json({ message: "Evaluation deleted successfully!" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting evaluation", error: error.message });
    }
  };

  export const checkHrEvaluationExists = async (req, res) => {
    try {
        const { employee_id, month, year } = req.query;
        const existingEval = await HrEvaluation.findOne({ employee_id, month, year });
        res.json({ exists: !!existingEval });
    } catch (error) {
        console.error("Full Error Object:", error);  // log complete error object
        console.error("Error Message:", error.message);
        res.status(500).json({ message: "Error checking evaluation", error: error.message });
    }
};