import { Company } from "../../database/models/company.model.js"
import { Job } from "../../database/models/job.model.js";
import { addCompanySchema, updateCompanySchema } from "../validator/CompanyValidation.js";

const addCompany = async(req,res)=>{
    const { error } = addCompanySchema.validate(req.body);
    if (error) {return res.status(400).json({ error: error.details[0].message });}
try {
    let company= await Company.insertMany(req.body)
    res.status(200).json({message:"Added successfully",company})
} catch (error) {
    console.error("add company error:", error);
    res
      .status(500)
      .json({ message: "Failed to add company", error: error.message });
  }
}

const updateCompany = async(req,res)=>{
    const { error } = updateCompanySchema.validate(req.body);
    if (error) {return res.status(400).json({ error: error.details[0].message });}
    const HrId = req.user.userId; // Assuming userId is obtained from authentication middleware
    let checkCompanyhr= await Company.find({companyHR:HrId})
try {
    let company= await Company.findByIdAndUpdate(checkCompanyhr,req.body,{new:true})
    res.status(200).json({message:"updated successfully",company})
} catch (error) {
    console.error("update company error:", error);
    res
      .status(500)
      .json({ message: "Failed to update company", error: error.message });
  }

}

const deleteCompany = async(req,res)=>{
    const HrId = req.user.userId; // Assuming userId is obtained from authentication middleware
    let checkCompanyhr= await Company.find({companyHR:HrId})
try {
    let company= await Company.findByIdAndDelete(checkCompanyhr,req.body,{new:true})
    res.status(200).json({message:"deleted successfully",company})
} catch (error) {
    console.error("delete company error:", error);
    res
      .status(500)
      .json({ message: "Failed to delete company", error: error.message });
  }

}

const getData = async(req,res)=>{
    try {
        const HrId = req.user.userId; 
        // Find the company by ID
        const company = await Company.findById(req.params.id);
        if (!company) {
          return res.status(404).json({ message: 'Company not found' });
        }
    
        // Find all jobs related to the company
        const jobs = await Job.find({ addedBy: HrId });
    
        res.status(200).json({ company, jobs });
 
      } catch (error) {
        console.error("Error getting company data:", error);
        res.status(500).json({ message: 'Failed to get company data', error: error.message });
      }
    };

 const search= async(req,res) =>{
    try {
        let company = await Company.find({companyName:req.query.name})
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
          }
          return res.status(200).json({ message: 'success',company });

    } catch (error) {
        console.error("Error getting company data:", error);
        res.status(500).json({ message: 'Failed to get company data', error: error.message });
      }
 }  
export {
    addCompany,
    updateCompany,
    deleteCompany,
    getData,
    search
}