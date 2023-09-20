import { User } from "../../../api/users/user.entity";

export interface UserIdentity {
  id: string;
  provider: string;
  credentials: {
    username: string;
    hashedPassword: string;
  };
  user: User;
}
