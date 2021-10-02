import clientPromise from "@/utils/server/mongodb";

function Index({ isConnected }) {
  // what I really want to do
  // is redirect to About if
  // user is not logged in;
  // redirect to Home if user is
  // logged in.
  return (
    <div>
      {isConnected
        ? "You are connected to the database"
        : "You are not connected to the database"}
    </div>
  );
}

export default Index;

export async function getServerSideProps(context) {
  const client = await clientPromise;

  // client.db() will be the default database passed in the MONGODB_URI
  // You can change the database by calling the client.db() function and specifying a database like:
  // const db = client.db("myDatabase");
  // Then you can execute queries against your database like so:
  // db.find({}) or any of the MongoDB Node Driver commands

  const db = client.db();
  // const user = db.collection("test").findOne({}, function(err, result) {

  // });

  return {
    props: {},
  };
}
