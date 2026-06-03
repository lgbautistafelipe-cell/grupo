import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getPanuelos } from "@/lib/panuelos.functions";

export function panuelosQueryKey() {
  return ["panuelos"] as const;
}

export function usePanuelos() {
  const fetcher = useServerFn(getPanuelos);
  return useQuery({
    queryKey: panuelosQueryKey(),
    queryFn: () => fetcher(),
    staleTime: 1000 * 60 * 5, // 5 min
  });
}
