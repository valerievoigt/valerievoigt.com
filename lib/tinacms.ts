"use server";

import client from "../tina/__generated__/client";
import type { ReferenceRelativePath } from "../tina/components";

export async function getPosts() {
  return (await client.queries.workConnection()).data.workConnection.edges;
}

export async function getReference(relativePath: ReferenceRelativePath) {
  return (
    await client.queries.work({
      relativePath,
    })
  ).data;
}
