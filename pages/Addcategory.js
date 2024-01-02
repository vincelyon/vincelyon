import { useState } from 'react';
import { db } from '../utils/firebaseconfig';
import { collection, addDoc } from 'firebase/firestore';

async function addDataToFirestore(name, imageUrl) {
  try {
    const docRef = await addDoc(collection(db, 'categories'), {
      name: name,
      imageUrl: imageUrl,
    });
    console.log('Successful', docRef.id);
    return true;
  } catch (error) {
    console.log('Error adding document: ', error);
    return false;
  }
}

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState('');
  const [categoryImage, setCategoryImage] = useState(null);

  const handleCategoryImageChange = (e) => {
    const file = e.target.files[0];
    setCategoryImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoryName || !categoryImage) {
      alert('Please enter a category name and select an image.');
      return;
    }

    try {
      const reader = new FileReader();

      reader.onload = async () => {
        const base64Image = reader.result;
        const added = await addDataToFirestore(categoryName, base64Image);

        if (added) {
          setCategoryName('');
          setCategoryImage(null);
          alert('Data added to Firestore');
        }
      };

      reader.readAsDataURL(categoryImage);
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  return (
    <main>
      <h1 className="text-5xl font-bold m-10">Add Data To Firestore Database</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="categoryName">Category Name</label>
        <input
          type="text"
          id="categoryName"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <label htmlFor="categoryImage">Category Image</label>
        <input
          type="file"
          id="categoryImage"
          accept="image/*"
          onChange={handleCategoryImageChange}
        />
        <button type="submit">Submit</button>
      </form>
    </main>
  );
};

export default AddCategory;
