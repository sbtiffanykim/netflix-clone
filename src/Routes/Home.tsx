import { useState } from 'react';
import { useMatch, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { FaAngleDown, FaRegThumbsDown, FaRegThumbsUp } from 'react-icons/fa';
import { IoIosPlay, IoMdAdd } from 'react-icons/io';
import { AnimatePresence, motion } from 'framer-motion';
import IconButton from '../Components/IconButton';
import { getNowPlayingMovies, IGetMoviesResult } from '../api';
import { makeImagePath } from '../utils';
import MovieModal from '../Components/MovieModal';
import { useRecoilState, useRecoilValue } from 'recoil';
import { modalState } from '../atoms';
import Overlay from '../Components/Overlay';

const data: IGetMoviesResult = {
  dates: {
    maximum: '2024-09-25',
    minimum: '2024-08-14',
  },
  page: 1,
  results: [
    {
      adult: false,
      backdrop_path: '/mKOBdgaEFguADkJhfFslY7TYxIh.jpg',
      genre_ids: [28, 878, 35, 12, 53],
      id: 365177,
      original_language: 'en',
      original_title: 'Borderlands',
      overview:
        'Returning to her home planet, an infamous bounty hunter forms an unexpected alliance with a team of unlikely heroes. Together, they battle monsters and dangerous bandits to protect a young girl who holds the key to unimaginable power.',
      popularity: 1584.1,
      poster_path: '/865DntZzOdX6rLMd405R0nFkLmL.jpg',
      release_date: '2024-08-07',
      title: 'Borderlands',
      video: false,
      vote_average: 5.83,
      vote_count: 520,
    },
    {
      adult: false,
      backdrop_path: '/cyKH7pDFlxIXluqRyNoHHEpxSDX.jpg',
      genre_ids: [80, 28, 53],
      id: 646097,
      original_language: 'en',
      original_title: 'Rebel Ridge',
      overview:
        "A former Marine confronts corruption in a small town when local law enforcement unjustly seizes the bag of cash he needs to post his cousin's bail.",
      popularity: 1312.556,
      poster_path: '/xEt2GSz9z5rSVpIHMiGdtf0czyf.jpg',
      release_date: '2024-08-27',
      title: 'Rebel Ridge',
      video: false,
      vote_average: 7.033,
      vote_count: 555,
    },
    {
      adult: false,
      backdrop_path: '/cgKZtNSETjXJPkAQ4rasV7dnyQH.jpg',
      genre_ids: [35, 14, 27],
      id: 917496,
      original_language: 'en',
      original_title: 'Beetlejuice Beetlejuice',
      overview:
        "After a family tragedy, three generations of the Deetz family return home to Winter River. Still haunted by Beetlejuice, Lydia's life is turned upside down when her teenage daughter, Astrid, accidentally opens the portal to the Afterlife.",
      popularity: 1237.297,
      poster_path: '/kKgQzkUCnQmeTPkyIwHly2t6ZFI.jpg',
      release_date: '2024-09-04',
      title: 'Beetlejuice Beetlejuice',
      video: false,
      vote_average: 7.178,
      vote_count: 552,
    },
    {
      adult: false,
      backdrop_path: '/lgkPzcOSnTvjeMnuFzozRO5HHw1.jpg',
      genre_ids: [16, 10751, 35, 28],
      id: 519182,
      original_language: 'en',
      original_title: 'Despicable Me 4',
      overview:
        'Gru and Lucy and their girls—Margo, Edith and Agnes—welcome a new member to the Gru family, Gru Jr., who is intent on tormenting his dad. Gru also faces a new nemesis in Maxime Le Mal and his femme fatale girlfriend Valentina, forcing the family to go on the run.',
      popularity: 1200.098,
      poster_path: '/wWba3TaojhK7NdycRhoQpsG0FaH.jpg',
      release_date: '2024-06-20',
      title: 'Despicable Me 4',
      video: false,
      vote_average: 7.18,
      vote_count: 1604,
    },
    {
      adult: false,
      backdrop_path: '/Asg2UUwipAdE87MxtJy7SQo08XI.jpg',
      genre_ids: [28, 14, 27],
      id: 957452,
      original_language: 'en',
      original_title: 'The Crow',
      overview:
        'Soulmates Eric and Shelly are brutally murdered when the demons of her dark past catch up with them. Given the chance to save his true love by sacrificing himself, Eric sets out to seek merciless revenge on their killers, traversing the worlds of the living and the dead to put the wrong things right.',
      popularity: 755.943,
      poster_path: '/58QT4cPJ2u2TqWZkterDq9q4yxQ.jpg',
      release_date: '2024-08-21',
      title: 'The Crow',
      video: false,
      vote_average: 5.4,
      vote_count: 231,
    },
    {
      adult: false,
      backdrop_path: '/7aPrv2HFssWcOtpig5G3HEVk3uS.jpg',
      genre_ids: [28, 12, 53],
      id: 718821,
      original_language: 'en',
      original_title: 'Twisters',
      overview:
        'As storm season intensifies, the paths of former storm chaser Kate Carter and reckless social-media superstar Tyler Owens collide when terrifying phenomena never seen before are unleashed. The pair and their competing teams find themselves squarely in the paths of multiple storm systems converging over central Oklahoma in the fight of their lives.',
      popularity: 695.093,
      poster_path: '/pjnD08FlMAIXsfOLKQbvmO0f0MD.jpg',
      release_date: '2024-07-10',
      title: 'Twisters',
      video: false,
      vote_average: 6.985,
      vote_count: 1402,
    },
    {
      adult: false,
      backdrop_path: '/sIzZQdXY21sEks9lGkGuXzqdGSA.jpg',
      genre_ids: [14, 35],
      id: 4011,
      original_language: 'en',
      original_title: 'Beetlejuice',
      overview:
        'A newly dead New England couple seeks help from a deranged demon exorcist to scare an affluent New York family out of their home.',
      popularity: 685.773,
      poster_path: '/nnl6OWkyPpuMm595hmAxNW3rZFn.jpg',
      release_date: '1988-03-30',
      title: 'Beetlejuice',
      video: false,
      vote_average: 7.378,
      vote_count: 7042,
    },
    {
      adult: false,
      backdrop_path: '/9SSEUrSqhljBMzRe4aBTh17rUaC.jpg',
      genre_ids: [27, 878, 28],
      id: 945961,
      original_language: 'en',
      original_title: 'Alien: Romulus',
      overview:
        'While scavenging the deep ends of a derelict space station, a group of young space colonizers come face to face with the most terrifying life form in the universe.',
      popularity: 616.445,
      poster_path: '/b33nnKl1GSFbao4l3fZDDqsMx0F.jpg',
      release_date: '2024-08-13',
      title: 'Alien: Romulus',
      video: false,
      vote_average: 7.089,
      vote_count: 1004,
    },
    {
      adult: false,
      backdrop_path: '/9BQqngPfwpeAfK7c2H3cwIFWIVR.jpg',
      genre_ids: [10749, 18],
      id: 1079091,
      original_language: 'en',
      original_title: 'It Ends with Us',
      overview:
        "When a woman's first love suddenly reenters her life, her relationship with a charming, but abusive neurosurgeon is upended, and she realizes she must learn to rely on her own strength to make an impossible choice for her future.",
      popularity: 613.216,
      poster_path: '/4TzwDWpLmb9bWJjlN3iBUdvgarw.jpg',
      release_date: '2024-08-07',
      title: 'It Ends with Us',
      video: false,
      vote_average: 6.732,
      vote_count: 302,
    },
    {
      adult: false,
      backdrop_path: '/9juRmk8QjcsUcbrevVu5t8VZy5G.jpg',
      genre_ids: [28, 12, 80, 53],
      id: 923667,
      original_language: 'cn',
      original_title: '九龍城寨之圍城',
      overview:
        'In 1980s Hong Kong, troubled youth Chan Lok-kwun accidentally enters the notorious Kowloon Walled City. Lok-kwun, a refugee from the mainland, struggles to survive by participating in underground fighting rings. He seeks to buy a fake ID to improve his life but is betrayed by Mr. Big, a local crime syndicate boss. In a desperate move, Lok-kwun steals drugs from Mr. Big and flees to the Walled City, where he encounters Cyclone, the local crime lord who rules the area with a mix of authority and compassion.',
      popularity: 583.104,
      poster_path: '/PywbVPeIhBFc33QXktnhMaysmL.jpg',
      release_date: '2024-04-23',
      title: 'Twilight of the Warriors: Walled In',
      video: false,
      vote_average: 6.712,
      vote_count: 139,
    },
    {
      adult: false,
      backdrop_path: '/bizhlTVjifYQUu4Xrdt7m3TYr7d.jpg',
      genre_ids: [80, 27, 53],
      id: 1226578,
      original_language: 'en',
      original_title: 'Longlegs',
      overview:
        'FBI Agent Lee Harker is assigned to an unsolved serial killer case that takes an unexpected turn, revealing evidence of the occult. Harker discovers a personal connection to the killer and must stop him before he strikes again.',
      popularity: 571.431,
      poster_path: '/5aj8vVGFwGVbQQs26ywhg4Zxk2L.jpg',
      release_date: '2024-05-31',
      title: 'Longlegs',
      video: false,
      vote_average: 6.7,
      vote_count: 828,
    },
    {
      adult: false,
      backdrop_path: '/1wP1phHo2CROOqzv7Azs0MT5esU.jpg',
      genre_ids: [16, 35, 10751, 12, 28],
      id: 748783,
      original_language: 'en',
      original_title: 'The Garfield Movie',
      overview:
        'Garfield, the world-famous, Monday-hating, lasagna-loving indoor cat, is about to have a wild outdoor adventure! After an unexpected reunion with his long-lost father – scruffy street cat Vic – Garfield and his canine friend Odie are forced from their perfectly pampered life into joining Vic in a hilarious, high-stakes heist.',
      popularity: 554.125,
      poster_path: '/p6AbOJvMQhBmffd0PIv0u8ghWeY.jpg',
      release_date: '2024-04-30',
      title: 'The Garfield Movie',
      video: false,
      vote_average: 7.118,
      vote_count: 925,
    },
    {
      adult: false,
      backdrop_path: '/tCQfubckzzcuCbsGugkpLhfjS5z.jpg',
      genre_ids: [28, 53, 80],
      id: 970347,
      original_language: 'en',
      original_title: 'The Killer',
      overview:
        'Zee is a feared contract killer known as "the Queen of the Dead," but when she refuses to murder a young blind woman, she finds herself hunted both by criminal colleagues and a determined police detective.',
      popularity: 543.581,
      poster_path: '/6PCnxKZZIVRanWb710pNpYVkCSw.jpg',
      release_date: '2024-08-22',
      title: 'The Killer',
      video: false,
      vote_average: 6.57,
      vote_count: 201,
    },
    {
      adult: false,
      backdrop_path: '/okVLmXL5y18dfN2R4ufMZEGaeCd.jpg',
      genre_ids: [28, 80],
      id: 1160018,
      original_language: 'hi',
      original_title: 'किल',
      overview:
        'When an army commando finds out his true love is engaged against her will, he boards a New Dehli-bound train in a daring quest to derail the arranged marriage. But when a gang of knife-wielding thieves begin to terrorize innocent passengers on his train, the commando takes them on himself in a death-defying kill-spree to save those around him — turning what should have been a typical commute into an adrenaline-fueled thrill ride.',
      popularity: 472.354,
      poster_path: '/m2zXTuNPkywdYLyWlVyJZW2QOJH.jpg',
      release_date: '2024-07-03',
      title: 'Kill',
      video: false,
      vote_average: 6.806,
      vote_count: 142,
    },
    {
      adult: false,
      backdrop_path: '/yNU8UF3DOmv3G9gVNAj34beclTG.jpg',
      genre_ids: [16, 878, 12, 28, 10751],
      id: 698687,
      original_language: 'en',
      original_title: 'Transformers One',
      overview:
        'The untold origin story of Optimus Prime and Megatron, better known as sworn enemies, but once were friends bonded like brothers who changed the fate of Cybertron forever.',
      popularity: 452.781,
      poster_path: '/qbkAqmmEIZfrCO8ZQAuIuVMlWoV.jpg',
      release_date: '2024-09-11',
      title: 'Transformers One',
      video: false,
      vote_average: 7.6,
      vote_count: 15,
    },
    {
      adult: false,
      backdrop_path: '/bxwKC4qAbceMgHU1xCCTBK1eYdn.jpg',
      genre_ids: [28, 53, 80],
      id: 5492,
      original_language: 'en',
      original_title: 'Gunner',
      overview:
        "While on a camping trip in order to reconnect, war veteran Colonel Lee Gunner must save his two sons from a gang of violent bikers when they're kidnapped after accidentally stumbling upon to a massive drug operation.",
      popularity: 449.764,
      poster_path: '/eEkAY5veAnwxUOOlpF62KawkFO9.jpg',
      release_date: '2024-08-16',
      title: 'Gunner',
      video: false,
      vote_average: 5.4,
      vote_count: 77,
    },
    {
      adult: false,
      backdrop_path: '/p5kpFS0P3lIwzwzHBOULQovNWyj.jpg',
      genre_ids: [53, 80, 27],
      id: 1032823,
      original_language: 'en',
      original_title: 'Trap',
      overview:
        "A father and teen daughter attend a pop concert, where they realize they're at the center of a dark and sinister event.",
      popularity: 449.164,
      poster_path: '/jwoaKYVqPgYemFpaANL941EF94R.jpg',
      release_date: '2024-07-31',
      title: 'Trap',
      video: false,
      vote_average: 6.521,
      vote_count: 1084,
    },
    {
      adult: false,
      backdrop_path: '/4ft6TR9wA6bra0RLL6G7JFDQ5t1.jpg',
      genre_ids: [28, 35],
      id: 704239,
      original_language: 'en',
      original_title: 'The Union',
      overview:
        'A New Jersey construction worker goes from regular guy to aspiring spy when his long-lost high school sweetheart recruits him for an espionage mission.',
      popularity: 419.954,
      poster_path: '/d9CTnTHip1RbVi2OQbA2LJJQAGI.jpg',
      release_date: '2024-08-15',
      title: 'The Union',
      video: false,
      vote_average: 6.261,
      vote_count: 646,
    },
    {
      adult: false,
      backdrop_path: '/n3JeGELHa9V6k9mL81ItMxWLSS6.jpg',
      genre_ids: [28, 53],
      id: 1129598,
      original_language: 'en',
      original_title: 'Prey',
      overview:
        'A young couple is compelled to leave their Christian missionary station in the Kalahari Desert after being threatened with death by an extremist militant gang. After crashing their aircraft they must battle man and beast for their lives.',
      popularity: 413.206,
      poster_path: '/aOsPclgSiOqhndI2Xp2ksz2g9n6.jpg',
      release_date: '2024-03-15',
      title: 'Prey',
      video: false,
      vote_average: 6.4,
      vote_count: 216,
    },
    {
      adult: false,
      backdrop_path: '/qkEnklEGDFy4TRVhuHFn2DI2BP6.jpg',
      genre_ids: [27, 53],
      id: 930600,
      original_language: 'en',
      original_title: 'The Deliverance',
      overview:
        'Ebony Jackson, a struggling single mother fighting her personal demons, moves her family into a new home for a fresh start. But when strange occurrences inside the home raise the suspicions of Child Protective Services and threaten to tear the family apart, Ebony soon finds herself locked in a battle for her life and the souls of her children.',
      popularity: 405.496,
      poster_path: '/og1FteMFRInoQnlZeWqEn8XpXHh.jpg',
      release_date: '2024-08-16',
      title: 'The Deliverance',
      video: false,
      vote_average: 6.29,
      vote_count: 279,
    },
  ],
  total_pages: 222,
  total_results: 4426,
};

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
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  z-index: 100;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8)),
    url(${(props) => props.bgphoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 65px;
`;

const Overview = styled.p`
  margin-top: 10px;
  font-size: 23px;
  width: 50%;
`;

const Slider = styled.div`
  position: relative;
  top: -70px;
  h1 {
    font-weight: 600;
    margin-left: 15px;
    margin-bottom: 10px;
    font-size: 20px;
  }
`;

const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
  gap: 5px;
`;

const Box = styled(motion.div)`
  background-color: white;
  height: 200px;
  background-position: center center;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
  &:hover {
    cursor: pointer;
  }
`;

const BoxImg = styled.div<{ bgphoto: string }>`
  background-image: url(${(props) => props.bgphoto});
  background-position: center center;
  background-size: cover;
  width: 100%;
  height: 100%;
`;

const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.light};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: -10;
  h4 {
    font-size: 15px;
    font-weight: 500;
    margin-top: 2px;
    margin-bottom: 15px;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 5px;
`;

const rowVariants = {
  hidden: {
    x: window.outerWidth - 25,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth + 25,
  },
};

const boxVariants = {
  initial: {
    scale: 1,
  },
  hover: {
    scale: 1.2,
    y: -100,
    transition: { delay: 0.5, type: 'tween', duration: 0.2 },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: { delay: 0.5, type: 'tween', duration: 0.2 },
  },
};

export default function Home() {
  // const { data: nowPlaying, isLoading: isNowPlayingLoading } = useQuery<IGetMoviesResult>(
  //   {
  //     queryKey: ['movies', 'nowPlaying'],
  //     queryFn: getNowPlayingMovies,
  //   }
  // );

  // console.log(data, isLoading);

  // only for testing
  const isLoading = false;

  const navigate = useNavigate();
  const moviePathMatch = useMatch('/movies/:movieId');

  const [index, setIndex] = useState(0);
  const offset = 6; // slider limit
  const [leaving, setLeaving] = useState(false);
  const increaseIndex = () => {
    const totalResults = data?.results.length || 0;
    const maxIndex = Math.floor(totalResults / offset) - 1;
    if (leaving) return;
    toggleLeaving();
    setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
  };
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const [isModalOpen, setIsModalOpen] = useRecoilState(modalState);
  const onBoxClicked = (movieId: number) => {
    navigate(`/movies/${movieId}`);
    setIsModalOpen(true);
  };

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            bgphoto={makeImagePath(
              data?.results[0].backdrop_path || data?.results[0].poster_path
            )}
            onClick={increaseIndex}
          >
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
          <Slider>
            <h1>Now Playing</h1>
            <AnimatePresence onExitComplete={toggleLeaving} initial={false}>
              <Row
                key={index}
                variants={rowVariants}
                initial='hidden'
                animate='visible'
                exit='exit'
                transition={{ type: 'tween', duration: 0.8 }}
              >
                {data?.results
                  .slice(1)
                  .slice(offset * index, offset * (index + 1))
                  .map((movie) => (
                    <Box
                      layoutId={movie.id + ''}
                      key={movie.id}
                      variants={boxVariants}
                      initial='initial'
                      whileHover='hover'
                      onClick={() => onBoxClicked(movie.id)}
                    >
                      <BoxImg
                        bgphoto={makeImagePath(
                          movie.backdrop_path || movie.poster_path,
                          'w500'
                        )}
                      />
                      <Info variants={infoVariants}>
                        <h4>{movie.title}</h4>
                        <ButtonRow>
                          <ButtonContainer>
                            <IconButton icon={<IoIosPlay />} />
                            <IconButton icon={<IoMdAdd />} />
                            <IconButton icon={<FaRegThumbsUp />} />
                            <IconButton icon={<FaRegThumbsDown />} />
                          </ButtonContainer>
                          <ButtonContainer>
                            <IconButton icon={<FaAngleDown />} />
                          </ButtonContainer>
                        </ButtonRow>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
          </Slider>
          <AnimatePresence>
            {moviePathMatch ? (
              <MovieModal layoutId={moviePathMatch.params.movieId} />
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}
