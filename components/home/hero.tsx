"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  PenLine,
  TrendingUp,
  Users,
  BookMarked,
  DollarSign,
} from "lucide-react";
import Link from "next/link";
import { easeOut } from "framer-motion";

const features = [
  {
    icon: PenLine,
    title: "Write Beautifully",
    description:
      "A distraction-free editor with AI-powered suggestions to help you write better content.",
  },
  {
    icon: BookMarked,
    title: "Build Your Audience",
    description:
      "SEO-optimized pages that help your content get discovered by readers everywhere.",
  },
  {
    icon: Users,
    title: "Grow Community",
    description:
      "Built-in newsletter and engagement tools to keep readers coming back.",
  },
  {
    icon: DollarSign,
    title: "Monetize Content",
    description:
      "Subscriptions, tips, and paid content features to earn from your writing.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOut },
  },
};

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-[#fafaf9]">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full bg-[#e8e8e3] blur-3xl opacity-50" />
        <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-[#e8e8e3] blur-3xl opacity-50" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4d4cf' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container relative z-10 mx-auto flex min-h-[90vh] items-center px-6 py-32 lg:px-12">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid w-full grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center"
        >
          <motion.div variants={itemVariants}>
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-stone-500">
              <TrendingUp className="h-3 w-3" />
              The future of publishing
            </span>

            <h1 className="mb-6 font-serif text-5xl font-medium leading-[1.1] tracking-tight text-stone-900 md:text-6xl lg:text-7xl">
              Share your story with the world
            </h1>

            <p className="mb-8 max-w-md text-lg leading-relaxed text-stone-500">
              A powerful publishing platform built for writers. Create, publish,
              and monetize your content with tools designed for professional
              creators.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/register"
                className="group inline-flex items-center gap-2 rounded-full bg-stone-900 px-8 py-3.5 text-sm font-medium text-white transition-all hover:bg-stone-800"
              >
                Start Writing
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-8 py-3.5 text-sm font-medium text-stone-900 transition-all hover:border-stone-300"
              >
                Sign In
              </Link>
            </div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="rounded-2xl border border-stone-200 bg-white p-6 transition-shadow hover:shadow-lg"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-stone-100">
                  <feature.icon className="h-5 w-5 text-stone-700" />
                </div>
                <h3 className="mb-2 font-serif text-xl font-medium text-stone-900">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-stone-500">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 text-stone-300">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="h-8 w-px animate-pulse bg-stone-300" />
        </div>
      </motion.div>
    </section>
  );
}
