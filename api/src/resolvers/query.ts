import _ from 'lodash';

export async function nowPlaying(
  parent: any,
  args: any,
  context: { dataSources: { movieDataSource: { nowPlaying: () => any } } },
  info: any,
) {
  const movies = await context.dataSources.movieDataSource.nowPlaying();
  return movies;
}

export async function popular(
  parent: any,
  args: any,
  context: { dataSources: { movieDataSource: { popular: () => any } } },
  info: any,
) {
  const movies = await context.dataSources.movieDataSource.popular();
  return movies;
}

export async function movieById(
  parent: any,
  { id }: any,
  { dataSources }: any,
  info: any,
) {
  const movie = await dataSources.movieDataSource.movieById(id);
  return movie;
}
