import { Text as ReactEmailText } from "@react-email/components";
import { ComponentPropsWithoutRef } from "react";

export const Text = (
  props: ComponentPropsWithoutRef<typeof ReactEmailText>
) => {
  return (
    <ReactEmailText
      className="text-base font-light leading-8 text-gray-800"
      {...props}
    />
  );
};
