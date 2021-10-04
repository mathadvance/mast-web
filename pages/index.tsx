import client from "@/utils/server/mongodb";

export default function Index() {
  // what I really want to do
  // is redirect to About if
  // user is not logged in;
  // redirect to Home if user is
  // logged in.
  return <div></div>;
}

export async function getServerSideProps(context) {
  return {
    props: {},
  };
}
