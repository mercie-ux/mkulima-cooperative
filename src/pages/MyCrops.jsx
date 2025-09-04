import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Plus, Search, Calendar, MapPin, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { get, post, put, del } from "../utils/api";

const Crops = () => {
  const [crops, setCrops] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { user } = useAuth();

  // Fetch crops from API
  const fetchCrops = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const query = user.role !== "admin" ? `?farmerId=${user.id}` : "";
      const data = await get(`/mycrops${query}`);
      setCrops(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch crops.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCrops();
  }, [user]);

  // Add crop
  const handleAddCrop = async () => {
    const newCrop = {
      cropType: "New Crop",
      variety: "Variety",
      status: "planted",
      farmerId: user?.id,
      farmerName: user?.name,
      location: "",
      area: 0,
      plantingDate: new Date(),
      expectedHarvest: new Date(),
      healthScore: 100,
      notes: "",
    };
    try {
      await post("/mycrops", newCrop);
      fetchCrops();
    } catch (err) {
      console.error(err);
      setError("Failed to add crop.");
    }
  };

  // Update crop
  const handleEdit = async (id, updatedData) => {
    try {
      await put(`/mycrops/${id}`, updatedData);
      fetchCrops();
    } catch (err) {
      console.error(err);
      setError("Failed to update crop.");
    }
  };

  // Delete crop
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this crop?")) return;
    try {
      await del(`/mycrops/${id}`);
      fetchCrops();
    } catch (err) {
      console.error(err);
      setError("Failed to delete crop.");
    }
  };

  const filteredCrops = crops.filter(crop => {
    const matchesSearch =
      crop.cropType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crop.variety.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crop.farmerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || crop.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const statusColors = {
    planted: "bg-blue-100 text-blue-800",
    growing: "bg-green-100 text-green-800",
    ready: "bg-yellow-100 text-yellow-800",
    harvested: "bg-gray-100 text-gray-800",
  };

  const getHealthColor = (score) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{user?.role === "admin" ? "All Crops" : "My Crops"}</h2>
          <p>{user?.role === "admin" ? "Manage all crops across the cooperative" : "Manage your crop plantings"}</p>
        </div>
        <Button onClick={handleAddCrop} className="bg-green-700 border-none hover:bg-green-800 rounded-lg px-4">
          <Plus className="mr-2 h-4 w-4 font-body" /> Add Crop
        </Button>
      </div>

      {/* Filters */}
      <Card className="border rounded-xl shadow-sm">
        <CardContent className="flex flex-col md:flex-row gap-4 p-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search by crop type or variety..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-9" />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-48 font-body">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="planted">Planted</SelectItem>
              <SelectItem value="growing">Growing</SelectItem>
              <SelectItem value="ready">Ready</SelectItem>
              <SelectItem value="harvested">Harvested</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Error & Loading */}
      {error && <p className="text-red-600">{error}</p>}
      {loading && <p>Loading crops...</p>}

      {/* Crops cards */}
      <div className="space-y-4">
        {filteredCrops.map(crop => (
          <Card key={crop.id} className="rounded-xl shadow-md border hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg font-semibold">{crop.cropType}</CardTitle>
                <CardDescription>{crop.variety}</CardDescription>
              </div>
              <Badge className={`${statusColors[crop.status]} capitalize px-2 py-1 rounded-md`}>{crop.status}</Badge>
            </CardHeader>
            <CardContent className="space-y-3">
              {user?.role === "admin" && (
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{crop.farmerName}</span>
                </div>
              )}

              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-body">{crop.location} • {crop.area} acres</span>
              </div>

              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-body">Planted: {new Date(crop.plantingDate).toLocaleDateString()}</span>
              </div>

              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-body">Harvest: {new Date(crop.expectedHarvest).toLocaleDateString()}</span>
              </div>

              <div className="flex justify-between items-center pt-2">
                <span className="text-sm font-medium font-body">Health Score:</span>
                <span className={`text-sm font-bold ${getHealthColor(crop.healthScore)}`}>{crop.healthScore}%</span>
              </div>

              {crop.notes && <p className="text-xs text-muted-foreground font-body italic">"{crop.notes}"</p>}

              <div className="flex space-x-2 pt-3">
                <Button variant="outline" size="sm" className="flex-1 font-body">View Details</Button>
                <Button variant="outline" size="sm" className="flex-1 font-body" onClick={() => handleEdit(crop.id, { status: "growing" })}>Update</Button>
                <Button variant="destructive" size="sm" className="flex-1 font-body" onClick={() => handleDelete(crop.id)}>Delete</Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredCrops.length === 0 && !loading && (
          <Card>
            <CardContent>
              <h3>No crops found</h3>
              <p>{searchTerm || statusFilter !== "all" ? "Try adjusting your search or filter." : "No crops have been planted yet."}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
};

export default Crops;
