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

interface IMediaOverview {
  adult: false;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  origin_country: string[];
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

export interface IMediaResult {
  page: number;
  total_pages: number;
  total_results: number;
  results: IMovieOverview[] | ITvSeriesOverview[];
}

export interface IMovieOverview extends IMediaOverview {
  original_title: string;
  release_date: string;
  title: string;
  video: false;
}

export interface IGetMoviesResult extends IMediaResult {
  dates: {
    minimum: string;
    maximum: string;
  };
}

interface IGenre {
  id: number;
  name: string;
}

interface IMediaDetail extends IMediaOverview {
  genres: IGenre[];
  spoken_languages: [
    {
      english_name: string;
      iso_639_1: string;
      name: string;
    }
  ];
  homepage: string;
  status: string;
  tagline: string;
}

export interface IMovieDetail extends IMediaDetail {
  belongs_to_collection: null;
  original_title: string;
  homepage: string;
  imdb_id: string;
  poster_path: string;
  release_date: string;
  revenue: number;
  runtime: number;
  title: string;
  video: boolean;
}

export interface ITvSeriesOverview extends IMediaOverview {
  original_name: string;
  first_air_date: string;
  name: string;
}

export interface ITvSeason {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  vote_average: number;
}

export interface ITvCompany {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

interface ITvEpisode {
  id: number;
  name: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  air_date: string;
  episode_number: number;
  episode_type: string;
  production_code: string;
  runtime: string | null;
  season_number: number;
  show_id: number;
  still_path: string | null;
}

export interface ITvSeriesDetail extends IMediaDetail {
  created_by: [
    {
      id: number;
      credit_id: string;
      name: string;
      original_name: string;
      gender: number;
      profile_path: string | null;
    }
  ];
  episode_run_time: number;
  first_air_date: string;
  in_production: boolean;
  last_air_date: string;
  last_episode_to_air: ITvEpisode;
  next_episode_to_air: ITvEpisode;
  networks: ITvCompany[];
  number_of_episodes: number;
  number_of_seasons: number;
  original_name: string;
  production_companies: ITvCompany[];
  seasons: ITvSeason[];
  type: string;
  name: string;
}

export const getNowPlayingMovies = () => {
  return instance
    .get(`movie/now_playing?language=en-US&page=1`)
    .then((response) => response.data);
};

export const getPopularMovies = () => {
  return instance
    .get(`/movie/popular?language=en-US&page=1`)
    .then((response) => response.data);
};

export const getTopRatedMovies = () => {
  return instance
    .get(`/movie/top_rated?language=en-US&page=1`)
    .then((response) => response.data);
};

export const getUpcomingMovies = () => {
  return instance
    .get(`/movie/upcoming?language=en-US&page=1`)
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

export const getOnTheAirTv = () => {
  return instance
    .get(`tv/on_the_air?language=en-US&page=1`)
    .then((response) => response.data);
};

export const getPopularTv = () => {
  return instance
    .get(`tv/popular?language=en-US&page=1`)
    .then((response) => response.data);
};

export const getTopRatedTv = () => {
  return instance
    .get(`tv/top_rated?language=en-US&page=1`)
    .then((response) => response.data);
};

export const getTvDetail = ({ queryKey }: QueryFunctionContext) => {
  const [_, tvId] = queryKey;
  return instance.get(`tv/${tvId}?language=en-US`).then((response) => response.data);
};

export const getTvTeaser = ({ queryKey }: QueryFunctionContext) => {
  const [_, tvId] = queryKey;
  return instance.get(`tv/${tvId}/videos?language=en-US`).then((response) => {
    const teasers = response.data.results.filter(
      (video: any) => video.type === 'Teaser' && video.site === 'Youtube'
    );
    return teasers.length ? `https://www.youtube.com/watch?v=${teasers[0].key}` : null;
  });
};

export const searchMulti = ({ queryKey }: QueryFunctionContext) => {
  const [, keyword] = queryKey;
  return instance
    .get(`/search/multi?query=${keyword}&include_adult=false&language=en-US&page=1`)
    .then((response) => {
      console.log(response.data);
      return response.data;
    });
};
