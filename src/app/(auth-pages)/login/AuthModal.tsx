"use client";

import React, { useState, useEffect } from "react";
import { X, Mail, Lock, User, Eye, EyeOff, Phone } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "@/context/authContext";
import { useGoogleLogin } from "@react-oauth/google";
import RoleSelectionModal from "./RoleSelectionModal";
interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const signUpSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  phoneNo: z
    .string()
    .regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
  accountType: z.enum(["OWNER", "DRIVER"]),
  hasAcceptedTerms: z.literal(true, {
    errorMap: () => ({ message: "You must agree to the terms and conditions" }),
  }),
});

const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type SignUpFormData = z.infer<typeof signUpSchema>;
export type SignInFormData = z.infer<typeof signInSchema>;

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signUpWithEmail, signInWithEmail } = useAuth();
  const router = useRouter();
  const { signInWithGoogle } = useAuth();
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [googleToken, setGoogleToken] = useState<string | null>(null);

  const signUpForm = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phoneNo: "",
      accountType: "DRIVER",
      hasAcceptedTerms: true,
    },
  });

  const signInForm = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleGoogleSignIn = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      setGoogleToken(tokenResponse.access_token);
      setIsRoleModalOpen(true);
    },
  });

  const handleRoleSelect = (role: string) => {
    setIsRoleModalOpen(false);
    if (googleToken) {
      signInWithGoogle(googleToken, role);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      signUpForm.reset();
      signInForm.reset();
      setError("");
      setIsLoading(false);
    }
  }, [isOpen, signUpForm, signInForm]);

  const onSignUpSubmit = async (data: SignUpFormData) => {
    setError("");
    setIsLoading(true);
    await signUpWithEmail(signUpForm, setIsLoading, data, setError);
  };

  const onSignInSubmit = async (data: SignInFormData) => {
    setError("");
    setIsLoading(true);
    await signInWithEmail(signInForm, setIsLoading, data);
  };

  const handleForget = async () => {
    router.push("/forget-password");
  };

  return (
    <>
      <div className="min-h-screen bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div
          className="bg-white shadow-md rounded-2xl w-full max-w-md relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition"
            disabled={isLoading}
          >
            <X size={20} />
          </button>
          <div className="p-8">
            <h2 className="text-2xl font-mont-semibold text-gray-800 mb-6 text-center">
              {isSignUp ? "Create Account" : "Welcome Back"}
            </h2>

            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            {isSignUp ? (
              <form
                key="signUpForm"
                onSubmit={signUpForm.handleSubmit(onSignUpSubmit)}
                className="flex flex-col gap-3"
              >
                <div className="flex flex-col gap-2 my-1 text-gray-600">
                  <div className="flex gap-2">
                    <Controller
                      name="accountType"
                      control={signUpForm.control}
                      render={({ field }) => (
                        <>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="owner"
                              checked={field.value === "OWNER"}
                              onCheckedChange={() => field.onChange("OWNER")}
                              disabled={isLoading}
                            />
                            <Label htmlFor="owner">Owner</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="driver"
                              checked={field.value === "DRIVER"}
                              onCheckedChange={() => field.onChange("DRIVER")}
                              disabled={isLoading}
                            />
                            <Label htmlFor="driver">Driver</Label>
                          </div>
                        </>
                      )}
                    />
                  </div>
                  {signUpForm.formState.errors.accountType && (
                    <p className="text-red-500 text-sm mt-1">
                      {signUpForm.formState.errors.accountType.message}
                    </p>
                  )}
                </div>

                <div>
                  <div className="relative">
                    <User
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                    <Controller
                      name="name"
                      control={signUpForm.control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          type="text"
                          placeholder="Name"
                          className="pl-10"
                          disabled={isLoading}
                        />
                      )}
                    />
                  </div>
                  {signUpForm.formState.errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {signUpForm.formState.errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <div className="relative">
                    <Mail
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                    <Controller
                      name="email"
                      control={signUpForm.control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          type="email"
                          placeholder="Email"
                          className="pl-10"
                          disabled={isLoading}
                        />
                      )}
                    />
                  </div>
                  {signUpForm.formState.errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {signUpForm.formState.errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <div className="relative">
                    <Lock
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                    <Controller
                      name="password"
                      control={signUpForm.control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          className="pl-10"
                          disabled={isLoading}
                        />
                      )}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      disabled={isLoading}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {signUpForm.formState.errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {signUpForm.formState.errors.password.message}
                    </p>
                  )}
                </div>

                <div>
                  <div className="relative">
                    <Phone
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                    <Controller
                      name="phoneNo"
                      control={signUpForm.control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          type="text"
                          placeholder="Phone Number"
                          className="pl-10"
                          disabled={isLoading}
                        />
                      )}
                    />
                  </div>
                  {signUpForm.formState.errors.phoneNo && (
                    <p className="text-red-500 text-sm mt-1">
                      {signUpForm.formState.errors.phoneNo.message}
                    </p>
                  )}
                </div>

                <div>
                  <div className="flex items-center space-x-2 my-2">
                    <Controller
                      name="hasAcceptedTerms"
                      control={signUpForm.control}
                      render={({ field }) => (
                        <Checkbox
                          id="agreement"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={isLoading}
                        />
                      )}
                    />
                    <Label htmlFor="agreement">
                      You agree to our terms and conditions
                    </Label>
                  </div>
                  {signUpForm.formState.errors.hasAcceptedTerms && (
                    <p className="text-red-500 text-sm mt-1">
                      {signUpForm.formState.errors.hasAcceptedTerms.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary font-mont-medium text-white py-2 mt-1 rounded-lg hover:bg-primary-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isLoading}
                >
                  {isLoading ? "Please wait..." : "Sign Up"}
                </button>
              </form>
            ) : (
              <form
                key="signInForm"
                onSubmit={signInForm.handleSubmit(onSignInSubmit)}
                className="flex flex-col gap-3"
              >
                <div>
                  <div className="relative">
                    <Mail
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                    <Controller
                      name="email"
                      control={signInForm.control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          type="email"
                          placeholder="Email"
                          className="pl-10"
                          disabled={isLoading}
                        />
                      )}
                    />
                  </div>
                  {signInForm.formState.errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {signInForm.formState.errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <div className="relative">
                    <Lock
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                    <Controller
                      name="password"
                      control={signInForm.control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          className="pl-10"
                          disabled={isLoading}
                        />
                      )}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      disabled={isLoading}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {signInForm.formState.errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {signInForm.formState.errors.password.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary font-mont-medium text-white py-2 mt-1 rounded-lg hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isLoading}
                >
                  {isLoading ? "Please wait..." : "Sign In"}
                </button>

                <div className="flex justify-start">
                  <p
                    className="px-2 text-xs mb-2 w-fit bg-white cursor-pointer underline hover:text-primary transition-all text-gray-500"
                    onClick={handleForget}
                  >
                    Forgot Password?
                  </p>
                </div>
              </form>
            )}

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <button
              onClick={() => handleGoogleSignIn()}
              className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              <Image
                src="https://www.google.com/favicon.ico"
                alt="Google"
                width={20}
                height={20}
                className="w-5 h-5"
              />
              {isLoading ? "Please wait..." : "Continue with Google"}
            </button>

            <p className="text-center text-sm text-gray-600 mt-6">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-primary hover:text-primary/90 font-mont-medium disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isSignUp ? "Sign In" : "Sign Up"}
              </button>
            </p>
          </div>
        </div>
      </div>
      <RoleSelectionModal
        isOpen={isRoleModalOpen}
        onClose={() => setIsRoleModalOpen(false)}
        onRoleSelect={handleRoleSelect}
      />
    </>
  );
};

export default AuthModal;
