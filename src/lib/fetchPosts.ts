export async function FetchPosts() {
  const apiUrl = import.meta.env.BLOG_URL;
  const response = await fetch(`${apiUrl}/posts?_embed`);
  const posts = await response.json();

  // Map over the posts to extract the featured image URL, categories, and author information
  const postsWithDetails = posts.map((post: any) => {
    // Récupérer l'image mise en avant
    const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;


    // Récupérer l'auteur (nom et lien)
    const author = post._embedded?.['author']?.[0]?.name || 'Auteur inconnu';
    const authorLink = post._embedded?.['author']?.[0]?.link || '#';

    return {
      ...post,
      featured_image_url: featuredImage, 
      author: {
        name: author,                    
        link: authorLink,               
      },
    };
  });

  return postsWithDetails;
}
