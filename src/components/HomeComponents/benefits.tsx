import { Calculator, Timer, Wallet } from "lucide-react";

export default function Benefits() {
  const benefits = [
    {
      icon: (
        <Timer className="h-8 w-8 text-white" aria-label="Time Savings Icon" />
      ),
      title: "Time Savings",
      description:
        "Save valuable time by booking your spot in advance with ease.",
    },
    {
      icon: (
        <Wallet
          className="h-8 w-8 text-white"
          aria-label="Cost-Effective Icon"
        />
      ),
      title: "Cost-Effective",
      description: "Enjoy cost-effective solutions tailored to your needs.",
    },
    {
      icon: (
        <Calculator
          className="h-8 w-8 text-white"
          aria-label="Loyalty & Offers Icon"
        />
      ),
      title: "Loyalty & Offers",
      description: "Benefit from exclusive loyalty rewards and special offers.",
    },
  ];

  return (
    <section id="benefits" className="container mx-auto bg-accent py-16">
      <div className="text-center">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <span className="h-1 w-6 bg-rose-500 rounded-xl"></span>
          <span className="text-muted-foreground rounded-lg px-2 py-1.5 text-sm sm:text-md font-medium">
            Benefits of Parkify
          </span>
        </div>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Exclusive Benefits of{" "}
          <p className="text-primary text-2xl sm:text-3xl">Parkify App</p>
        </h2>
      </div>

      <div className="grid mx-auto mt-20 grid-cols-1 gap-8 sm:gap-12 sm:grid-cols-3 max-w-4xl">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center space-y-2"
          >
            <div className="flex items-center justify-center h-12 w-12  sm:h-16 sm:w-16 rounded-full bg-primary">
              {benefit.icon}
            </div>
            <h3 className="text-xl font-semibold">{benefit.title}</h3>
            <p className="text-md text-muted-foreground">
              {benefit.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
