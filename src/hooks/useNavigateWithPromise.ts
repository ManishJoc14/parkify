"use client";

import { useRouter } from "next/navigation";

function useNavigateWithPromise() {
    const router = useRouter();

    const navigateTo = (path: string) => {
        return new Promise<void>((resolve, reject) => {
            try {
                router.push(path);
                setTimeout(() => resolve(), 1000)
            } catch (error) {
                reject(error);
            }
        });
    };

    return navigateTo;
}

export default useNavigateWithPromise;
