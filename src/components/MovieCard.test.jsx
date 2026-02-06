import { describe, it, expect,vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MovieCard } from "./MovieCard";
import { BrowserRouter } from "react-router";

// Mock movie data
const mockMovie = {
    id: 123,
    title: "Test Movie",
    release_date: "2020-01-01",
    vote_average: 7.5,
    poster_path: "/test-poster.jpg"
};

describe("MovieCard", () => {
    it("renders movie title", () => {
        renderWithRouter(<MovieCard movie={mockMovie} isFavorite={false} onToggleFavorite={() => {}} />);
        expect(screen.getByText("Test Movie")).toBeInTheDocument();
    });

    it("renders release year", () => {
        renderWithRouter(<MovieCard movie={mockMovie} isFavorite={false} onToggleFavorite={() => {}} />);
        expect(screen.getByText("2020")).toBeInTheDocument();
    });

    it("renders rating", () => {
        renderWithRouter(<MovieCard movie={mockMovie} isFavorite={false} onToggleFavorite={() => {}} />);
        expect(screen.getByText("7.5")).toBeInTheDocument();
    });

    it('shows empty heart when not favorite', () => {
        renderWithRouter(<MovieCard movie={mockMovie} isFavorite={false} onToggleFavorite={() => {}} />);
        expect(screen.getByRole('button',)).toHaveTextContent('🤍');
    });

    it('shows filled heart when favorite', () => {
        renderWithRouter(<MovieCard movie={mockMovie} isFavorite={true} onToggleFavorite={() => {}} />);
        expect(screen.getByRole('button',)).toHaveTextContent('❤️');
    });

    it('calls onToggleFavorite when favorite button is clicked', () => {
        const toggleFavoriteMock = vi.fn();
        renderWithRouter(<MovieCard movie={mockMovie} isFavorite={false} onToggleFavorite={toggleFavoriteMock} />);
        fireEvent.click(screen.getByRole('button'));
        expect(toggleFavoriteMock).toHaveBeenCalledWith(mockMovie);
    });

    it('links to movie detail page', () => {
        renderWithRouter(<MovieCard movie={mockMovie} isFavorite={false} onToggleFavorite={() => {}} />);
        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', '/movie/123');
    });

    it('handles missing poster gracefully', () => {
        const movieWithoutPoster = { ...mockMovie, poster_path: null };
        renderWithRouter(<MovieCard movie={movieWithoutPoster} isFavorite={false} onToggleFavorite={() => {}} />);
        const img = screen.getByRole('img');
        expect(img).toHaveAttribute('src', '/images/placeholder-poster.png');
    });

    it('handles missing release date gracefully', () => {
        const movieWithoutReleaseDate = { ...mockMovie, release_date: null };
        renderWithRouter(<MovieCard movie={movieWithoutReleaseDate} isFavorite={false} onToggleFavorite={() => {}} />);
        expect(screen.getByText("Unknown")).toBeInTheDocument();
    });

    it('handles missing rating gracefully', () => {
        const movieWithoutRating = { ...mockMovie, vote_average: null };
        renderWithRouter(<MovieCard movie={movieWithoutRating} isFavorite={false} onToggleFavorite={() => {}} />);
        expect(screen.getByText("N/A")).toBeInTheDocument();
    });
});

// mock function
const mockToggle = vi.fn();

// check if it was called
expect(mockToggle).toHaveBeenCalledTimes(1);
expect(mockToggle).toHaveBeenCalledWith(mockMovie);

// helper to render with router context
function renderWithRouter(ui) {
    return render(<BrowserRouter>{ui}</BrowserRouter>);
}

screen.getByText("Test Movie");
screen.getByRole('button');
screen.getByRole('link');
screen.getByRole('img');