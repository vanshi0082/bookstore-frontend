import React, { useState } from 'react';
import InputField from './InputField';
import SelectField from './SelectField';
import { useForm } from 'react-hook-form';
import { useAddBookMutation } from '../../../redux/features/books/booksApi';
import Swal from 'sweetalert2';

const AddBook = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [imageFile, setImageFile] = useState(null);
  const [addBook, { isLoading }] = useAddBookMutation();
  const [uploadingImage, setUploadingImage] = useState(false);

  const onSubmit = async (data) => {
    let uploadedImageUrl = '';

    if (imageFile) {
      try {
        setUploadingImage(true);
        const formData = new FormData();
        //formData.append('file', imageFile);
        formData.append('image', imageFile);

        const res = await fetch("http://localhost:5000/api/upload", {
          method: 'POST',
          body: formData
        });
        console.log(res);
        


        //const result = await res.json(); 
        const text = await res.text();
        console.log("Raw Response:", text);
        
        let result;
        try {
          result = JSON.parse(text);
          console.log("Parsed JSON result:", result);
        } catch (err) {
          console.error("Failed to parse JSON", err);
          return Swal.fire("Upload Error", "Server did not return valid JSON.", "error");
        }

        if (res.ok) {
          uploadedImageUrl = result.url; // assuming your backend returns `{ url: "https://..." }`
        } else {
          throw new Error(result.message || 'Upload failed');
        }
      } catch (error) {
        console.error("Image upload failed", error);
        Swal.fire("Upload Error", "Image upload failed. Try again.", "error");
        return;
      } finally {
        setUploadingImage(false);
      }
    }

    const newBookData = {
      ...data,
      coverImage: uploadedImageUrl
    };

    try {
      await addBook(newBookData).unwrap();
      Swal.fire("Book Added", "Your book was uploaded successfully!", "success");
      reset();
      setImageFile(null);
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to add book. Please try again.", "error");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  return (
    <div className="max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Book</h2>
      <form onSubmit={handleSubmit(onSubmit)}  encType="multipart/form-data" className="">
        <InputField label="Title" name="title" placeholder="Enter book title" register={register} />
        <InputField label="Description" name="description" placeholder="Enter book description" type="textarea" register={register} />
        <SelectField
          label="Category"
          name="category"
          options={[
            { value: '', label: 'Choose A Category' },
            { value: 'business', label: 'Business' },
            { value: 'technology', label: 'Technology' },
            { value: 'fiction', label: 'Fiction' },
            { value: 'horror', label: 'Horror' },
            { value: 'adventure', label: 'Adventure' }
          ]}
          register={register}
        />
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input type="checkbox" {...register('trending')} className="rounded text-blue-600" />
            <span className="ml-2 text-sm font-semibold text-gray-700">Trending</span>
          </label>
        </div>
        <InputField label="Old Price" name="oldPrice" type="number" placeholder="Old Price" register={register} />
        <InputField label="New Price" name="newPrice" type="number" placeholder="New Price" register={register} />
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Cover Image</label>
          <input type="file" accept="image/*" onChange={handleFileChange} className="mb-2 w-full" />
          {imageFile && <p className="text-sm text-gray-500">Selected: {imageFile.name}</p>}
        </div>
        <button type="submit" className="w-full py-2 bg-green-500 text-white font-bold rounded-md" disabled={uploadingImage || isLoading}>
          {uploadingImage ? "Uploading Image..." : isLoading ? "Adding..." : "Add Book"}
        </button>
      </form>
    </div>
  );
};

export default AddBook;
