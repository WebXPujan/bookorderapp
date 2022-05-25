import { userService } from '../../services';
import { Layout } from '../../src/components/account/Layout';
import { AddEdit } from '../../src/components/admin/AddEdit'
const Home = () => {



  return(
    <Layout>
      <h1>Welcome {userService.userValue.user.name }!</h1>
      <AddEdit />
    </Layout>
  )
}

export default Home