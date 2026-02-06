// src/hooks/useFavorites.test.js

import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useFavorites } from './useFavorites';

describe('useFavorites', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  it('starts with empty favorites', () => {
    const { result } = renderHook(() => useFavorites());
    expect(result.current.favorites).toEqual([]);
  });

  it('adds a movie to favorites', () => {
    const { result } = renderHook(() => useFavorites());
    const movie = { id: 1, title: 'Test Movie' };

    act(() => {
      result.current.addFavorite(movie);
    });

    expect(result.current.favorites).toHaveLength(1);
    expect(result.current.favorites[0]).toEqual(movie);
  });

  it('removes a movie from favorites', () => {
    const { result } = renderHook(() => useFavorites());
    const movie = { id: 1, title: 'Test Movie' };

    act(() => {
      result.current.addFavorite(movie);
    });

    act(() => {
      result.current.removeFavorite(1);
    });

    expect(result.current.favorites).toHaveLength(0);
  });

  it('checks if a movie is favorited', () => {
    const { result } = renderHook(() => useFavorites());
    const movie = { id: 42, title: 'Test Movie' };

    expect(result.current.isFavorite(42)).toBe(false);

    act(() => {
      result.current.addFavorite(movie);
    });

    expect(result.current.isFavorite(42)).toBe(true);
  });

  it('toggles favorite status', () => {
    const { result } = renderHook(() => useFavorites());
    const movie = { id: 1, title: 'Test Movie' };

    act(() => {
      result.current.toggleFavorite(movie);
    });
    expect(result.current.isFavorite(1)).toBe(true);

    act(() => {
      result.current.toggleFavorite(movie);
    });
    expect(result.current.isFavorite(1)).toBe(false);
  });

  it('does not add duplicate favorites', () => {
    const { result } = renderHook(() => useFavorites());
    const movie = { id: 1, title: 'Test Movie' };

    act(() => {
      result.current.addFavorite(movie);
      result.current.addFavorite(movie);
      result.current.addFavorite(movie);
    });

    expect(result.current.favorites).toHaveLength(1);
  });

  it('persists favorites between hook instances', () => {
    const movie = { id: 1, title: 'Test Movie' };

    // First instance - add favorite
    const { result: result1, unmount } = renderHook(() => useFavorites());
    act(() => {
      result1.current.addFavorite(movie);
    });
    unmount();

    // Second instance - favorite should still exist
    const { result: result2 } = renderHook(() => useFavorites());
    expect(result2.current.favorites).toEqual([movie]);
  });

  it('loads existing favorites on init', () => {
    const movie = { id: 99, title: 'Existing Movie' };

    // First instance adds a movie
    const { result: first, unmount } = renderHook(() => useFavorites());
    act(() => {
      first.current.addFavorite(movie);
    });
    unmount();

    // New instance should have it
    const { result: second } = renderHook(() => useFavorites());
    expect(second.current.isFavorite(99)).toBe(true); // ← Changed 'result' to 'second'
  });
});
