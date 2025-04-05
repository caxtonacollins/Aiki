"use client";

import { features } from "@/mocks/featureSection";
import { Card } from "./ui/card";

const FeaturesSection = () => {
  return (
    <section className="py-24 bg-background/50 text-foreground">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">Redefining Web3 Education</h2>
          <p className="text-muted-foreground">
            Our platform combines cutting-edge technology with proven learning
            methodologies to create an experience that&apos;s both effective and
            engaging.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="rounded-xl overflow-hidden h-full flex flex-col p-0 transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg"
            >
              <div
                className="rounded-xl p-8 shadow-subtle hover:shadow-elevated transition-all duration-300 fade-in"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <feature.icon className="w-8 h-8 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
