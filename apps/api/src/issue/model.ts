import mongoose from "mongoose";


export const IssueSchema = new mongoose.Schema({
  title: { type: String, require: true },
  description: { type: String, require: true }
})