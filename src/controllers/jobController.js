import { Job } from "../../database/models/job.model.js";
import {
  isValidCompanyHRId,
  jobSchema,
  updateJobSchema,
} from "../validator/JobValidation.js";
import { Company } from "../../database/models/company.model.js";
import { Application } from "../../database/models/application.model.js";
import { applicationSchema } from "../validator/ApplicationValidation.js";

const addJob = async (req, res) => {
  const { addedBy, ...jobData } = req.body;

  try {
    // Validate addedBy separately to handle async validation
    await isValidCompanyHRId(addedBy);

    // Validate the rest of the job data
    const { error } = jobSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // If validation passes, save the job
    const job = new Job({ addedBy, ...jobData });
    await job.save();
    res.status(200).json({ message: "Added successfully", job });
  } catch (error) {
    console.error("Add job error:", error);
    res
      .status(500)
      .json({ message: "Failed to add job", error: error.message });
  }
};

const updateJob = async (req, res) => {
  const { error } = updateJobSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  try {
    // Update job fields based on request body
    const updateJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updateJob) {
      return res.status(404).json({ message: "job not found" });
    }

    res
      .status(200)
      .json({ message: "job updated successfully", job: updateJob });
  } catch (error) {
    console.error("Update job error:", error);
    res
      .status(500)
      .json({ message: "Failed to update job", error: error.message });
  }
};

const deleteJob = async (req, res) => {
  try {
    // delete job fields
    const deletedJob = await Job.findByIdAndDelete(req.params.id, {
      new: true,
    });

    if (!deletedJob) {
      return res.status(404).json({ message: "job not found" });
    }

    res
      .status(200)
      .json({ message: "job deleted successfully", job: deletedJob });
  } catch (error) {
    console.error("delete job error:", error);
    res
      .status(500)
      .json({ message: "Failed to delete job", error: error.message });
  }
};

const getAllJobs = async (req, res) => {
  try {
    const HrId = req.user.userId; // Assuming userId is obtained from authentication middleware

    // Find the company associated with the HR
    const company = await Company.findOne({ companyHR: HrId });
    if (!company) {
      return res.status(404).json({ message: "Company not found for this HR" });
    }

    const jobs = await Job.find({ addedBy: HrId });

    res
      .status(200)
      .json({ message: "Jobs fetched successfully", company, jobs });
  } catch (error) {
    console.error("Error fetching jobs with company information:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch jobs", error: error.message });
  }
};

const getJob = async (req, res) => {
  try {
    const HrId = req.user.userId; // Assuming userId is obtained from authentication middleware

    const company = await Company.findOne({ companyName: req.query.name });

    if (!company) {
      return res.status(404).json({ message: "Company not found for this HR" });
    }
    // Now find all jobs that belong to this company
    const jobs = await Job.find({ addedBy: HrId });
    res
      .status(200)
      .json({ message: "Jobs fetched successfully", company, jobs });
  } catch (error) {
    console.error("Error fetching jobs for company:", error);
  }
};

const getFilteredJobs = async (req, res) => {
  try {
    const filters = req.query;

    // Construct filter criteria based on valid fields
    const filterCriteria = {};

    if (filters.workingTime) {
      filterCriteria.workingTime = filters.workingTime;
    }
    if (filters.jobLocation) {
      filterCriteria.jobLocation = filters.jobLocation;
    }
    if (filters.seniorityLevel) {
      filterCriteria.seniorityLevel = filters.seniorityLevel;
    }
    if (filters.jobTitle) {
      filterCriteria.jobTitle = { $regex: new RegExp(filters.jobTitle, "i") };
    }
    if (filters.technicalSkills && filters.technicalSkills.length > 0) {
      filterCriteria.technicalSkills = { $in: filters.technicalSkills };
    }

    // Find jobs based on the constructed filter criteria
    const jobs = await Job.find(filterCriteria);

    res.status(200).json({ message: "Jobs fetched successfully", jobs });
  } catch (error) {
    console.error("Error fetching filtered jobs:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch jobs", error: error.message });
  }
};

const applyToJob = async (req, res) => {
  try {
    // Validate the incoming formData against applicationSchema
    const { error } = applicationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Extract data from formData
    const jobId = req.body.get('jobId');
    const userId = req.body.get('userId');
    const userTechSkills = JSON.parse(req.body.get('userTechSkills'));
    const userSoftSkills = JSON.parse(req.body.get('userSoftSkills'));
    const userResume = req.body.get('userResume');

    // Create a new application instance
    const newApplication = new Application({
      jobId,
      userId,
      userTechSkills,
      userSoftSkills,
      userResume, 
    });

    // Save the application to the database
    await newApplication.save();

    res.status(201).json({
      message: 'Application submitted successfully',
      application: newApplication,
    });
  } catch (error) {
    console.error('Error applying to job:', error);
    res.status(500).json({ message: 'Failed to apply to job', error: error.message });
  }
};

export {
  addJob,
  updateJob,
  deleteJob,
  getAllJobs,
  getJob,
  getFilteredJobs,
  applyToJob,
};
