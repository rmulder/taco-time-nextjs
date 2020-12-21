import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import { initializeApollo } from '../apollo/client';
import CardCarousel from '../components/CardCarousel';
import ItemFrom from '../components/ItemForm';

const ItemsQuery = gql`
  query ItemQuery {
    item {
      name
      price
      img
    }
  }
`;

const Index = () => {
  const {
    data: { item },
  } = useQuery(ItemsQuery);

  console.log(item);
  return (
    <>
      <ItemFrom />
      <CardCarousel />
      {item.map((itemObj) => {
        return <span>{itemObj.name}</span>;
      })}
    </>
  );

  // return (
  //   <div>w
  //     You're signed in as {viewer.name} and you're {viewer.status} goto{' '}
  //     <Link href="/about">
  //       <a>static</a>
  //     </Link>{' '}
  //     page.
  //   </div>
  // )
};

export async function getServerSideProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: ItemsQuery,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
}

export default Index;
