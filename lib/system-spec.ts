import systemSpec from "@/docs/system.json";

const HTTP_METHODS = ["get", "post", "put", "delete", "patch"] as const;

type HttpMethod = (typeof HTTP_METHODS)[number];

type OperationObject = {
  tags?: string[];
  summary?: string;
  description?: string;
  operationId?: string;
  parameters?: Array<{ name?: string; in?: string; required?: boolean; description?: string }>;
};

type PathsObject = Record<string, Partial<Record<HttpMethod, OperationObject>>>;

export type ApiParameter = {
  name: string;
  in: string;
  required?: boolean;
  description?: string;
};

export type ApiEndpoint = {
  method: string;
  path: string;
  summary: string;
  description?: string;
  operationId?: string;
  tags: string[];
  parameters: ApiParameter[];
};

const paths = (systemSpec.paths ?? {}) as PathsObject;

const allEndpoints: ApiEndpoint[] = Object.entries(paths).flatMap(([path, operations]) => {
  if (!operations) return [];
  return HTTP_METHODS.flatMap((method) => {
    const operation = operations[method];
    if (!operation) return [];
    const parameters = (operation.parameters ?? []).map((parameter) => ({
      name: parameter.name ?? "",
      in: parameter.in ?? "",
      required: parameter.required,
      description: parameter.description,
    }));
    return {
      method: method.toUpperCase(),
      path,
      summary: operation.summary ?? operation.operationId ?? "",
      description: operation.description,
      operationId: operation.operationId,
      tags: operation.tags ?? [],
      parameters,
    } satisfies ApiEndpoint;
  });
});

export function getSystemEndpoints(tagOrTags: string | string[]): ApiEndpoint[] {
  const tags = Array.isArray(tagOrTags) ? tagOrTags : [tagOrTags];
  return allEndpoints.filter((endpoint) => endpoint.tags.some((tag) => tags.includes(tag)));
}
