"use client";

import { ColdEmailList } from "@/app/(app)/cold-email-blocker/ColdEmailList";
import { ColdEmailSettings } from "@/app/(app)/cold-email-blocker/ColdEmailSettings";
import { PremiumAlert, usePremium } from "@/components/PremiumAlert";
import { TopSection } from "@/components/TopSection";
import { PremiumTier } from "@prisma/client";

export default function ColdEmailBlockerPage() {
  const { isPremium, isLoading, data } = usePremium();

  const isProPlanWithoutApiKey =
    (data?.premium?.tier === PremiumTier.PRO_MONTHLY ||
      data?.premium?.tier === PremiumTier.PRO_ANNUALLY) &&
    !data?.openAIApiKey;

  return (
    <div>
      <TopSection
        title="Cold Email Blocker"
        descriptionComponent={
          <>
            {(!isPremium || isProPlanWithoutApiKey) && !isLoading && (
              <div className="mt-4 max-w-prose">
                <PremiumAlert showSetApiKey={isProPlanWithoutApiKey} />
              </div>
            )}
          </>
        }
      />
      <div className="content-container border-b border-gray-200 bg-white py-6 shadow-sm">
        <ColdEmailSettings />
      </div>
      <ColdEmailList />
    </div>
  );
}
