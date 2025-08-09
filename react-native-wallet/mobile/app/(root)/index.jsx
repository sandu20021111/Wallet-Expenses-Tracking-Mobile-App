import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { Text, View } from "react-native";
import { SignOutButton } from "@/components/SignOutButton";
import { useEffect } from "react";
import { useTransactions } from "@/hooks/useTransactions"; // or wherever your hook is

export default function Page() {
  const { user } = useUser();

  // Only call hook if user exists to avoid errors
  const {
    transactions,
    summary,
    loading,
    loadData,
    deleteTransaction,
    updateTransaction,
    error,
  } = useTransactions(user?.id);

  useEffect(() => {
    if (user?.id) {
      loadData();
    }
  }, [loadData, user?.id]);

  return (
    <View>
      <SignedIn>
        <Text>Hello {user?.emailAddresses?.[0]?.emailAddress}</Text>
        <SignOutButton />
      </SignedIn>
      <SignedOut>
        <Link href="/(auth)/sign-in">
          <Text>Sign in</Text>
        </Link>
        <Link href="/(auth)/sign-up">
          <Text>Sign up</Text>
        </Link>
      </SignedOut>
    </View>
  );
}
