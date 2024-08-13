// src/lib/graphql.js

export async function fetchGraphQL(query: string, variables = {}) {
  try {
    const response = await fetch(`https://staging.alva-energies.com/graphql/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    const result = await response.json();

    if (result.errors) {
      console.error('GraphQL Errors:', result.errors);
      return null;
    }

    return result.data;

  } catch (error) {
    console.error('FetchGraphQL Error:', error);
    return null;
  }
}

export const GET_POSTS = `
  query GetPosts {
    posts {
      nodes {
        slug
      }
    }
  }
`;

export const GET_POST_BY_SLUG = `
  query GetPostBySlug($slug: String!) {
    postBy(slug: $slug) {
      title
      date
      content
      author {
        node {
          id
        }
      }
      featuredImage {
        node {
          sourceUrl
        }
      }
      categories {
        nodes {
          id
          name
        }
      }
    }
  }
`;

export async function getNodeByURI(uri: string){
    const response = await fetch(import.meta.env.WORDPRESS_API_URL, {
        method: 'post', 
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
            query: `query GetNodeByURI($uri: String!) {
                nodeByUri(uri: $uri) {
                  __typename
                  isContentNode
                  isTermNode
                  ... on Post {
                    id
                    title
                    date
                    uri
                    excerpt
                    content
                    categories {
                      nodes {
                        name
                        uri
                      }
                    }
                    featuredImage {
                      node {
                        srcSet
                        sourceUrl
                        altText
                        mediaDetails {
                          height
                          width
                        }
                      }
                    }
                  }
                  ... on Page {
                    id
                    title
                    uri
                    date
                    content
                  }
                  ... on Category {
                    id
                    name
                    posts {
                      nodes {
                        date
                        title
                        excerpt
                        uri
                        categories {
                          nodes {
                            name
                            uri
                          }
                        }
                        featuredImage {
                          node {
                            srcSet
                            sourceUrl
                            altText
                            mediaDetails {
                              height
                              width
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            `,
            variables: {
                uri: uri
            }
        })
    });
    const{ data } = await response.json();
    return data;
}

export async function getAllUris(){
  const response = await fetch(import.meta.env.WORDPRESS_API_URL, {
      method: 'post', 
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
          query: `query GetAllUris {
            terms {
              nodes {
                uri
              }
            }
            posts(first: 100) {
              nodes {
                uri
              }
            }
            pages(first: 100) {
              nodes {
                uri
              }
            }
          }
          `
      })
  });
  const{ data } = await response.json();
  const uris = Object.values(data)
    .reduce(function(acc: any[], currentValue: any){
      return acc.concat(currentValue.nodes)
    }, [])
    .filter(node => node.uri !== null)
    .map(node => {
      let trimmedURI = node.uri.substring(1);
      trimmedURI = trimmedURI.substring(0, trimmedURI.length - 1)
      return {params: {
        uri: trimmedURI
      }}
    })

  return uris;

}