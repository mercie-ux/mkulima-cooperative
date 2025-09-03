import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Plus, Search, Phone, MapPin, Calendar } from 'lucide-react';
import { mockFarmers } from '../mock/mockData';

export default function Farmers() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFarmers = mockFarmers.filter(farmer =>
    farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (farmer.location && farmer.location.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-Heading font-bold tracking-tight">Farmer Management</h2>
          <p className="text-muted-foreground font-body">
            Manage registered farmers in your cooperative
          </p>
        </div>
        <Button className="bg-green-600 font-body text-white hover:bg-yellow-400 hover:text-gray-800">
          <Plus className="mr-2 h-4 w-4" />
          Add Farmer
        </Button>
      </div>

      {/* Search */}
      <Card className="shadow-farm font-body">
        <CardHeader>
          <CardTitle>Search Farmers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardContent>
      </Card>

      {/* Farmers Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 font-body">
        {filteredFarmers.map((farmer) => (
          <Card key={farmer.id} className="shadow-farm hover:shadow-crop transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{farmer.name}</CardTitle>
                  <CardDescription>{farmer.email}</CardDescription>
                </div>
                <Badge variant="secondary" className="bg-success/10 text-success">
                  Active
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {farmer.phone && (
                <div className="flex font-body items-center space-x-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{farmer.phone}</span>
                </div>
              )}

              {farmer.location && (
                <div className="flex font-body items-center space-x-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{farmer.location}</span>
                </div>
              )}

              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Joined {new Date(farmer.joinDate).toLocaleDateString()}</span>
              </div>

              {farmer.farmSize && (
                <div className="flex justify-between font-body items-center pt-2">
                  <span className="text-sm font-medium">Farm Size:</span>
                  <Badge variant="outline">{farmer.farmSize} acres</Badge>
                </div>
              )}

              <div className="flex space-x-2 pt-2 font-body">
                <Button variant="outline" size="sm" className="flex-1">
                  View Details
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredFarmers.length === 0 && (
        <Card className="shadow-farm">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Search className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No farmers found</h3>
            <p className="text-muted-foreground text-center">
              {searchTerm ? 'Try adjusting your search terms.' : 'No farmers have been registered yet.'}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
