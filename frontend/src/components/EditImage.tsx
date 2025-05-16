import React, { useState } from "react";
import { useRef } from "react";
import { X, Image, Replace, Loader2 } from "lucide-react";

type Props = {
  setIsEdit: (value: boolean) => void;
  setImage: (value: File | string | null) => void;
  image: File | string | null;
  handleSave: (value: React.FormEvent<HTMLFormElement>) => Promise<void>;
};

const EditImage = ({ setIsEdit, setImage, image, handleSave }: Props) => {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    handleImageFile(file);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleImageFile = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      setImage(file);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) handleImageFile(file);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await handleSave(e);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-20 z-30 flex items-center justify-end">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-darkColor h-full max-w-2xl w-full relative z-50 shadow-xl"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <button
            type="button"
            onClick={() => setIsEdit(false)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-darkSecondary rounded-full transition-colors"
          >
            <X size={24} />
          </button>
          <h2 className="text-xl font-semibold">Edit Image</h2>
          <div className="w-10" />
        </div>

        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="p-8 h-[calc(100%-80px)] flex flex-col items-center justify-center gap-6"
        >
          {image ? (
            <div className="flex flex-col h-full w-full">
              <div className="flex-1 relative bg-gray-50 rounded-lg overflow-hidden group">
                <img
                  src={
                    typeof image === "string"
                      ? image
                      : URL.createObjectURL(image)
                  }
                  alt="Preview"
                  className="w-full h-full object-contain p-4"
                />
                <button
                  type="button"
                  onClick={() => imageInputRef.current?.click()}
                  className="absolute bottom-4 right-4 px-4 py-2 bg-white/90 text-black backdrop-blur-sm rounded-full flex items-center gap-2 shadow-md hover:bg-white transition-colors"
                >
                  <Replace size={18} />
                  <span className="text-sm font-medium">Replace Image</span>
                </button>
              </div>
              <div className="flex items-center justify-end gap-3 pt-6 border-t">
                <button
                  type="button"
                  onClick={() => setIsEdit(false)}
                  className="px-6 py-2 font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-primaryColor text-white font-medium hover:opacity-90 rounded-lg transition-opacity"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin h-5 w-5" />
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="p-6 bg-gray-50 rounded-full">
                <Image
                  size={40}
                  strokeWidth={1.5}
                  className="dark:text-darkColor"
                />
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-semibold">Drag and Drop</h3>
                <p className="text-gray-500">or</p>
              </div>
              <button
                type="button"
                onClick={() => imageInputRef.current?.click()}
                className="px-8 py-3 border-2 border-dashed border-gray-300 hover:border-gray-400 rounded-xl text-gray-700 hover:text-gray-900 dark:text-white transition-all"
              >
                Browse Files
              </button>
            </>
          )}
          <input
            ref={imageInputRef}
            className="hidden"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          <p className="text-sm text-gray-500 mt-4">
            Supported formats: JPEG, PNG
          </p>
        </div>
      </form>
    </div>
  );
};

export default EditImage;
