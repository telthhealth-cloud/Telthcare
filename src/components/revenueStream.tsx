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
    <section className="py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto px-4 text-center space-y-6">
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
              <Card className="group h-full border border-slate-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white/70 backdrop-blur-sm">
                <CardHeader className="flex flex-col items-center space-y-2">
                  <div className="bg-primary/10 p-3 rounded-full">{stream.icon}</div>
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
          className="mt-16 max-w-3xl mx-auto bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-6 md:p-8 shadow-sm"
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
