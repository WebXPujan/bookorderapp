import { DataGrid } from "@mui/x-data-grid"
import { useEffect,useState } from "react"
import { alertService, userService } from "../../services"
import { Layout } from "../../src/components/account/Layout"
import { Link } from "../../src/components/Link"
import { Button,Box,Typography,Modal,FormControl, FormHelperText,TextField,InputLabel,OutlinedInput, Alert, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material"
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60vw',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

export const Users = () => {
  const [rows,setRow] = useState([])
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [err,setErr] = useState(false);

  const router = useRouter();
   
    // form validation rules 
    const validationSchema = Yup.object().shape({
        phone: Yup.string().required('Phone is required'),
        password: Yup.string().required('Password is required'),
        name: Yup.string().required('Name is required'),
        address: Yup.string().required('Address is required'),
        passwordConfirmation: Yup.string().oneOf([Yup.ref('password'), null],'Password mis-matched') ,
        role: Yup.number().default(3)
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    function onSubmit(usr) {
      console.log(usr);
     // console.log(usr);
     // console.log({phone,password,name,address})
        return userService.register(usr)
            .then((user) => {
                // get return url from query parameters or default to '/'
                if(user.message) {
                    setErr(user.message)
                }else{
                  const returnUrl = router.query.returnUrl || '/account/users';
                  router.push(returnUrl);
                }
                
               //return user
               //console.log(user)
            })
            .catch(alertService.error);
    }
  //const [err,setErr] = useState(200)
  const columns = [
    {field: 'id', headerName: 'ID', width:50},
    {field: 'name', headerName: 'Full Name', width: 250},
    {field: 'phone', headerName: 'Phone Number', width: 150},
    {field: 'address', headerName: 'Address', width: 300},
    {field: 'link', headerName: 'Order Form Link', width: 350, valueGetter: (params) => `https://bookorderapp.vercel.app/?ref_id=${params.row.id}`, editable:true }
  ]
  useEffect(()=>{
    getUsers()
  },[])
  function getUsers(){
    userService.getAll().then(res=>{
     
    //  if(!Array.isArray(res)) 
    //   setErr(res)
     let u = []
     res.map((r,x) => {
       u.push({
         id: r._id,
         name: r.name,
         phone: r.phone,
         address: r.address
       })
    
     
   })
   //set rows to state
   setRow(u)
 
  }).catch(alertService.error)
}

  const convertArrayToObject = (array, key) => {
    const initialValue = {};
    return array.reduce((obj, item) => {
      return {
        ...obj,
        [item[key]]: item,
      };
    }, initialValue);
  };

  return(
    <>
    
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create User
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
           Please fill the form below to create users.
          </Typography>
          {
            err && (
              <Alert severity="error" color="error">
                {err}
              </Alert>
            ) 
          }
          <div className="formCreate">
            <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl fullWidth sx={{m:1,width: '50ch'}}>
        
              <TextField label="phone" color="primary" {...register('phone')} />
              <FormHelperText 
              sx={{ m: 1, width: '50ch' }} error={errors.phone?.message ? true : false}>{errors.phone?.message ? errors.phone?.message : `Phone number is required`}</FormHelperText>

            </FormControl>
            <FormControl fullWidth sx={{m:1,width: '50ch'}}>
        
              <TextField label="Name" color="primary" {...register('name')}/>
              <FormHelperText 
              sx={{ m: 1, width: '50ch' }} error={errors.name?.message ? true : false}>{errors.name?.message ? errors.name?.message : ``}</FormHelperText>

            </FormControl>
            <FormControl fullWidth sx={{m:1,width: '50ch'}}>
        
              <TextField label="Address" color="primary" {...register('address')} />
              <FormHelperText 
              sx={{ m: 1, width: '50ch' }} error={errors.address?.message ? true : false}>{errors.address?.message ? errors.address?.message : ``}</FormHelperText>

            </FormControl>
            <FormControl fullWidth sx={{m:1,width: '50ch'}}>
              <TextField
                color="primary"
                type='password'
                label="Password"
                {...register('password')}
              />
             <FormHelperText 
              sx={{ m: 1, width: '50ch' }} error={errors.password?.message ? true : false}>{errors.password?.message ? errors.password?.message : ``}</FormHelperText>
          </FormControl>
          <FormControl fullWidth sx={{m:1,width: '50ch'}}>
              <TextField
                color="primary"
                type='password'
                label="Confirm Password"
                {...register('passwordConfirmation')}
              />
             <FormHelperText 
              sx={{ m: 1, width: '50ch' }} error={errors.passwordConfirmation?.message ? true : false}>{errors.passwordConfirmation?.message ? errors.passwordConfirmation?.message : ``}</FormHelperText>
          </FormControl>
          {
            userService.userValue.roles.includes("admin") && (
              <FormControl>
                <FormLabel id="roles">Role</FormLabel>
                <RadioGroup row aria-labelledby="roles">
                  <FormControlLabel value="1" control={<Radio />} label="Admin" {...register('role')}/>
                  <FormControlLabel value="2" control={<Radio />} label="Naamdaan" {...register('role')} />
                </RadioGroup>

              </FormControl>
            )
          }
          <FormControl fullWidth sx={{m:1,width: '25ch'}}>
          <Button variant="contained" type='submit' >Create</Button>
          </FormControl>
            </form>
          </div>
        </Box>
      </Modal>
      <Layout>
      <h1>Users</h1>
      <Link href="/account">Back to home</Link>
      <Button onClick={handleOpen}>Create User</Button>
      <div style={{ height: '90vh', width: '100%' }}>
      <DataGrid
      columns={columns}
      rows={rows}
      pageSize={50}
      rowsPerPageOptions={[50]}
      checkboxSelection
      />
      </div>
  </Layout>
</>
  )
}



export default Users