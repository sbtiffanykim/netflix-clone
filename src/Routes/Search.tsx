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
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  width: 100%;
  box-sizing: border-box;
`;

const Card = styled.div<{ bgphoto: string }>`
  height: 180px;
  width: 280px;
  background-image: url(${(props) => props.bgphoto});
  background-position: center center;
  background-size: cover;
  cursor: pointer;
  transition: transform 0.2s ease;
  &:hover {
    transform: scale(1.1);
  }
`;

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
            <Card
              key={item.id}
              bgphoto={makeImagePath(item.backdrop_path || item.poster_path, 'w500')}
            >
              {item.title}
            </Card>
          ))}
        </List>
      ) : (
        'no result'
      )}
    </Wrapper>
  );
}
