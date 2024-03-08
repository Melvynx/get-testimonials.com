import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Section } from "./Section";

const FAQS: { question: string; answer: string }[] = [
  {
    question: "How does the AI Vocal feature work?",
    answer:
      "The AI Vocal feature allows customers to leave voice notes as reviews. Our AI then transcribes these notes into text, making it easier to share and analyze feedback.",
  },
  {
    question: "Can I integrate get-testimonials.com with my website?",
    answer:
      "Yes, you can easily integrate our service with your website. We provide simple widgets and APIs that you can embed to start collecting testimonials directly from your site.",
  },
  {
    question: "Is there a limit to the number of reviews I can collect?",
    answer:
      "No, there are no limits on the number of reviews you can collect. Our goal is to help you gather as much valuable feedback as possible.",
  },
  {
    question:
      "How does get-testimonials.com ensure the authenticity of reviews?",
    answer:
      "We use several verification methods to ensure reviews are authentic, including social media verification and IP checks. This maintains the credibility of your testimonials.",
  },
  {
    question: "Can customers edit their reviews after submitting them?",
    answer:
      "Customers can request edits to their reviews by contacting the reviewer or our support team. This ensures that the feedback remains accurate and up-to-date.",
  },
  {
    question: "How do I share the reviews I've collected?",
    answer:
      "You can share reviews by embedding your personalized review wall on your website or sharing them directly to your social media platforms from your dashboard.",
  },
  {
    question:
      "What is the Review AI Vocal, and how can it increase my customer reviews by 4?",
    answer:
      "Review AI Vocal is our proprietary technology that engages customers through voice notes, making it easier and more personal for them to leave feedback, which can significantly increase the volume of reviews you receive.",
  },
  {
    question: "Are there analytics tools to measure the impact of reviews?",
    answer:
      "Yes, our platform provides analytics tools that allow you to measure the impact of your reviews, including sentiment analysis, review volume trends, and more.",
  },
  {
    question: "Can I respond to reviews directly through get-testimonials.com?",
    answer:
      "Yes, our platform enables you to respond to reviews directly, allowing you to engage with your customers and address their feedback promptly.",
  },
  {
    question: "What support options are available if I need help?",
    answer:
      "We offer comprehensive support through our Help Center, email support, and live chat. Our team is dedicated to assisting you in making the most of get-testimonials.com.",
  },
];

export const FAQSection = () => {
  return (
    <Section className="flex w-full flex-row items-start gap-4 max-lg:flex-col max-lg:items-center">
      <div className="flex-1 max-lg:text-center">
        <h2 className="text-xl font-bold text-primary">FAQ</h2>
        <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
      </div>
      <div className="w-full max-w-lg flex-1 text-left">
        <Accordion type="multiple">
          {FAQS.map((faq, index) => (
            <AccordionItem
              value={faq.question}
              key={faq.question}
              className="text-left"
            >
              <AccordionTrigger>
                <span className="text-left">{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Section>
  );
};
