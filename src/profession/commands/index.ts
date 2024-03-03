import { CreateProfessionCommand } from './create-profession.command';
import { DeleteProfessionCommand } from './delete-profession.command';
import { GetProfessionByIdCommand } from './get-profession-by-id.command';
import { GetProfessionByTitleCommand } from './get-profession-by-title.command';
import { UpdateProfessionCommand } from './update-profession.command';

export * from './create-profession.command';

export const PROFESSIONS_COMMANDS = [
  GetProfessionByIdCommand,
  GetProfessionByTitleCommand,
  CreateProfessionCommand,
  UpdateProfessionCommand,
  DeleteProfessionCommand,
];
