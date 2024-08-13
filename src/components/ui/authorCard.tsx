import { useEffect, useState } from 'react';

const AuthorCard = ({ authorId }: any) => {
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
    <div className="flex flex-col justify-center gap-2 px-24 py-8 bg-[#F9FFE6] rounded-xl">
      <div className="flex gap-4 items-center">
        {authorData && (
          <img className="rounded-full" width={48} src={authorData.avatar_urls['48']} alt={`photo du membre ALVA ${authorData.name}`} />
        )}
        {authorData && (
          <div>
            <h2 className="m-0 text-lg">{authorData.name}</h2>
          </div>
        )}
      </div>
      <div>
        <p className="text-[1rem] m-0">{authorData ? authorData.description : ''}</p>
      </div>
    </div>
  );
}

export default AuthorCard;
