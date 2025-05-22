
import { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

export interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
  acceptTerms: boolean;
}

interface SignupFormProps {
  formData: SignupFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRoleChange: (value: string) => void;
  handleTermsChange: (checked: boolean) => void;
  handleSubmit: (event: React.FormEvent) => void;
}

const SignupForm = ({
  formData,
  handleChange,
  handleRoleChange,
  handleTermsChange,
  handleSubmit
}: SignupFormProps) => {
  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Full name</Label>
          <Input 
            id="name" 
            name="name" 
            type="text" 
            placeholder="John Doe" 
            value={formData.name} 
            onChange={handleChange} 
            required 
            className="mt-1" 
          />
        </div>
        <div>
          <Label htmlFor="email">Email address</Label>
          <Input 
            id="email" 
            name="email" 
            type="email" 
            placeholder="name@example.com" 
            value={formData.email} 
            onChange={handleChange} 
            required 
            className="mt-1" 
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input 
            id="password" 
            name="password" 
            type="password" 
            placeholder="••••••••" 
            value={formData.password} 
            onChange={handleChange} 
            required 
            className="mt-1" 
          />
        </div>
        <div>
          <Label htmlFor="confirmPassword">Confirm password</Label>
          <Input 
            id="confirmPassword" 
            name="confirmPassword" 
            type="password" 
            placeholder="••••••••" 
            value={formData.confirmPassword} 
            onChange={handleChange} 
            required 
            className="mt-1" 
          />
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
          <Checkbox 
            id="terms" 
            checked={formData.acceptTerms} 
            onCheckedChange={handleTermsChange} 
            required 
          />
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
  );
};

export default SignupForm;
