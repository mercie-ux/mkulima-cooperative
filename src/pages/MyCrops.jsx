import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle} from "../components/ui/card";
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { Input } from "../components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "../components/ui/select"
import { Plus, Search, Calendar, MapPin, User } from "lucide-react"
import { mockCrops } from "../mock/mockData"; 
import { useAuth } from "../context/AuthContext";

const Crops = () => {
    const [searchTerm, setSearchTerm ] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const { user } = useAuth();

    // crops for farmer
    const relevantCrops =
        user?.role === "admin"
            ? mockCrops
            : mockCrops.filter((crop) => crop.farmerId === user?.id);

    // search filters
    const filteredCrops = relevantCrops.filter((crop) => {
        const matchesSearch =
            crop.cropType.toLowerCase().includes(searchTerm.toLowerCase()) ||
            crop.variety.toLowerCase().includes(searchTerm.toLowerCase()) ||
            crop.farmerName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus =
            statusFilter === "all" || crop.status === statusFilter;
        return matchesSearch && matchesStatus;
    });
    const statusColors = {
        planted: "bg-blue-100 text-blue-800",
        growing: "bg-green-100 text-green-800",
        ready: "bg-yellow-100 text-yellow-800",
        harvested: "bg-gray-100 text-gray-800",
    };
    const getHealthColor = (score) => {
        if (score >= 80) return "text-green-600"
        if (score >= 60) return "text-yellow-600"
        return "text-red-600";
    };

    return (
        <section className="space-y-6">
            {/*Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">
                        {user?.role === "admin" ? "All Crops" : "My Crops"}
                    </h2>
                    <p>
                        {user?.role === "admin"
                            ? "Manage all crops across the cooperative"
                            : "Manage your crop plantings"}
                    </p>
                </div>
                <button className="bg-green-700 hover:bg-green-800 rounded-lg px-4">
                    <Plus className="mr-2 h-4 w-4 font-body" />
                    Add Crop
                </button>
            </div>
            {/*Filters */}
            <Card className="border rounded-xl shadow-sm">
                <CardContent className="flex flex-col md:flex-row gap-4 p-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input 
                            placeholder="Search by crop type or variety..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-9"
                        />
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-full md:w-48 font-body">
                            <SelectValue placeholder="All Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="All">All Status</SelectItem>
                            <SelectItem value="planted">Planted</SelectItem>
                            <SelectItem value="growing">Growing</SelectItem>
                            <SelectItem value="ready">Ready</SelectItem>
                            <SelectItem value="harvested">Harvested</SelectItem>
                        </SelectContent>
                    </Select>
                </CardContent>
            </Card>

            {/*Crops card */}
            <div>
                {filteredCrops.map((crop) => (
                    <Card key={crop.id} className="rounded-xl shadow-md border hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <CardTitle className="text-lg font-semibold">
                                    {crop.cropType}
                                </CardTitle>
                                <CardDescription>{crop.variety}</CardDescription>
                            </div>
                            <Badge className={`${statusColors[crop.status]} capitalize px-2 py-1 rounded-md`} variant="secondary">
                                {crop.status}
                            </Badge>
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
                                <span className="text-sm font-body">
                                    {crop.location} • {crop.area} acres
                                </span>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm font-body">
                                    Planted:{" "}
                                    {new Date(crop.plantingDate).toLocaleDateString()}
                                </span>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm font-body">
                                    Harvest:{" "}
                                    {new Date(crop.expectedHarvest).toLocaleDateString()}
                                </span>
                            </div>

                            <div className="flex justify-between items-center pt-2">
                                <span className="text-sm font-medium font-body">Health Score:</span>
                                    <span
                                        className={`text-sm font-bold ${getHealthColor(
                                            crop.healthScore
                                )}`}
                                >
                                    {crop.healthScore}%
                                </span>
                            </div>

                    {crop.notes && (
                        <p className="text-xs text-muted-foreground font-body italic">
                            "{crop.notes}"
                        </p>
                    )}

                    <div className="flex space-x-2 pt-3">
                        <Button variant="outline" size="sm" className="flex-1 font-body">
                            View Details
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1 font-body">
                            Update
                        </Button>
                    </div>
                    </CardContent>
                    </Card>
            ))}
            </div>
            {filteredCrops.length === 0 && (
                <Card>
                    <CardContent>
                        <h3>No crops found</h3>
                        <p>
                            {searchTerm || statusFilter !== "all"
                                ? "Try adjusting your search or filter."
                                : "No crops have been planted yet."
                            }
                        </p>
                    </CardContent>
                </Card>
            )}
        </section>
    );
};
export default Crops