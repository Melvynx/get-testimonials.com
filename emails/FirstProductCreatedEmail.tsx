import { Button } from "./Button";
import EmailLayout from "./EmailLayout";
import { Text } from "./Text";

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const FirstProductCreatedEmail = ({
  product,
  slug,
}: {
  product: string;
  slug: string;
}) => {
  return (
    <EmailLayout preview="You created your first product !">
      <Text className="text-base font-light leading-8 text-gray-800">
        Hi, you just created your first product on get-testimonials.com.
      </Text>
      <Text className="text-base font-light leading-8 text-gray-800">
        So nice, you can share the review url :
      </Text>
      <Button
        className="block w-52 rounded bg-blue-600 py-3.5 text-center text-sm font-normal text-white no-underline"
        href={`${baseUrl}/r/${slug}`}
      >
        Share review URL
      </Button>
      <Text className="text-base font-light leading-8 text-gray-800">
        If you want create more product, consider upgrading to our premium plan.
      </Text>
      <Button
        className="block w-52 rounded bg-blue-600 py-3.5 text-center text-sm font-normal text-white no-underline"
        href={`${baseUrl}/upgrade`}
      >
        Upgrade to premium
      </Button>
      <Text className="text-base font-light leading-8 text-gray-800">
        Best regards,
      </Text>

      <Text className="text-base font-light leading-8 text-gray-800">
        Melvyn, creator of get-testimonials.com
      </Text>
    </EmailLayout>
  );
};

FirstProductCreatedEmail.PreviewProps = {
  product: "Product name",
  slug: "product-slug",
};

export default FirstProductCreatedEmail;
