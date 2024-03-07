import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const SocialSelector = ({
  onSelect,
}: {
  onSelect: (name: string, url: string) => void;
}) => {
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");

  const onSubmit = () => {
    // verify that url is like :
    // 1. https://www.linkedin.com/in/USERNAME
    // 2. https://twitter.com/USERNAME
    // 2. https://x.com/USERNAME

    if (!url) {
      toast.error("Please enter a valid URL");
      return;
    }

    if (!name) {
      toast.error("Please enter a name");
      return;
    }

    // if url is not valid
    if (
      !url.match(/https:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+/) &&
      !url.match(/https:\/\/twitter\.com\/[a-zA-Z0-9_-]+/) &&
      !url.match(/https:\/\/x\.com\/[a-zA-Z0-9_-]+/)
    ) {
      toast.error("Please enter a valid LinkedIn or Twitter URL.");
      return;
    }

    onSelect(name, url);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-background/50"
          placeholder="Name"
        />
        <Input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="bg-background/50"
          placeholder="https://www.linkedin.com/in/foo/"
        />
        <Button onClick={onSubmit} className="w-full">
          <Check size={16} /> Submit
        </Button>
      </div>
      <p className="text-sm font-light text-muted-foreground">
        Add a link to your LinkedIn or Twitter.
      </p>
    </div>
  );
};
