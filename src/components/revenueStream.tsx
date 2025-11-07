import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { TrendingUp, HeartPulse, Stethoscope, Users, Pill, Activity, Share2 } from "lucide-react";

const revenueStreams = [
  {
    icon: <HeartPulse className="w-6 h-6 text-primary" />,
    title: "Telth Care Plan Sales",
    body: "Earn commissions and regular clients by enrolling patients in comprehensive care plans with ongoing subscriptions.",
    description:
      "Offer your patients continuous care through monthly or annual subscription plans. You earn recurring commission for each enrolled patient, creating predictable, passive income. Plans include preventive care, cardiac care, regular monitoring, and priority access to your services.",
  },
  {
    icon: <Stethoscope className="w-6 h-6 text-primary" />,
    title: "Insurance Sales",
    body: "Generate additional income through both government and corporate health insurance policy sales and referrals.",
    description:
      "Recommend appropriate coverage to your patients and earn commissions on policy sales. Help your patients protect their health while building your income.",
  },
  {
    icon: <Activity className="w-6 h-6 text-primary" />,
    title: "Telth Wearables & Device Sales",
    body: "Earn from recommending and selling health monitoring wearables and smart devices to your patients.",
    description:
      "Prescribe cutting-edge health monitoring devices - glucose monitors, BP trackers, fitness wearables, and more. Earn commission on each device sale while empowering patients with better health tracking.",
  },
  {
    icon: <Users className="w-6 h-6 text-primary" />,
    title: "Referrals",
    body: "Get rewarded for bringing other healthcare professionals and patients into the network.",
    description:
      "Grow the Telth.Care community and earn. Refer fellow healthcare workers to join as Care Managers or bring new patients to the platform. Every successful referral puts money in your pocket.",
  },
  {
    icon: <Pill className="w-6 h-6 text-primary" />,
    title: "Medicine Delivery",
    body: "Earn commission on prescription fulfillment and medicine delivery services to your patients.",
    description:
      "Seamlessly integrate prescription services. When you prescribe medications, earn commission on fulfillment through Telth.Care's pharmacy network. Your patients get convenient delivery, you get additional income.",
  },
  {
    icon: <Share2 className="w-6 h-6 text-primary" />,
    title: "Consultation/Referral Commission",
    body: "Generate income through commissions on specialist teleconsultations you facilitate.",
    description:
      "When your patients need specialist consultations or secondary or tertiary referral, facilitate the connection through Telth.Care's network. Earn commission on every teleconsultation you coordinate, even when you're not providing the service.",
  },
];

export default function RevenueStreamsSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-blue-50 relative overflow-hidden">
      {/* 3D Bubbly Crystal Background */}
      <div className="absolute inset-0 z-0">
        {/* Main gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/40 via-cyan-100/30 to-purple-100/20"></div>
        
        {/* Animated bubble layers */}
        <motion.svg 
          className="w-full h-full absolute"
          viewBox="0 0 1440 320" 
          preserveAspectRatio="none"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          {/* Base wave with gradient */}
          <defs>
            <linearGradient id="bubbleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a2d9ff" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#85c1e9" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#5dade2" stopOpacity="0.2" />
            </linearGradient>
            <filter id="crystalGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
              <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -8" />
            </filter>
          </defs>

          {/* Main bubbly path */}
          {/* <motion.path
            fill="url(#bubbleGradient)"
            filter="url(#crystalGlow)"
            d="M0,160L48,170.7C96,181,192,203,288,197.3C384,192,480,160,576,154.7C672,149,768,171,864,186.7C960,203,1056,213,1152,202.7C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
          /> */}

          {/* Secondary bubbly layer for depth */}
          <motion.path
            fill="#7fb3d5"
            fillOpacity="0.15"
            d="M0,192L48,186.7C96,181,192,171,288,165.3C384,160,480,160,576,176C672,192,768,224,864,224C960,224,1056,192,1152,181.3C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1.5 }}
          />

          {/* Floating bubble elements */}
          <motion.circle
            cx="200"
            cy="100"
            r="25"
            fill="#a2d9ff"
            fillOpacity="0.3"
            filter="url(#crystalGlow)"
            initial={{ scale: 0, y: 100 }}
            whileInView={{ scale: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1.2, ease: "easeOut" }}
          />
          <motion.circle
            cx="1200"
            cy="80"
            r="35"
            fill="#85c1e9"
            fillOpacity="0.25"
            filter="url(#crystalGlow)"
            initial={{ scale: 0, y: 100 }}
            whileInView={{ scale: 1, y: 0 }}
            transition={{ delay: 1, duration: 1.2, ease: "easeOut" }}
          />
          <motion.circle
            cx="600"
            cy="60"
            r="30"
            fill="#5dade2"
            fillOpacity="0.2"
            filter="url(#crystalGlow)"
            initial={{ scale: 0, y: 100 }}
            whileInView={{ scale: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 1.2, ease: "easeOut" }}
          />
        </motion.svg>

        {/* Subtle animated dots for crystal texture */}
        <motion.div 
          className="absolute inset-0 opacity-30"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.3 }}
          transition={{ duration: 2 }}
        >
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full"></div>
          <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-blue-200 rounded-full"></div>
          <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-cyan-100 rounded-full"></div>
          <div className="absolute top-1/2 right-1/4 w-3 h-3 bg-white rounded-full"></div>
        </motion.div>
      </div>

      <div className="container mx-auto px-4 text-center space-y-6 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-4xl md:text-5xl font-bold"
        >
          Multiple Income Streams, One Platform
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
        >
          More ways to earn, more control over your financial future
        </motion.p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {revenueStreams.map((stream, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
            >
              <Card className="group h-full border border-slate-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm border-white/20">
                <CardHeader className="flex flex-col items-center space-y-2">
                  <div className="bg-primary/10 p-3 rounded-full backdrop-blur-sm">{stream.icon}</div>
                  <CardTitle className="text-xl font-semibold">{stream.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-left space-y-2">
                  <CardDescription className="text-base text-slate-600">{stream.body}</CardDescription>
                  <p className="text-sm text-slate-500">{stream.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="mt-16 max-w-3xl mx-auto bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-6 md:p-8 shadow-sm backdrop-blur-sm bg-white/80"
        >
          <h3 className="text-2xl font-semibold mb-2">Maximize Your Earnings</h3>
          <p className="text-muted-foreground text-lg">
            Combine multiple revenue streams to build a sustainable, diversified healthcare practice.
          </p>
        </motion.div>
      </div>
    </section>
  );
}