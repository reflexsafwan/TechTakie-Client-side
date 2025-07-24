import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";

import toast from "react-hot-toast";
import Swal from "sweetalert2";
import axios from "axios";
import { WithContext as ReactTagInput } from "react-tag-input";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../components/Loading";

// imgbb key from your .env
const imgbbApiKey = import.meta.env.VITE_IMGBB_API_KEY;

const UpdateProduct = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [tags, setTags] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axiosSecure.get(`/products/${id}`);
        setProduct(res.data);
        setTags(
          res.data.tags.map((tag, idx) => ({ id: String(idx), text: tag }))
        );
        setImageUrl(res.data.image);
      } catch (err) {
        toast.error("Failed to fetch product.");
        navigate("/dashboard/my-products");
      }
      setLoading(false);
    };
    fetchProduct();
    // eslint-disable-next-line
  }, [id]);

  // Tag input config
  const handleAddition = (tag) => setTags([...tags, tag]);
  const handleDelete = (i) => setTags(tags.filter((tag, index) => index !== i));
  const handleDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice();
    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);
    setTags(newTags);
  };

  // Image upload
  const handleImageUpload = async (e) => {
    setUploading(true);
    const file = e.target.files[0];
    if (!file) {
      setUploading(false);
      return;
    }
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
        formData
      );
      if (res.data.success) {
        setImageUrl(res.data.data.url);
        toast.success("Image uploaded!");
      } else {
        toast.error("Failed to upload image.");
      }
    } catch {
      toast.error("Failed to upload image.");
    }
    setUploading(false);
  };

  // Form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const name = form.name.value;
    const description = form.description.value;
    const externalLinks = form.externalLinks.value;

    if (!imageUrl) {
      toast.error("Please upload a product image.");
      setLoading(false);
      return;
    }
    if (!tags.length) {
      toast.error("Please add at least one tag.");
      setLoading(false);
      return;
    }

    const updateData = {
      name,
      image: imageUrl,
      description,
      tags: tags.map((t) => t.text),
      externalLinks,
    };

    try {
      await axiosSecure.patch(`/products/${id}`, updateData);
      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Product updated successfully.",
        confirmButtonColor: "#06b6d4",
      }).then(() => {
        navigate("/dashboard/my-products");
      });
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to update product.");
    }
    setLoading(false);
  };

  if (loading || !product) return <Loading />;

  return (
    <div className="card w-full max-w-xl min-h-[60vh] bg-[#1e293b] shadow-2xl rounded-2xl p-8 flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-6 text-cyan-400">Update Product</h2>
      <form className="w-full space-y-4" onSubmit={handleSubmit}>
        <input
          name="name"
          type="text"
          defaultValue={product.name}
          className="input input-bordered w-full bg-[#1e293b] text-white border-cyan-500"
          required
        />
        <div>
          <input
            type="file"
            accept="image/*"
            className="file-input file-input-bordered w-full bg-[#1e293b] text-white border-cyan-500"
            onChange={handleImageUpload}
            disabled={uploading}
          />
          {uploading && (
            <div className="flex items-center gap-2 mt-2">
              <span className="loading loading-spinner loading-xs text-cyan-400"></span>
              <span className="text-cyan-200 text-sm">Uploading...</span>
            </div>
          )}
        </div>
        {imageUrl && (
          <div className="flex items-center mt-1">
            <img
              src={imageUrl}
              alt="Preview"
              className="w-16 h-16 rounded border-2 border-cyan-400 object-cover"
            />
            <span className="ml-2 text-green-400 text-xs">Image ready!</span>
          </div>
        )}
        <textarea
          name="description"
          defaultValue={product.description}
          className="textarea textarea-bordered w-full bg-[#1e293b] text-white border-cyan-500"
          rows={3}
          required
        />
        <label className="label">
          <span className="label-text text-cyan-200">Tags</span>
        </label>
        <ReactTagInput
          tags={tags}
          handleDelete={handleDelete}
          handleAddition={handleAddition}
          handleDrag={handleDrag}
          placeholder="Add tags (e.g., ai, webapp, productivity)"
          allowDragDrop={false}
        />
        <input
          name="externalLinks"
          type="url"
          defaultValue={product.externalLinks}
          className="input input-bordered w-full bg-[#1e293b] text-white border-cyan-500"
          required
        />
        <button
          type="submit"
          className="btn w-full mt-2 bg-indigo-500 hover:bg-indigo-600 text-white border-none"
          disabled={loading || uploading}
        >
          {loading ? (
            <span className="loading loading-spinner loading-xs"></span>
          ) : (
            "Update Product"
          )}
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
