import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LeadCaptureForm } from "@/components/LeadCaptureForm";
import { EarningsCalculator } from "@/components/EarningsCalculator";
import { CategorySwitcher } from "@/components/CategorySwitcher";
import { careManagerContent } from "@/data/careManagerContent";
import { doctorContent } from "@/data/doctorContent";
import {
  Heart,
  Clock,
  DollarSign,   
  CheckCircle2,
  ArrowRight,
  Smartphone,
  Award,
  BarChart3,
  Briefcase,
  Users,
  TrendingUp,
  Cpu,
  Sparkles,
} from "lucide-react";
import heroImage from "@/assets/hero-care-manager.jpg";
import toolkitImage from "@/assets/care-toolkit.jpg";
import medicalDevices from "../assets/medical-devices.jpg";
import aiDiagnostics from "../assets/ai-diagnostics.jpg";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExpoScaleEase } from "gsap/EasePack";
import { cityTiers } from "../data/cityTiers";
import RevenueStreamsSection from "@/components/revenueStream";

const BentoSkeleton = () => (
  <div className="h-full flex flex-col p-6 animate-pulse">
    <div className="flex items-start gap-4 mb-6">
      <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gray-300"></div>
      <div className="flex-1">
        <div className="h-7 bg-gray-300 rounded w-3/4 mb-2"></div>
      </div>
    </div>
    <div className="space-y-2 mb-4">
      <div className="h-4 bg-gray-300 rounded w-full"></div>
      <div className="h-4 bg-gray-300 rounded w-5/6"></div>
      <div className="h-4 bg-gray-300 rounded w-4/6"></div>
    </div>
  </div>
);

const BentoSkeletonImage = () => (
  <div className="relative h-full min-h-[180px] animate-pulse">
    <div className="absolute inset-0 w-full h-full bg-gray-300"></div>
    <div className="relative h-full bg-gradient-to-t from-white via-white/80 to-transparent p-6 flex flex-col justify-end">
      <div className="w-12 h-12 rounded-xl bg-gray-400 mb-3"></div>
      <div className="h-6 bg-gray-400 rounded w-2/3 mb-2"></div>
      <div className="h-4 bg-gray-400 rounded w-1/2"></div>
    </div>
  </div>
);

const useScrollAnimation = () => {
  const [scrollDirection, setScrollDirection] = useState('down');
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollDirection;
};

const useIntersectionObserver = (options = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }, {
      threshold: 0.1,
      ...options,
    });

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, []);

  return [elementRef, isVisible];
};

function getTier(city) {
  for (const tier of cityTiers) {
    if (tier.cities.includes(city)) return tier;
  }
  return cityTiers[1]; // default Tier 2
}

// Bento features config
const bentoFeatures = [
  {
    cols: "md:col-span-7 md:row-span-2",
    className: "bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20",
    icon: <Briefcase className="h-8 w-8 text-primary-foreground" />,
    title: "Leverage Your Existing Experience",
    desc: "Use your years of care home, palliative care, nursing home, or home visit experience to build your own practice - without starting from scratch. Your expertise is your foundation.",
    badges: [
      { text: "No Startup Costs", style: "bg-primary/10 border border-primary/20 text-primary" },
      { text: "Your Skills Matter", style: "bg-secondary/10 border border-secondary/20 text-secondary" },
    ],
    img: null,
  },
  {
    cols: "md:col-span-5 md:row-span-1 p-0 overflow-hidden",
    className: "",
    img: medicalDevices,
    icon: <Cpu className="h-6 w-6 text-secondary-foreground" />,
    title: "Modern Technology",
    desc: "AI diagnostics & Point-of-Care devices at no overhead",
  },
  {
    cols: "md:col-span-5 md:row-span-2 bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20",
    className: "",
    icon: <Users className="h-7 w-7 text-secondary-foreground" />,
    title: "Keep Your Patients for Life",
    desc: "Build real relationships that last. Your patients stay YOUR patients. Provide continuous care and earn recurring income from those who trust you most.",
    list: [
      { icon: <Award className="h-5 w-5 text-secondary" />, text: "Build Your Reputation" },
      { icon: <TrendingUp className="h-5 w-5 text-secondary" />, text: "Recurring Revenue" },
      { icon: <Sparkles className="h-5 w-5 text-secondary" />, text: "Long-term Relationships" },
    ],
  },
  {
    cols: "md:col-span-4 md:row-span-1 border-primary/20",
    className: "hover:shadow-glow",
    icon: <TrendingUp className="h-6 w-6 text-primary-foreground" />,
    title: "Multiple Income Streams",
    desc: "Earn from visits, subscriptions, and referrals - ₹300-500 per visit plus recurring revenue",
  },
  {
    cols: "md:col-span-3 md:row-span-1 p-0 overflow-hidden",
    className: "",
    img: aiDiagnostics,
    icon: null,
    title: "AI-Assisted Care",
    desc: "Smart diagnostics at your fingertips",
    subtitle: true,
  },
  {
    cols: "md:col-span-5 md:row-span-1 bg-gradient-to-br from-primary/5 to-transparent border-primary/20",
    className: "",
    icon: <Clock className="h-6 w-6 text-secondary-foreground" />,
    title: "Work On Your Terms",
    desc: "Choose your hours, clients, and service areas. Full-time or alongside your current position - you decide.",
  },
];

