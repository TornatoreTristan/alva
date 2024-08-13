import { useEffect, useState } from 'react';

const Author = ({ authorId }: any) => {
  const [authorData, setAuthorData] = useState<any>(null);

  useEffect(() => {
    const fetchAuthorData = async () => {
      try {
        const response = await fetch(`https://staging.alva-energies.com/wp-json/wp/v2/users/${authorId}`);
        const data = await response.json();
        setAuthorData(data);
      } catch (error) {
        console.error('Failed to fetch category data:', error);
      }
    };
    fetchAuthorData();
  }, [authorId]);

  return (
    <div className="flex gap-2 items-center justify-center">
      <div>
        {authorData && (
          <img className="rounded-full" width={24} src={authorData.avatar_urls['24']} alt={`photo du membre ALVA ${authorData.name}`} />
        )}
      </div>
      {authorData && (
            <p className="text-sm text-gray-500 mb-0 font-bold">{authorData.name}</p>
      )}
    </div>
  );
}

export default Author;
