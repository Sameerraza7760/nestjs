import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/user/user.type';

export const ROLES_KEY = 'roles';

/**
 * Roles decorator
 * @param roles - array of roles allowed to access the route
 * Usage: @Roles('ADMIN', 'USER')
 */
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
