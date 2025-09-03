import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Search, Calendar, MapPin, User } from 'lucide-react';
import { mockCrops } from '../mock/mockData';
import { useAuth } from '../context/AuthContext';

const Crops = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const { user } = useAuth();

  // Filter crops based on user role
  const relevantCrops = user?.role === 'admin'
    ? mockCrops
    : mockCrops.filter(crop => crop.farmerId === user?.id);

  const filteredCrops = relevantCrops.filter(crop => {
    const matchesSearch =
      crop.cropType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crop.variety.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crop.farmerName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || crop.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusColors = {
    planted: 'bg-blue-100 text-blue-800',
    growing: 'bg-green-100 text-green-800',
    ready: 'bg-yellow-100 text-yellow-800',
    harvested: 'bg-gray-100 text-gray-800',
  };

  const getHealthColor = (score) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-destructive';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-Heading font-bold tracking-tight">
            {user?.role === 'admin' ? 'All Crops' : 'My Crops'}
          </h2>
          <p className="text-muted-foreground">
            {user?.role === 'admin'
              ? 'Manage all crops across the cooperative'
              : 'Manage your crop plantings'}
          </p>
        </div>
        <Button className="bg-green-600 text-white hover:bg-yellow-300 hover:text-gray-700 flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Crop
        </Button>
      </div>

      {/* Filters */}
      <Card className="shadow-farm font-body">
        <CardHeader>
          <CardTitle>Filter Crops</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by crop type, variety, or farmer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by status" />
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

      {/* Crops Grid */}
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 font-body">
        {filteredCrops.map((crop) => (
          <Card key={crop.id} className="shadow-farm hover:shadow-crop transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{crop.cropType}</CardTitle>
                  <CardDescription>{crop.variety}</CardDescription>
                </div>
                <Badge className={statusColors[crop.status]} variant="secondary">
                  {crop.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {user?.role === 'admin' && (
                <div className="flex items-center font-body space-x-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{crop.farmerName}</span>
                </div>
              )}

              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{crop.location} • {crop.area} acres</span>
              </div>

              <div className="flex items-center font-body space-x-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  Planted: {new Date(crop.plantingDate).toLocaleDateString()}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  Harvest: {new Date(crop.expectedHarvest).toLocaleDateString()}
                </span>
              </div>

              <div className="flex justify-between font-body items-center pt-2">
                <span className="text-sm font-medium">Health Score:</span>
                <span className={`text-sm font-bold ${getHealthColor(crop.healthScore)}`}>
                  {crop.healthScore}%
                </span>
              </div>

              {crop.notes && (
                <div className="pt-2">
                  <p className="text-xs text-muted-foreground italic">
                    "{crop.notes}"
                  </p>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  View Details
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Update
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No crops fallback */}
      {filteredCrops.length === 0 && (
        <Card className="shadow-farm font-body">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Search className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No crops found</h3>
            <p className="text-muted-foreground text-center">
              {searchTerm || statusFilter !== 'all'
                ? 'Try adjusting your search or filter.'
                : 'No crops have been planted yet.'}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Crops;
