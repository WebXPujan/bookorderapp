import { Head } from 'next/head';
import { userService } from '../../services';
import { Layout } from '../../src/components/account/Layout';
import { AddEdit } from '../../src/components/admin/AddEdit'
export const Home = () => {



  return(
    <Layout>
      <h1>Welcome {userService.userValue.user.name }!</h1>
      <AddEdit />
    </Layout>
  )
}

export default Home;