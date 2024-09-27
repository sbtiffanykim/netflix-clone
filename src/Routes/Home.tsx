import { useMatch } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { getPopularMovies, getPopularTv, IMediaResult } from '../api';
import { makeImagePath } from '../utils';
import MovieModal from '../Components/MovieModal';
import Slider from '../Components/Slider';
import TvModal from '../Components/TvModal';
import { useState } from 'react';

const Wrapper = styled.div`
  background-color: black;
  overflow-x: hidden;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BannerWrapper = styled(motion.div)`
  height: 80vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
  margin-bottom: 20px;
`;

const Banner = styled(motion.div)<{ bgphoto: string }>`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 60px;
  position: absolute;
  top: 0;
  left: 0;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8)),
    url(${(props) => props.bgphoto});
  background-position: center center;
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 65px;
  font-weight: 600;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
`;

const Overview = styled.p`
  margin-top: 10px;
  font-size: 23px;
  width: 50%;
`;

const SliderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 100px;
  padding: 0 20px;
  overflow: hidden;
`;

const bannerVariants = {
  initial: {
    x: 1000,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -1000,
  },
  transition: { type: 'tween', duration: 0.2 },
};

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

  const banner = [
    ...(movies?.results?.slice(0, 2) || []),
    ...(tvSeries?.results?.slice(0, 2) || []),
  ];

  const [index, setIndex] = useState(0);
  const increaseIndex = () => {
    setIndex((prev) => (prev + 1) % 4);
  };

  console.log(movies);
  console.log(tvSeries);

  return (
    <Wrapper>
      {isMoviesLoading || isTvSeriesLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <AnimatePresence initial={false}>
            {banner.map(
              (item, idx) =>
                index === idx && (
                  <BannerWrapper
                    onClick={increaseIndex}
                    variants={bannerVariants}
                    initial='initial'
                    animate='visible'
                    exit='exit'
                    key={item.id}
                  >
                    <Banner
                      bgphoto={makeImagePath(item.backdrop_path || item.poster_path)}
                    >
                      <Title>{item.title || item.name}</Title>
                      <Overview>{item.overview}</Overview>
                    </Banner>
                  </BannerWrapper>
                )
            )}
          </AnimatePresence>

          <SliderContainer>
            {movies?.results ? (
              <Slider data={movies} title={'Popular Movies'} type='movies' />
            ) : null}
            {tvSeries?.results ? (
              <Slider data={tvSeries} title={'Popular TV Series'} type='tv' />
            ) : null}
          </SliderContainer>

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
