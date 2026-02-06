import { describe, it, expect, beforeEach } from 'vitest';
import { getCached, setCache, invalidateCache, clearCache } from './cache';

describe('cache', () => {
  // Before each test, clear the cache so tests don't affect each other
  beforeEach(() => {
    clearCache();
  });

  describe('setCache and getCached', () => {
    it('stores and retrieves a value', () => {
      // Arrange: Set up test data
      const testData = { movies: ['Movie 1', 'Movie 2'] };

      // Act: Store the data
      setCache('test_key', testData);

      // Assert: Retrieve and verify
      const retrieved = getCached('test_key');
      expect(retrieved).toEqual(testData);
    });

    it('returns null for non-existent key', () => {
      const result = getCached('non_existent_key');
      expect(result).toBeNull();
    });

    it('returns null for expired cache', () => {
      // Store with a very short duration (1ms)
      setCache('expiring_key', { data: 'test' }, 1);

      // Wait for it to expire
      // We use vi.advanceTimersByTime or just wait
      return new Promise((resolve) => {
        setTimeout(() => {
          const result = getCached('expiring_key');
          expect(result).toBeNull();
          resolve();
        }, 10); // Wait 10ms, cache should be expired
      });
    });
  });

  describe('invalidateCache', () => {
    it('removes a specific cached item', () => {
      setCache('key1', 'value1');
      setCache('key2', 'value2');

      invalidateCache('key1');

      expect(getCached('key1')).toBeNull();
      expect(getCached('key2')).toEqual('value2'); // key2 still exists
    });
  });

  describe('clearCache', () => {
    it('removes all cached items', () => {
      setCache('key1', 'value1');
      setCache('key2', 'value2');

      clearCache();

      expect(getCached('key1')).toBeNull();
      expect(getCached('key2')).toBeNull();
    });
  });
});
