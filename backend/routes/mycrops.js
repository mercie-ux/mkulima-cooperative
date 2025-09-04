// backend/routes/myCrops.js

// In-memory crops database
let crops = [
  { id: 1, cropType: "Maize", variety: "Hybrid", status: "planted", farmerId: 101, farmerName: "Mercy", location: "Nairobi", area: 2, plantingDate: new Date(), expectedHarvest: new Date(), healthScore: 90, notes: "Healthy crop" },
  { id: 2, cropType: "Wheat", variety: "Durum", status: "growing", farmerId: 102, farmerName: "John", location: "Kiambu", area: 1, plantingDate: new Date(), expectedHarvest: new Date(), healthScore: 80, notes: "" },
];

// Export a function to attach routes
module.exports = function(app) {

  // GET all crops for a farmer (or all if admin)
  app.get("/api/mycrops", (req, res) => {
    const farmerId = req.query.farmerId; // pass ?farmerId=101
    if (farmerId) {
      const myCrops = crops.filter(c => c.farmerId == farmerId);
      return res.json(myCrops);
    }
    res.json(crops); // if no farmerId, return all
  });

  // POST add new crop
  app.post("/api/mycrops", (req, res) => {
    const newCrop = { id: Date.now(), ...req.body };
    crops.push(newCrop);
    res.status(201).json(newCrop);
  });

  // PUT update crop
  app.put("/api/mycrops/:id", (req, res) => {
    const { id } = req.params;
    const index = crops.findIndex(c => c.id == id);
    if (index === -1) return res.status(404).json({ message: "Crop not found" });

    crops[index] = { ...crops[index], ...req.body };
    res.json(crops[index]);
  });

  // DELETE crop
  app.delete("/api/mycrops/:id", (req, res) => {
    const { id } = req.params;
    crops = crops.filter(c => c.id != id);
    res.json({ message: "Crop deleted" });
  });

};
