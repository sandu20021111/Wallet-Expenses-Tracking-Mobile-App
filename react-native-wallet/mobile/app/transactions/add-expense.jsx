import { useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useState } from "react";
import { styles } from "@/assets/styles/home.styles"; // reuse styles
import { COLORS } from "@/constants/colors";

export default function AddExpensePage() {
  const { user } = useUser();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddExpense = async () => {
    if (!title || !amount) {
      Alert.alert("Error", "Please enter all fields");
      return;
    }

    setLoading(true);

    try {
      // Call your API or transactions hook
      // Example: await addTransaction(user.id, title, parseFloat(amount), 'expense');
      console.log("Add expense:", { title, amount, userId: user?.id });

      Alert.alert("Success", "Expense added successfully!");
      router.back(); // Go back to home
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Failed to add expense.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={{ padding: 16 }}>
        <Text style={styles.sectionTitle}>Add Expense</Text>

        <TextInput
          style={styles.input}
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
        />

        <TextInput
          style={styles.input}
          placeholder="Amount"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />

        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: COLORS.expense, marginTop: 20 },
          ]}
          onPress={handleAddExpense}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Adding..." : "Add Expense"}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
