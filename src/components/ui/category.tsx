import { useEffect, useState } from 'react';

const Categories = ({ categories }: any) => {
  const [categoryData, setCategoryData] = useState<any[]>([]);
  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const fetchedData = await Promise.all(
          categories.map(async (categoryId: any) => {
            const response = await fetch(`https://staging.alva-energies.com/wp-json/wp/v2/categories/${categoryId}`);
            const data = await response.json();
            return data;
          })
        );
        setCategoryData(fetchedData);
      } catch (error) {
        console.error('Failed to fetch category data:', error);
      }
    };

    fetchCategoryData();
  }, [categories]);

  return (
    <div className="flex gap-3">
      {categoryData.map((category) => (
        <div className="bg-secondary py-2 px-2 rounded flex justify-center items-center" key={category.id}>
          <a href={category.slug}><p className="text-primary mb-0 font-bold text-xs">{category.name}</p></a>
        </div>
      ))}
    </div>
  );
}

export default Categories;
