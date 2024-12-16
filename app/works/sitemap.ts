import type { MetadataRoute } from "next";
import client from "../../tina/__generated__/client";
import { sanitizeFilenameForURL } from "../../tina/utils";
import { CONSTANTS } from "../../utils/config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = (
    await client.queries.workConnection()
  ).data.workConnection.edges?.map((page) => page);

  return pages!.map((page) => ({
    url: `${CONSTANTS.projectUrl}/works/${sanitizeFilenameForURL(
      page!.node!.name
    )}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.5,
  }));
}
