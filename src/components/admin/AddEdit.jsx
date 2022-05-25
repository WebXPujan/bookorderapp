import { useRouter } from "next/router";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { Link } from '../Link';
import { userService } from "../../../services";
import { Button } from "@mui/material";



//import { userService, alertService} from 'services'


export const AddEdit = () => {
  return(
    <>
    {
      userService.userValue.roles.includes("admin") ?
      (
        <>
        <Link href="/account/books">Books</Link>
        <Link href="/account/users">Users</Link>
        <Link href="/account/orders">Orders</Link>
        </>
      )
      :
      (
        userService.userValue.roles.includes("naamdaan") ? (
          <>
            <Link href="/account/users">Users</Link>
            <Link href="/account/orders">Orders</Link>
          </>
        ) : 
          null
        
      )
    }
    <Button onClick={() => userService.logout()}>Logout</Button>
     
    </>
  )
}
export default AddEdit;