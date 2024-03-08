import { Button } from "./Button";
import EmailLayout from "./EmailLayout";
import { Text } from "./Text";

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const PremiumEmail = () => {
  return (
    <EmailLayout preview="You created your first product !">
      <Text className="text-base font-light leading-8 text-gray-800">
        Hi, welcome to Premium User !
      </Text>
      <Text className="text-base font-light leading-8 text-gray-800">
        You can now create an infinite number of products.
      </Text>
      <Button
        className="block w-52 rounded bg-blue-600 py-3.5 text-center text-sm font-normal text-white no-underline"
        href={`${baseUrl}/products/new`}
      >
        Create a product
      </Button>
      <Text className="text-base font-light leading-8 text-gray-800">
        See you there,
      </Text>

      <Text className="text-base font-light leading-8 text-gray-800">
        Melvyn, creator of get-testimonials.com
      </Text>
    </EmailLayout>
  );
};

PremiumEmail.PreviewProps = {
  product: "Product name",
  slug: "product-slug",
};

export default PremiumEmail;
