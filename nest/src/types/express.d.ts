import { User } from 'src/services/user.schema';
import { AuthUser } from './auth.user';

export interface RequestWithUser extends Request {
  user: AuthUser;
}
