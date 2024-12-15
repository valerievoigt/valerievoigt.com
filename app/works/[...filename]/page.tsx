import type { Metadata } from "next";
import client from "../../../tina/__generated__/client";
import type { GenerateMetadataProps } from "../../../tina/types";
import ClientPage from "./client-page";

export async function generateStaticParams() {
  const pages = await client.queries.workConnection();
  const paths = pages.data?.workConnection?.edges?.map((edge) => ({
    filename: edge?.node?._sys.breadcrumbs,
  }));

  return paths || [];
}

export async function generateMetadata({
  params,
}: GenerateMetadataProps): Promise<Metadata> {
  const title = (await params).filename[0];

  const work = await client.queries.work({
    relativePath: `${title}.json`,
  });

  return {
    title: work.data.work.name,
    description: work.data.work.seo,
  };
}

export default async function Page({
  params,
}: {
  params: { filename: string[] };
}) {
  const data = await client.queries.work({
    relativePath: `${params.filename}.json`,
  });

  return <ClientPage {...data} />;
}
