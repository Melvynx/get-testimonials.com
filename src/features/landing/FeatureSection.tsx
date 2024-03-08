"use client";

import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Review } from "@prisma/client";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import RatingSelector from "../../../app/(user)/r/[slug]/RatingSelector";
import { ReviewTextSelector } from "../../../app/(user)/r/[slug]/ReviewTextSelector";
import { SocialSelector } from "../../../app/(user)/r/[slug]/SocialSelector";
import { ReviewItem } from "../../../app/(user)/wall/[slug]/ReviewCard";
import { Section } from "./Section";

export const FeatureSection = () => {
  const [step, setStep] = useState(0);

  return (
    <>
      <Section className="pb-2" id="features">
        <h2 className="text-center text-3xl font-bold">
          The review process made simple :
        </h2>
      </Section>
      <Section className="light rounded-lg bg-gradient-to-r from-blue-200 to-cyan-200 py-12 text-foreground shadow">
        <div className={cn("w-full flex flex-col items-center py-4")}>
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="step-0"
                exit={{
                  opacity: 0,
                  x: -100,
                }}
                className="flex h-full flex-col items-center justify-center gap-4"
              >
                <h2 className="text-lg font-bold">
                  {`How much did you like get-testimonials.com`}
                </h2>
                <RatingSelector
                  onSelect={(review) => {
                    setStep((s) => s + 1);
                  }}
                />
              </motion.div>
            )}
            {step === 1 && (
              <motion.div
                key="step-1"
                exit={{
                  opacity: 0,
                  x: -100,
                }}
                initial={{
                  opacity: 0,
                  x: 100,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                className="flex h-full flex-col items-center justify-center gap-4"
              >
                <h2 className="text-lg font-bold">
                  {"I need more information about you!"}
                </h2>
                <SocialSelector
                  onSelect={(name, url) => {
                    setStep((s) => s + 1);
                  }}
                />
              </motion.div>
            )}
            {step === 2 && (
              <motion.div
                key="step-2"
                exit={{
                  opacity: 0,
                  x: -100,
                }}
                initial={{
                  opacity: 0,
                  x: 100,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                className="flex h-full flex-col items-center justify-center gap-4"
              >
                <h2 className="text-lg font-bold">
                  {"Tell me what you liked and what you disliked?"}
                </h2>
                <ReviewTextSelector
                  onInputSend={(i) => {
                    setStep((s) => s + 1);
                  }}
                  productId={""}
                />
                <p>PS : Not working for the landing page</p>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step-3"
                exit={{
                  opacity: 0,
                  x: -100,
                }}
                initial={{
                  opacity: 0,
                  x: 100,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                className="flex h-full max-w-lg flex-col items-center justify-center gap-4"
              >
                <h2 className="text-lg font-bold">
                  {"Thanks for your review!"}
                </h2>
                <Card>
                  <CardHeader>
                    <CardDescription>
                      Here is the customer review submitted ✅
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Section>
      <Section className="flex flex-col items-center justify-center gap-8">
        <h2 className="text-center text-3xl font-bold">
          And get your review wall to share !
        </h2>

        <div>
          <h2 className="text-4xl font-extrabold">5 / 5</h2>
          <p>144 reviews</p>
        </div>
        <div className="size-full columns-1 md:columns-2 lg:columns-3">
          {reviews.map((r) => (
            <ReviewItem
              review={r}
              className="mb-8 break-inside-avoid-column"
              key={r.id}
            />
          ))}
        </div>
      </Section>
    </>
  );
};

const reviews: Review[] = [
  {
    createdAt: new Date(),
    updatedAt: new Date(),
    audio: null,
    id: "1",
    image: "",
    ip: "",
    name: "John Doe",
    productId: "get-testimonials-com",
    rating: 5,
    socialLink: "",
    socialType: "LINKEDIN",
    text: "I love it! The AI Vocal feature is a game-changer for collecting customer feedback.",
  },
  {
    createdAt: new Date(),
    updatedAt: new Date(),
    audio: null,
    id: "2",
    image: "",
    ip: "",
    name: "Emily Rivera",
    productId: "get-testimonials-com",
    rating: 4,
    socialLink: "",
    socialType: "LINKEDIN",
    text: "Really impressed with how easy it is to leave voice notes. Makes giving feedback feel more personal.",
  },
  {
    createdAt: new Date(),
    updatedAt: new Date(),
    audio: null,
    id: "3",
    image: "",
    ip: "",
    name: "Michael Chen",
    productId: "get-testimonials-com",
    rating: 5,
    socialLink: "",
    socialType: "TWITTER",
    text: "The review process is incredibly streamlined, and the Review AI Vocal helps capture genuine customer sentiments.",
  },
  {
    createdAt: new Date(),
    updatedAt: new Date(),
    audio: null,
    id: "4",
    image: "",
    ip: "",
    name: "Sofia Patel",
    productId: "get-testimonials-com",
    rating: 3,
    socialLink: "",
    socialType: "LINKEDIN",
    text: "Good concept, but the voice note feature could be smoother. Looking forward to updates!",
  },
  {
    createdAt: new Date(),
    updatedAt: new Date(),
    audio: null,
    id: "5",
    image: "",
    ip: "",
    name: "Alex Johnson",
    productId: "get-testimonials-com",
    rating: 5,
    socialLink: "",
    socialType: "LINKEDIN",
    text: "As a business owner, gathering quality testimonials has never been easier. Highly recommend!",
  },
  {
    createdAt: new Date(),
    updatedAt: new Date(),
    audio: null,
    id: "6",
    image: "",
    ip: "",
    name: "John Doe",
    productId: "get-testimonials-com",
    rating: 5,
    socialLink: "",
    socialType: "LINKEDIN",
    text: "I love it! The AI Vocal feature is a game-changer for collecting customer feedback.",
  },
  {
    createdAt: new Date(),
    updatedAt: new Date(),
    audio: null,
    id: "7",
    image: "",
    ip: "",
    name: "Emily Rivera",
    productId: "get-testimonials-com",
    rating: 4,
    socialLink: "",
    socialType: "LINKEDIN",
    text: "Really impressed with how easy it is to leave voice notes. Makes giving feedback feel more personal.",
  },
  {
    createdAt: new Date(),
    updatedAt: new Date(),
    audio: null,
    id: "8",
    image: "",
    ip: "",
    name: "Michael Chen",
    productId: "get-testimonials-com",
    rating: 5,
    socialLink: "",
    socialType: "TWITTER",
    text: "The review process is incredibly streamlined, and the Review AI Vocal helps capture genuine customer sentiments.",
  },
  {
    createdAt: new Date(),
    updatedAt: new Date(),
    audio: null,
    id: "9",
    image: "",
    ip: "",
    name: "Sofia Patel",
    productId: "get-testimonials-com",
    rating: 3,
    socialLink: "",
    socialType: "LINKEDIN",
    text: "Good concept, but the voice note feature could be smoother. Looking forward to updates!",
  },
  {
    createdAt: new Date(),
    updatedAt: new Date(),
    audio: null,
    id: "10",
    image: "",
    ip: "",
    name: "Alex Johnson",
    productId: "get-testimonials-com",
    rating: 5,
    socialLink: "",
    socialType: "LINKEDIN",
    text: "As a business owner, gathering quality testimonials has never been easier. Highly recommend!",
  },
];
