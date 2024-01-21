import mongoose from "mongoose";

// Define a schema for asset allocations
const allocationSchema = new mongoose.Schema({
  NigerianStocks: { type: String, required: true },
  ForeignStocks: { type: String, required: true },
  TechStocks: { type: String, required: true },
  EmergingStocks: { type: String, required: true },
  NigerianBonds: { type: String, required: true },
  ForeignBonds: { type: String, required: true },
  Commodities: { type: String, required: true },
  RealEstate: { type: String, required: true },
  TBills: { type: String, required: true },
  Alternative: { type: String, required: true },
});

// Define a schema for risk scores
const riskScoreSchema = new mongoose.Schema({
  score: { type: Number, required: true },
  allocations: { type: allocationSchema, required: true },
});

// Create a model using the riskScoreSchema
const RiskScoreModel = mongoose.model("RiskScore", riskScoreSchema);

export default RiskScoreModel;
