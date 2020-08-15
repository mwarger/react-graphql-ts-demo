import { Context } from '../server';

export async function cast(
  movie: { id: number },
  _args: any,
  { dataSources }: Context,
) {
  const credits = await dataSources.movieDataSource.getCredits(movie.id);
  return credits.cast || [];
}
