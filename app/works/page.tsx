import type { Metadata } from "next";
import client from "../../tina/__generated__/client";
import ClientPage from "./client-page";

export const metadata: Metadata = {
  title: "Works",
  description: "Alle Werke von Valerie Voigt",
};

export default async function Page() {
  const pages = (
    await client.queries.workConnection()
  ).data.workConnection.edges?.sort(
    (a, b) =>
      new Date(b!.node?.startDate!).getTime() -
      new Date(a!.node?.startDate!).getTime()
  );

  return <ClientPage props={pages} />;
}
