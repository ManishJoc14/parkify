"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import axiosInstance from "@/lib/axiosInstance";
import { toast } from "react-toastify";
import { Badge } from "@/components/ui/badge";
import { ProfileSkeleton } from "@/components/adminComponents/profile/profileSkeleton";

const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last name is required"),
  bio: z.string().max(500, "Bio must be 500 characters or less"),
  phoneNo: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number"),
  photo: z.any().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

type UserProfile = ProfileFormData & {
  id: number;
  email: string;
  fullName: string;
  dateJoined: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  roles: string[];
};

export default function EditProfilePage() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      bio: "",
      phoneNo: "",
    },
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get<UserProfile>(
          "/public/user-app/users/profile",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        if (res.status === 200) {
          setProfile(res.data);
          form.reset(res.data);
          setPreviewImage(res.data.photo);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setLoading(false);
      }
    };

    fetchProfile();
  }, [form]);

  const onSubmit = async (data: ProfileFormData) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key === "photo" && value instanceof File) {
        formData.append(key, value);
      } else if (typeof value === "string") {
        formData.append(key, value);
      }
    });

    try {
      const res = await axiosInstance.patch(
        "/public/user-app/users/profile/update",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (res.status === 200) {
        toast.success("Your profile has been successfully updated.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(
        "An error occurred while updating your profile. Please try again."
      );
    }
  };

  if (loading || !profile) {
    return <ProfileSkeleton />;
  }

  return (
    <Card className="w-full">
      <CardContent className="py-8 px-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex flex-col items-center lg:flex-row lg:justify-start space-x-6">
              <Avatar className="w-24 h-24">
                {previewImage && (
                  <AvatarImage src={previewImage} alt={profile.fullName} />
                )}
                <AvatarFallback>
                  {profile.firstName[0]}
                  {profile.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-mont-semibold">{profile.fullName}</h2>
                <p className="text-muted-foreground">{profile.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-mont-semibold">
                      First Name
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="middleName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-mont-semibold">
                      Middle Name
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-mont-semibold">
                      Last Name
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneNo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-mont-semibold">
                      Phone Number
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormItem>
                <FormLabel className="font-mont-semibold">Email</FormLabel>
                <FormControl>
                  <Input value={profile.email} disabled />
                </FormControl>
              </FormItem>
              <FormItem>
                <FormLabel className="font-mont-semibold">Date Joined</FormLabel>
                <FormControl>
                  <Input
                    value={new Date(profile.dateJoined).toLocaleDateString()}
                    disabled
                  />
                </FormControl>
              </FormItem>
            </div>

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-mont-semibold">Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      rows={6}
                      placeholder="Tell us about yourself"
                      className="resize-none"
                    />
                  </FormControl>
                  <FormDescription>
                    You can write up to 500 characters
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="photo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-mont-semibold">
                    Profile Photo
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          field.onChange(file);
                          setPreviewImage(URL.createObjectURL(file));
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator />

            <div className="space-y-2">
              <h3 className="text-lg font-mont-semibold">Account Information</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-mont-semibold">User ID:</span>{" "}
                  <Badge variant="secondary">{profile.id}</Badge>
                </div>
                <div>
                  <span className="font-mont-semibold">Roles:</span>{" "}
                  <Badge variant="secondary">
                    {profile.roles.join(", ").toUpperCase()}
                  </Badge>
                </div>
                <div>
                  <span className="font-mont-semibold">Email Verified:</span>{" "}
                  <Badge
                    variant={
                      profile.isEmailVerified ? "default" : "destructive"
                    }
                  >
                    {profile.isEmailVerified ? "Verified" : "Verify Now"}
                  </Badge>
                </div>
                <div>
                  <span className="font-mont-semibold">Phone Verified:</span>{" "}
                  <Badge
                    variant={
                      profile.isPhoneVerified ? "default" : "destructive"
                    }
                  >
                    {profile.isPhoneVerified ? "Verified" : "Verify Now"}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="flex justify-end py-4">
              <Button type="submit" className="font-mont-semibold" size="lg">
                Update Profile
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
