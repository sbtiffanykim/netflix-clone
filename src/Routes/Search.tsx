import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { IMovieOverview, searchMulti } from '../api';
import { makeImagePath } from '../utils';

const results = [
  {
    backdrop_path: '/3iA6dwr7OclU7gBGbBsiHMMqEfm.jpg',
    id: 72339,
    name: 'HAPPY!',
    original_name: 'HAPPY!',
    overview:
      "Corrupt ex-cop turned hitman Nick Sax's life is changed forever by a relentlessly positive, imaginary blue winged horse named Happy.",
    poster_path: '/t17TmixmWhJeIC4ytLfis6frLYf.jpg',
    media_type: 'tv',
    adult: false,
    original_language: 'en',
    genre_ids: [10765, 35, 10759],
    popularity: 39.251,
    first_air_date: '2017-12-06',
    vote_average: 7.429,
    vote_count: 402,
    origin_country: ['US'],
  },
  {
    backdrop_path: null,
    id: 17464,
    name: 'Happy',
    original_name: 'Happy',
    overview:
      'Happy is an American sitcom that aired on NBC. The series stars Ronnie Burns, the adopted son of George Burns and Gracie Allen, which aired from June 8 to September 28, 1960.',
    poster_path: '/5xYUvPAp6in0KFgiWwHd6TMkU5p.jpg',
    media_type: 'tv',
    adult: false,
    original_language: 'en',
    genre_ids: [35],
    popularity: 2.27,
    first_air_date: '1960-06-08',
    vote_average: 5.5,
    vote_count: 2,
    origin_country: ['US'],
  },
  {
    backdrop_path: null,
    id: 86577,
    title: 'Happy',
    original_title: 'Happy',
    overview:
      'Happy is a 2011 feature documentary film directed, written, and co-produced by Roko Belic. It explores human happiness through interviews with people from all walks of life in 14 different countries, weaving in the newest findings of positive psychology. Director Roko Belic was originally inspired to create the film after producer/director Tom Shadyac (Liar, Liar, Patch Adams, Bruce Almighty) showed him an article in the New York Times entitled "A New Measure of Well Being From a Happy Little Kingdom". The article ranks the United States as the 23rd happiest country in the world. Shadyac then suggested that Belic make a documentary about happiness. Belic spent several years interviewing over 20 people, ranging from leading happiness researchers to a rickshaw driver in Kolkatta, a family living in a "co-housing community" in Denmark, a woman who was run over by a truck, a Cajun fisherman, and more.',
    poster_path: '/wAz3VHk0nyeottwGc3lOFHi3Hky.jpg',
    media_type: 'movie',
    adult: false,
    original_language: 'en',
    genre_ids: [99],
    popularity: 4.196,
    release_date: '2012-02-11',
    video: false,
    vote_average: 7.1,
    vote_count: 60,
  },
  {
    backdrop_path: null,
    id: 155256,
    name: 'Happy Toon',
    original_name: '开心超人联盟',
    overview: '',
    poster_path: '/wqOYz9kpRbznmYPdJFSwjZ4HCT9.jpg',
    media_type: 'tv',
    adult: false,
    original_language: 'zh',
    genre_ids: [16, 10762, 35, 10765, 10759],
    popularity: 244.998,
    first_air_date: '2010-07-02',
    vote_average: 7.8,
    vote_count: 5,
    origin_country: ['CN'],
  },
  {
    backdrop_path: '/6IHkt9SB2tXfkKYBDFbQFLx6H0A.jpg',
    id: 121720,
    name: 'Barbapapa: One Big Happy Family!-باربا بابا',
    original_name: 'Barbapapa en famille- باربا بابا',
    overview:
      'The daily life of the extraordinary blob-shaped Barbapapa family, who can morph into other forms but retain their original colors. The Barbapapa family consists of parents Barbapapa and Barbamama and their seven children; the intellectual Barbalib, the coquette Barbabelle, the powerful Barbabravo, inventor Barbabright, animal lover Barbazoo, artist Barbabeau, and musician Barbalala, along with their pet dog, Lolita.',
    poster_path: '/kCfUwhv6biJ8lnRAVw6TZswZsj2.jpg',
    media_type: 'tv',
    adult: false,
    original_language: 'fr',
    genre_ids: [10762, 16],
    popularity: 135.463,
    first_air_date: '2020-03-01',
    vote_average: 0,
    vote_count: 0,
    origin_country: ['FR'],
  },
  {
    backdrop_path: '/dMgM5q3Yn8DADNfWQue3tu2ljDH.jpg',
    id: 45886,
    name: 'Happy Together',
    original_name: 'Счастливы вместе',
    overview:
      'The ordinary life of an ordinary family from the province: a couple, 2 children, a dog and neighbors. Dasha is a housewife who loves to watch TV shows and go shopping. Her husband, Gena, is a shoe store manager, likes to hang around in the garage and watch football with friends. Their daughter Sveta is a student of high school, changes the guys every week. And their son Roma is playing computer thew whole day and intrigues sister. Bukins quarrel at least once a day - so they have fun. They have been together for 16 years and still love each other. This is the happiest family in the world.',
    poster_path: '/1scrmfP33m3fDygD3Q0dgCGoOcP.jpg',
    media_type: 'tv',
    adult: false,
    original_language: 'ru',
    genre_ids: [35, 18, 10751],
    popularity: 60.422,
    first_air_date: '2006-03-08',
    vote_average: 5.6,
    vote_count: 36,
    origin_country: ['RU'],
  },
  {
    backdrop_path: '/lsD2K6y2FckTILQ5eQojxU90kku.jpg',
    id: 34561,
    name: 'Show Me the Happy',
    original_name: '依家有喜',
    overview: 'Show Me the Happy is an TVB modern sitcom series.',
    poster_path: '/cq18whxaCp0L4tTojoIMDRdDZbs.jpg',
    media_type: 'tv',
    adult: false,
    original_language: 'cn',
    genre_ids: [18, 35],
    popularity: 31.448,
    first_air_date: '2010-11-29',
    vote_average: 0,
    vote_count: 0,
    origin_country: ['HK'],
  },
  {
    backdrop_path: '/wYb0kxlMIou61DPuFC0CO4qvnCY.jpg',
    id: 122648,
    name: 'Happy End',
    original_name: 'Happy End',
    overview:
      'The series depicts the journey of a young couple who have decided to turn their relationship into a sexual attraction for the whole world through the webcam.',
    poster_path: '/8q1fKQ5Ur039ouEbOMVJyP2T9SV.jpg',
    media_type: 'tv',
    adult: false,
    original_language: 'ru',
    genre_ids: [18, 35],
    popularity: 20.973,
    first_air_date: '2021-04-01',
    vote_average: 6.6,
    vote_count: 26,
    origin_country: ['RU'],
  },
  {
    backdrop_path: '/vXO3m7GNvUhXQwNmqRD8aOGLifh.jpg',
    id: 32829,
    name: 'Happy Endings',
    original_name: 'Happy Endings',
    overview:
      'A fresh and funny take on modern friendship and what one urban family will do to stay friends after the perfect couple who brought them all together break up on their wedding day. The failed wedding forces them all to question their life choices. Then there are Alex and Dave themselves, who strike a truce and must learn to live with the changes their breakup has brought.',
    poster_path: '/dhFsHOTZ832RgXuEfpwpztP9jL9.jpg',
    media_type: 'tv',
    adult: false,
    original_language: 'en',
    genre_ids: [35, 18],
    popularity: 32.675,
    first_air_date: '2011-04-13',
    vote_average: 7.029,
    vote_count: 174,
    origin_country: ['US'],
  },
  {
    backdrop_path: '/pHynfa49CXK97AOLZqSmbvVwq6V.jpg',
    id: 109708,
    name: 'Happy Harmony',
    original_name: '餐餐有宋家',
    overview: '',
    poster_path: '/AjZHb7X1ddSCttoBJteT2eabcBu.jpg',
    media_type: 'tv',
    adult: false,
    original_language: 'cn',
    genre_ids: [],
    popularity: 48.574,
    first_air_date: '1994-05-05',
    vote_average: 0,
    vote_count: 0,
    origin_country: ['HK'],
  },
  {
    id: 1874322,
    name: 'Happy',
    original_name: 'Happy',
    media_type: 'person',
    adult: false,
    popularity: 0.001,
    gender: 2,
    known_for_department: 'Acting',
    profile_path: null,
    known_for: [
      {
        backdrop_path: null,
        id: 471982,
        title: 'Godot in San Quentin',
        original_title: 'Godot in San Quentin',
        overview:
          'A documentary made at the set up of a theater production, of Samuel Beckett\'s "Waiting for Godot", directed by Jan Jönson, played by prisoners, at San Quentin State Prison in California.The play is about two men who meet on a lonely country road, waiting for someone called Godot to confirm their lives and make life easier for them to live. Towards the end Godot announces that he will not come tonight, but maybe tomorrow. Producer and director John Reilly and a crew spent four weeks at the maximum-security facility; rehearsal and performance sequences are inter-cut with footage of daily prison life and discussions with the principal characters.',
        poster_path: '/rLNaTVnc1ViBFUYtmrNWv8DeguS.jpg',
        media_type: 'movie',
        adult: false,
        original_language: 'en',
        genre_ids: [99],
        popularity: 1.27,
        release_date: '1988-10-09',
        video: false,
        vote_average: 0,
        vote_count: 0,
      },
    ],
  },
  {
    backdrop_path: '/5lrYzRRxMrV3XYkZ64ghitkwSt0.jpg',
    id: 5709,
    name: 'Happy Together',
    original_name: '해피투게더',
    overview: 'Happy Together is a Korean entertainment talk show.',
    poster_path: '/uQkcnKuei98IoFwk91aGudiLRQ7.jpg',
    media_type: 'tv',
    adult: false,
    original_language: 'ko',
    genre_ids: [10764, 10767],
    popularity: 40.679,
    first_air_date: '2001-11-08',
    vote_average: 8,
    vote_count: 1,
    origin_country: ['KR'],
  },
  {
    backdrop_path: '/2FiRbfbmXN2DSHAcuHRtv9QJwnD.jpg',
    id: 1126,
    name: 'Happy Tree Friends',
    original_name: 'Happy Tree Friends',
    overview:
      'This action and adventure comedy is drawn in simple appearance and combines cute forest animals with extreme graphic violence. Each episode revolves around the characters enduring accidental events of bloodshed, pain, dismemberment and/or death.',
    poster_path: '/2rYqJg1OzaDlc5kiBK4IdgrELMf.jpg',
    media_type: 'tv',
    adult: false,
    original_language: 'en',
    genre_ids: [16, 35, 10765],
    popularity: 438.457,
    first_air_date: '1999-12-24',
    vote_average: 7.798,
    vote_count: 591,
    origin_country: ['US'],
  },
  {
    backdrop_path: '/4W89PZc4rvUGE34sHRqpeU2ylJM.jpg',
    id: 414280,
    title: 'Happy',
    original_title: 'Happy',
    overview:
      'Florent, 23, is an upper class Parisian who dreams of going back to America, where he attended college. One summer he meets Alessia, an American girl, lost in the streets of Paris. Together and with random encounters while on a journey from Paris to Normandy, they explore their passions, which draws them closer as well as brings up their clashing differences. As they face a crucial crossroad in their lives, they will uncover new sides of themselves, struggling to determine who they are personally, professionally and sexually while to break free from their upbringings.​',
    poster_path: '/lKb2I4cnPb7Ugp3baCNNKzwgu4N.jpg',
    media_type: 'movie',
    adult: false,
    original_language: 'en',
    genre_ids: [35, 18, 10749],
    popularity: 2.74,
    release_date: '2015-08-23',
    video: false,
    vote_average: 4.7,
    vote_count: 13,
  },
  {
    backdrop_path: '/rRu2yhxhPxywgWADU19ZeDu0pzK.jpg',
    id: 196944,
    name: 'My Happy Marriage',
    original_name: 'わたしの幸せな結婚',
    overview:
      "Miyo's abusive family deems her worthless – but together with her powerful husband-to-be, her true self and hidden powers slowly begin to shine.",
    poster_path: '/5RZIBqSYHhpQF6s8Dgw2aXlA4ZS.jpg',
    media_type: 'tv',
    adult: false,
    original_language: 'ja',
    genre_ids: [16, 10765],
    popularity: 75.544,
    first_air_date: '2023-07-05',
    vote_average: 8.388,
    vote_count: 129,
    origin_country: ['JP'],
  },
  {
    backdrop_path: '/nSHHwWhQSKpd4s9NzET4Rbgxm2K.jpg',
    id: 52891,
    name: 'YuruYuri: Happy Go Lily',
    original_name: 'ゆるゆり',
    overview:
      'On her first day attending the all-girls Nanamori Middle School in Takaoka, Toyama Akaza Akari oversleeps, to be awakened by her one-year-senior childhood friends: the level-headed Funami Yui and the often self-centered Toshinou Kyouko. Planning on exciting club activities at school, Akari joins the club her older friends have set up. But as it turns out Kyouko and Yui simply took over the former room of the now defunct tea ceremony club for their own Amusement Club. In regard to what the club does, Kyouko explains: "We just hang out and do whatever we want!" This is not exactly what the helpful and energetic Akari had hoped for. Surprisingly a few days later Yoshikawa Chinatsu joins the club even though she mistook it for the former tea ceremony club.\n\nAnd so the four fun-loving girls could enjoy spending their spare time at the club were it not for the student council, in person of vice president Sugiura Ayano, who does her very best to shut down this unauthorized club.',
    poster_path: '/548Bpo2J1cYi4XpomP7fgRtMaWw.jpg',
    media_type: 'tv',
    adult: false,
    original_language: 'ja',
    genre_ids: [16, 35],
    popularity: 45.726,
    first_air_date: '2011-07-05',
    vote_average: 7.8,
    vote_count: 119,
    origin_country: ['JP'],
  },
  {
    backdrop_path: '/6eSq2hwRgNxK4XQeKRlIPWNp2O4.jpg',
    id: 12427,
    name: 'Happy Lesson',
    original_name: 'HAPPY☆LESSON',
    overview:
      "A 15-year-old Hitotose Chitose moves out of the orphanage back to his vacant parents' house and finds himself very alone and unhappy. But when five of his female high school teachers decide to move in with him to become his new mamas, he learns that the chaos of their constant attention and concern change his life for the better, if only to teach him about the very special meaning of being part of a family and enjoying a quiet moment.\n\nEach of his new mothers has something special to share with him; an artistic cosplay princess, a nurturing supportive homeroom mother, a rowdy athletic sports fanatic, a priestess (sword miko) high school nurse mother, and a quiet secretive (possibly mad) science teacher/mother. These five adoptive mothers accept not only Chi-kun, but also his two sisters...",
    poster_path: '/6SZojMO78M3nBTaeiIyh3BShPBe.jpg',
    media_type: 'tv',
    adult: false,
    original_language: 'ja',
    genre_ids: [16, 18, 35],
    popularity: 10.374,
    first_air_date: '2002-04-01',
    vote_average: 4.75,
    vote_count: 4,
    origin_country: ['JP'],
  },
  {
    backdrop_path: null,
    id: 768712,
    title: 'Happy',
    original_title: 'Happy',
    overview: '',
    poster_path: null,
    media_type: 'movie',
    adult: false,
    original_language: 'en',
    genre_ids: [],
    popularity: 0.281,
    release_date: '2016-12-31',
    video: false,
    vote_average: 3,
    vote_count: 1,
  },
  {
    backdrop_path: null,
    id: 425918,
    title: 'Happy',
    original_title: 'Happy',
    overview: 'An animated poem about the fleeting nature of happiness.',
    poster_path: null,
    media_type: 'movie',
    adult: false,
    original_language: 'en',
    genre_ids: [16],
    popularity: 0.624,
    release_date: '2016-11-13',
    video: true,
    vote_average: 0,
    vote_count: 0,
  },
  {
    backdrop_path: null,
    id: 216881,
    title: 'Happy',
    original_title: 'Happy',
    overview:
      'A former child show host misses the good old days. He and his sidekick from the show are doing a gig when the place gets robbed and the sidekick murdered. The host is the only one who saw the robber well so the robber goes after him.',
    poster_path: '/3F3So0MrucjKdUFzwBA984bKisc.jpg',
    media_type: 'movie',
    adult: false,
    original_language: 'en',
    genre_ids: [80, 18, 9648, 10770],
    popularity: 2.166,
    release_date: '1983-10-26',
    video: false,
    vote_average: 6.5,
    vote_count: 1,
  },
];

