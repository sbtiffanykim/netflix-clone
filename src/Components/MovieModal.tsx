import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { IoIosPlay, IoMdAdd } from 'react-icons/io';
import { FaRegThumbsDown, FaRegThumbsUp, FaStar } from 'react-icons/fa';
import ReactPlayer from 'react-player/lazy';
import { getMovieDetail, getMovieTrailer, IMovieDetail } from '../api';
import { makeImagePath } from '../utils';
import IconButton from './IconButton';
import { IoClose } from 'react-icons/io5';
import { useRecoilState } from 'recoil';
import { modalState } from '../atoms';
import Overlay from './Overlay';

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
  z-index: 1000;
`;

const CloseBtn = styled(IoClose)`
  height: 28px;
  width: 28px;
  cursor: pointer;
  position: absolute;
  right: 10px;
  top: 10px;
  color: ${(props) => props.theme.white.dark};
  transition: transform 0.2s ease;
  &:hover {
    color: ${(props) => props.theme.white.light};
    transform: scale(1.1);
  }
`;

const Media = styled.div`
  width: 100%;
  height: 60%;
  margin-top: 40px;
`;

const CoverImg = styled.div<{ bgphoto: string }>`
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

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 0.7, zIndex: 1000 },
  exit: { opacity: 0 },
};

export default function MovieModal({ layoutId }: IModalProps) {
  const { movieId } = useParams();
  const { data, isLoading } = useQuery<IMovieDetail>({
    queryKey: ['movie', movieId],
    queryFn: getMovieDetail,
  });

  const { data: trailer, isLoading: isTrailerLoading } = useQuery({
    queryKey: ['movie_trailer', movieId],
    queryFn: getMovieTrailer,
  });

  const genres = data?.genres.map((item) => item.name).join(', ');
  const navigate = useNavigate();

  const closeModal = () => {
    setIsModalOpen(false);
    navigate('/');
  };

  const [isModalOpen, setIsModalOpen] = useRecoilState(modalState);

  return (
    <>
      {!isLoading ? (
        <>
          <Overlay
            onClick={closeModal}
            variants={overlayVariants}
            initial='hidden'
            animate='visible'
            exit='exit'
          />

          <Modal layoutId={layoutId}>
            <CloseBtn onClick={closeModal} />
            <Media>
              {!isTrailerLoading && trailer ? (
                <ReactPlayer
                  url={trailer}
                  muted={true}
                  playing={true}
                  controls={true}
                  width={'100%'}
                  height={'100%'}
                />
              ) : (
                <CoverImg
                  bgphoto={makeImagePath(data?.backdrop_path || data?.poster_path)}
                />
              )}
            </Media>
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
        </>
      ) : null}
    </>
  );
}
