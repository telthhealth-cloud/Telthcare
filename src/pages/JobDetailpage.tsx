// components/JobDetailPage.tsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
    ArrowLeft,
    MapPin,
    Briefcase,
    Clock,
    DollarSign,
    Building,
    Globe,
    Calendar,
    CheckCircle,
    Send,
    Share2,
    Bookmark,
    ExternalLink
} from "lucide-react";
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



const JobDetailPage = () => {
    const { id } = useParams();
    const [job, setJob] = useState<JobPost | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchJobDetail();
    }, [id]);
     
    const base_url = 'https://careers.mytelth.com'
    // const base_url = 'http://192.168.1.47:8080'
    const fetchJobDetail = async () => {
        try {
            setLoading(true);
            // Update the API endpoint to match your API
            const response = await fetch(`${base_url}/api/jobpost/getpostid/${id}`);
            const result = await response.json();
            // Adjust based on your API response structure
            setJob(result.data || result);
        } catch (error) {
            console.error("Error fetching job details:", error);
        } finally {
            setLoading(false);
        }
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const handleShare = async () => {
    if (!job) return;

    const shareData = {
        title: job.title,
        text: `Check out this job: ${job.title}`,
        url: window.location.href,
    };

    try {
        if (navigator.share) {
            await navigator.share(shareData);
        } else {
            await navigator.clipboard.writeText(window.location.href);
            alert("Link copied to clipboard!");
        }
    } catch (err) {
        console.error("Share failed:", err);
    }
};


    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    const handleApply = () => {
        if (job?.posterLink) {
            const url = new URL(job.posterLink);
  url.searchParams.set("jobId", job._id);
            window.open(job.posterLink, '_blank', 'noopener,noreferrer');
        } else {
            alert('Application link not available for this position');
        }
    };

    const getLocationBadgeColor = (type: string) => {
        switch (type) {
            case "Remote": return "bg-green-100 text-green-800 border-green-200";
            case "Hybrid": return "bg-blue-100 text-blue-800 border-blue-200";
            case "Onsite": return "bg-purple-100 text-purple-800 border-purple-200";
            default: return "bg-gray-100 text-gray-800 border-gray-200";
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
                <div className="container mx-auto px-4">
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-200 rounded w-48 mb-6"></div>
                        <div className="h-12 bg-gray-200 rounded w-3/4 mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
                        <div className="grid lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 space-y-4">
                                <div className="h-64 bg-gray-200 rounded"></div>
                            </div>
                            <div className="space-y-4">
                                <div className="h-48 bg-gray-200 rounded"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!job) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Job Not Found</h2>
                    <Link to="/careers">
                        <Button>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Careers
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
            <div className="mx-auto px-4 w-full lg:w-[70%] max-w-[70vw] min-w-[320px]">
                {/* Back Button */}
                <Link to="/careers">
                    <Button variant="ghost" className="mb-8">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to All Jobs
                    </Button>
                </Link>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-2"
                    >
                        {/* Job Header */}
                        <div className="mb-8">
                            <div className="flex flex-wrap items-center gap-2 mb-4">
                                <Badge variant="outline" className="bg-primary/10 text-primary">
                                    {job.department}
                                </Badge>
                                <Badge variant="outline">
                                    {job.type}
                                </Badge>
                                {job.Experience && (
                                    <Badge variant="secondary">
                                        {job.Experience}
                                    </Badge>
                                )}
                            </div>

                            <h1 className="text-4xl font-bold mb-4">{job.title}</h1>

                            <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-6">
                                <div className="flex items-center">
                                    <Building className="h-4 w-4 mr-2" />
                                    {job.department}
                                </div>
                                <div className="flex items-center">
                                    <Clock className="h-4 w-4 mr-2" />
                                    Posted {formatDate(job.createdAt)}
                                </div>
                            </div>

                            {/* Locations */}
                            <div className="mb-8">
                                <h3 className="text-lg font-semibold mb-3">Locations</h3>
                                <div className="flex flex-wrap gap-3">
                                    {job.locations && job.locations.length > 0 && (
                                        <div className="flex flex-wrap gap-3">
                                            {job.locations.map((loc, idx) => (
                                                <Card key={idx} className="p-4">
                                                    <div className="flex items-center gap-3">
                                                        <MapPin className="h-5 w-5 text-primary" />
                                                        <div>
                                                            <p className="font-semibold">
                                                                {loc.city}, {loc.country}
                                                            </p>
                                                            <Badge
                                                                variant="outline"
                                                                className={getLocationBadgeColor(loc.type)}
                                                            >
                                                                {loc.type}
                                                            </Badge>
                                                        </div>
                                                    </div>
                                                </Card>
                                            ))}
                                        </div>
                                    )}

                                </div>
                            </div>

                            {/* Job Description */}
                            <div className="prose max-w-none mb-8">
                                <h2 className="text-2xl font-bold mb-4">Job Description</h2>

                                {job.description ? (
                                    <div
                                        className="text-muted-foreground whitespace-pre-line"
                                        dangerouslySetInnerHTML={{
                                            __html: job.description.replace(/\n/g, "<br />"),
                                        }}
                                    />
                                ) : (
                                    <p className="text-muted-foreground">No description provided.</p>
                                )}
                            </div>


                            {/* Requirements */}
                            {job.requirements && job.requirements.length > 0 && (
                                <div className="mb-8">
                                    <h2 className="text-2xl font-bold mb-4">Requirements</h2>
                                    <ul className="space-y-2">
                                        {job.requirements.map((req: string, idx: number) => (
                                            <motion.li
                                                key={idx}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: idx * 0.1 }}
                                                className="flex items-start gap-3"
                                            >
                                                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                                                <span>{req}</span>
                                            </motion.li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Salary */}
                            {job.salaryRange && (
                                <div className="mb-8">
                                    <h2 className="text-2xl font-bold mb-4">Salary Range</h2>
                                    <Card className="p-6 bg-gradient-to-r from-green-50 to-emerald-50">
                                        <div className="flex items-center justify-between flex-wrap gap-4">
                                            <div>
                                                <div className="flex items-center text-2xl font-bold text-green-700 mb-2">
                                                    <DollarSign className="h-6 w-6 mr-2" />

                                                    {formatCurrency(job.salaryRange.min)} - {formatCurrency(job.salaryRange.max)}
                                                </div>
                                                <p className="text-muted-foreground">Annual package</p>
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            )}

                            {/* Application Deadline */}
                            <Card className="p-6 bg-gradient-to-r from-orange-50 to-red-50 mb-8">
                                <div className="flex items-center justify-between flex-wrap gap-4">
                                    <div className="flex items-center gap-3">
                                        <Calendar className="h-6 w-6 text-orange-600" />
                                        <div>
                                            <p className="font-semibold">Application Deadline</p>
                                            <p className="text-orange-700 font-bold">{formatDate(job.closingDate)}</p>
                                        </div>
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        Apply before this date to be considered
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </motion.div>

                    {/* Sidebar */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        {/* Apply Card */}
                        <Card className="sticky top-24 mb-6">
                            <CardContent className="p-6">
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-xl font-bold mb-2">Ready to Apply?</h3>
                                        <p className="text-muted-foreground mb-4">
                                            Submit your application for this position
                                        </p>
                                    </div>

                                    <div className="space-y-4">
                                        <Button
                                            size="lg"
                                            className="w-full"
                                            onClick={handleApply}
                                        >
                                            <ExternalLink className="mr-2 h-5 w-5" />
                                            Apply Now
                                        </Button>

                                        <div className="flex gap-2">
                                            <Button variant="outline" className="flex-1">
                                                <Bookmark className="mr-2 h-4 w-4" />
                                                Save
                                            </Button>
                                            <Button variant="outline" className="flex-1" onClick={()=>handleShare}>
                                                <Share2 className="mr-2 h-4 w-4" />
                                                Share
                                            </Button>

                                        </div>
                                    </div>

                                    <Separator />

                                    {/* Quick Info */}
                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="font-semibold mb-2">Job Type</h4>
                                            <Badge variant="secondary">{job.type}</Badge>
                                        </div>

                                        <div>
                                            <h4 className="font-semibold mb-2">Experience</h4>
                                            <p>{job.Experience || "Not specified"}</p>
                                        </div>

                                        <div>
                                            <h4 className="font-semibold mb-2">Sites</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {job.sites?.map((site: string, idx: number) => (
                                                    <Badge key={idx} variant="outline">
                                                        {site}
                                                    </Badge>
                                                ))}
                                            </div>

                                        </div>
                                    </div>

                                    <Separator />

                                    {/* Help */}
                                    <div className="text-sm text-muted-foreground">
                                        <p className="font-semibold mb-1">Need help?</p>
                                        <p>Email: hr@mytelth.com</p>
                                        <p>Phone: +91 9514555036</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Similar Jobs - Optional */}
                        <Card>
                            <CardContent className="p-6">
                                <h3 className="text-xl font-bold mb-4">Similar Jobs</h3>
                                <div className="space-y-4">
                                    <p className="text-sm text-muted-foreground">
                                        Check out other opportunities...
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default JobDetailPage;