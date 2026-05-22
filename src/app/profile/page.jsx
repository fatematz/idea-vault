"use client";

import React, { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button, Input } from "@heroui/react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateProfile = () => {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  
  const [name, setName] = useState(session?.user?.name || "");
  const [image, setImage] = useState(session?.user?.image || "");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      await authClient.updateUser({
        name: name,
        image: image,
      });

      toast.success("Update successfully");
      
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error) {
      console.error(error);
      toast.error("Could not update!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-30">
    <div className="max-w-md mx-auto  p-8 bg-white dark:bg-slate-900 rounded-3xl shadow-lg border border-gray-100 dark:border-slate-800 transition-all">
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      
      <h2 className="text-2xl font-bold mb-8 text-slate-800 dark:text-white text-center">
        Update Profile
      </h2>
      
      <div className="flex flex-col gap-6">
        <Input 
          label="Name" 
          variant="bordered"
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Update Your Name"
          className="w-full"
        />
        
        <Input 
          label="Profile Image URL" 
          variant="bordered"
          value={image} 
          onChange={(e) => setImage(e.target.value)} 
          placeholder="https://example.com/image.jpg"
          className="w-full"
        />

        <Button 
          onClick={handleUpdate} 
          isLoading={loading}
          className="w-full bg-[#C6D62E] hover:opacity-90 text-slate-950 font-bold text-lg h-12 rounded-xl transition-all shadow-md"
        >
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
    </div>
  );
};

export default UpdateProfile;