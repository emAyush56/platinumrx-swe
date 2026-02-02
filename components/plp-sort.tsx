"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function PLPSort({ limit }: { limit: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleLimitChange = (limitValue: string) => {
    const params = new URLSearchParams(searchParams);

    if (limitValue) params.set("limit", limitValue);
    else params.delete("limit");

    const qs = params.toString();
    replace(qs ? `${pathname}?${qs}` : pathname);
  };

  return (
    <div className="flex items-center gap-6">
      <div className="flex items-center gap-2.5">
        <label htmlFor="plp-limit" className="sr-only">
          Set product limit
        </label>
        <input
          id="plp-limit"
          name="plp-limit"
          type="text"
          aria-label="Set number of products to show"
          className="border border-border-1 px-2 w-10 outline-none"
          maxLength={2}
          defaultValue={limit}
          onChange={(e) => handleLimitChange(e.target.value)}
          pattern="[0-9]*"
        />
      </div>
    </div>
  );
}
