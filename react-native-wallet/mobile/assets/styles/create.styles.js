// styles/create.styles.js
import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background, // white
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border, // blue border
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.primary, // blue title
  },
  backButton: {
    padding: 5,
  },
  saveButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  saveButtonDisabled: {
    opacity: 0.5,
  },
  saveButton: {
    fontSize: 16,
    color: COLORS.primary, // blue save button
    fontWeight: "600",
  },
  card: {
    backgroundColor: COLORS.card, // white card
    margin: 16,
    borderRadius: 16,
    padding: 16,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  typeSelector: {
    flexDirection: "row",
    marginBottom: 20,
    gap: 10,
  },
  typeButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: COLORS.border, // blue border
    backgroundColor: COLORS.white,
  },
  typeButtonActive: {
    backgroundColor: COLORS.primary, // blue background when active
    borderColor: COLORS.primary,
  },
  typeIcon: {
    marginRight: 8,
  },
  typeButtonText: {
    color: COLORS.text, // default dark text
    fontSize: 16,
    fontWeight: "500",
  },
  typeButtonTextActive: {
    color: COLORS.white, // white text on blue
  },
  amountContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border, // blue underline
    paddingBottom: 16,
    marginBottom: 20,
  },
  currencySymbol: {
    fontSize: 32,
    fontWeight: "bold",
    color: COLORS.primary, // blue symbol
    marginRight: 8,
  },
  amountInput: {
    flex: 1,
    fontSize: 36,
    fontWeight: "bold",
    color: COLORS.text, // dark text
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border, // blue border
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
    backgroundColor: COLORS.white,
  },
  inputIcon: {
    marginHorizontal: 12,
  },
  input: {
    flex: 1,
    padding: 12,
    fontSize: 16,
    color: COLORS.text,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.primary, // blue section title
    marginBottom: 15,
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  categoryButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border, // blue border
    backgroundColor: COLORS.white,
  },
  categoryButtonActive: {
    backgroundColor: COLORS.primary, // blue background
    borderColor: COLORS.primary,
  },
  categoryIcon: {
    marginRight: 6,
  },
  categoryButtonText: {
    color: COLORS.text,
    fontSize: 14,
  },
  categoryButtonTextActive: {
    color: COLORS.white, // white on blue
  },
  loadingContainer: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
