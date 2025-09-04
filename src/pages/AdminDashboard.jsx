import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Users, Wheat, TrendingUp, AlertCircle } from "lucide-react";
import { mockFarmers, mockCrops } from "../mock/mockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

export const AdminDashboard = () => {
  const totalFarmers = mockFarmers.length;
  const totalCrops = mockCrops.length;
  const totalArea = mockCrops.reduce((sum, crop) => sum + crop.area, 0);
  const averageHealth = Math.round(
    mockCrops.reduce((sum, crop) => sum + crop.healthScore, 0) / mockCrops.length
  );
  const readyForHarvest = mockCrops.filter((crop) => crop.status === "ready").length;

  const statusColors = {
    planted: "bg-blue-100 text-blue-800",
    growing: "bg-green-100 text-green-800",
    ready: "bg-yellow-100 text-yellow-800",
    harvested: "bg-gray-100 text-gray-800",
  };

  // Chart Data
  const cropsPerFarmer = mockFarmers.map((farmer) => {
    const cropsCount = mockCrops.filter((crop) => crop.farmerName === farmer.name).length;
    return { name: farmer.name, crops: cropsCount };
  });

  const cropStatusDistribution = ["planted", "growing", "ready", "harvested"].map((status) => {
    const count = mockCrops.filter((crop) => crop.status === status).length;
    return { name: status, value: count };
  });

  const pieColors = ["#3b82f6", "#10b981", "#facc15", "#9ca3af"];

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-Heading font-bold tracking-tight">Admin Dashboard</h2>
        <p className="text-sm sm:text-base text-muted-foreground font-body">
          Overview of your cooperative's farming operations
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-md w-full">
          <CardHeader className="flex justify-between items-center pb-2">
            <CardTitle className="text-sm sm:text-base font-medium">Total Farmers</CardTitle>
            <Users className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold text-primary">{totalFarmers}</div>
            <p className="text-xs sm:text-sm text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>

        <Card className="shadow-md w-full">
          <CardHeader className="flex justify-between items-center pb-2">
            <CardTitle className="text-sm sm:text-base font-medium">Active Crops</CardTitle>
            <Wheat className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold text-primary">{totalCrops}</div>
            <p className="text-xs sm:text-sm text-muted-foreground">{totalArea} acres total</p>
          </CardContent>
        </Card>

        <Card className="shadow-md w-full">
          <CardHeader className="flex justify-between items-center pb-2">
            <CardTitle className="text-sm sm:text-base font-medium">Avg Health Score</CardTitle>
            <TrendingUp className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold text-success">{averageHealth}%</div>
            <p className="text-xs sm:text-sm text-muted-foreground">+5% from last week</p>
          </CardContent>
        </Card>

        <Card className="shadow-md w-full">
          <CardHeader className="flex justify-between items-center pb-2">
            <CardTitle className="text-sm sm:text-base font-medium">Ready for Harvest</CardTitle>
            <AlertCircle className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold text-warning">{readyForHarvest}</div>
            <p className="text-xs sm:text-sm text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        {/* Bar Chart: Crops per Farmer */}
        <Card className="shadow-md w-full">
          <CardHeader>
            <CardTitle>Crops per Farmer</CardTitle>
            <CardDescription>Number of crops per registered farmer</CardDescription>
          </CardHeader>
          <CardContent className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cropsPerFarmer}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="crops" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pie Chart: Crop Status Distribution */}
        <Card className="shadow-md w-full">
          <CardHeader>
            <CardTitle>Crop Status Distribution</CardTitle>
            <CardDescription>Visual representation of crop statuses</CardDescription>
          </CardHeader>
          <CardContent className="h-64 w-full flex justify-center items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={cropStatusDistribution}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {cropStatusDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
