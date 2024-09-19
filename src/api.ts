import { QueryFunctionContext } from '@tanstack/react-query';
import axios from 'axios';

const ACCESS_TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOTY1ODI0ZmJjMWFjMzNlMTEyNDg0OTViNDUxNGU5NyIsIm5iZiI6MTcyNjcyMTAwMS43ODA1NCwic3ViIjoiNjBjZWU5MzM5NjdjYzcwMDU4NDJjODY3Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.r9N27kJxM9xTpt5XtP0JY5eexpTIk0QaeSO-Zuig5tk';

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
});

interface IMovieOverview {
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
  results: IMovieOverview[];
}

interface IGenre {
  id: number;
  name: string;
}

export interface IMovieDetail {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null;
  genres: IGenre[];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: [
    {
      english_name: string;
      iso_639_1: string;
      name: string;
    }
  ];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export const getMovies = () => {
  return instance
    .get(`movie/now_playing?language=en-US&page=1`)
    .then((response) => response.data);
};

export const getMovieDetail = ({ queryKey }: QueryFunctionContext) => {
  const [_, movieId] = queryKey;
  return instance
    .get(`movie/${movieId}?language=en-US`)
    .then((response) => response.data);
};

export const getMovieTrailer = ({ queryKey }: QueryFunctionContext) => {
  const [_, movieId] = queryKey;
  return instance.get(`/movie/${movieId}/videos?language=en-US`).then((response) => {
    const trailers = response.data.results.filter(
      (video: any) => video.type === 'Trailer' && video.site === 'YouTube'
    );
    return trailers.length ? `https://www.youtube.com/watch?v=${trailers[0].key}` : null;
  });
};
