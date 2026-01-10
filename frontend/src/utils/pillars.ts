export type PillarsResponse = {
  keys: string[];
  meta: Record<
    string,
    {
      label: string;
      slug: string;
      icon: string;
    }
  >;
};

let cachedPillars: PillarsResponse | null = null;
let inFlight: Promise<PillarsResponse> | null = null;

export async function fetchPillars(): Promise<PillarsResponse> {
  const apiBase =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";
  const response = await fetch(`${apiBase}/meta/pillars`, {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("Failed to load pillars.");
  }
  return response.json();
}

export async function getPillarsCached(): Promise<PillarsResponse> {
  if (cachedPillars) {
    return cachedPillars;
  }
  if (!inFlight) {
    inFlight = fetchPillars().then((data) => {
      cachedPillars = data;
      return data;
    });
  }
  return inFlight;
}
