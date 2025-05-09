import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Icons } from "@/components/ui/icons";
import { InteractiveHoverButton } from "../magicui/interactive-hover-button";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";

export default function CTA() {
  const { user } = useAuth();

  return (
    <section className="bg-gradient-to-br bg-stone-50 dark:from-neutral-950 dark:to-black">
      <motion.div
        className="flex flex-col items-center justify-center py-20 px-6 max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.5 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 max-w-3xl">
          Ready to showcase your work to the world?
        </h2>
        {/* <p className="text-lg md:text-xl text-muted-foreground dark:text-stone-300 text-center mb-10 max-w-2xl">
          Join thousands of professionals who have built stunning portfolios
          with PortfolioGen
        </p> */}
        <Link href={user ? "/create" : "/signup"}>
          <InteractiveHoverButton>
            <span>{user ? "Get Started Now" : "Create Your Portfolio"}</span>
          </InteractiveHoverButton>
        </Link>
      </motion.div>
    </section>
  );
}
