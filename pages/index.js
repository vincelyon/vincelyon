import React, { useState, useEffect } from 'react';
import db from '../utils/firebaseconfig';
import { collection, getDocs } from 'firebase/firestore';

const Index = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const colRef = collection(db, 'categories');
        const snapshots = await getDocs(colRef);

        const categoriesData = snapshots.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          imageUrl: doc.data().imageUrl,
        }));

        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching categories: ', error);
      }
    };

    fetchCategories();
  }, []);

  const fetchItemsForCategory = async (categoryId) => {
    try {
      const docRef = collection(db, 'categories', categoryId, 'items');
      const snapshots = await getDocs(docRef);

      const itemsData = snapshots.docs.map((itemDoc) => ({
        id: itemDoc.id,
        itemName: itemDoc.data().itemName,
        // Other item details...
      }));

      setSelectedCategory({ categoryId, items: itemsData });
    } catch (error) {
      console.error('Error fetching items: ', error);
    }
  };

  const handleCategoryClick = async (categoryId) => {
    // Fetch items for the selected category
    await fetchItemsForCategory(categoryId);
  };

  return (
    <div>
      <h1>Categories</h1>
      <ul>
        {categories.map((category) => (
          <li key={category.id} onClick={() => handleCategoryClick(category.id)}>
            <p>{category.name}</p>
            {category.imageUrl && <img src={category.imageUrl} alt={category.name} />}
          </li>
        ))}
      </ul>
      {selectedCategory && (
        <CategoryPage
          categoryName={selectedCategory.categoryId} // Pass category name if needed
          items={selectedCategory.items}
        />
      )}
    </div>
  );
};

const CategoryPage = ({ categoryName, items }) => {
  return (
    <div>
      <h2>{categoryName}</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <p>{item.itemName}</p>
            {/* Display other item details as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Index;
