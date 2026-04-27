"use client";

import { motion } from "framer-motion";
import { easeOut } from "framer-motion";
import {
  Mail,
  MapPin,
  PenLine,
  Calendar,
  Users,
  MessageSquare,
} from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
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

const stats = [
  { value: "50+", label: "Published Posts" },
  { value: "10K+", label: "Monthly Readers" },
  { value: "2+", label: "Years Running" },
  { value: "24/7", label: "Support" },
];

const values = [
  {
    icon: PenLine,
    title: "Quality First",
    description:
      "Every piece of content is carefully researched, written, and refined to provide genuine value to our readers.",
  },
  {
    icon: Users,
    title: "Community Driven",
    description:
      "We listen to our readers and build content around the questions and topics that matter to you.",
  },
  {
    icon: MessageSquare,
    title: "Open Dialogue",
    description:
      "We believe in thoughtful discussion and the free exchange of ideas. Your voice matters here.",
  },
];

const team = [
  {
    name: "John Doe",
    role: "Founder & Editor",
    image:
      "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=600",
    bio: "Passionate about technology and storytelling. 10+ years of experience in content creation.",
  },
  {
    name: "Jane Smith",
    role: "Senior Writer",
    image:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600",
    bio: "Former software engineer turned writer. Breaking down complex topics since 2020.",
  },
  {
    name: "Alex Johnson",
    role: "Content Strategist",
    image:
      "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=600",
    bio: "Data-driven storyteller with a passion for web development and UX.",
  },
];

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.4 },
  },
};

export default function About() {
  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden bg-[#fafaf9] pt-32 pb-16">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full bg-[#e8e8e3] blur-3xl opacity-50" />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4d4cf' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <motion.div
          className="container relative z-10 mx-auto px-6 lg:px-12"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div
            variants={itemVariants}
            className="max-w-3xl text-center mx-auto mt-24"
          >
            <p className="text-sm font-medium text-muted-foreground mb-4">
              About Us
            </p>
            <h1 className="text-5xl font-bold tracking-tight mb-6">
              Sharing knowledge, one post at a time.
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Odyssey Blog started as a small passion project in 2024. Today,
              we&apos;re a community of writers, developers, and curious minds
              exploring the intersection of technology, design, and ideas.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-4xl font-bold">{stat.value}</p>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={container}
            className="grid gap-16 lg:grid-cols-2"
          >
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl font-semibold tracking-tight mb-6">
                Our Mission
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                We believe that quality information should be accessible to
                everyone. Our mission is to create a space where complex ideas
                become simple, actionable knowledge.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Whether you&apos;re a seasoned developer or just starting your
                journey, we curate content that helps you grow. From technical
                tutorials to thought leadership pieces, every word we publish is
                meant to inspire and educate.
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h2 className="text-3xl font-semibold tracking-tight mb-6">
                What We Cover
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  "Web Development",
                  "Software Engineering",
                  "Design Systems",
                  "Startup Insights",
                  "Career Advice",
                  "Technology Trends",
                ].map((topic) => (
                  <div
                    key={topic}
                    className="rounded-lg border bg-muted/50 px-4 py-3 text-sm font-medium"
                  >
                    {topic}
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="bg-muted/30 py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="text-center mb-16">
              <h2 className="text-3xl font-semibold tracking-tight mb-4">
                Our Values
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                The principles that guide everything we do.
              </p>
            </motion.div>

            <div className="grid gap-8 md:grid-cols-3">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  variants={itemVariants}
                  className="rounded-xl border bg-card p-8 text-center"
                >
                  <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="text-center mb-16">
              <h2 className="text-3xl font-semibold tracking-tight mb-4">
                Meet the Team
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                The passionate people behind Odyssey Blog.
              </p>
            </motion.div>

            <div className="grid gap-8 md:grid-cols-3">
              {team.map((member) => (
                <motion.div
                  key={member.name}
                  variants={itemVariants}
                  className="rounded-xl border bg-card p-6 text-center"
                >
                  <div className="relative mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-semibold">{member.name}</h3>
                  <p className="text-sm text-primary">{member.role}</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {member.bio}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-primary text-primary-foreground py-24">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-3xl font-semibold tracking-tight mb-4">
            Get in Touch
          </h2>
          <p className="text-primary/80 mb-8 max-w-xl mx-auto">
            Have a question? Want to collaborate? We&apos;d love to hear from
            you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm">
            <a
              href="mailto:hello@odysseyblog.com"
              className="flex items-center gap-2 hover:text-gray-300 transition-colors"
            >
              <Mail className="h-4 w-4" />
              hello@odysseyblog.com
            </a>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              San Francisco, CA
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
