export function favorites(
  user: { id: string },
  args: any,
  { dataSources }: any,
) {
  const userFavorites =
    dataSources.userDataSource.getUserById(user.id).favorites || [];
  const favoriteSessions = [];
  for (const fav of userFavorites) {
    favoriteSessions.push(dataSources.movieDataSource.movieById(fav));
  }

  return favoriteSessions;
}
