export function cast(movie: { id: any }, args: any, { dataSources }: any) {
  const credits = dataSources.movieDataSource.getCredits(movie.id).cast || [];
  return credits;
}
