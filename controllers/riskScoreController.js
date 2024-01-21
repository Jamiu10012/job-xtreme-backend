import RiskScoreModel from "../models/RiskScore.js";

export const createRiskScore = async (req, res) => {
  try {
    // Extract data from the request body
    const { score, allocations } = req.body;

    // Validate the data (add additional validation logic as needed)

    // Create a new instance of the RiskScoreModel
    const newRiskScore = new RiskScoreModel({
      score: score,
      allocations: allocations,
    });

    // Save the new risk score to the database
    const savedRiskScore = await newRiskScore.save();

    res.status(201).json({
      message: "Risk Score created successfully",
      riskScore: savedRiskScore,
    });
  } catch (error) {
    console.error("Error creating Risk Score:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllRiskScores = async (req, res) => {
  try {
    // Fetch all risk scores from the database
    const allRiskScores = await RiskScoreModel.find();

    res.status(200).json({
      success: true,
      message: "All Risk Scores fetched successfully",
      riskScores: allRiskScores,
    });
  } catch (error) {
    console.error("Error fetching all Risk Scores:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
