import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

// false during SSR and hydration, true once rendering on the client
export function useIsClient() {
  return useSyncExternalStore(noopSubscribe, () => true, () => false);
}
