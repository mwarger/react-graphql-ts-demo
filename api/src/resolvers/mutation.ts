import * as authUtils from "../utils/auth";

export const signUp = async (
  parent: any,
  { credentials }: any,
  { dataSources, res }: any,
  info: any
) => {
  const { email, password } = credentials;
  const userCredentials = { email: email.toLowerCase(), password };

  const existingUser = dataSources.userDataSource.getUserByEmail(
    userCredentials.email
  );

  if (existingUser) {
    throw new Error("A user account with that email already exists.");
  }

  const hash = authUtils.hashPassword(userCredentials.password);

  const dbUser = dataSources.userDataSource.createUser({
    email: userCredentials.email,
    hash,
  });

  const token = authUtils.createToken(dbUser);

  res.cookie("token", token, {
    httpOnly: true,
  });

  return {
    user: {
      id: dbUser.id,
      email: dbUser.email,
    },
  };
};

export const signIn = async (
  parent: any,
  { credentials }: any,
  { dataSources, res }: any,
  info: any
) => {
  const { email, password } = credentials;
  const userCredentials = { email: email.toLowerCase(), password };

  const existingUser = dataSources.userDataSource.getUserByEmail(
    userCredentials.email
  );

  if (!existingUser) {
    throw new Error("Incorrect email address or password.");
  }

  const isValidPassword = authUtils.verifyPassword(password, existingUser.hash);

  if (!isValidPassword) {
    throw new Error("Incorrect email address or password.");
  }

  const token = authUtils.createToken(existingUser);

  res.cookie("token", token, {
    httpOnly: true,
  });

  return {
    user: {
      id: existingUser.id,
      email: existingUser.email,
    },
  };
};

export const userInfo = async (
  parent: any,
  args: any,
  { dataSources, user }: any,
  info: any
) => {
  if (user) {
    return {
      user: { id: user.sub, email: user.email },
    };
  }

  return {
    user: undefined,
  };
};

export const signOut = async (
  parent: any,
  args: any,
  { dataSources, res }: any,
  info: any
) => {
  res.clearCookie("token");
  return {
    user: undefined,
  };
};

export const toggleFavoriteMovie = async (
  parent: any,
  args: { sessionId: any },
  context: {
    user: string;
    dataSources: {
      userDataSource: {
        toggleFavoriteSession: (arg0: any, arg1: any) => any;
      };
    };
  },
  info: any
) => {
  if (context.user) {
    const user = await context.dataSources.userDataSource.toggleFavoriteSession(
      args.sessionId,
      context.user.sub
    );
    return user;
  }
  return undefined;
};
