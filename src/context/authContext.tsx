"use client";

import { User } from "@/types/definitions";
import { useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { setCookie, deleteCookie } from "cookies-next";
import { toast } from "react-toastify";
import axiosInstance from "@/lib/axiosInstance";
import { splitName } from "@/lib/utils";
import { UseFormReturn } from "react-hook-form";
import {
  SignInFormData,
  SignUpFormData,
} from "@/app/(auth-pages)/login/AuthModal";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  signInWithGoogle: (token: string, role: string) => Promise<void>;
  signInWithEmail: (
    signInForm: UseFormReturn<SignInFormData>,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    data: SignInFormData
  ) => Promise<void>;
  signUpWithEmail: (
    signUpForm: UseFormReturn<SignUpFormData>,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    data: SignUpFormData,
    setError: React.Dispatch<React.SetStateAction<string>>
  ) => Promise<void>;
  fetchUser: () => Promise<void>;
  forgetPassword: (email: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (user) {
        setCookie("role", user.roles[0], {
          path: "/",
          secure: true,
          sameSite: "strict",
        });
        setCookie("isLoggedIn", true, {
          path: "/",
          secure: true,
          sameSite: "strict",
        });
      } else {
        deleteCookie("role", { path: "/" });
        setCookie("isLoggedIn", false, {
          path: "/",
          secure: true,
          sameSite: "strict",
        });
      }
    }
  }, [user, loading]);

  // const redirectToDashboard = (role: string) => {
  //   if (role === "Owner") {
  //     router.push("/admin/parking-spots");
  //   }
  //   if (role === "Driver") {
  //     router.push("/parking");
  //   }
  // };

  // eslint-disable-next-line
  const signInWithGoogle = async (access_token: string, role: string) => {
    try {
      const res = await axiosInstance.post(
        "/public/user-app/users/social/auth",
        {
          thirdPartyApp: "GOOGLE",
          authToken: access_token,
          accountType: role,
        }
      );
      setUser(res?.data);
      setIsAuthenticated(true);
      toast.success("Succesfully logged in!!");
      localStorage.setItem("accessToken", res.data?.tokens.access);
      localStorage.setItem("refreshToken", res.data?.tokens.refresh);
      router.push("/");
      // redirectToDashboard(res.data.roles[0]);
    } catch (error) {
      setLoading(false);
      console.error("Error signing in with Google:", error);
      throw new Error("Failed to sign in with Google. Please try again.");
    }
  };

  const signInWithEmail = useCallback(
    async (
      signInForm: UseFormReturn<SignInFormData>,
      setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
      data: SignInFormData
    ) => {
      const payload = {
        persona: data.email,
        password: data.password,
        redirectUrl: "/auth/callback",
      };

      try {
        const res = await axiosInstance.post(
          "/public/user-app/users/signin",
          payload
        );

        if (res.data?.status === "verify_email") {
          toast.info(res.data?.message);
          return;
        }

        if (res) {
          const {
            message,
            tokens: { refresh, access },
            ...fetchedUser
          } = res.data;
          toast.success(message);
          setUser(fetchedUser);
          setIsAuthenticated(true);
          localStorage.setItem("accessToken", access);
          localStorage.setItem("refreshToken", refresh);
          router.push("/");
          // redirectToDashboard(res.data.roles[0]);
        }
        // eslint-disable-next-line
      } catch (err: any) {
        if (err?.response?.data?.password) {
          signInForm.setError("password", {
            type: "manual",
            message: err.response.data.password[0],
          });
        }

        if (err?.response?.data?.persona) {
          signInForm.setError("email", {
            type: "manual",
            message: err.response.data.persona[0],
          });
        }
      } finally {
        setIsLoading(false);
        setLoading(false);
      }
    },
    [router]
  );

  const signUpWithEmail = async (
    signUpForm: UseFormReturn<SignUpFormData>,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    data: SignUpFormData
  ) => {
    const nameParts = splitName(signUpForm, setIsLoading, data);
    if (!nameParts) {
      setIsLoading(false);
      return;
    }
    const { firstName, middleName, lastName } = nameParts;
    const payload = {
      firstName,
      middleName,
      lastName,
      email: data.email,
      phoneNo: data.phoneNo,
      password: data.password,
      hasAcceptedTerms: data.hasAcceptedTerms,
      redirectUrl: "/auth/callback",
      accountType: data.accountType,
    };

    try {
      const res = await axiosInstance.post(
        "/public/user-app/users/signup",
        payload
      );

      if (res.data?.type === "Account Verification.") {
        toast.info(res.data.message);
        return;
      }
      // eslint-disable-next-line
    } catch (err: any) {
      if (err.response?.data?.email) {
        signUpForm.setError("email", {
          type: "manual",
          message: err.response.data.email[0],
        });
      }
      if (err.response?.data?.phoneNo) {
        signUpForm.setError("phoneNo", {
          type: "manual",
          message: err.response.data.phoneNo[0],
        });
      }
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  };

  const forgetPassword = async (email: string) => {
    try {
      const res = await axiosInstance.post(
        "/public/user-app/users/forget-password-request",
        {
          email,
          redirectUrl: "/auth/callback/reset-password",
        }
      );

      if (res.status === 200) {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error("Error sending password reset email:", error, email);
      throw new Error("Failed to send password reset email. Try again later.");
    }
  };

  const fetchUser = useCallback(async () => {
    const access = localStorage.getItem("accessToken");
    const refresh = localStorage.getItem("refreshToken");

    if (!access && !refresh) router.push("/login");
    const res = await axiosInstance.get("/public/user-app/users/profile", {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });
    setUser(res?.data);
  }, [router]);

  const logout = async () => {
    try {
      router.push("/");
      const access = localStorage?.getItem("accessToken");
      const refresh = localStorage?.getItem("refreshToken");

      axiosInstance
        .post(
          "/public/user-app/users/logout",
          { refreshToken: refresh },
          {
            headers: {
              Authorization: `Bearer ${access}`,
            },
          }
        )
        .then(() => {
          toast.info("Successfully logged out!!");
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          setUser(null);
          setIsAuthenticated(false);
        })
        .catch((error) => {
          console.error("Error signing out:", error);
          throw error;
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      console.error("Error signing out:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        signInWithGoogle,
        signInWithEmail,
        signUpWithEmail,
        fetchUser,
        forgetPassword,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
