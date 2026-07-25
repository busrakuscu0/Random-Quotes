import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { auth0 } from "@/lib/auth0";
import { redirect, RedirectType } from "next/navigation";

export default async function ProtectedLayout({ children }) {
  const session = await auth0.getSession();

  if (!session) {
    redirect("/auth/login", RedirectType.replace);
  }
  const { user, error, loading } = await auth0.getSession();

  if (loading) {
    return (
      <div className="flex justify-center mt-30 md:mt-60">
        <Button size="lg" disabled>
          <Spinner data-icon="inline-start" />
          Loading...
        </Button>
      </div>
    );
  }

  if (error) {
    return (
      <p>
        An error occured, try to refresh the page and{" "}
        <a href="/auth/login">log in</a>again.
      </p>
    );
  }

  return !!user ? <div>{children}</div> : <></>;
}
