export function favorites(user: { id: any }, args: any, { dataSources }: any) {
  const userFavorites =
    dataSources.userDataSource.getUserById(user.id).favorites || [];
  const favoriteSessions = [];
  for (const fav of userFavorites) {
    favoriteSessions.push(dataSources.sessionDataSource.getSessionById(fav));
  }

  return favoriteSessions;
}
