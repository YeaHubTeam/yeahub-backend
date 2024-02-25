import { Injectable } from '@nestjs/common';
import { GetAllProfilesQuery } from './queries/get-profiles.queries';

@Injectable()
export class ProfileService {
  constructor(private getAllProfilesQuery: GetAllProfilesQuery) {}

  findAll() {
    return this.getAllProfilesQuery.execute();
  }
}
