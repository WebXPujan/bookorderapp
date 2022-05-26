import { Head } from 'next/head';
import { userService } from '../../services';
import { Layout } from '../../src/components/account/Layout';
import { AddEdit } from '../../src/components/admin/AddEdit'
const Home = () => {



  return(
    <Layout>
      <Head>
        <meta httpEquiv="content-security-policy" content="upgrade-insecure-requests" />
      </Head>
      <h1>Welcome {userService.userValue.user.name }!</h1>
      <AddEdit />
    </Layout>
  )
}

export default Home