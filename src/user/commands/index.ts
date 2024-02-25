import { CreateUserCommand } from './create-user.command';
import { RemoveUserCommand } from './remove-user.commands';

export * from './create-user.command';
export * from './remove-user.commands'

export const USERS_COMMANDS = [CreateUserCommand, RemoveUserCommand];
