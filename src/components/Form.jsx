import React, { useEffect, useState } from "react";
import { useRouter } from "next/router"
import  PropTypes  from "prop-types";
import { IMaskInput } from 'react-imask';
import Button from '@mui/material/Button';
import { FormControl, FormHelperText,TextField,MenuItem,InputLabel,Input, FormGroup, FormControlLabel, Checkbox, Grid, Paper, Alert  } from '@mui/material';
import { alertService, bookService, orderService } from "../../services";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';


const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="000-0000-000"
      definitions={{
        '#': /[1-9]/,
      }}
      inputRef={ref} 
      onAccept={(value) => onChange({ target: { name: props.name , value } })}
      overwrite
    />
  );
});
TextMaskCustom.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export const Form = (props) => {
    const [GG,setGGBook] = useState([])
    const [GTGA,setGTGABook] = useState([])
    const [JM,setJMBook] = useState([])
    const [err, setErr] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const [values, setValues] = React.useState({
      textmask: '000-0000-000',
      numberformat: '1320',
    });
    
    const router = useRouter()
    // form validation rules 
    const validationSchema = Yup.object().shape({
      phone: Yup.string().required('फोन नम्बर अनिवार्य छ'),
      municipality: Yup.string(),
      receiver_name: Yup.string().required('Name is required'),
      country: Yup.string(),
      ward: Yup.string(),
      books: Yup.array().min(1,'तल बाट कम्तिमा एउटा पुस्तक छान्नुहोला'),
      refered_by: Yup.string(),
      street_address: Yup.string(),
      district: Yup.string().required('District is Required')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

   useEffect(()=>{
     if(!loaded){
      getAllBooks()
      //console.log("1");
      setLoaded(true)
      
     }
     return () => {}
     
   },[])

   function getAllBooks() {
     //console.log("sad");
     bookService.groupByName("gg").then(res => setGGBook(res))
     .catch(alertService.error)
     bookService.groupByName("gtga").then(res => setGTGABook(res))
     .catch(alertService.error)
     bookService.groupByName("jm").then(res => setJMBook(res))
     .catch(alertService.error)
   }
  
  
    const handleChange = (event) => {
      setValues({
        ...values,
        [event.target.name == undefined ? 'field' : event.target.name]: event.target.value,
      });
    };

    function handleOrder(data){
      //console.log({...data,refered_by:router.query.ref_id});
      return orderService.createOrder({...data,refered_by:router.query.ref_id})
            .then((order) => {
              if(order.message && order.success == 0){
                setErr(order.message)
              }else{
                   // get return url from query parameters or default to '/'
                const returnUrl = router.query.returnUrl || '/success';
                router.push(returnUrl);
               //return user
               //console.log(user)
              }
               
            })
            .catch(alertService.error);

    }


  return(
    <>
    {
        err && (
          <Alert severity="error" color="error">
            {err}
          </Alert>
        ) 
      }
    <FormControl fullWidth sx={{m:1,width: '50ch'}}>
      
      <TextField label="प्रापकको नाम / Receiver's Name" color="primary" { ...register('receiver_name') } focused error={errors.receiver_name?.message ? true : false} helperText={errors.receiver_name?.message ? errors.receiver_name?.message : "This field is Required"}/>
      

    </FormControl>
    <FormControl fullWidth sx={{m:1,width: '50ch'}}>
      
      <TextField label="गाउँ / टोल / Street Address" color="primary" {...register('street_address')} focused />
      <FormHelperText 
      sx={{ m: 1, width: '50ch' }}id="my-helper-text">This field is required</FormHelperText>

    </FormControl>
    <FormControl fullWidth sx={{m:1,width: '50ch'}}>
      
      <TextField label="देश / Country" color="primary" {...register('country')}focused />
      <FormHelperText 
      sx={{ m: 1, width: '50ch' }}id="my-helper-text"></FormHelperText>

    </FormControl>
    
    <FormControl fullWidth sx={{m:1,width: '50ch'}}>
    <TextField
          id="outlined-select-currency"
          label="जिल्ला / District"
          helperText={errors.district?.message ? errors.district?.message : "Please select your district"}
          color="primary"
          focused
          {...register('district')}
          error={errors.district?.message ? true : false}
        >
          
        </TextField>
    </FormControl>
    <FormControl fullWidth sx={{m:1,width: '50ch'}}>
    <TextField
          id="outlined-select-currency"
          label="नगरपालिका / गाउँ पालिका / Municipality"
          helperText="Please select your municipality"
          focused
          {...register('municipality')}
        >
        </TextField>
    </FormControl>
    <FormControl fullWidth sx={{m:1,width: '50ch'}}>
      
      <TextField label="वडा नं. / Ward No." color="primary" focused {...register('ward')} />
      <FormHelperText 
      sx={{ m: 1, width: '50ch' }}id="my-helper-text"></FormHelperText>

    </FormControl>
    <FormControl fullWidth sx={{m:1,width: '50ch'}} variant="outlined">
      
      <TextField
      variant="outlined"
      label="Phone number"
      // value={values.field}
      // onChange={handleChange}
      // InputProps={{ inputComponent: TextMaskCustom }}
      helperText={errors.phone?.message ? errors.phone?.message : "फोन नम्बर अनिवार्य छ"}
      focused
      {...register('phone')}
      error={errors.phone?.message ? true : false}
      ></TextField>
    {/* <InputLabel htmlFor="formatted-text-mask-input">Phone number</InputLabel>
        <Input
          value={values.textmask}
          onChange={handleChange}
          name="textmask"
          id="formatted-text-mask-input"
          inputComponent={TextMaskCustom}
        /> */}
          
        
      </FormControl>
      {/* <FormGroup>
        <FormControlLabel control={ <Checkbox defaultChecked />} label="Gyan Ganga"/>
        <FormControlLabel control={<Checkbox />} label="Jiune Marga"/>
        <FormControlLabel control={<Checkbox />} label="Gita Timro Gyan Amrit"/>
      </FormGroup> */}
      <h2>Select Books to order</h2>
      {
        errors.books?.message && (<p style={{color: "red"}}>{errors.books?.message}</p>)
      }
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={2}>
          {[0, 1, 2].map((value) => (
            <Grid key={value} item>
              <Paper
                sx={{
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                }}
              >
                <p style={{fontWeight: 'bold'}}>{value == 0 ? "ज्ञान गंगा" : (value == 1 ? "गीता तिम्रो ज्ञान अमृत " : "जिउने मार्ग ")}</p>
                <FormGroup>
                  {
                    value == 0 ? (
                      <>
                      {
                        
                          GG && GG.map(g=>(
                            <FormControlLabel control={<Checkbox defaultChecked={g.language === "Nepali" ? true: false} />} label={g.language} sx={{ '& .MuiSvgIcon-root': { fontSize: 14 } }} key={g.language} {...register('books')} value={g.id} />
                          ))
                        
                      }
                      </>
                      
                    ) : (value == 1 ? (
                      <>
                      {
                        
                          GTGA && GTGA.map(g=>(
                            <FormControlLabel control={<Checkbox />} label={g.language} sx={{ '& .MuiSvgIcon-root': { fontSize: 14 } }} key={g.language} {...register('books')} value={g.id} />
                          ))
                        
                      }
                      </>
                    ): (
                      <>
                      {
                        
                          JM && JM.map(g=>(
                            <FormControlLabel control={<Checkbox />} label={g.language} sx={{ '& .MuiSvgIcon-root': { fontSize: 14 } }} key={g.language} {...register('books')} value={g.id} />
                          ))
                        
                      }
                      </>
                    ))
                  }
                </FormGroup>
                </Paper>
            </Grid>
          ))}
        </Grid>
      </Grid>
    <Button variant="contained" onClick={handleSubmit(handleOrder)}>Order</Button>
    </>
  )
}

