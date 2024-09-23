import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { IMovieOverview, searchMulti } from '../api';
import { makeImagePath } from '../utils';

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

  const { data: multi, isLoading: isMultiLoading } = useQuery<ISearchResult>({
    queryKey: ['multi', keyword],
    queryFn: searchMulti,
  });

  return (
    <Wrapper>
      {isMultiLoading ? (
        <Loader>Loading...</Loader>
      ) : multi && multi.results.length > 1 ? (
        <List>
          {multi.results.map((item) => (
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
      ) : (
        'no result'
      )}
    </Wrapper>
  );
}
