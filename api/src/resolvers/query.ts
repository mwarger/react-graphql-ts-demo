import _ from 'lodash';
import { Context } from '../server';

export async function nowPlaying(
  _parent: any,
  _args: any,
  context: Context,
  _info: any,
) {
  const movies = await context.dataSources.movieDataSource.nowPlaying();
  return movies;
}

export async function popular(
  _parent: any,
  _args: any,
  context: Context,
  _info: any,
) {
  const movies = await context.dataSources.movieDataSource.popular();
  return movies;
}

export async function movieById(
  _parent: any,
  { id }: { id: number },
  { dataSources }: Context,
  _info: any,
) {
  const movie = await dataSources.movieDataSource.movieById(id);
  return movie;
}
