import EmailLayout from "./EmailLayout";
import { Text } from "./Text";

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const DowngradeEmail = () => {
  return (
    <EmailLayout preview="You created your first product !">
      <Text className="text-base font-light leading-8 text-gray-800">Hi,</Text>
      <Text className="text-base font-light leading-8 text-gray-800">
        We are so sad to see you go. You are now downgraded to the free plan.
      </Text>
      <Text className="text-base font-light leading-8 text-gray-800">
        Your actual created product can still be used, but you are limited to
        100 reviews in total.
      </Text>
      <Text className="text-base font-light leading-8 text-gray-800">
        Melvyn, creator of get-testimonials.com
      </Text>
    </EmailLayout>
  );
};

DowngradeEmail.PreviewProps = {
  product: "Product name",
  slug: "product-slug",
};

export default DowngradeEmail;
