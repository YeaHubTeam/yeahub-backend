import { Injectable } from '@nestjs/common';
import { GetProfilesQuery } from './queries/get-profiles.queries';

@Injectable()
export class ProfileService {
  constructor(private getProfilesQuery: GetProfilesQuery) {}

  findAll() {
    return this.getProfilesQuery.execute();
  }
}
