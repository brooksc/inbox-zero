"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/Button";
import { FormSection, FormSectionLeft } from "@/components/Form";
import { toastError, toastSuccess } from "@/components/Toast";
import { deleteAccountAction } from "@/utils/actions";

export function DeleteSection() {
  const router = useRouter();

  return (
    <FormSection>
      <FormSectionLeft
        title="Delete account"
        description="No longer want to use our service? You can delete your account here. This action is not reversible. All information related to this account will be deleted permanently."
      />

      <form className="flex items-start md:col-span-2">
        <Button
          color="red"
          onClick={async () => {
            const yes = window.confirm(
              "Are you sure you want to delete your account?"
            );

            if (!yes) return;

            try {
              await deleteAccountAction();
              toastSuccess({ description: "Account deleted!" });
              router.push("/");
            } catch (error) {
              toastError({ description: "Error deleting account." });
            }
          }}
        >
          Yes, delete my account
        </Button>
      </form>
    </FormSection>
  );
}
