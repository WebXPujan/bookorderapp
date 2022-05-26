import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Head from 'next/head';
import * as Yup from 'yup';

import {Layout} from '../../src/components/account/Layout';
import {userService,alertService} from '../../services';
import { FormControl, FormHelperText,TextField,OutlinedInput,InputLabel,Button  } from '@mui/material';
import { useEffect } from 'react';


export default Login;

function Login() {
    const router = useRouter();
     useEffect(()=>{

        // redirect to home if already logged in
        if (userService.userValue) {
            router.push('/account');
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    
     },[])
    // form validation rules 
    const validationSchema = Yup.object().shape({
        phone: Yup.string().required('Phone is required'),
        password: Yup.string().required('Password is required')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    function onSubmit({ phone, password }) {
      //console.log('hey');
     // console.log({phone,password})
        return userService.login(phone, password)
            .then((user) => {
                // get return url from query parameters or default to '/'
                const returnUrl = router.query.returnUrl || '/account';
                router.push(returnUrl);
               //return user
               //console.log(user)
            })
            .catch(alertService.error);
    }
  return(
    <Layout>
      <Head>
        <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
      </Head>
    <form onSubmit={handleSubmit(onSubmit)}>
    <FormControl fullWidth sx={{m:1,width: '50ch'}}>
      
      <TextField label="phone" color="primary" {...register('phone')} />
      <FormHelperText 
      sx={{ m: 1, width: '50ch' }}id="my-helper-text">{errors.phone?.message}</FormHelperText>

    </FormControl>
    <FormControl fullWidth sx={{m:1,width: '50ch'}}>
      
    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type='password'
            label="Password"
            {...register('password')}
          />
      <FormHelperText 
      sx={{ m: 1, width: '50ch' }}id="my-helper-text">{errors.password?.message}</FormHelperText>

    </FormControl>
    <br/>
    &nbsp;&nbsp;<Button variant="contained" type='submit' onClick={handleSubmit(onSubmit)}>Submit</Button>
    </form>
    </Layout>
  );
}
