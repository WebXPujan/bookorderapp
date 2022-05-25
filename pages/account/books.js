import { Layout } from "../../src/components/account/Layout"
import { alertService, bookService } from "../../services";
import { useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { Link } from "../../src/components/Link";
import { Button,Box,Typography,Modal,FormControl, FormHelperText,TextField,InputLabel,OutlinedInput, Alert } from "@mui/material"
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
export const Books = () => {

  const [rows, setRow] = useState([])
  const [delId,setDelId] = useState([]);
  const [isSelected,setIsSelected] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [err,setErr] = useState(false);
  const router = useRouter();
    // form validation rules 
    const validationSchema = Yup.object().shape({
      book_name: Yup.string().required('Book Name is required'),
      book_code: Yup.string().required('Book Code is required'),
      language: Yup.string().required('Language is required'),
      price: Yup.number().required('Price is required')
  });

  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const columns = [
    {field: 'id', headerName: 'SN', width: 70},
    {field: 'bookCode', headerName: 'Code', width: 70},
    {field: 'bookName', headerName: 'Book Name', width: 150},
    {field: 'price', headerName: 'Price', width: 80, type: 'number'},
    {field: 'language', headerName: 'Language', width: 80}
  ]

  useEffect(()=>{
   
   // get the list of books
    getBooks()
  },[])
  function onSubmit(book) {
    console.log(book);
    return bookService.register(book)
    .then((book) => {
        // get return url from query parameters or default to '/'
        if(book.message) {
            setErr(book.message)
        }else{
          const returnUrl = router.query.returnUrl || '/account/books';
          router.push(returnUrl);
        }
        
       //return user
       //console.log(user)
    })
    .catch(alertService.error);
  }
  function getBooks(){
     bookService.getAll().then(res=>{
      //setBook(res)
      //console.log(res.length);
      let b = []
      //console.log(res);\
      res.map((r,x) => {
       b.push({
          id: r.id,
          bookCode: r.book_code,
          bookName: r.book_name,
          price: r.price,
          language: r.language
        })
      })
      setRow(b)
    }).catch(alertService.error)
  }

  function handleDelete(row){
    
    setDelId(row)
    if(row.length == 0 ){
      setIsSelected(false)
    }else{
      setIsSelected(true)
    }
  }
  function handleItemDelete(){
    //console.log(delId);
    bookService.delete(delId).then(res => {
      if(res.success == 0) {
        setErr(res.message)
      }else{
        const returnUrl = router.query.returnUrl || '/account/books';
        router.push(returnUrl);
      }
    }).catch(alertService.error)
  }

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
            Create Book
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
        
              <TextField label="book name" color="primary" {...register('book_name')} />
              <FormHelperText 
              sx={{ m: 1, width: '50ch' }} error={errors.book_name?.message ? true : false}>{errors.book_name?.message ? errors.book_name?.message : `Book name is required`}</FormHelperText>

            </FormControl>
            <FormControl fullWidth sx={{m:1,width: '50ch'}}>
        
              <TextField label="Book Code" color="primary" {...register('book_code')}/>
              <FormHelperText 
              sx={{ m: 1, width: '50ch' }} error={errors.book_code?.message ? true : false}>{errors.book_code?.message ? errors.book_code?.message : ``}</FormHelperText>

            </FormControl>
            <FormControl fullWidth sx={{m:1,width: '50ch'}}>
        
              <TextField label="Language" color="primary" {...register('language')} />
              <FormHelperText 
              sx={{ m: 1, width: '50ch' }} error={errors.language?.message ? true : false}>{errors.language?.message ? errors.language?.message : ``}</FormHelperText>

            </FormControl>
            <FormControl fullWidth sx={{m:1,width: '50ch'}}>
              <TextField
                color="primary"
                type='number'
                label="Price"
                {...register('price')}
              />
             <FormHelperText 
              sx={{ m: 1, width: '50ch' }} error={errors.price?.message ? true : false}>{errors.price?.message ? errors.price?.message : ``}</FormHelperText>
          </FormControl>
          
          <FormControl fullWidth sx={{m:1,width: '25ch'}}>
          <Button variant="contained" type='submit' >Create</Button>
          </FormControl>
            </form>
          </div>
        </Box>
      </Modal>
      <Layout>
      <h1>Books</h1>
      <Link href="/account">Back to Home</Link>
      
      <Button onClick={handleOpen}>Create Book</Button>
      <div style={{ height: '90vh', width: '100%' }}>
        {
          isSelected && (<Button style={{marginBottom:20}} variant="outlined" onClick={handleItemDelete}>Delete {delId.length} Item(s)</Button>)
        }
      <DataGrid 
      rows={rows}
      columns={columns}
      pageSize={50}
      rowsPerPageOptions={[50]}
      checkboxSelection
      onSelectionModelChange={handleDelete}
      />
      </div>
      </Layout>
    </>
  )
}
export default Books