const Wrapper = styled.div`
  min-height: 100vh;
  width: calc(100% -6vw);
  margin: 20vh 3vw 0 3vw;
`;

const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const List = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  width: 100%;
  box-sizing: border-box;
`;

const Card = styled.div`
  height: auto;
  width: 300px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  padding-bottom: 35px;
  transition: transform 0.2s ease;
  &:hover {
    transform: scale(1.1);
  }
`;

const Image = styled.div<{ bgphoto: string }>`
  height: 180px;
  width: 100%;
  background-image: url(${(props) => props.bgphoto});
  background-position: center center;
  background-size: cover;
`;

const Info = styled.div`
  background-color: ${(props) => props.theme.black.light};
  padding: 2px 7px;
  height: 40px;
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
`;

const MediaType = styled.span`
  background-color: #0984e3;
  color: ${(props) => props.theme.white.light};
  padding: 3px 7px;
  border-radius: 3px;
  margin-right: 10px;
  font-size: 11px;
`;

const Title = styled.span``;

interface ISearchResult {
  page: number;
  results: IMovieOverview[];
  total_pages: number;
  total_results: number;
}

export default function Search() {
  const [params, _] = useSearchParams();
  const keyword = params.get('keyword');

  // const { data: multi, isLoading: isMultiLoading } = useQuery<ISearchResult>({
  //   queryKey: ['multi', keyword],
  //   queryFn: searchMulti,
  // });

  // return (
  //   <Wrapper>
  //     {isMultiLoading ? (
  //       <Loader>Loading...</Loader>
  //     ) : multi && multi.results.length > 1 ? (
  //       <List>
  //         {multi.results.map((item) => (
  //           <Card key={item.id}>
  //             <Image
  //               bgphoto={makeImagePath(item.backdrop_path || item.poster_path, 'w500')}
  //             />
  //             <Info>
  //               <MediaType>{item.media_type.toUpperCase()}</MediaType>
  //               <Title>{item.title || item.name}</Title>
  //             </Info>
  //           </Card>
  //         ))}
  //       </List>
  //     ) : (
  //       'no result'
  //     )}
  //   </Wrapper>
  // );

  return (
    <Wrapper>
      <List>
        {results.map((item) => (
          <Card key={item.id}>
            <Image
              bgphoto={makeImagePath(item.backdrop_path || item.poster_path, 'w500')}
            />
            <Info>
              <MediaType>{item.media_type.toUpperCase()}</MediaType>
              <Title>{item.title || item.name}</Title>
            </Info>
          </Card>
        ))}
      </List>
    </Wrapper>
  );
}
