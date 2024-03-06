import { CreateProfessionCommand } from './create-profession.command';
import { DeleteProfessionCommand } from './delete-profession.command';
import { GetProfessionByIdQuery } from '../queries/get-profession-by-id.query';
import { GetProfessionByTitleQuery } from '../queries/get-profession-by-title.query';
import { UpdateProfessionCommand } from './update-profession.command';

export * from './create-profession.command';

export const PROFESSIONS_COMMANDS = [
  GetProfessionByIdQuery,
  GetProfessionByTitleQuery,
  CreateProfessionCommand,
  UpdateProfessionCommand,
  DeleteProfessionCommand,
];
