import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Badge } from "../components/ui/badge";
import { useAuth } from "../context/AuthContext";
import { User, MapPin, Phone, Calendar, Edit } from "lucide-react";

const Profile = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight font-Heading">My Profile</h2>
        <p className="text-muted-foreground font-body">
          Manage your personal and farm information
        </p>
      </div>

      {/* Profile Overview */}
      <Card className="shadow-farm font-body">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-primary rounded-full">
                <User className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <CardTitle>{user.name}</CardTitle>
                <CardDescription>{user.email}</CardDescription>
              </div>
            </div>
            <Badge className="bg-green-200 text-gray-600" variant="secondary">
              {user.role}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 font-body">
          <div className="grid grid-cols-2 gap-4">
            {user.phone && (
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{user.phone}</span>
              </div>
            )}

            {user.location && (
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{user.location}</span>
              </div>
            )}

            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">
                Joined {new Date(user.joinDate).toLocaleDateString()}
              </span>
            </div>

            {user.farmSize && (
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-body">Farm: {user.farmSize} acres</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Edit Profile */}
      <Card className="shadow-farm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Edit className="h-5 w-5 font-body" />
            <span>Edit Profile</span>
          </CardTitle>
          <CardDescription>
            Update your personal and farm information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 font-body">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                defaultValue={user.name}
                placeholder="Enter your full name"
              />
            </div>

            <div className="space-y-2 font-body">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                defaultValue={user.email}
                placeholder="Enter your email"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2 font-body">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  defaultValue={user.phone || ""}
                  placeholder="Enter your phone"
                />
              </div>

              {user.role === "farmer" && (
                <div className="space-y-2 font-body">
                  <Label htmlFor="farmSize">Farm Size (acres)</Label>
                  <Input
                    id="farmSize"
                    type="number"
                    defaultValue={user.farmSize || ""}
                    placeholder="Enter farm size"
                  />
                </div>
              )}
            </div>

            <div className="space-y-2 font-body">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                defaultValue={user.location || ""}
                placeholder="Enter your location"
              />
            </div>
          </div>

          <div className="flex space-x-2 pt-4">
            <Button className="font-body bg-green-600 hover:bg-yellow-500 hover:text-green-600">
              Save Changes
            </Button>
            <Button variant="outline">Cancel</Button>
          </div>
        </CardContent>
      </Card>

      {/* Account Settings */}
      <Card className="shadow-farm font-body">
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
          <CardDescription>
            Manage your account preferences and security
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center font-body">
            <div>
              <h4 className="text-sm font-medium">Change Password</h4>
              <p className="text-xs text-muted-foreground">
                Update your account password
              </p>
            </div>
            <Button variant="outline" size="sm">
              Change Password
            </Button>
          </div>

          <div className="flex justify-between items-center font-body">
            <div>
              <h4 className="text-sm font-medium">Email Notifications</h4>
              <p className="text-xs text-muted-foreground">
                Manage notification preferences
              </p>
            </div>
            <Button variant="outline" size="sm">
              Configure
            </Button>
          </div>

          <div className="flex justify-between items-center font-body">
            <div>
              <h4 className="text-sm font-medium text-destructive">
                Delete Account
              </h4>
              <p className="text-xs text-muted-foreground">
                Permanently delete your account
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="text-destructive hover:text-destructive"
            >
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
