import { useState, useEffect, useCallback } from 'react';

interface ComponentDefinition {
  component: string;
  props?: Record<string, unknown>;
}

interface CrayonResponse {
  components: ComponentDefinition[];
}

// Since browsers can't directly watch files, we poll the server
// The dev server serves static files, so we fetch the JSON file periodically
const RESPONSE_FILE_URL = '/api/response';
const POLL_INTERVAL = 500; // ms

export function useFileWatcher() {
  const [response, setResponse] = useState<CrayonResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [lastModified, setLastModified] = useState<string | null>(null);

  const fetchResponse = useCallback(async () => {
    try {
      const res = await fetch(RESPONSE_FILE_URL, {
        headers: {
          'Cache-Control': 'no-cache',
        },
      });

      if (!res.ok) {
        if (res.status === 404) {
          // File doesn't exist yet, that's OK
          return;
        }
        throw new Error(`HTTP ${res.status}`);
      }

      // Check if file has changed using ETag or Last-Modified
      const newLastModified = res.headers.get('Last-Modified') || res.headers.get('ETag');
      if (newLastModified === lastModified) {
        return; // No change
      }

      const text = await res.text();
      if (!text.trim()) {
        return; // Empty file
      }

      const data = JSON.parse(text) as CrayonResponse;
      setResponse(data);
      setLastModified(newLastModified);
      setError(null);
    } catch (err) {
      if (err instanceof SyntaxError) {
        setError('Invalid JSON in response file');
      } else {
        // Network errors are expected if file doesn't exist
        console.debug('File watcher:', err);
      }
    }
  }, [lastModified]);

  useEffect(() => {
    // Initial fetch
    fetchResponse();

    // Set up polling
    const interval = setInterval(fetchResponse, POLL_INTERVAL);

    return () => clearInterval(interval);
  }, [fetchResponse]);

  return { response, error };
}
