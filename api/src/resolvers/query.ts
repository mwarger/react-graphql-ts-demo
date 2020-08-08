import { Context } from '../server';

export async function nowPlaying(
  _parent: any,
  _args: any,
  context: Context,
  _info: any,
) {
  return context.dataSources.movieDataSource.nowPlaying();
}

export async function popular(
  _parent: any,
  _args: any,
  context: Context,
  _info: any,
) {
  return context.dataSources.movieDataSource.popular();
}

export async function movieById(
  _parent: any,
  { id }: { id: number },
  { dataSources }: Context,
  _info: any,
) {
  return dataSources.movieDataSource.movieById(id);
}
