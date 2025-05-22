
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SignupHeader from "@/components/auth/SignupHeader";
import SocialLoginButtons from "@/components/auth/SocialLoginButtons";
import SignupForm, { SignupFormData } from "@/components/auth/SignupForm";
import TestLinks from "@/components/auth/TestLinks";

const Signup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<SignupFormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "artist", // Default role
    acceptTerms: false
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
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

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 bg-gray-50 my-0 lg:px-0 py-[52px]">
        <div className="w-full max-w-md space-y-8">
          <SignupHeader />
          
          <SocialLoginButtons onSocialSignup={handleSocialSignup} />
          
          <SignupForm
            formData={formData}
            handleChange={handleChange}
            handleRoleChange={handleRoleChange}
            handleTermsChange={handleTermsChange}
            handleSubmit={handleSubmit}
          />
          
          {/* For testing purposes - direct links to dashboards */}
          <TestLinks />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;
