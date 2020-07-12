import { RESTDataSource } from "apollo-datasource-rest";

class MovieDataSource extends RESTDataSource {
  constructor() {
    super();
  }

  initialize(config: any) {}

  async getSpeakerById(id: any) {}

  async getSpeakers(args: any) {}
}

export default MovieDataSource;
