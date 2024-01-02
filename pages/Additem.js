import { useState, useEffect } from 'react';
import db from '../utils/firebaseconfig';
import { collection, getDocs, doc, addDoc } from 'firebase/firestore';

const AddItem = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'categories'));
        const categoriesList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));
        setCategories(categoriesList);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleItemSubmit = async (e) => {
    e.preventDefault();

    if (!selectedCategory || !itemName || !itemDescription) {
      alert('Please select a category and enter an item name and description.');
      return;
    }

    try {
      const itemData = {
        itemName: itemName,
        itemDescription: itemDescription,
      };

      const categoryDocRef = doc(db, 'categories', selectedCategory);
      await addDoc(collection(categoryDocRef, 'items'), itemData);

      setSelectedCategory('');
      setItemName('');
      setItemDescription('');
      alert('Item added to Firestore');
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  return (
    <div>
      <h2>Add Item</h2>
      <form onSubmit={handleItemSubmit}>
        <label htmlFor="category">Select Category</label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.data.name}
            </option>
          ))}
        </select>
        <label htmlFor="itemName">Item Name</label>
        <input
          type="text"
          id="itemName"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
        <label htmlFor="itemDescription">Item Description</label>
        <input
          type="text"
          id="itemDescription"
          value={itemDescription}
          onChange={(e) => setItemDescription(e.target.value)}
        />
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
};

export default AddItem;
