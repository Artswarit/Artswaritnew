import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Chrome, Facebook as FacebookIcon } from "lucide-react";

const Signup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "artist", // Default role
    acceptTerms: false
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleRoleChange = (value: string) => {
    setFormData({
      ...formData,
      role: value
    });
  };
  
  const handleTermsChange = (checked: boolean) => {
    setFormData({
      ...formData,
      acceptTerms: checked
    });
  };

  const handleSocialSignup = (provider: string) => {
    console.log(`Signup attempted with ${provider}`);
    toast({
      title: `${provider} Sign up initiated`,
      description: "This feature would connect to the OAuth provider in a production environment.",
    });
  };
  
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    // Simple validation
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords do not match",
        description: "Please make sure your passwords match.",
        variant: "destructive"
      });
      return;
    }
    
    if (!formData.acceptTerms) {
      toast({
        title: "Terms not accepted",
        description: "Please accept the terms of service.",
        variant: "destructive"
      });
      return;
    }
    
    // In a real application, this would call an API to create a new user
    console.log("Signup attempted with:", formData);
    
    // Show success message
    toast({
      title: "Account created!",
      description: "You've successfully signed up.",
    });
    
    // Redirect based on role
    if (formData.role === "artist") {
      setTimeout(() => navigate("/artist-dashboard"), 1000);
    } else {
      setTimeout(() => navigate("/client-dashboard"), 1000);
    }
  };

  return <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 bg-gray-50 my-0 lg:px-0 py-[52px]">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="font-heading text-3xl font-bold tracking-tight text-gray-900 mx-0 my-[25px]">
              Create your account
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-artswarit-purple hover:text-artswarit-purple-dark">
                Log in
              </Link>
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center gap-2"
              onClick={() => handleSocialSignup("Google")}
            >
              <Chrome size={20} className="text-red-500" />
              <span>Sign up with Google</span>
            </Button>
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center gap-2"
              onClick={() => handleSocialSignup("Facebook")}
            >
              <FacebookIcon size={20} className="text-blue-600" />
              <span>Sign up with Facebook</span>
            </Button>
          </div>

          <div className="flex items-center my-4">
            <div className="flex-1 border-t border-gray-300"></div>
            <div className="px-3 text-sm text-gray-500">Or sign up with email</div>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full name</Label>
                <Input id="name" name="name" type="text" placeholder="John Doe" value={formData.name} onChange={handleChange} required className="mt-1" />
              </div>
              <div>
                <Label htmlFor="email">Email address</Label>
                <Input id="email" name="email" type="email" placeholder="name@example.com" value={formData.email} onChange={handleChange} required className="mt-1" />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" placeholder="••••••••" value={formData.password} onChange={handleChange} required className="mt-1" />
              </div>
              <div>
                <Label htmlFor="confirmPassword">Confirm password</Label>
                <Input id="confirmPassword" name="confirmPassword" type="password" placeholder="••••••••" value={formData.confirmPassword} onChange={handleChange} required className="mt-1" />
              </div>
              <div>
                <div className="mb-2">
                  <Label>I am a</Label>
                </div>
                <RadioGroup value={formData.role} onValueChange={handleRoleChange} className="flex gap-6">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="artist" id="artist" />
                    <Label htmlFor="artist">Artist</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="client" id="client" />
                    <Label htmlFor="client">Client</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" checked={formData.acceptTerms} onCheckedChange={handleTermsChange} required />
                <Label htmlFor="terms" className="text-sm">
                  I accept the{" "}
                  <Link to="/terms" className="text-artswarit-purple hover:text-artswarit-purple-dark">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="text-artswarit-purple hover:text-artswarit-purple-dark">
                    Privacy Policy
                  </Link>
                </Label>
              </div>
            </div>

            <Button type="submit" className="w-full">
              Create account
            </Button>
          </form>
          
          {/* For testing purposes - direct links to dashboards */}
          <div className="text-center pt-4 border-t">
            <p className="text-sm text-gray-500 mb-2">Testing Links:</p>
            <div className="flex justify-center gap-4">
              <Link to="/artist-dashboard" className="text-sm text-artswarit-purple hover:text-artswarit-purple-dark">
                Artist Dashboard
              </Link>
              <Link to="/client-dashboard" className="text-sm text-artswarit-purple hover:text-artswarit-purple-dark">
                Client Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>;
};

export default Signup;
