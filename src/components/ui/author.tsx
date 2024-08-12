import React, { useEffect, useState } from 'react';

const Author = ({ authorId }: any) => {
  const [authorData, setAuthorData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  console.log(authorId);

  useEffect(() => {
            console.log("J'ai Try")
    const fetchAuthorData = async () => {
      try {
        const response = await fetch(`https://staging.alva-energies.com/wp-json/wp/v2/users/${authorId}`);
        const data = await response.json();

        setAuthorData(data);
      } catch (error) {
        setError('Failed to fetch author data');
      }
    };

    if (authorId) {
      fetchAuthorData();
    }
  }, []);

  console.log(authorData , error);

  return (
    <div className="author">
    </div>
  );
}

export default Author;
