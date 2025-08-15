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
  ScrollView,
} from "react-native";
import { useState } from "react";
import { styles } from "@/assets/styles/home.styles";
import { COLORS } from "@/constants/colors";

export default function AddIncomePage() {
  const { user } = useUser();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddIncome = async () => {
    if (!title || !amount) {
      Alert.alert("Error", "Please enter all fields");
      return;
    }

    setLoading(true);

    try {
      // Call your API or transactions hook here
      // Example: await addTransaction(user.id, title, parseFloat(amount), 'income');
      console.log("Add income:", { title, amount, userId: user?.id });

      Alert.alert("Success", "Income added successfully!");
      router.back(); // Navigate back to Home
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Failed to add income.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text style={styles.sectionTitle}>Add Income</Text>

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
            { backgroundColor: COLORS.income, marginTop: 20 },
          ]}
          onPress={handleAddIncome}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Adding..." : "Add Income"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
