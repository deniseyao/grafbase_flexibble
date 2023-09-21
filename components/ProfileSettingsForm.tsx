"use client";

import Image from "next/image";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import FormField from "@/components/FormField";
import Button from "@/components/Button";
import { fetchToken, updateUser } from "@/lib/actions";
import { SessionInterface, UserFormState, UserProfile } from "@/common.types";

type Props = {
  session: SessionInterface;
  user?: UserProfile;
};

const ProfileSettingsForm = ({ session, user }: Props) => {
  const router = useRouter();

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [form, setForm] = useState<UserFormState>({
    name: user?.name || "",
    email: user?.email || "",
    description: user?.description || "",
    avatarUrl: user?.avatarUrl || "",
    githubUrl: user?.githubUrl || "",
    linkedInUrl: user?.linkedInUrl || "",
  });

  const handleStateChange = (fieldName: keyof UserFormState, value: string) => {
    setForm((prevForm) => ({ ...prevForm, [fieldName]: value }));
  };

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.includes("image")) {
      alert("Please upload an image!");

      return;
    }

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      const result = reader.result as string;

      handleStateChange("avatarUrl", result);
    };
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setSubmitting(true);

    const { token } = await fetchToken();

    try {
      await updateUser("profileUpload", form, session?.user?.id, token);

      router.push(`/`);
    } catch (error) {
      console.log(error);
      alert(`Failed to update profile. Try again!`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="flexStart form">
      <div className="flexStart form_image-container">
        <label htmlFor="poster" className="flexCenter form_image-label">
          {!form?.avatarUrl && "Choose a profile picture"}
        </label>
        <input
          id="image"
          type="file"
          accept="image/*"
          className="form_image-input"
          onChange={(e) => handleChangeImage(e)}
        />
        {form?.avatarUrl && (
          <Image
            src={form?.avatarUrl}
            className="sm:p-10 object-contain z-20"
            alt="image"
            fill
          />
        )}
      </div>

      <FormField
        title="Name"
        state={form?.name}
        placeholder="Your Name"
        setState={(value) => handleStateChange("name", value)}
        isRequired={true}
      />
      <FormField
        title="Email"
        state={form?.email}
        placeholder="Your Name"
        setState={(value) => handleStateChange("email", value)}
        isDisabled={true}
        isRequired={true}
      />
      <FormField
        title="Bio"
        state={form?.description}
        isTextArea
        placeholder="Something about yourself"
        setState={(value) => handleStateChange("description", value)}
      />
      <FormField
        title="LinkedIn URL"
        state={form?.linkedInUrl}
        placeholder="Your LinkedIn URL"
        setState={(value) => handleStateChange("linkedInUrl", value)}
      />
      <FormField
        title="Github URL"
        state={form?.githubUrl}
        placeholder="Your Github URL"
        setState={(value) => handleStateChange("githubUrl", value)}
      />

      <div className="flexStart w-full">
        <Button title="Update Profile" type="submit" submitting={submitting} />
      </div>
    </form>
  );
};

export default ProfileSettingsForm;
