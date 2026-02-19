const router = require("express").Router();
const Company = require("../models/Company");

router.get("/recommendation", async (req, res) => {
  const companies = await Company.find();

  const total = companies.length;
  const applied = companies.filter(c => c.status === "Applied").length;
  const rejected = companies.filter(c => c.status === "Rejected").length;
  const interview = companies.filter(c => c.status === "Interview").length;

  let advice = "";

  if (total === 0) {
    advice = "You haven't added any job applications yet. Start applying consistently.";
  } else {
    if (rejected >= 3) {
      advice += "You are receiving multiple rejections. Focus on improving DSA and resume quality. ";
    }

    if (interview >= 2) {
      advice += "You are getting interviews. Practice mock interviews to increase conversion rate. ";
    }

    if (applied > interview) {
      advice += "Tailor your resume to each job description to improve interview chances. ";
    }

    if (applied < 3) {
      advice += "Increase your application frequency for better results. ";
    }
  }

  res.json({ advice });
});

module.exports = router;
