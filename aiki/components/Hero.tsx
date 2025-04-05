
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div
            className="inline-block px-3 py-1 mb-6 text-xs font-medium rounded-full bg-secondary text-secondary-foreground slide-in-left"
            style={{ animationDelay: "0.2s" }}
          >
            <span className="inline-block">On-Chain Learning Platform</span>
          </div>

          <h1
            className="text-4xl md:text-6xl font-bold tracking-tight mb-6 fade-in"
            style={{ animationDelay: "0.4s" }}
          >
            <span className="bg-gradient-to-r from-primary to-sky-400 bg-clip-text text-transparent">
              The Future of Learning
            </span>{" "}
            is Web3-Powered
          </h1>

          <p
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto fade-in"
            style={{ animationDelay: "0.6s" }}
          >
            Master blockchain, AI, and real-world projects through interactive
            lessons, earn verifiable credentials, and join a global community of
            builders.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center fade-in"
            style={{ animationDelay: "0.8s" }}
          >
            <Link
              href="/courses"
              className="px-6 py-3 font-medium bg-sky-400 text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors inline-flex items-center justify-center gap-2"
            >
              Explore Courses
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/projects"
              className="px-6 py-3 font-medium border border-sky-400 text-primary rounded-lg hover:bg-primary/5 transition-colors inline-flex items-center justify-center"
            >
              View Projects
            </Link>
          </div>
        </div>
      </div>

      {/* Abstract shapes */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
    </section>
  );
};

export default Hero;
