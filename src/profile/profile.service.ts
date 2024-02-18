import { Injectable } from '@nestjs/common';
import { ProfileEntity } from 'src/index.entities';
import { GetAllProfilesQuery } from './queries/get-profiles.queries';

@Injectable()
export class ProfileService {
  constructor(private getAllProfilesQuery: GetAllProfilesQuery) {}

  findAll(): Promise<ProfileEntity[]> {
    return this.getAllProfilesQuery.execute();
  }
}
