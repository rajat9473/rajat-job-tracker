const router = require("express").Router();
const Company = require("../models/Company");

// GET with search + filter
router.get("/", async (req, res) => {
  const { search, status } = req.query;
  let query = {};

  if (search) {
    query.companyName = { $regex: search, $options: "i" };
  }

  if (status && status !== "All") {
    query.status = status;
  }

  const companies = await Company.find(query);
  res.json(companies);
});

// ADD
router.post("/", async (req, res) => {
  const company = await Company.create(req.body);
  res.json(company);
});

// UPDATE
router.put("/:id", async (req, res) => {
  const updated = await Company.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Company.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
