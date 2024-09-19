const ACCESS_TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOTY1ODI0ZmJjMWFjMzNlMTEyNDg0OTViNDUxNGU5NyIsIm5iZiI6MTcyNjcyMTAwMS43ODA1NCwic3ViIjoiNjBjZWU5MzM5NjdjYzcwMDU4NDJjODY3Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.r9N27kJxM9xTpt5XtP0JY5eexpTIk0QaeSO-Zuig5tk';
const BASE_PATH = 'https://api.themoviedb.org/3';

interface IMovie {
  adult: false;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: false;
  vote_average: number;
  vote_count: number;
}

export interface IGetMoviesResult {
  dates: {
    minimum: string;
    maximum: string;
  };
  page: number;
  total_pages: number;
  total_results: number;
  results: IMovie[];
}

export function getMovies() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  };
  return fetch(`${BASE_PATH}/movies/now_playing?language=en-US&page=1`, options).then(
    (response) => response.json()
  );
}
