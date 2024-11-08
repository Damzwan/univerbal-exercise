import { atom } from 'jotai';
import { findMoviesMatchingQuery } from '@/infrastructure/repositories/movie';
import { findTvSeriesMatchingQuery } from '@/infrastructure/repositories/tv-series';

export const inputValue$ = atom<string | undefined>();
export const typeFilter$ = atom<string[]>(['show', 'movie']);

export const suggestions$ = atom(async (get, { signal }) => {
  const title = get(inputValue$);
  const typeFilter = get(typeFilter$)
  if (!title) return [];
  const result: any[] = []; // TODO typing

  console.log(typeFilter)
  if (typeFilter.includes('movie')) {
    const movies = await findMoviesMatchingQuery(signal, { title });
    result.push(...movies);
  }

  if (typeFilter.includes('show')){
    const tvSeries = await findTvSeriesMatchingQuery({ title });
    result.push(...tvSeries);
  }


  console.log(result)
  return result
    .filter((it) => it.title.includes(title));
});
