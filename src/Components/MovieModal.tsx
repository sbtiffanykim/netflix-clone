import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getMovieDetail, getMovieTrailer, IMovieDetail } from '../api';
import { makeImagePath } from '../utils';
import IconButton from './IconButton';
import { IoIosPlay, IoMdAdd } from 'react-icons/io';
import { FaRegThumbsDown, FaRegThumbsUp, FaStar } from 'react-icons/fa';

// used in dev mode only
const data: IMovieDetail = {
  adult: false,
  backdrop_path: '/mKOBdgaEFguADkJhfFslY7TYxIh.jpg',
  belongs_to_collection: null,
  genres: [
    {
      id: 28,
      name: 'Action',
    },
    {
      id: 878,
      name: 'Science Fiction',
    },
    {
      id: 35,
      name: 'Comedy',
    },
    {
      id: 12,
      name: 'Adventure',
    },
    {
      id: 53,
      name: 'Thriller',
    },
  ],
  homepage: 'https://borderlands.movie',
  id: 365177,
  imdb_id: 'tt4978420',
  origin_country: ['US'],
  original_language: 'en',
  original_title: 'Borderlands',
  overview:
    'Returning to her home planet, an infamous bounty hunter forms an unexpected alliance with a team of unlikely heroes. Together, they battle monsters and dangerous bandits to protect a young girl who holds the key to unimaginable power.',
  poster_path: '/865DntZzOdX6rLMd405R0nFkLmL.jpg',
  release_date: '2024-08-07',
  revenue: 30863794,
  runtime: 101,
  spoken_languages: [
    {
      english_name: 'English',
      iso_639_1: 'en',
      name: 'English',
    },
  ],
  status: 'Released',
  tagline: 'Chaos loves company.',
  title: 'Borderlands',
  video: false,
  vote_average: 5.838,
  vote_count: 521,
};

interface IModalProps {
  layoutId?: string;
}

const Modal = styled(motion.div)`
  position: fixed;
  background-color: ${(props) => props.theme.black.dark};
  width: 40vw;
  height: 80vh;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  border-radius: 10px;
  overflow: hidden;
`;

const CoverImg = styled.div<{ bgphoto: string }>`
  width: 100%;
  height: 60%;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(24, 24, 24, 0.5)),
    url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
`;

const Content = styled.div`
  padding: 0px 30px;
`;

const TopGrid = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #feca57;
`;

const Title = styled.h3`
  color: ${(props) => props.theme.white.light};
  font-size: 30px;
  font-weight: 600;
  margin: 15px 0px;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 30px;
`;

const PlayButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${(props) => props.theme.white.dark};
  border-radius: 3px;
  padding: 6px 25px;
  svg {
    margin-right: 10px;
    font-size: 20px;
  }
  span {
    font-weight: 500;
  }
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.white.dark};
    color: ${(props) => props.theme.black.dark};
    transition: 0.2s ease-in;
  }
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 10px;
`;

const Description = styled.div`
  font-size: 14px;
  line-height: 1.4;
`;

const RightInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
`;

const Info = styled.div`
  font-size: 13px;
  color: ${(props) => props.theme.white.light};
  h3 {
    color: #c8d6e5;
    display: inline;
  }
`;

export default function MovieModal({ layoutId }: IModalProps) {
  const { movieId } = useParams();
  //   const { data, isLoading } = useQuery<IMovieDetail>({
  //     queryKey: ['movie', movieId],
  //     queryFn: getMovieDetail,
  //   });

  // const { data: trailer, isLoading: isTrailerLoading } = useQuery({
  //   queryKey: ['movie_trailer', movieId],
  //   queryFn: getMovieTrailer,
  // });

  const isLoading = false; // dev purpose
  const genres = data?.genres.map((item) => item.name).join(', ');

  return (
    <>
      {!isLoading ? (
        <Modal layoutId={layoutId}>
          <CoverImg bgphoto={makeImagePath(data?.backdrop_path || data?.poster_path)} />
          <Content>
            <TopGrid>
              <Title>{data?.title}</Title>
              <Rating>
                <FaStar />
                {data?.vote_average.toFixed(2)} ({data?.vote_count})
              </Rating>
            </TopGrid>
            <ButtonContainer>
              <PlayButton>
                <IoIosPlay />
                <span>Play</span>
              </PlayButton>
              <IconButton icon={<IoMdAdd />} height={25} width={25} />
              <IconButton icon={<FaRegThumbsUp />} height={25} width={25} />
              <IconButton icon={<FaRegThumbsDown />} height={25} width={25} />
            </ButtonContainer>
            <InfoGrid>
              <Description>{data?.overview}</Description>
              <RightInfo>
                <Info>
                  <h3>Genres: </h3>
                  <span>{genres}</span>
                </Info>
                <Info>
                  <h3>Language: </h3>
                  <span>{data?.spoken_languages[0].english_name}</span>
                </Info>
                <Info>
                  <h3>Release Date: </h3>
                  <span>{data?.release_date}</span>
                </Info>
              </RightInfo>
            </InfoGrid>
          </Content>
        </Modal>
      ) : null}
    </>
  );
}