const painPoints = [
  {
    icon: DollarSign,
    text: "Fixed institutional salaries that don't match your experience or dedication",
  },
  {
    icon: Clock,
    text: "No control over your schedule or the patients you care for",
  },
  {
    icon: Heart,
    text: "Building relationships with patients and families, but never keeping them long-term",
  },
  {
    icon: TrendingUp,
    text: "Years of palliative care, nursing home, or home visit experience with nowhere to grow",
  },
];

const howItWorksSteps = [
  {
    step: "01",
    title: "Sign Up & Verify",
    description:
      "Quick registration with your existing credentials. We verify your experience at care homes, nursing homes, palliative care facilities, or home visit work. Usually approved within 24 hours.",
  },
  {
    step: "02",
    title: "Get Your Kit",
    description:
      "Choose your starter package and receive your Care-to-Home kit with Point-of-Care devices. Start with our basic kit at no overhead cost for basic care delivery.",
  },
  {
    step: "03",
    title: "Start Earning",
    description:
      "Accept visits through the Telth.Care network. Use your years of experience to deliver excellent care. Build your client base. Get paid weekly.",
  },
];

const toolkitTech = [
  "AI-assisted diagnostics (P3DSC system) - suggests tests based on patient symptoms",
  "Point-of-Care testing devices for immediate results",
  "Telemedicine connectivity for remote consultations",
  "Professional mobile app to manage your schedule and earnings",
];

const toolkitBiz = [
  "Access to patient network across your city",
  "Seamless payment processing - get paid weekly via bank transfer",
  "Insurance handling - we take care of processing",
  "Business dashboard to track your income, patients, and growth",
  "Marketing support - we help patients find you",
];

const toolkitPro = [
  "Continuous training on new care techniques and equipment",
  "Regular clinical updates and best practice guidelines",
  "Community of fellow Care Managers - share experiences and learn",
  "Certification programs to expand your service offerings",
];

