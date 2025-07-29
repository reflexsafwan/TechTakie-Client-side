import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import axios from "axios";
import { WithContext as ReactTagInput } from "react-tag-input";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../components/Loading";

// imgbb key from your .env
const imgbbApiKey = import.meta.env.VITE_IMGBB_API_KEY;

const AddProduct = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [tags, setTags] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

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
    if (!file) return;
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

    const product = {
      name,
      image: imageUrl,
      description,
      ownerName: user?.displayName,
      ownerEmail: user?.email,
      ownerPhoto: user?.photoURL,
      tags: tags.map((t) => t.text),
      externalLinks,
      upvotes: 0,
      upvotedUsers: [],
      status: "pending",
      timestamp: new Date().toISOString(),
    };

    try {
      await axiosSecure.post("/products", product);
      toast.success("Product added! Awaiting review.");
      navigate("/dashboard/my-products");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to add product.");
    }
    setLoading(false);
  };

  return (
    <div className="card w-full max-w-full bg-[#1e293b] shadow-xl rounded-2xl p-6 mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-cyan-400">Add New Product</h2>
      <form className="w-full space-y-4" onSubmit={handleSubmit}>
        <input
          name="name"
          type="text"
          placeholder="Product Name"
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
            required
          />
          {uploading && (
            <div className="mt-2">
              <Loading /> {/* Custom spinner here */}
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
          placeholder="Description"
          className="textarea textarea-bordered w-full bg-[#1e293b] text-white border-cyan-500"
          rows={3}
          required
        />
        {/* Owner Info */}
        <div className="flex gap-3 items-center">
          <img
            src={user?.photoURL || "/default-avatar.png"}
            alt={user?.displayName}
            className="w-12 h-12 rounded-full border border-cyan-300"
          />
          <div>
            <p className="text-sm font-bold text-cyan-300">
              {user?.displayName}
            </p>
            <p className="text-xs text-cyan-200">{user?.email}</p>
          </div>
        </div>
        {/* Tags */}
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
        {/* External Links */}
        <input
          name="externalLinks"
          type="url"
          placeholder="External Link (product site, github, etc)"
          className="input input-bordered w-full bg-[#1e293b] text-white border-cyan-500"
          required
        />
        {/* Submit */}
        <button
          type="submit"
          className="btn w-full mt-2 bg-indigo-500 hover:bg-indigo-600 text-white border-none"
          disabled={loading || uploading}
        >
          {loading ? (
            <Loading /> // Also can use here for submit
          ) : (
            "Submit Product"
          )}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
