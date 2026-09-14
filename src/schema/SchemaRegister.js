import * as zod from 'zod';

export  let schema = zod.object({
  name:zod.string().nonempty('name is required').min(3 , 'min length 3').max(8, 'max length 8'),
  username:zod.string().nonempty('username is required').regex(/^[A-Z][a-z0-9]{5,10}$/, 'must start with capital letter and contains numbers'),
  email:zod.string().nonempty('email is required').email('invalid email'),
  password:zod.string().nonempty('password is required').regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
  gender:zod.string().nonempty('geneder is required'),
  dateOfBirth:zod.coerce.date('data is required').refine((dataval)=> {
    let current = new Date().getFullYear()
    let year = dataval.getFullYear()
    let age = current-year
    return age > 20
  } , 'age must be greater than 20 '),
  rePassword:zod.string().nonempty('repasssword is required')
}).refine((opj) => {
  if (opj.password === opj.rePassword){
    return true 
  }else{
    return false
  }
} , {path : ['rePassword'], message: 'password and repasword must be matched'})