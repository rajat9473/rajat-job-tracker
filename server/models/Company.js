const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    companyName: { type: String, required: true },
    role: { type: String, required: true },
    status: {
      type: String,
      enum: ["Applied", "Not Applied", "Interview", "Rejected"],
      default: "Applied",
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Company", companySchema);
