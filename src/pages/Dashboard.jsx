import Layout from "../layouts/Layout";
import Table from "../components/Table";

export default function Dashboard() {
  return (
    <Layout>
      <div className="container ">
        <div className="content mt-5 p-3">
          <h1>Dashboard</h1>
        </div>
        <div className="table mt-5">
          <Table data={users}/>
        </div>
      </div>
    </Layout>
  );
}