import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Wheat, Calendar, MapPin, TrendingUp } from 'lucide-react';
import { mockCrops } from '../mock/mockData';
import { useAuth } from '../context/AuthContext';


const FarmerDashboard = () => {
    
  const { user, logout } = useAuth();
  if(!user) {
    return(
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
            <h2 className="text-2xl font-bold font-body mb-2">No user Logged In</h2>
            <p className="text-muted-foreground font-body">Please login to see your dashboard</p>
        </div>
    )
  }
  // Filter crops for current farmer
  const myCrops = mockCrops.filter(crop => crop.farmerId === user?.id);
  const totalArea = myCrops.reduce((sum, crop) => sum + crop.area, 0);
  const averageHealth = myCrops.length > 0 
    ? Math.round(myCrops.reduce((sum, crop) => sum + crop.healthScore, 0) / myCrops.length)
    : 0;

  const statusColors = {
    planted: 'bg-blue-100 text-blue-800',
    growing: 'bg-green-100 text-green-800',
    ready: 'bg-yellow-100 text-yellow-800',
    harvested: 'bg-gray-100 text-gray-800'
  };

  const upcomingTasks = [
    { task: 'Water tomato plants', due: 'Today', priority: 'high' },
    { task: 'Check corn growth', due: 'Tomorrow', priority: 'medium' },
    { task: 'Fertilize field B-2', due: 'In 3 days', priority: 'low' },
  ];

  const priorityColors = {
    high: 'text-destructive',
    medium: 'text-warning',
    low: 'text-muted-foreground'
  };

  return (
    <div className="space-y-6">
    <div className="flex items-center justify-between">
        <div>
            <h2 className="text-3xl font-bold tracking-tight font-Heading">My Farm Dashboard</h2>
            <p className="text-muted-foreground font-body">
            Manage your crops and farm operations
            </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-farm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium font-Heading">My Crops</CardTitle>
            <Wheat className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{myCrops.length}</div>
            <p className="text-xs text-muted-foreground font-body">
              Active plantings
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-farm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium font-body">Total Area</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{totalArea}</div>
            <p className="text-xs text-muted-foreground font-body">
              acres planted
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-farm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium font-body">Avg Health</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{averageHealth}%</div>
            <p className="text-xs text-muted-foreground font-body">
              Crop health score
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-farm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium font-body">Farm Size</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{user?.farmSize || 0}</div>
            <p className="text-xs text-muted-foreground font-body">
              total acres owned
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* My Crops */}
        <Card className="shadow-farm font-Heading">
          <CardHeader>
            <CardTitle>My Crops</CardTitle>
            <CardDescription>
              Current status of your plantings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {myCrops.length > 0 ? myCrops.map((crop) => (
                <div key={crop.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{crop.cropType} - {crop.variety}</p>
                      <p className="text-xs text-muted-foreground">{crop.location}</p>
                    </div>
                    <Badge className={statusColors[crop.status]} variant="secondary">
                      {crop.status}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-body">
                      <span>Health Score</span>
                      <span>{crop.healthScore}%</span>
                    </div>
                    <Progress value={crop.healthScore} className="h-2" />
                  </div>
                </div>
              )) : (
                <p className="text-sm text-muted-foreground font-body">No crops planted yet.</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Tasks */}
        <Card className="shadow-farm font-Heading">
          <CardHeader>
            <CardTitle>Upcoming Tasks</CardTitle>
            <CardDescription>
              Things to do on your farm
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingTasks.map((task, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium">{task.task}</p>
                    <p className={`text-xs font-body ${priorityColors[task.priority]}`}>
                      {task.priority.toUpperCase()} priority
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground font-body">
                      {task.due}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export default FarmerDashboard;
