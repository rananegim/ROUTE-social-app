import * as zod from 'zod';
import { schema } from './SchemaRegister';

export  let schemaLogin = zod.object({
  email:zod.string().nonempty('email is required').email('invalid email'),
  password:zod.string().nonempty('password is required').regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
})
