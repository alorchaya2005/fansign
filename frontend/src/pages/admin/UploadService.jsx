import React, { useEffect, useRef, useState } from "react";
import { CiImageOn } from "react-icons/ci";
import { IoCloseSharp } from "react-icons/io5";
import Layout from "../../components/layout/Layout";
import DashSidebar from "../../components/layout/DashSidebar";
import toast from "react-hot-toast";
import { Loader, Plus, X } from "lucide-react";
import { useAdminStore } from "../../store/useAdminStore";

const UploadService = () => {
  const { uploadService, isCreatingService, getAllCategories, allCategories } =
    useAdminStore();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    deliveryTime: "",
    revisions: "",
    category: "",
    details: "",
    selection: [],
    customFields: [],
  });

  // ✅ Handle custom filed upload
  const [field, setField] = useState({
    label: "",
    fieldType: "text",
    required: false,
    options: [],
  });

  const [newCustomOption, setNewCustomOption] = useState({
    value: "",
    extraPrice: "",
  });

  const handleCustomOptionChange = (e) => {
    const { name, value } = e.target;
    setNewCustomOption((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addOption = () => {
    const trimmed = newCustomOption.value.trim();
    if (!trimmed) return;

    setField((prev) => ({
      ...prev,
      options: [
        ...prev.options,
        {
          value: trimmed,
          extraPrice: Number(newCustomOption.extraPrice) || 0,
        },
      ],
    }));
    setNewCustomOption({ value: "", extraPrice: "" });
  };

  const removeOption = (index) => {
    setField((prev) => ({
      ...prev,
      options: prev.options.filter((_, i) => i !== index),
    }));
  };

  //handle custom field
  const handleFieldChange = (e) => {
    const { name, value, type, checked } = e.target;
    setField((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const addFieldToFormData = () => {
    if (!field.label.trim()) return;
    setFormData((prev) => ({
      ...prev,
      customFields: [...prev.customFields, field],
    }));
    setField({
      label: "",
      fieldType: "text",
      required: false,
      options: [],
    });
  };

  const removeCustomField = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      customFields: prev.customFields.filter((_, idx) => idx !== indexToRemove),
    }));
  };

  const [images, setImages] = useState([]); // Stores Base64 images
  const multiImgRef = useRef(null);

  // ✅ Handle multiple image uploads (without extra buttons)
  const handleMultipleImgChange = (e) => {
    const files = e.target.files;
    const newImages = [...images];

    Object.values(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        newImages.push(reader.result); // Convert to Base64
        setImages([...newImages]); // Update state correctly
      };
      reader.readAsDataURL(file);
    });
  };

  // ✅ Remove Image from Preview
  const handleRemoveImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // ✅ Handles new options
  const [newOption, setNewOption] = useState(""); // for input field

  const handleAddOption = () => {
    const trimmedOption = newOption.trim();
    if (trimmedOption) {
      setFormData((prev) => ({
        ...prev,
        selection: [...prev.selection, { option: trimmedOption }],
      }));
      setNewOption(""); // clear input
    }
  };

  // ✅ Handles remove options
  const handleRemoveOption = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      selection: prev.selection.filter((_, idx) => idx !== indexToRemove),
    }));
  };

  // ✅ Handles input changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Disable button if form is incomplete
  const isFormValid = () => {
    if (!formData.name) return toast.error("Name is required");
    if (!formData.description) return toast.error("Description is required");
    if (!formData.price) return toast.error("Price is required");
    if (!formData.deliveryTime) return toast.error("Delivery Time is required");
    if (!formData.revisions) return toast.error("Revisions is required");
    if (!formData.category) return toast.error("Category is required");
    if (!images || images.length === 0)
      return toast.error("At least one image is required");

    return true;
  };

  const handleUpload = (e) => {
    e.preventDefault();
    const success = isFormValid();
    if (success !== true) return;
    uploadService({ ...formData, images });
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <Layout>
      {/* Fixed Sidebar */}
      <DashSidebar />

      {/* Main content wrapper with padding to avoid overlap */}
      <div className="min-h-screen pl-16 md:pl-[270px] md:pr-4 pt-20 pb-6 transition-all duration-300">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center px-4 md:px-0 gap-2 justify-between ">
          <div>
            <h1 className="mt-4 text-2xl leading-none font-oddliniMedium tracking-wider ">
              Create Service
            </h1>
            <h1 className=" text-sm text-zinc-300 font-medium ">
              To list a new service you have to provide the following
              information
            </h1>
          </div>
        </div>
        <div className="border-b border-zinc-800 w-full mt-2 mb-7" />
        <div className=" bg-subMain px-5 py-2 rounded-md">
          <form onSubmit={handleUpload}>
            <div className="w-full md:grid grid-cols-2 gap-4">
              {/* name  */}
              <div>
                <p className="text-sm text-subText">Name</p>
                <input
                  type="text"
                  name="name"
                  disabled={isCreatingService}
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Service Name"
                  className="w-full mt-2 px-3 py-2 rounded-md border border-border outline-none font-light text-sm bg-inputBg"
                />
              </div>
              {/* description  */}
              <div>
                <p className="text-sm text-subText">Description</p>
                <textarea
                  name="description"
                  disabled={isCreatingService}
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Description"
                  className="w-full mt-2 px-3 h-[38px] py-2 rounded-md border border-border outline-none font-light text-sm bg-inputBg"
                />
              </div>
              {/* price  */}
              <div>
                <p className="text-sm text-subText">Price</p>
                <input
                  disabled={isCreatingService}
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    setFormData({ ...formData, price: value });
                  }}
                  placeholder="Make a price"
                  className="w-full mt-2 px-3 py-2 rounded-md border border-border outline-none font-light text-sm bg-inputBg"
                />
              </div>
              {/* deliveryTime  */}
              <div>
                <p className="text-sm text-subText">Delivery Time</p>
                <input
                  disabled={isCreatingService}
                  type="text"
                  name="deliveryTime"
                  value={formData.deliveryTime}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    setFormData({ ...formData, deliveryTime: value });
                  }}
                  placeholder="Delivery Time"
                  className="w-full mt-2 px-3 py-2 rounded-md border border-border outline-none font-light text-sm bg-inputBg"
                />
              </div>
              {/* revisions  */}
              <div>
                <p className="text-sm text-subText">Revisions</p>
                <input
                  disabled={isCreatingService}
                  type="text"
                  name="revisions"
                  value={formData.revisions}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    setFormData({ ...formData, revisions: value });
                  }}
                  placeholder="How many revensions you can provide?"
                  className="w-full mt-2 px-3 py-2 rounded-md border border-border outline-none font-light text-sm bg-inputBg"
                />
              </div>
              {/* category  */}
              <div>
                <p className="text-sm text-subText">Category</p>
                <select
                  disabled={isCreatingService}
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full mt-2 px-3 py-2 rounded-md border border-border outline-none font-light text-sm bg-inputBg"
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  {allCategories?.map((category) => (
                    <option key={category?._id} value={category?.name}>
                      {category?.name}
                    </option>
                  ))}
                </select>
              </div>
              {/* additional info  */}
              <div>
                <p className="text-sm text-subText">Additional Details</p>
                <div className=" flex items-center gap-2">
                  <label className="flex items-center gap-2 mt-2 cursor-pointer">
                    <input
                      disabled={isCreatingService}
                      type="radio"
                      name="details"
                      defaultChecked
                      value="notes"
                      checked={formData.details === "notes"}
                      onChange={handleInputChange}
                      className="form-radio"
                    />
                    <span className="text-sm">Notes</span>
                  </label>
                  <label className="flex items-center gap-2 mt-2 cursor-pointer">
                    <input
                      disabled={isCreatingService}
                      type="radio"
                      name="details"
                      value="selection"
                      checked={formData.details === "selection"}
                      onChange={handleInputChange}
                      className="form-radio"
                    />
                    <span className="text-sm">Selection</span>
                  </label>
                </div>

                {/* selection option creation */}
                {formData.details === "selection" && (
                  <div className=" mt-2">
                    <div className=" w-full flex items-center gap-2">
                      <input
                        type="text"
                        value={newOption}
                        onChange={(e) => setNewOption(e.target.value)}
                        placeholder="Add Option"
                        className=" w-full px-3 py-2 rounded-md border border-border outline-none font-light text-sm bg-inputBg"
                      />
                      <button
                        onClick={handleAddOption}
                        disabled={newOption.trim() === ""}
                        type="button"
                        className=" px-3 py-1.5 rounded-md bg-inputBg border border-border"
                      >
                        <Plus />
                      </button>
                    </div>
                    <div className=" mt-2 rounded-md border border-border max-h-32 overflow-y-auto bg-inputBg p-2">
                      {formData.selection.length === 0 ? (
                        <p className=" w-full h-full flex items-center justify-center text-zinc-500 text-sm">
                          Empty
                        </p>
                      ) : (
                        <div className="space-y-1">
                          {formData.selection.map((opt, index) => (
                            <div
                              key={index}
                              className="flex justify-between items-center px-2 py-1 hover:bg-zinc-800 rounded"
                            >
                              <span className="text-zinc-100 text-sm">
                                {index + 1}. {opt.option}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleRemoveOption(index)}
                                className="text-red-500 hover:text-red-700"
                                title="Remove"
                              >
                                <X className=" size-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* custom fields  */}
              <div className="mt-4 border border-border rounded-md p-4">
                <p className="text-sm font-medium text-subText mb-2">
                  Add Custom Field
                </p>

                <input
                  disabled={isCreatingService}
                  name="label"
                  type="text"
                  value={field.label}
                  onChange={handleFieldChange}
                  placeholder="Field Label"
                  className="w-full px-3 py-2 mb-2 rounded-md border border-border text-sm bg-inputBg outline-none"
                />

                <div className="flex items-center justify-between gap-4 mb-2">
                  <select
                    disabled={isCreatingService}
                    name="fieldType"
                    value={field.fieldType}
                    onChange={handleFieldChange}
                    className="px-3 py-2 rounded-md border border-border text-sm bg-inputBg outline-none"
                  >
                    <option value="text">Text</option>
                    <option value="dropdown">Dropdown</option>
                    <option value="checkbox">Checkbox</option>
                    <option value="radio">Radio</option>
                  </select>

                  <label className="flex items-center gap-2 text-sm">
                    <input
                      disabled={isCreatingService}
                      name="required"
                      type="checkbox"
                      checked={field.required}
                      onChange={handleFieldChange}
                    />
                    Required
                  </label>
                </div>

                {/* Options input if needed */}
                {["dropdown", "checkbox", "radio"].includes(
                  field.fieldType
                ) && (
                  <div className="mt-2">
                    <div className="flex gap-2 mb-2">
                      <input
                        disabled={isCreatingService}
                        name="value"
                        value={newCustomOption.value}
                        onChange={handleCustomOptionChange}
                        placeholder="Option Value"
                        className="w-full px-2 py-1 rounded-md border border-border bg-inputBg text-sm"
                      />
                      <input
                        disabled={isCreatingService}
                        name="extraPrice"
                        value={newCustomOption.extraPrice}
                        onChange={handleCustomOptionChange}
                        type="number"
                        placeholder="Extra Price"
                        className="w-32 px-2 py-1 rounded-md border border-border bg-inputBg text-sm"
                      />
                      <button
                        disabled={isCreatingService}
                        onClick={addOption}
                        type="button"
                        className="px-2 py-1 rounded-md border border-border bg-inputBg"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    {field.options.length > 0 ? (
                      <div className="space-y-1 text-sm">
                        {field.options.map((opt, idx) => (
                          <div
                            key={idx}
                            className="flex justify-between items-center px-2 py-1 rounded hover:bg-zinc-800"
                          >
                            <span className=" text-zinc-200">
                              {idx + 1}. {opt.value} (+{opt.extraPrice})
                            </span>
                            <button
                              disabled={isCreatingService}
                              onClick={() => removeOption(idx)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-zinc-500 text-sm italic">
                        No options added
                      </p>
                    )}
                  </div>
                )}

                {/* Add field button */}
                <button
                  disabled={isCreatingService}
                  onClick={addFieldToFormData}
                  type="button"
                  className="mt-3 px-3 py-1.5 text-sm rounded-md bg-gry w-full text-white hover:bg-subGry border border-border"
                >
                  Add Field
                </button>

                {/* preview of added fields */}
                {formData.customFields.length > 0 && (
                  <div className="mt-6 border border-border rounded-md p-4">
                    <h3 className="text-sm font-medium text-subText mb-2">
                      Custom Fields Preview
                    </h3>
                    <div className="space-y-2 text-sm">
                      {formData.customFields.map((field, fieldIndex) => (
                        <div
                          key={fieldIndex}
                          className="border border-border p-3 rounded-md bg-inputBg space-y-1"
                        >
                          <div className="flex justify-between items-center">
                            <p className="font-medium text-white">
                              {fieldIndex + 1}. {field.label} ({field.fieldType}
                              ){" "}
                              {field.required && (
                                <span className="text-red-400 ml-1">
                                  (required)
                                </span>
                              )}
                            </p>
                            <button
                              type="button"
                              onClick={() => removeCustomField(fieldIndex)}
                              className="text-red-500 hover:text-red-700"
                              title="Remove Field"
                            >
                              <X size={16} />
                            </button>
                          </div>

                          {["dropdown", "checkbox", "radio"].includes(
                            field.fieldType
                          ) && (
                            <ul className="list-decimal ml-5 text-zinc-300">
                              {field.options.map((opt, optIndex) => (
                                <li key={optIndex}>
                                  {opt.value}{" "}
                                  {opt.extraPrice
                                    ? `(+$${opt.extraPrice})`
                                    : ""}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Multiple Image Upload */}
              <div className=" col-span-2 place-content-center">
                <p className="text-sm mb-5">Upload Images</p>
                <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-7 gap-3">
                  {images.map((img, index) => (
                    <div
                      key={index}
                      className="relative p-1 w-40 h-40 border border-border border-dashed rounded-md overflow-hidden"
                    >
                      <img
                        src={img}
                        alt={`upload-${index}`}
                        title={`upload-${index}`}
                        className="object-contain w-full h-full"
                      />
                      <IoCloseSharp
                        className="absolute top-1 right-1 text-white bg-gray-700 rounded-full w-5 h-5 cursor-pointer"
                        onClick={() => handleRemoveImage(index)}
                      />
                    </div>
                  ))}

                  {/* Click to Upload */}
                  <div
                    disabled={isCreatingService}
                    onClick={() => multiImgRef.current.click()}
                    className="flex justify-center items-center w-40 h-40 border border-border border-dashed rounded-md cursor-pointer"
                  >
                    <CiImageOn className="fill-zinc-700 w-10 h-10" />
                    <span className="text-zinc-700">+</span>
                  </div>
                  <input
                    disabled={isCreatingService}
                    accept="image/*"
                    type="file"
                    hidden
                    multiple
                    ref={multiImgRef}
                    onChange={handleMultipleImgChange}
                  />
                </div>
              </div>
            </div>
            <button
              disabled={isCreatingService}
              className=" w-full h-9 text-sm bg-gry mt-5 rounded-md border border-border flex items-center justify-center"
              type="submit"
            >
              {isCreatingService ? (
                <Loader className=" size-5 animate-spin text-white" />
              ) : (
                "Proceed"
              )}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default UploadService;
