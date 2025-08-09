// styles/auth.styles.js
import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background, // white background
    padding: 20,
    justifyContent: "center",
  },
  illustration: {
    height: 310,
    width: 300,
    resizeMode: "contain",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: COLORS.primary, // blue title
    marginVertical: 15,
    textAlign: "center",
  },
  input: {
    backgroundColor: COLORS.white, // white input field
    borderRadius: 12,
    padding: 15,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.primary, // blue border
    fontSize: 16,
    color: COLORS.textDark, // dark text
  },
  errorInput: {
    borderColor: COLORS.error, // red for errors
  },
  button: {
    backgroundColor: COLORS.primary, // blue button
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: COLORS.white, // white text on blue button
    fontSize: 18,
    fontWeight: "600",
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  footerText: {
    color: COLORS.textLight, // lighter text for footer
    fontSize: 16,
  },
  linkText: {
    color: COLORS.primary, // blue link
    fontSize: 16,
    fontWeight: "600",
  },
  verificationContainer: {
    flex: 1,
    backgroundColor: COLORS.background, // white
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  verificationTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.primary, // blue
    marginBottom: 20,
    textAlign: "center",
  },
  verificationInput: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 15,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.primary, // blue border
    fontSize: 16,
    color: COLORS.textDark,
    width: "100%",
    textAlign: "center",
    letterSpacing: 2,
  },

  // Error styles
  errorBox: {
    backgroundColor: "#EAF4FF", // light blue background
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.error, // red stripe for errors
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  errorText: {
    color: COLORS.error, // red text
    marginLeft: 8,
    flex: 1,
    fontSize: 14,
  },
});
