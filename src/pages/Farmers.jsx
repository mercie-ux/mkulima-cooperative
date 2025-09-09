import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Plus, Search, Phone, MapPin, Calendar, Edit, Trash2, XIcon } from 'lucide-react';
import { getFarmers, addFarmer, updateFarmer, deleteFarmer } from '../utils/api';

export default function Farmers() {
  const [farmers, setFarmers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [newFarmer, setNewFarmer] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    farmSize: "",
  });

  // Fetch farmers from backend
  const fetchFarmers = async () => {
    try {
      setLoading(true);
      const data = await getFarmers();
      setFarmers(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch farmers.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFarmers();
  }, []);

  // form input change
  const handleInputChange = (e) => {
    setNewFarmer({ ...newFarmer, [e.target.name]: e.target.value });
  };

  // Submit farmer
  const handleSubmitFarmer = async (e) => {
    e.preventDefault();
    try {
      await addFarmer({ ...newFarmer, farmSize: Number(newFarmer.farmSize) });
      setNewFarmer({ name: "", email: "", phone: "", location: "", farmSize: "" });
      setShowForm(false);
      fetchFarmers();
    } catch (err) {
      console.error(err);
      setError("Failed to add farmer.")
    }
  };

  // Update farmer 
  const handleEditFarmer = async (id) => {
    const newName = prompt('Enter new name:');
    if (!newName) return;
    try {
      await updateFarmer(id, { name: newName });
      fetchFarmers();
    } catch (err) {
      console.error(err);
      setError('Failed to update farmer.');
    }
  };

  // Delete farmer
  const handleDeleteFarmer = async (id) => {
    if (!window.confirm('Are you sure you want to delete this farmer?')) return;
    try {
      await deleteFarmer(id);
      fetchFarmers();
    } catch (err) {
      console.error(err);
      setError('Failed to delete farmer.');
    }
  };

  // Filter farmers by search term
  const filteredFarmers = farmers.filter(farmer =>
    farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (farmer.location && farmer.location.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-Heading font-bold tracking-tight">Farmer Management</h2>
          <p className="text-muted-foreground font-body">
            Manage registered farmers in your cooperative
          </p>
        </div>
        <Button
          onClick={() => setShowForm(true)}
          className="bg-green-600 font-body text-white hover:bg-green-700 hover:text-white flex items-center"
        >
          <Plus className="mr-2 h-4 w-4" /> Add Farmer
        </Button>
      </div>

      {/*Add Farmer Form */}
      {showForm && (
        <Card className="shadow-sm">
          <CardHeader className="flex justify-between font-Heading">
            <CardTitle>Add New Farmer
              <Button variant="ghost" size="sm" onClick={() => setShowForm(false)} className="bg-white">
                <XIcon className="h-4 w-4 bg-green-400" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitFarmer} className="space-y-4 font-body">
              <Input 
                placeholder="Name"
                name="name"
                value={newFarmer.name}
                onChange={handleInputChange}
                required
              />
              <Input 
                placeholder="Email"
                type="email"
                name="email"
                value={newFarmer.email}
                onChange={handleInputChange}
              />
              <Input 
                placeholder="Phone"
                name="phone"
                value={newFarmer.phone}
                onChange={handleInputChange}
              />
              <Input 
                placeholder="Location"
                name="location"
                value={newFarmer.location}
                onChange={handleInputChange}
              />
              <Input 
                placeholder="Farm Size (acres)"
                type="number"
                name="farmSize"
                value={newFarmer.farmSize}
                onChange={handleInputChange}
              />
              <div className="flex justify-end gap-2">
                <Button type="button" variant ="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
                <Button type="subnit" className="bg-green-600 text-white hover:bg-green-700">
                  Save Farmer
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Search */}
      <Card className="shadow-sm font-body">
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

      {/* Error & Loading */}
      {error && <p className="text-red-600">{error}</p>}
      {loading && <p>Loading farmers...</p>}

      {/* Farmers Grid */}
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 font-body">
        {filteredFarmers.map((farmer) => (
          <Card key={farmer.id} className="shadow-md hover:shadow-sm transition-shadow">
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
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{farmer.phone}</span>
                </div>
              )}

              {farmer.location && (
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{farmer.location}</span>
                </div>
              )}

              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  Joined {new Date(farmer.joinDate).toLocaleDateString()}
                </span>
              </div>

              {farmer.farmSize && (
                <div className="flex justify-between items-center pt-2">
                  <span className="text-sm font-medium">Farm Size:</span>
                  <Badge variant="outline">{farmer.farmSize} acres</Badge>
                </div>
              )}

              <div className="flex space-x-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1" onClick={() => handleEditFarmer(farmer.id)}>
                  <Edit className="mr-1 h-4 w-4" /> Edit
                </Button>
                <Button variant="destructive" size="sm" className="flex-1" onClick={() => handleDeleteFarmer(farmer.id)}>
                  <Trash2 className="mr-1 h-4 w-4" /> Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredFarmers.length === 0 && !loading && (
        <Card className="shadow-sm">
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
