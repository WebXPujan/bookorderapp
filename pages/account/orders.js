import { DataGrid } from "@mui/x-data-grid"
import { useEffect, useState } from "react"
import { alertService, orderService } from "../../services"
import { Layout } from "../../src/components/account/Layout"
import { Link } from "../../src/components/Link"

export const Orders = () => {

  const [rows, setRow] = useState([])

  const columns = [
    {field: 'id', headerName: 'SN', width:50},
    {field: 'name', headerName: 'Receiver Name', width: 250},
    {field: 'phone', headerName: 'Phone Number', width: 120},
    {field: 'address', headerName: 'Address', width: 400},
    {field: 'book', headerName: 'Ordered Book', width: 150},
    {field: 'referedBy', headerName: 'Refered By', width: 400}
  ]

  useEffect(()=> {
    //console.log("yr");
    getOrders()
  },[])

  function getOrders(){
    let u = []
    orderService.getAll().then(res => {
      console.log(res);
      res.map((r,x) => {
        u.push({
          id: x+1,
          name: r.receiver_name,
          phone: r.phone,
          address: `${r.municipality}- ward no. ${r.ward}, ${r.district}, ${r.country}`,
          book: r['Book.id'] != null ? `${r['Book.book_code']} - ${r['Book.language']}` : '-',
          referedBy: r['User.id'] != null ? `${r['User.name']} (${r['User._id']})` : '-'
        })
      })
      setRow(u)
    }).catch(alertService.error)
  }
  return(
    <Layout>
    <h1>Orders</h1>
    <Link href="/account">Back to home</Link>
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
  )
}
export default Orders