import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export default function FAQ() {
  const faqs = [
    {
      question: "How does the parking app work?",
      answer:
        "The app allows you to find and book parking spots conveniently. Enter your destination, choose a parking spot, and confirm your booking.",
    },
    {
      question: "What types of parking services are available?",
      answer:
        "We offer hourly parking, daily parking, and long-term parking options. Additionally, some locations provide valet services.",
    },
    {
      question: "How do I pay for the parking?",
      answer:
        "Payments can be made directly through the app using credit cards, debit cards, or digital wallets like Apple Pay and Google Pay.",
    },
    {
      question: "How do I provide feedback about my parking experience?",
      answer:
        "You can leave a review and rate your parking experience in the app after your booking is complete.",
    },
    {
      question: "What happens if I need to cancel my booking?",
      answer:
        "You can cancel your booking directly in the app. Please refer to the cancellation policy for specific details on refunds.",
    },
    {
      question: "Is the app available on both iOS and Android?",
      answer:
        "Yes, the app is compatible with both iOS and Android devices. Download it from the App Store or Google Play.",
    },
  ];

  return (
    <div id="faq" className="container mx-auto bg-accent px-8 py-16">
      {/* header */}
      <div className="flex items-center justify-center px-16 mb-1">
        <span className="h-1 w-8 bg-green-500 rounded-xl"></span>
        <span className="text-muted-foreground rounded-lg px-2 py-1.5 text-md uppercase sm:text-md font-mont-bold">
          FAQ
        </span>
      </div>
      <h2 className="text-2xl text-center sm:text-3xl font-mont-bold text-gray-800">
        Questions? <span className="text-primary">Look here.</span>
      </h2>

      {/* faq */}
      <Accordion
        type="single"
        collapsible
        className="space-y-4 py-6 max-w-3xl mx-auto"
      >
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`faq-${index}`}>
            <AccordionTrigger className=" text-md sm:text-xl font-medium text-secondary-foreground">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-sm sm:text-lg text-muted-foreground">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
