import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { SignOutButton } from "@/components/SignOutButton";
import { useEffect } from "react";
import { useTransactions } from "@/hooks/useTransactions";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "@/assets/styles/home.styles";
import { COLORS } from "@/constants/colors";
import * as Animatable from "react-native-animatable";

export default function Page() {
  const { user } = useUser();
  const router = useRouter();

  const {
    transactions,
    summary,
    loading,
    loadData,
    deleteTransaction,
    updateTransaction,
    error,
  } = useTransactions(user?.id);

  // Sample transactions
  const sampleTransactions = [
    {
      id: "s1",
      title: "Grocery Store",
      amount: -4500,
      date: "Aug 14",
      isSample: true,
    },
    {
      id: "s2",
      title: "Salary",
      amount: 120000,
      date: "Aug 10",
      isSample: true,
    },
    {
      id: "s3",
      title: "Electricity Bill",
      amount: -3200,
      date: "Aug 08",
      isSample: true,
    },
  ];

  const sampleSummary = {
    total: 112300,
    income: 120000,
    expense: 7700,
  };

  useEffect(() => {
    if (user?.id) {
      loadData();
    }
  }, [loadData, user?.id]);

  const renderTransaction = ({ item }) => {
    const isSample = item.isSample;

    return (
      <Animatable.View
        animation="fadeInUp"
        duration={600}
        style={[styles.transactionItem, { opacity: isSample ? 0.5 : 1 }]}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons
            name={item.amount > 0 ? "arrow-down-circle" : "arrow-up-circle"}
            size={24}
            color={item.amount > 0 ? COLORS.income : COLORS.expense}
          />
          <View style={{ marginLeft: 10 }}>
            <Text
              style={[
                styles.transactionTitle,
                { fontStyle: isSample ? "italic" : "normal" },
              ]}
            >
              {item.title} {isSample && "(Sample)"}
            </Text>
            <Text style={styles.transactionDate}>{item.date}</Text>
          </View>
        </View>
        <Text
          style={[
            styles.transactionAmount,
            { color: item.amount > 0 ? COLORS.income : COLORS.expense },
          ]}
        >
          {item.amount > 0
            ? `+ Rs ${item.amount}`
            : `- Rs ${Math.abs(item.amount)}`}
        </Text>
      </Animatable.View>
    );
  };

  // Combine real transactions and sample transactions (if none exist)
  const displayedTransactions =
    transactions?.length > 0 && !loading ? transactions : sampleTransactions;

  return (
    <View style={styles.container}>
      <SignedIn>
        {/* Header */}
        <Animatable.View
          animation="fadeInDown"
          duration={800}
          style={[styles.header]}
        >
          <Text style={styles.welcomeText}>
            Welcome,{" "}
            {user?.firstName || user?.emailAddresses?.[0]?.emailAddress}
          </Text>
          <SignOutButton />
        </Animatable.View>

        {/* Balance Summary */}
        {loading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : (
          <Animatable.View
            animation="fadeInUp"
            delay={200}
            style={styles.balanceCard}
          >
            <Text style={styles.balanceLabel}>Total Balance</Text>
            <Text style={styles.balanceValue}>
              Rs {summary?.total || sampleSummary.total}
            </Text>
            <View style={styles.balanceRow}>
              <Text style={styles.incomeText}>
                Income: Rs {summary?.income || sampleSummary.income}
              </Text>
              <Text style={styles.expenseText}>
                Expense: Rs {summary?.expense || sampleSummary.expense}
              </Text>
            </View>
          </Animatable.View>
        )}

        {/* Quick Actions */}
        <Animatable.View
          animation="fadeInUp"
          delay={300}
          style={styles.quickActions}
        >
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => router.push("/transactions/add-income")}
          >
            <Ionicons name="add-circle" size={32} color={COLORS.income} />
            <Text style={styles.actionText}>Add Income</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => router.push("/transactions/add-expense")}
          >
            <Ionicons name="remove-circle" size={32} color={COLORS.expense} />
            <Text style={styles.actionText}>Add Expense</Text>
          </TouchableOpacity>
        </Animatable.View>

        {/* Recent Transactions */}
        <Animatable.Text
          animation="fadeIn"
          delay={400}
          style={styles.sectionTitle}
        >
          Recent Transactions
        </Animatable.Text>
        {error ? (
          <Text style={{ color: COLORS.expense }}>{error}</Text>
        ) : (
          <FlatList
            data={displayedTransactions.slice(0, 6)}
            keyExtractor={(item) => item.id}
            renderItem={renderTransaction}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}
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
