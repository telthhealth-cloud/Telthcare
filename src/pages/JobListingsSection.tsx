// components/JobListingsSection.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Briefcase, Clock, DollarSign, Filter, Building, Globe, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface JobPost {
    _id: string;
    title: string;
    posterLink?: string;
    description: string;
    Experience?: string;
    locations: {
        city: string;
        country: string;
        type: "Onsite" | "Hybrid" | "Remote";
    }[];
    type: string;
    department: string;
    requirements: string[];
    salaryRange: {
        min: number;
        max: number;
    };
    closingDate: string;
    status: string;
    sites: string[];
    createdAt: string;
}

interface JobListingsSectionProps {
    siteFilter?: string;
    showFilters?: boolean;
    maxItems?: number;
}

const JobListingsSection = ({
    siteFilter = "telthcare",
    showFilters = true,
    maxItems = 6
}: JobListingsSectionProps) => {
    const navigate = useNavigate();
    const [jobs, setJobs] = useState<JobPost[]>([]);
    const [filteredJobs, setFilteredJobs] = useState<JobPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedType, setSelectedType] = useState<string>("all");
    const [selectedLocation, setSelectedLocation] = useState<string>("all");
    const [selectedDepartment, setSelectedDepartment] = useState<string>("all");

    useEffect(() => {
        fetchJobs();
    }, []);

    useEffect(() => {
        filterJobs();
    }, [jobs, searchTerm, selectedType, selectedLocation, selectedDepartment]);

    const base_url = 'https://careers.mytelth.com'
    // const base_url = 'http://192.168.1.47:8080'

    const fetchJobs = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${base_url}/api/jobpost/getposts/?site=${siteFilter}`);
            const result = await response.json();
            
            const jobsArray = Array.isArray(result.data) ? result.data : [];
            
            setJobs(jobsArray);
            setFilteredJobs(jobsArray);
        } catch (error) {
            console.error("Error fetching jobs:", error);
            setJobs([]);
            setFilteredJobs([]);
        } finally {
            setLoading(false);
        }
    };

    const filterJobs = () => {
        let filtered = jobs;

        if (searchTerm) {
            filtered = filtered.filter(job =>
                job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                job.department.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (selectedType !== "all") {
            filtered = filtered.filter(job => job.type === selectedType);
        }

        if (selectedLocation !== "all") {
            filtered = filtered.filter(job =>
                job.locations.some(loc =>
                    loc.city === selectedLocation ||
                    loc.country === selectedLocation ||
                    loc.type === selectedLocation
                )
            );
        }

        if (selectedDepartment !== "all") {
            filtered = filtered.filter(job => job.department === selectedDepartment);
        }

        if (maxItems && filtered.length > maxItems) {
            filtered = filtered.slice(0, maxItems);
        }

        setFilteredJobs(filtered);
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(date.getTime() - now.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return "Today";
        if (diffDays === 1) return "Tomorrow";
        if (diffDays <= 7) return `In ${diffDays} days`;
        if (diffDays <= 30) return `In ${Math.floor(diffDays / 7)} weeks`;
        return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    };

    const getLocationBadgeColor = (type: string) => {
        switch (type) {
            case "Remote": return "bg-green-100 text-green-800 border-green-200";
            case "Hybrid": return "bg-blue-100 text-blue-800 border-blue-200";
            case "Onsite": return "bg-purple-100 text-purple-800 border-purple-200";
            default: return "bg-gray-100 text-gray-800 border-gray-200";
        }
    };

    const getJobTypeColor = (type: string) => {
        switch (type) {
            case "Full-time": return "bg-primary/10 text-primary border-primary/20";
            case "Part-time": return "bg-secondary/10 text-secondary border-secondary/20";
            case "Contract": return "bg-orange-100 text-orange-800 border-orange-200";
            case "Internship": return "bg-pink-100 text-pink-800 border-pink-200";
            default: return "bg-gray-100 text-gray-800 border-gray-200";
        }
    };

    const handleCardClick = (id: string) => {
        // Navigate to job detail page
        navigate(`/job/${id}`);
    };

   const handleApply = (e: React.MouseEvent, job: JobPost) => {
    e.stopPropagation(); // Prevent card click
    
    // Build application URL with job details
    const applicationUrl = new URL('https://careers.mytelth.com');
    applicationUrl.searchParams.set('jobId', job._id);
    applicationUrl.searchParams.set('jobTitle', job.title);
    
    // Open in new tab
    window.open(applicationUrl.toString(), '_blank', 'noopener,noreferrer');
};

    if (loading) {
        return (
            <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Loading Opportunities...</h2>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <Card key={i} className="animate-pulse">
                                <CardContent className="p-6">
                                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                                    <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                                    <div className="h-3 bg-gray-200 rounded w-5/6 mb-4"></div>
                                    <div className="flex gap-2 mb-4">
                                        <div className="h-6 bg-gray-200 rounded w-20"></div>
                                        <div className="h-6 bg-gray-200 rounded w-24"></div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-12">
                    <Badge variant="outline" className="mb-4 px-4 py-1 text-sm">
                        <Briefcase className="h-3 w-3 mr-2" />
                        Career Opportunities
                    </Badge>
                    <h2 className="text-4xl lg:text-5xl font-bold mb-4">
                        Join Our <span className="text-primary">Growing Team</span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        Build your career with Telth and help shape the future of healthcare
                    </p>
                </div>

                {/* Filters */}
                {showFilters && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8 bg-white p-6 rounded-2xl shadow-lg border"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    placeholder="Search jobs..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10"
                                />
                            </div>

                            <Select value={selectedType} onValueChange={setSelectedType}>
                                <SelectTrigger>
                                    <Briefcase className="h-4 w-4 mr-2" />
                                    <SelectValue placeholder="Job Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Types</SelectItem>
                                    <SelectItem value="Full-time">Full-time</SelectItem>
                                    <SelectItem value="Part-time">Part-time</SelectItem>
                                    <SelectItem value="Contract">Contract</SelectItem>
                                    <SelectItem value="Internship">Internship</SelectItem>
                                </SelectContent>
                            </Select>

                            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                                <SelectTrigger>
                                    <MapPin className="h-4 w-4 mr-2" />
                                    <SelectValue placeholder="Location" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Locations</SelectItem>
                                    <SelectItem value="Remote">Remote</SelectItem>
                                    <SelectItem value="Hybrid">Hybrid</SelectItem>
                                    <SelectItem value="Onsite">Onsite</SelectItem>
                                    <SelectItem value="Chennai">Chennai</SelectItem>
                                    <SelectItem value="Salem">Salem</SelectItem>
                                    <SelectItem value="Delhi">Delhi</SelectItem>
                                </SelectContent>
                            </Select>

                            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                                <SelectTrigger>
                                    <Building className="h-4 w-4 mr-2" />
                                    <SelectValue placeholder="Department" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Departments</SelectItem>
                                    <SelectItem value="Engineering">Engineering</SelectItem>
                                    <SelectItem value="Product">Product</SelectItem>
                                    <SelectItem value="Design">Design</SelectItem>
                                    <SelectItem value="Marketing">Marketing</SelectItem>
                                    <SelectItem value="Sales">Sales</SelectItem>
                                    <SelectItem value="Operations">Operations</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {(searchTerm || selectedType !== "all" || selectedLocation !== "all" || selectedDepartment !== "all") && (
                            <div className="mt-4 flex flex-wrap gap-2">
                                <Badge variant="secondary" className="flex items-center gap-1">
                                    <Filter className="h-3 w-3" />
                                    Filters Active
                                </Badge>
                                {searchTerm && (
                                    <Badge variant="outline" className="flex items-center gap-1">
                                        Search: "{searchTerm}"
                                    </Badge>
                                )}
                                {selectedType !== "all" && (
                                    <Badge variant="outline">{selectedType}</Badge>
                                )}
                                {selectedLocation !== "all" && (
                                    <Badge variant="outline">{selectedLocation}</Badge>
                                )}
                                {selectedDepartment !== "all" && (
                                    <Badge variant="outline">{selectedDepartment}</Badge>
                                )}
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => {
                                        setSearchTerm("");
                                        setSelectedType("all");
                                        setSelectedLocation("all");
                                        setSelectedDepartment("all");
                                    }}
                                >
                                    Clear All
                                </Button>
                            </div>
                        )}
                    </motion.div>
                )}

                {/* Job Cards Grid */}
                {filteredJobs.length === 0 ? (
                    <div className="text-center py-12">
                        <Briefcase className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-2xl font-semibold mb-2">No Jobs Found</h3>
                        <p className="text-muted-foreground mb-6">
                            Try adjusting your filters or check back later for new opportunities
                        </p>
                        <Button onClick={() => {
                            setSearchTerm("");
                            setSelectedType("all");
                            setSelectedLocation("all");
            setSelectedDepartment("all");
                        }}>
                            Clear Filters
                        </Button>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredJobs.map((job: JobPost, index: number) => (
                            <motion.div 
                                key={job._id || index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card 
                                    className="h-full flex flex-col cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                                    onClick={() => handleCardClick(job._id)}
                                >
                                    <CardContent className="p-6 flex-grow">
                                        <div className="flex justify-between items-start mb-4">
                                            <h3 className="text-xl font-bold hover:text-primary transition-colors">
                                                {job.title}
                                            </h3>
                                            <Badge className={getJobTypeColor(job.type)}>
                                                {job.type}
                                            </Badge>
                                        </div>

                                        {job.description && (
                                            <p className="text-muted-foreground mb-4 line-clamp-3">
                                                {job.description}
                                            </p>
                                        )}

                                        <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
                                            <Building className="h-4 w-4" />
                                            <span>{job.department}</span>
                                        </div>

                                        {job.locations && job.locations.length > 0 && (
                                            <div className="mb-4">
                                                <div className="flex flex-wrap gap-2">
                                                    {job.locations.slice(0, 2).map((loc, idx) => (
                                                        <Badge 
                                                            key={idx} 
                                                            variant="outline"
                                                            className={getLocationBadgeColor(loc.type)}
                                                        >
                                                            <MapPin className="h-3 w-3 mr-1" />
                                                            {loc.city}
                                                        </Badge>
                                                    ))}
                                                    {job.locations.length > 2 && (
                                                        <Badge variant="outline">
                                                            +{job.locations.length - 2} more
                                                        </Badge>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </CardContent>

                                    {job.closingDate && (
                                        <CardFooter className="pt-4 border-t flex justify-between items-center">
                                            <div className="flex items-center text-sm text-muted-foreground">
                                                <Clock className="h-4 w-4 mr-1" />
                                                Closes: {formatDate(job.closingDate)}
                                            </div>
                                            <Button 
                                                size="sm"
                                                onClick={(e) => handleApply(e, job)}
                                            >
                                                Apply Now
                                            </Button>
                                        </CardFooter>
                                    )}
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* View All Button */}
                {maxItems && filteredJobs.length >= maxItems && (
                    <div className="text-center mt-12">
                        <Button size="lg" variant="outline">
                            View All Opportunities
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                )}

                {/* Stats */}
                <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="text-center p-6 bg-white rounded-xl shadow border">
                        <div className="text-3xl font-bold text-primary mb-2">{jobs.length}</div>
                        <p className="text-sm text-muted-foreground">Open Positions</p>
                    </div>
                    <div className="text-center p-6 bg-white rounded-xl shadow border">
                        <div className="text-3xl font-bold text-secondary mb-2">
                            {Array.from(new Set(jobs.map(job => job.department))).length}
                        </div>
                        <p className="text-sm text-muted-foreground">Departments</p>
                    </div>
                    <div className="text-center p-6 bg-white rounded-xl shadow border">
                        <div className="text-3xl font-bold text-green-600 mb-2">
                            {Array.from(new Set(jobs.flatMap(job => job.locations.map(loc => loc.city)))).length}
                        </div>
                        <p className="text-sm text-muted-foreground">Cities</p>
                    </div>
                    <div className="text-center p-6 bg-white rounded-xl shadow border">
                        <div className="text-3xl font-bold text-purple-600 mb-2">
                            {jobs.filter(job => job.locations.some(loc => loc.type === "Remote")).length}
                        </div>
                        <p className="text-sm text-muted-foreground">Remote Roles</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default JobListingsSection;