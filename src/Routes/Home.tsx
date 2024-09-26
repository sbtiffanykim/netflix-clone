import { useMatch } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import {
  getNowPlayingMovies,
  getPopularMovies,
  getPopularTv,
  IMediaResult,
} from '../api';
import { makeImagePath } from '../utils';
import MovieModal from '../Components/MovieModal';
import Slider from '../Components/Slider';
import { useRecoilState } from 'recoil';
import { modalState } from '../atoms';
import TvModal from '../Components/TvModal';

const Wrapper = styled.div`
  background-color: black;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgphoto: string }>`
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  z-index: 100;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8)),
    url(${(props) => props.bgphoto});
  background-size: cover;
  margin-bottom: 40px;
`;

const Title = styled.h2`
  font-size: 65px;
`;

const Overview = styled.p`
  margin-top: 10px;
  font-size: 23px;
  width: 50%;
`;

const CarouselContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Carousel = styled(Slider)``;

export default function Home() {
  const { data: movies, isLoading: isMoviesLoading } = useQuery<IMediaResult>({
    queryKey: ['movies', 'popular'],
    queryFn: getPopularMovies,
  });

  const { data: tvSeries, isLoading: isTvSeriesLoading } = useQuery<IMediaResult>({
    queryKey: ['tvSeries', 'popular'],
    queryFn: getPopularTv,
  });

  const moviePathMatch = useMatch('/movies/:movieId');
  const tvPathMatch = useMatch('/tv/:tvId');
  const [isModalOpen, setIsModalOpen] = useRecoilState(modalState);

  return (
    <Wrapper>
      {isMoviesLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            bgphoto={makeImagePath(
              movies?.results[0].backdrop_path || movies?.results[0].poster_path
            )}
          >
            <Title>{movies?.results[0].title}</Title>
            <Overview>{movies?.results[0].overview}</Overview>
          </Banner>
          <CarouselContainer>
            {movies?.results ? (
              <Carousel data={movies} title={'Popular Movies'} type='movies' />
            ) : null}
            {tvSeries?.results ? (
              <Carousel data={tvSeries} title={'Popular TV Series'} type='tv' />
            ) : null}
          </CarouselContainer>

          <AnimatePresence>
            {moviePathMatch ? (
              <MovieModal layoutId={moviePathMatch.params.movieId} />
            ) : null}
            {tvPathMatch ? <TvModal layoutId={tvPathMatch.params.tvId} /> : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}
