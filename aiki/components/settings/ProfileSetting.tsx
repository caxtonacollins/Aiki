import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { useAccount, useEnsName, useEnsAvatar } from "wagmi";
import { getUserData, saveUserData, UserData } from "@/lib/user-storage";

const profileFormSchema = z.object({
  displayName: z.string().min(2, {
    message: "Display name must be at least 2 characters.",
  }),
  bio: z.string().max(160, {
    message: "Bio must not be longer than 160 characters.",
  }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const ProfileSettings = () => {
  const { address } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! });

  // Get user data from storage or use defaults
  const userData = address ? getUserData(address) : null;

  const [profileData, setProfileData] = useState({
    displayName: ensName || "User",
    bio: "",
    avatarUrl: ensAvatar || "",
  });

  const defaultValues: Partial<ProfileFormValues> = {
    displayName: profileData.displayName,
    bio: profileData.bio,
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
  });

  // Update form when user data changes
  useEffect(() => {
    form.reset({
      displayName: profileData.displayName,
      bio: profileData.bio,
    });
  }, [form, profileData]);

  function onSubmit(data: ProfileFormValues) {
    if (!address) {
      toast.error("No wallet connected");
      return;
    }

    // Update local state
    setProfileData({
      ...profileData,
      ...data,
    });

    // Save user data to storage
    if (userData) {
      // Update existing user data
      const updatedUserData: UserData = {
        ...userData,
      };
      saveUserData(updatedUserData);
    } else if (address) {
      // Create new user data if it doesn't exist
      const newUserData: UserData = {
        address: address,
        email: "",
        walletName: "Unknown",
        walletIcon: "",
        role: "student",
        isOnboarded: true,
      };
      saveUserData(newUserData);
    }

    // Show success notification
    toast("Profile updated", {
      description: "Your profile has been updated successfully.",
    });
  }

  // Function to get user initials for avatar fallback
  const getUserInitials = () => {
    if (!profileData.displayName) return "U";

    const nameParts = profileData.displayName.split(" ");
    if (nameParts.length === 1) {
      return nameParts[0].charAt(0).toUpperCase();
    }

    return (
      nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)
    ).toUpperCase();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center space-y-4">
        <Avatar className="h-24 w-24 border-2 border-primary/20">
          <AvatarImage src={ensAvatar || profileData.avatarUrl || ""} />
          <AvatarFallback className="bg-primary text-primary-foreground text-xl">
            {getUserInitials()}
          </AvatarFallback>
        </Avatar>
        <Button variant="outline">Change Avatar</Button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="displayName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Display Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your display name" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Input placeholder="Tell us about yourself" {...field} />
                </FormControl>
                <FormDescription>
                  Brief description for your profile. Maximum 160 characters.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Update Profile</Button>
        </form>
      </Form>
    </div>
  );
};

export default ProfileSettings;