const Index = () => {
  const [activeCategory, setActiveCategory] = useState<"ccm-cm" | "doctor">("ccm-cm");
  const content = activeCategory === "ccm-cm" ? careManagerContent : doctorContent;

  const scrollToForm = () => {
    document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToCalculator = () => {
    document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-accent/20 to-background">
           <style>{`
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fade-in-left {
          animation: fadeInLeft 0.8s ease-out forwards;
        }

        .animate-fade-in-right {
          animation: fadeInRight 0.8s ease-out forwards;
        }

        .bento-card {
          background: white;
          border-radius: 1.5rem;
          border: 1px solid;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .bento-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        }
      `}</style>
      <CategorySwitcher activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
        <div className="container mx-auto px-4 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 z-10">
              <div className="inline-block">
                <span className="bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-semibold">
                  {content.hero.badge}
                </span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                {content.hero.headline}{" "}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{content.hero.headlineHighlight}</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">{content.hero.subheadline}</p>
              <p className="text-lg text-foreground/80">{content.hero.description}</p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button variant="hero" size="lg" onClick={scrollToForm} className="text-lg px-8">
                  {content.hero.primaryCTA}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg" onClick={scrollToCalculator} className="text-lg px-8">
                  {content.hero.secondaryCTA}
                  <TrendingUp className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-3xl blur-3xl" />
              <img
                src={heroImage}
                alt={activeCategory === "ccm-cm" ? "Professional care manager with tablet" : "Doctor providing consultations"}
                className="relative rounded-3xl shadow-2xl w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-12">
            <h2 className="text-4xl font-bold">Your Experience Deserves More Recognition and Reward</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {painPoints.map(({ icon: Icon, text }, index) => (
                <Card key={index} className="border-2 hover:shadow-lg transition-all duration-300">
                  <CardContent className="flex items-start gap-4 p-6">
                    <div className="bg-destructive/10 p-3 rounded-lg">
                      <Icon className="h-6 w-6 text-destructive" />
                    </div>
                    <p className="text-left font-medium">{text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <p className="text-2xl font-semibold text-primary pt-8">
              What if you could keep caring for people you love working with - and actually build something of your own?
            </p>
          </div>
        </div>
      </section>
      
           

      {/* Solution Section/Bento Grid */}
     <section className="relative py-20 overflow-hidden">
  {/* Wavy Glassmorphism Background */}
  <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-accent/50 via-accent/20 to-transparent backdrop-blur-lg">
    <svg viewBox="0 0 1440 320" className="absolute bottom-0 w-full h-auto opacity-60">
      <path
        fill="rgba(255,255,255,0.2)"
        stroke="rgba(255,255,255,0.4)"
        strokeWidth="2"
        d="M0,224L80,192C160,160,320,96,480,112C640,128,800,224,960,245.3C1120,267,1280,213,1360,186.7L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
      ></path>
    </svg>
  </div>

  <div className="container mx-auto px-4 relative z-10">
    <div className="text-center space-y-4 mb-16">
      <h2 className="text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
        Introducing Care Manager Program
      </h2>
      <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
        Where Your Care Experience Becomes Your Business as a Telth Care Manager
      </p>
    </div>

    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[minmax(200px,auto)]">
      {bentoFeatures.map((item, idx) => (
        <motion.div
          key={idx}
          className={`${item.cols} rounded-2xl overflow-hidden shadow-xl transition-all duration-500 bg-white/90 border border-white/40 backdrop-blur-xl hover:scale-[1.02] hover:shadow-2xl`}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: idx * 0.1 }}
        >
          {!item.img ? (
            <div className="h-full flex flex-col p-6">
              <div className="flex items-start gap-4 mb-6">
                {item.icon && (
                  <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white shadow-lg animate-pulse-slow">
                    {item.icon}
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-foreground mb-3">{item.title}</h3>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed text-lg mb-auto">{item.desc}</p>
              {item.badges && (
                <div className="mt-6 flex flex-wrap gap-3">
                  {item.badges.map((badge, bidx) => (
                    <span
                      key={bidx}
                      className={`px-3 py-1 rounded-lg text-sm font-semibold ${badge.style}`}
                    >
                      {badge.text}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="relative h-full group">
              <img
                src={item.img}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="relative h-full bg-gradient-to-t from-white/95 via-white/80 to-transparent p-6 flex flex-col justify-end">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 * idx }}
                >
                  {item.icon && (
                    <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-white/60 backdrop-blur-md mb-3 shadow-md">
                      {item.icon}
                    </div>
                  )}
                  <h3 className={`text-xl font-bold text-foreground mb-1`}>{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </motion.div>
              </div>
            </div>
          )}
        </motion.div>
      ))}
    </div>

    {/* Skeleton loader fallback */}
    <AnimatePresence>
      {false && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-12">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="col-span-3 bg-white/50 animate-pulse rounded-2xl h-64 backdrop-blur-lg border border-white/30"
            ></motion.div>
          ))}
        </div>
      )}
    </AnimatePresence>

    <div className="mt-12 text-center">
      <div className="inline-block px-6 py-3 bg-secondary/10 rounded-full border border-secondary/20 hover:bg-secondary/20 transition-colors duration-300 backdrop-blur-lg">
        <p className="text-sm font-semibold text-foreground">
          Everything included. Start with no overhead for basic care.
        </p>
      </div>
    </div>
  </div>

  <style jsx>{`
    @keyframes pulse-slow {
      0% {
        transform: scale(1);
        opacity: 1;
      }
      50% {
        transform: scale(1.05);
        opacity: 0.9;
      }
      100% {
        transform: scale(1);
        opacity: 1;
      }
    }
    .animate-pulse-slow {
      animation: pulse-slow 3s ease-in-out infinite;
    }
  `}</style>
</section>

 
      {/* Earnings Calculator */}
      <section id="calculator" className="py-20 bg-gradient-to-br from-accent/30 to-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold">
              {activeCategory === "ccm-cm" ? "From Care Home Salary to Care Manager Income" : "Expand Your Practice, Increase Your Earnings"}
            </h2>
            <p className="text-xl text-muted-foreground">
              {activeCategory === "ccm-cm"
                ? "See what your experience is actually worth as a Telth Care Manager"
                : "See your earning potential as a Telth Doctor"}
            </p>
          </div>
          <EarningsCalculator category={activeCategory} />
          <div className="max-w-3xl mx-auto mt-12 p-8 bg-gradient-to-r from-secondary/10 to-secondary/5 rounded-2xl border-2 border-secondary/20">
            <p className="text-lg font-semibold text-center mb-4">Plus: Every patient you bring to the platform becomes YOUR patient.</p>
            <p className="text-center text-muted-foreground">
              Build your own practice, build recurring revenue, build your future.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold">From Care Worker to Telth Care Manager in 3 Simple Steps</h2>
          </div>
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
            {howItWorksSteps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-gradient-to-br from-primary to-secondary text-primary-foreground rounded-2xl p-8 space-y-4 h-full shadow-xl hover:shadow-2xl transition-all duration-300">
                  <div className="text-5xl font-bold opacity-20">{step.step}</div>
                  <h3 className="text-2xl font-bold">{step.title}</h3>
                  <p className="text-primary-foreground/90">{step.description}</p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="h-8 w-8 text-primary" />
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <p className="text-xl font-semibold text-primary">
              From signup to your first paid visit: Less than 48 hours
            </p>
          </div>
        </div>
      </section>

      {/* Toolkit */}
   {/* Toolkit */}
<section className="py-20 bg-muted/30">
  <div className="container mx-auto px-4">
    <div className="text-center space-y-4 mb-16">
      <h2 className="text-4xl lg:text-5xl font-bold">Everything You Need to Succeed as a Care Manager</h2>
      <p className="text-xl text-muted-foreground">You bring the experience. We provide everything else.</p>
    </div>
    
    <div className="max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Technology Card */}
        <motion.div
          className="group relative bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden cursor-pointer"
          whileHover={{ 
            scale: 1.05,
            rotateY: 10,
            transition: { type: "spring", stiffness: 300, damping: 20 }
          }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Hover Image */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110">
            <img 
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
              alt="Medical Technology"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20" />
          </div>

          <div className="relative z-10 p-8 h-full flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-blue-100 rounded-xl group-hover:bg-white/80 transition-colors duration-300">
                <Smartphone className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Technology</h3>
            </div>
            
            <ul className="space-y-4 flex-1">
              {toolkitTech.map((item, index) => (
                <motion.li 
                  key={index}
                  className="flex items-start gap-3 group-hover:text-white/90 transition-colors duration-300"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0 group-hover:text-white" />
                  <span className="text-gray-700 group-hover:text-white font-medium">{item}</span>
                </motion.li>
              ))}
            </ul>
            
            {/* Hover Indicator */}
            <div className="mt-6 pt-6 border-t border-gray-200 group-hover:border-white/30 transition-colors duration-300">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500 group-hover:text-white/80">Explore Tech</span>
                <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-white transform group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Business Support Card */}
        <motion.div
          className="group relative bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden cursor-pointer"
          whileHover={{ 
            scale: 1.05,
            rotateY: -10,
            transition: { type: "spring", stiffness: 300, damping: 20 }
          }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Hover Image */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110">
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
              alt="Business Analytics"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20" />
          </div>

          <div className="relative z-10 p-8 h-full flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-green-100 rounded-xl group-hover:bg-white/80 transition-colors duration-300">
                <BarChart3 className="h-7 w-7 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Business Support</h3>
            </div>
            
            <ul className="space-y-4 flex-1">
              {toolkitBiz.map((item, index) => (
                <motion.li 
                  key={index}
                  className="flex items-start gap-3 group-hover:text-white/90 transition-colors duration-300"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0 group-hover:text-white" />
                  <span className="text-gray-700 group-hover:text-white font-medium">{item}</span>
                </motion.li>
              ))}
            </ul>
            
            {/* Hover Indicator */}
            <div className="mt-6 pt-6 border-t border-gray-200 group-hover:border-white/30 transition-colors duration-300">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500 group-hover:text-white/80">Explore Business</span>
                <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-white transform group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Professional Growth Card */}
        <motion.div
          className="group relative bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden cursor-pointer"
          whileHover={{ 
            scale: 1.05,
            rotateY: 5,
            transition: { type: "spring", stiffness: 300, damping: 20 }
          }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Hover Image */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110">
            <img 
              src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
              alt="Professional Development"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20" />
          </div>

          <div className="relative z-10 p-8 h-full flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-purple-100 rounded-xl group-hover:bg-white/80 transition-colors duration-300">
                <Award className="h-7 w-7 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Professional Growth</h3>
            </div>
            
            <ul className="space-y-4 flex-1">
              {toolkitPro.map((item, index) => (
                <motion.li 
                  key={index}
                  className="flex items-start gap-3 group-hover:text-white/90 transition-colors duration-300"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <CheckCircle2 className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0 group-hover:text-white" />
                  <span className="text-gray-700 group-hover:text-white font-medium">{item}</span>
                </motion.li>
              ))}
            </ul>
            
            {/* Hover Indicator */}
            <div className="mt-6 pt-6 border-t border-gray-200 group-hover:border-white/30 transition-colors duration-300">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500 group-hover:text-white/80">Explore Growth</span>
                <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-white transform group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Message Card */}
      <motion.div
        className="mt-12 bg-gradient-to-r from-primary to-secondary text-white rounded-2xl p-8 shadow-xl border border-white/20"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-xl font-semibold mb-4">
            Everything included. Start with no overhead for basic care.
          </p>
          <p className="text-white/90">
            Advanced equipment financing available as you grow. No surprises. Just honest partnership.
          </p>
        </div>
      </motion.div>
    </div>
  </div>

  <style jsx>{`
    @keyframes bounce-in {
      0% { transform: scale(0.3); opacity: 0; }
      50% { transform: scale(1.05); }
      70% { transform: scale(0.9); }
      100% { transform: scale(1); opacity: 1; }
    }
    
    .animate-bounce-in {
      animation: bounce-in 0.6s ease-out;
    }
  `}</style>
</section>

      {/* Lead Capture Form */}
      <section id="lead-form" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold">Your Patients Are Waiting. Your Practice Is Calling.</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Join Telth Care Managers across India who've turned years of experience into thriving independent practices
            </p>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
              You've spent years building skills in care homes, nursing facilities, and patients' homes. Now it's time to
              build something for yourself as a Telth Care Manager.
            </p>
          </div>
          <LeadCaptureForm />
          <div className="text-center mt-8">
            <p className="text-sm font-semibold text-destructive">
              Limited onboarding spots this month in your city
            </p> 
          </div>
        </div>
      </section>
       <RevenueStreamsSection />
      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-primary via-primary/90 to-secondary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-4xl lg:text-5xl font-bold">
              {content.finalCTA.headline}
            </h2>
            <p className="text-xl leading-relaxed opacity-90">
              {activeCategory === "ccm-cm"
                ? "Every shift at the care home, every night with palliative patients, every home visit you've made - it's built something valuable. Your skills. Your compassion. Your reputation."
                : "Every consultation, every diagnosis, every patient you've helped - it's built your expertise. Your knowledge. Your reputation."}
            </p>
            <p className="text-xl leading-relaxed opacity-90">
              Now it's time to build something that's truly yours.
            </p>
            <p className="text-lg leading-relaxed opacity-90">
              Telth.Care gives you the platform, the technology, the patients, and the support. You bring the years of
              experience that can't be taught.
            </p>
            <p className="text-lg leading-relaxed opacity-90">
              Together, we're creating a new model of care - one where the people who do the work get what they deserve.
            </p>
            <Button
              variant="secondary"
              size="lg"
              onClick={scrollToForm}
              className="mt-8 text-xl px-12 py-6 h-auto shadow-2xl"
            >
              {content.finalCTA.button}
              <ArrowRight className="ml-2 h-6 w-6" />
            </Button>
            <p className="text-sm opacity-75 pt-4">
              {content.finalCTA.socialProof}
            </p>
          </div>
        </div>
      </section>

     

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center md:text-left">
            <div className="space-y-4">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <Award className="h-8 w-8" />
                <h3 className="text-2xl font-bold">Telth.Care</h3>
              </div>
              <p className="text-sm opacity-80">Empowering Care Workers to Build Their Own Future</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-lg">Contact Us</h4>
              <p className="text-sm opacity-80">Email: contact@telth.care</p>
              <p className="text-sm opacity-80">Phone: +91-XXXX-XXXXX</p>
              <p className="text-sm opacity-80">WhatsApp support available</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-lg">Get Started</h4>
              <Button
                variant="outline"
                onClick={scrollToForm}
                className="bg-transparent border-background text-background hover:bg-background hover:text-foreground"
              >
                Become a Care Manager
              </Button>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-background/20 text-center text-sm opacity-60">
            <p>© 2025 Telth.Care. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
