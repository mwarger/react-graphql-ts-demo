import _ from "lodash";

export async function users(
  parent: any,
  args: any,
  context: { dataSources: { userDataSource: { getUsers: () => any } } },
  info: any
) {
  const users = await context.dataSources.userDataSource.getUsers();
  return users;
}
export async function userById(
  parent: any,
  { id }: any,
  { dataSources }: any,
  info: any
) {
  const user = await dataSources.userDataSource.getUserById(id);
  return user;
}
export async function me(
  parent: any,
  { id }: any,
  { dataSources, user }: any,
  info: any
) {
  if (user) {
    return dataSources.userDataSource.getUserById(user.sub);
  }
  return undefined;
}
