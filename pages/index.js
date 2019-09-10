import Layout from "../components/MyLayout";
import Link from "next/link";
import fetch from "isomorphic-unfetch";
import { useAmp } from "next/amp";

export const config = { amp: "hybrid" };

const Index = props => {
  const isAmp = useAmp();
  return (
    <Layout>
      <h1>Batman TV Shows</h1>
      <ul>
        {props.shows.map(show => (
          <li key={show.id}>
            <Link href="/show/[id]" as={`/show/${show.id}`}>
              <a>{show.name}</a>
            </Link>
          </li>
        ))}
      </ul>
      <p>
        Welcome to the {isAmp ? "AMP" : "normal"} version of the Index page!!
      </p>
    </Layout>
  );
};

Index.getInitialProps = async function() {
  const res = await fetch("https://api.tvmaze.com/search/shows?q=batman");
  const data = await res.json();

  console.log(`Show data fetched. Count: ${data.length}`);

  return {
    shows: data.map(entry => entry.show)
  };
};

export default Index;
