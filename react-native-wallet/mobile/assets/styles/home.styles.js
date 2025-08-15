import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    flexDirection: "row", // put welcome text & logout button in a row
    justifyContent: "space-between", // space them apart
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.primary, // optional background
    borderRadius: 8, // optional rounded edges
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff", // make it stand out on colored background
  },
  balanceCard: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
  },
  balanceLabel: {
    fontSize: 16,
    color: COLORS.textLight,
  },
  balanceValue: {
    fontSize: 28,
    fontWeight: "bold",
    marginVertical: 10,
    color: COLORS.textDark,
  },
  balanceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  incomeText: { color: COLORS.income, fontWeight: "500" },
  expenseText: { color: COLORS.expense, fontWeight: "500" },
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  actionButton: {
    backgroundColor: COLORS.card,
    borderRadius: 15,
    padding: 15,
    alignItems: "center",
    flex: 0.48,
  },
  actionText: {
    marginTop: 5,
    color: COLORS.textDark,
    fontWeight: "500",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: COLORS.textDark,
  },
  transactionItem: {
    backgroundColor: COLORS.card,
    padding: 15,
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.textDark,
  },
  transactionDate: {
    fontSize: 12,
    color: COLORS.textLight,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: "600",
  },

  /* ----------------------------
     Add Income / Expense Form Styles
  ---------------------------- */
  input: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  button: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
