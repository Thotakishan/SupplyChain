import { useState } from "react";
import { useNavigate } from "react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card.jsx";
import { Input } from "../components/ui/input.jsx";
import { Label } from "../components/ui/label.jsx";
import { Button } from "../components/ui/button.jsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select.jsx";
import { Package, Shield } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback.jsx";

export default function Login() {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Navigate based on user role
    switch (userRole) {
      case "manufacturer":
        navigate("/manufacturer");
        break;
      case "distributor":
        navigate("/distributor");
        break;
      case "retailer":
        navigate("/retailer");
        break;
      case "regulatory":
        navigate("/regulatory");
        break;
      default:
        alert("Please select a role");
    }
  };

  return (
    <div className="login-container">
      {/* Background Image */}
      <div className="login-background">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1770192114412-464cf380bb2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaGFybWFjZXV0aWNhbCUyMGxhYm9yYXRvcnklMjBjbGVhbiUyMG1vZGVybnxlbnwxfHx8fDE3NzA0MTc3NjB8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Pharmaceutical Laboratory"
          className="w-full h-full object-cover"
        />
        <div className="login-background-overlay"></div>
      </div>

      {/* Login Card */}
      <Card className="login-card">
        <CardHeader className="text-center space-y-3">
          <div className="flex justify-center items-center gap-2">
            <Package className="h-8 w-8 text-indigo-600" />
            <Shield className="h-8 w-8 text-indigo-600" />
          </div>
          <CardTitle className="text-3xl">Pharmaceutical Supply Chain</CardTitle>
          <CardDescription className="text-base">
            Management System - Sign In
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="role">User Role</Label>
              <Select value={userRole} onValueChange={setUserRole}>
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manufacturer">
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4" />
                      <span>Manufacturer</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="distributor">
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4" />
                      <span>Distributor</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="retailer">
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4" />
                      <span>Retailer / Hospital</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="regulatory">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      <span>Regulatory Admin</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>

          <div className="mt-6 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
            <p className="text-sm text-indigo-900">
              <strong>Demo Access:</strong> Use any username and password with your selected role to explore the system.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
