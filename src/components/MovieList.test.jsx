// src/components/MovieList.test.jsx

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { MovieList } from './MovieList';

const mockMovies = [
  {
    id: 1,
    title: 'Movie One',
    poster_path: '/poster1.jpg',
    release_date: '2024-01-01',
    vote_average: 7.5,
  },
  {
    id: 2,
    title: 'Movie Two',
    poster_path: '/poster2.jpg',
    release_date: '2024-02-01',
    vote_average: 8.0,
  },
  {
    id: 3,
    title: 'Movie Three',
    poster_path: '/poster3.jpg',
    release_date: '2024-03-01',
    vote_average: 6.5,
  },
];

function renderWithRouter(component) {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
}

describe('MovieList', () => {

  it('renders all movies', () => {
    renderWithRouter(
      <MovieList
        movies={mockMovies}
        isFavorite={() => false}
        onToggleFavorite={() => {}}
      />
    );

    expect(screen.getByText('Movie One')).toBeInTheDocument();
    expect(screen.getByText('Movie Two')).toBeInTheDocument();
    expect(screen.getByText('Movie Three')).toBeInTheDocument();
  });

  it('renders correct number of movie cards', () => {
    renderWithRouter(
      <MovieList
        movies={mockMovies}
        isFavorite={() => false}
        onToggleFavorite={() => {}}
      />
    );

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(3);
  });

  it('shows empty message when no movies', () => {
    renderWithRouter(
      <MovieList
        movies={[]}
        isFavorite={() => false}
        onToggleFavorite={() => {}}
      />
    );

    expect(screen.getByText('No movies found.')).toBeInTheDocument();
  });

  it('shows empty message when movies is null', () => {
    renderWithRouter(
      <MovieList
        movies={null}
        isFavorite={() => false}
        onToggleFavorite={() => {}}
      />
    );

    expect(screen.getByText('No movies found.')).toBeInTheDocument();
  });

  it('passes correct favorite status to each card', () => {
    // Movie with id 2 is favorited
    const isFavorite = (id) => id === 2;

    renderWithRouter(
      <MovieList
        movies={mockMovies}
        isFavorite={isFavorite}
        onToggleFavorite={() => {}}
      />
    );

    const buttons = screen.getAllByRole('button');

    // First and third should be empty heart
    expect(buttons[0]).toHaveTextContent('🤍');
    expect(buttons[2]).toHaveTextContent('🤍');

    // Second should be filled heart
    expect(buttons[1]).toHaveTextContent('❤️');
  });

});