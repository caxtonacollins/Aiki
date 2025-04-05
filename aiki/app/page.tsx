import Hero from "../components/Hero";
import FeaturesSection from "../components/Features";
import Leaderboard from "../components/Leaderboard";
import { BookOpen, BookText, Brain, Link2, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { coursesData } from "@/mocks/courseSectionData";
import { Card } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Hero />

      {/* Featured Courses */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Courses</h2>
              <p className="text-muted-foreground">
                On-chain learning experiences with verifiable credentials
              </p>
            </div>
            <Link
              href="/courses"
              className="text-primary font-medium hover:text-primary/80 transition-colors flex items-center"
            >
              View all courses
              <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coursesData.map((course, index) => (
              <div
                key={course.id}
                className="fade-in"
                style={{ animationDelay: `${0.1 * (index + 1)}s` }}
              >
                <Link href={`/courses/${course.id}`} className="block h-full">
                  <Card className="rounded-xl overflow-hidden h-full flex flex-col p-0 transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg">
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        width={800}
                        height={450}
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="text-xs font-medium py-1 px-2 bg-background/90 backdrop-blur-sm rounded-full">
                          {course.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-medium py-1 px-2 bg-secondary rounded-full">
                          {course.level}
                        </span>
                        <div className="flex items-center text-muted-foreground text-xs">
                          <BookOpen className="w-3 h-3 mr-1" />
                          {course.studentsCount.toLocaleString()} students
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold mb-2">
                        {course.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 flex-1">
                        {course.description}
                      </p>
                      <div className="mt-auto text-primary font-medium text-sm flex items-center">
                        View Course
                        <ArrowRight className="ml-1 w-4 h-4" />
                      </div>
                    </div>
                  </Card>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FeaturesSection />

      {/* How It Works */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground">
              Our platform combines interactive learning with blockchain
              verification
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="rounded-xl overflow-hidden h-full flex flex-col p-0 transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg">
              <div
                className="p-8 shadow-subtle text-center fade-in"
                style={{ animationDelay: "0.1s" }}
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BookText className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">1. Learn</h3>
                <p className="text-muted-foreground">
                  Engage with interactive content, hands-on coding challenges,
                  and adaptive learning paths tailored to your skill level.
                </p>
              </div>
            </Card>

            <Card className="rounded-xl overflow-hidden h-full flex flex-col p-0 transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg">
              <div
                className="p-8 shadow-subtle text-center fade-in"
                style={{ animationDelay: "0.2s" }}
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Brain className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">2. Apply</h3>
                <p className="text-muted-foreground">
                  Put your knowledge to work through real-world projects that
                  build your portfolio and deepen your understanding.
                </p>
              </div>
            </Card>
            <Card className="rounded-xl overflow-hidden h-full flex flex-col p-0 transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg">
              <div
                className="p-8 rounded-xl shadow-subtle text-center fade-in"
                style={{ animationDelay: "0.3s" }}
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Link2 className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">3. Verify</h3>
                <p className="text-muted-foreground">
                  Receive on-chain verifiable credentials and certificates that
                  showcase your achievements across platforms.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <Leaderboard />

      {/* CTA Section */}
      <section className="py-24 bg-muted text-muted-foreground">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Learning Journey?
            </h2>
            <p className="text-xl opacity-90 mb-8">
              Join thousands of learners worldwide and start building your
              on-chain credentials today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/signup"
                className="px-8 py-3 font-medium bg-sky-400 text-primary-foreground rounded-lg hover:bg-opacity-90 transition-colors"
              >
                Get Started
              </Link>
              <Link
                href="/courses"
                className="px-6 py-3 font-medium border border-sky-400 text-foreground rounded-lg hover:bg-primary/5 transition-colors inline-flex items-center justify-center"
              >
                Browse Courses
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
