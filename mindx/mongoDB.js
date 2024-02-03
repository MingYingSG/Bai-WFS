const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  dob: { type: Date, required: true },
  nationality: { type: String, required: true },
  education: [
    {
      school: { type: String, required: true },
      degree: { type: String, required: true },
      startYear: { type: Number, required: true },
      endYear: { type: Number, required: true },
    },
  ],
  skills: [
    {
      skill: { type: String, required: true },
      level: { type: String, required: true },
    },
  ],
  projects: [
    {
      projectName: { type: String, required: true },
      projectContent: { type: String, required: true },
      role: { type: String, required: true },
      startDate: { type: Date, required: true },
      endDate: { type: Date, required: true },
    },
  ],
  workExperience: [
    {
      companyName: { type: String, required: true },
      role: { type: String, required: true },
      startDate: { type: Date, required: true },
      endDate: { type: Date, required: true },
    },
  ],
  hobbies: [String],
  goals: [String],
});

const User = mongoose.model('User', userSchema);