/* eslint-disable @typescript-eslint/no-explicit-any */
export async function fetcher<T>(endpoint: string, singleId?: string): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "https://api.bluebirdcar.co.uk/api/v1";
  const url = singleId ? `${baseUrl}${endpoint}/${singleId}` : `${baseUrl}${endpoint}`;

  try {
    const res = await fetch(url, {
      // Optional caching config for ISR
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      const errorBody = await res.text();
      console.error(`❌ Fetch failed: ${res.status} ${res.statusText}`, errorBody);
      throw new Error(`Failed to fetch data ${endpoint}: ${res.statusText}`);
    }

    const data = await res.json();
    return data as T;
  } catch (error: any) {
    console.error(`❌ Fetcher error for ${url}:`, error.message || error);
    throw error;
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function poster<T>(endpoint: string, payload: any): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "https://api.bluebirdcar.co.uk/api/v1";
  const url = `${baseUrl}${endpoint}`;

  try {
    const res = await fetch(url, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        // "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorBody = await res.text();
      console.error(`❌ Post failed: ${res.status} ${res.statusText}`, errorBody);
      throw new Error(`Failed to POST ${endpoint}: ${res.statusText}`);
    }

    const data = await res.json();
    return data as T;
  } catch (error: any) {
    console.error(`❌ Poster error for ${url}:`, error.message || error);
    throw error;
  }
}
