"use client";

import { motion } from "framer-motion";
// import { AnimatedGradientBackground } from "@/components/ui/animated-gradient-background";
import { TextShimmer } from "@/components/ui/text-shimmer";
// import { ShiningBorder } from "@/components/ui/shining-border";
import { GlowingEffect } from "../ui/glowing-effect";
import { Icons } from "@/components/ui/icons";
import { Badge } from "../ui/badge";

const features = [
  {
    title: "Responsive Design",
    description:
      "All templates are fully responsive and look great on any device, from desktops to smartphones.",
    icon: <Icons.smartphone className="h-6 w-6" />,
    completed: true,
  },
  {
    title: "One-Click Deploy",
    description:
      "Publish your portfolio instantly with our one-click deployment to our free hosting.",
    icon: <Icons.check className="h-6 w-6" />,
    completed: true,
  },
  {
    title: "SEO Optimized",
    description:
      "Get discovered online with built-in SEO optimization that helps your portfolio rank higher in search results.",
    icon: <Icons.chartBar className="h-6 w-6" />,
    completed: true,
  },
  {
    title: "Analytics",
    description:
      "Track your portfolio's performance with built-in analytics tools.",
    icon: <Icons.chartBar className="h-6 w-6" />,
    completed: false,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  viewport: { once: true },
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

export default function Features() {
  return (
    <section id="features" className="py-20 bg-neutral-50 dark:bg-neutral-950">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="text-3xl md:text-4xl font-bold my-4">
            <TextShimmer className="my-3">Everything You Need</TextShimmer> to
            Create the Perfect Portfolio
          </div>
          <div className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Our platform provides all the tools you need to create a
            professional portfolio that showcases your work effectively.
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-4 p-6 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              variants={itemVariants}
              className="relative h-full rounded-xl border md:rounded-3xl md:p-3"
              key={index}
            >
              <GlowingEffect
                spread={40}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
              />
              <div className="p-6 text-center h-full rounded-lg">
                <div className="bg-primary/10 mx-auto p-3 rounded-lg w-fit mb-4 text-primary">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
                {!feature.completed && (
                  <Badge variant="outline" className="mt-2">
                    Soon
                  </Badge>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
