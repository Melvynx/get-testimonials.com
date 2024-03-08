import { Section } from "./Section";

export const ProblemsSection = () => {
  return (
    <Section>
      <h2 className="text-center text-3xl font-bold">
        Increase your review = increase your sales
      </h2>
      <div className="m-auto mt-4 flex max-w-3xl gap-4 max-lg:flex-col">
        <div className="flex flex-1 flex-col items-start rounded-lg bg-red-500/50 p-4 shadow lg:p-8">
          <h3 className="text-xl font-bold">Before get-testimonials.com</h3>
          <ul className="flex list-disc flex-col items-start text-left">
            <li>Customer don't trust your product</li>
            <li>Customer doesn't make review because it's too long</li>
            <li>It's hard to get review from customer</li>
          </ul>
        </div>
        <div className="flex flex-1 flex-col items-start rounded-lg bg-green-500/50 p-4 shadow lg:p-8">
          <h3 className="text-xl font-bold">After get-testimonials.com</h3>
          <ul className="flex list-disc flex-col items-start text-left">
            <li>Customer trust your product and PAY 💰</li>
            <li>You get A LOT of review because of the process</li>
            <li>Customer WANT give you a review</li>
          </ul>
        </div>
      </div>
    </Section>
  );
};
