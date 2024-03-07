import { createSafeActionClient } from "next-safe-action";
import { currentUser } from "./auth/current-user";

export class ActionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ActionError";
  }
}

const handleReturnedServerError = (error: Error) => {
  if (error instanceof ActionError) {
    return error.message;
  }
  return "An unexpected error occurred";
};

export const action = createSafeActionClient({
  handleReturnedServerError: handleReturnedServerError,
});

export const userAction = createSafeActionClient({
  handleReturnedServerError: handleReturnedServerError,
  middleware: async () => {
    const user = await currentUser();

    if (!user) {
      throw new ActionError("You must be logged in");
    }

    return { user };
  },
});
