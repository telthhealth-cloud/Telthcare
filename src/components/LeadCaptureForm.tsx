import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";

export const LeadCaptureForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    currentRole: "",
    experience: "",
    city: "",
    employmentStatus: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.fullName || !formData.phone || !formData.email || !formData.currentRole || !formData.experience || !formData.city) {
      toast.error("Please fill in all required fields");
      return;
    }

    // In a real app, this would send data to backend
    console.log("Form submitted:", formData);
    toast.success("Application received! We'll contact you within 24 hours.", {
      duration: 5000,
    });
    
    // Reset form
    setFormData({
      fullName: "",
      phone: "",
      email: "",
      currentRole: "",
      experience: "",
      city: "",
      employmentStatus: "",
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-2xl border-2">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold">Become a Care Manager</CardTitle>
        <CardDescription className="text-base">
          Join care professionals across India building their own independent practices
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name *</Label>
            <Input
              id="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+91-XXXXX-XXXXX"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="currentRole">Current Role *</Label>
            <Select value={formData.currentRole} onValueChange={(value) => setFormData({ ...formData, currentRole: value })}>
              <SelectTrigger id="currentRole">
                <SelectValue placeholder="Select your current role" />
              </SelectTrigger>
              <SelectContent className="bg-popover z-50">
                <SelectItem value="care-home">Care Home Worker</SelectItem>
                <SelectItem value="palliative">Palliative Care Worker</SelectItem>
                <SelectItem value="nursing-home">Nursing Home Staff</SelectItem>
                <SelectItem value="home-care">Independent Home Care Provider</SelectItem>
                <SelectItem value="other">Other Healthcare Worker</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="experience">Years of Experience *</Label>
            <Select value={formData.experience} onValueChange={(value) => setFormData({ ...formData, experience: value })}>
              <SelectTrigger id="experience">
                <SelectValue placeholder="Select your experience" />
              </SelectTrigger>
              <SelectContent className="bg-popover z-50">
                <SelectItem value="0-1">Less than 1 year</SelectItem>
                <SelectItem value="1-3">1-3 years</SelectItem>
                <SelectItem value="3-5">3-5 years</SelectItem>
                <SelectItem value="5-10">5-10 years</SelectItem>
                <SelectItem value="10+">10+ years</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="city">City *</Label>
            <Input
              id="city"
              placeholder="Enter your city"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="employmentStatus">Current Employment Status</Label>
            <Select value={formData.employmentStatus} onValueChange={(value) => setFormData({ ...formData, employmentStatus: value })}>
              <SelectTrigger id="employmentStatus">
                <SelectValue placeholder="Select employment status" />
              </SelectTrigger>
              <SelectContent className="bg-popover z-50">
                <SelectItem value="full-time">Full-time at care facility</SelectItem>
                <SelectItem value="part-time">Part-time at care facility</SelectItem>
                <SelectItem value="independent">Independent home visits</SelectItem>
                <SelectItem value="looking">Looking for opportunities</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" variant="hero" size="lg" className="w-full mt-6">
            <CheckCircle2 className="mr-2 h-5 w-5" />
            Become a Care Manager
          </Button>

          <p className="text-xs text-muted-foreground text-center mt-4">
            We respect your privacy. Your information is secure and will never be shared.
          </p>
        </form>
      </CardContent>
    </Card>
  );
};
