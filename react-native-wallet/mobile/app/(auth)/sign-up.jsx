import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { styles } from "@/assets/styles/auth.styles.js";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/colors";
import { Image } from "expo-image";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Animatable from "react-native-animatable";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const onSignUpPress = async () => {
    if (!isLoaded) return;
    try {
      await signUp.create({ emailAddress, password });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
    } catch (err) {
      if (err.errors?.[0]?.code === "form_identifier_exists") {
        setError("That email address is already in use. Please try another.");
      } else {
        setError("An error occurred. Please try again.");
      }
      console.log(err);
    }
  };

  const onVerifyPress = async () => {
    if (!isLoaded) return;
    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });
      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace("/");
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  if (pendingVerification) {
    return (
      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        enableOnAndroid
        enableAutomaticScroll
      >
        <Animatable.View
          animation="fadeInUp"
          duration={600}
          style={styles.verificationContainer}
        >
          <Text style={styles.verificationTitle}>Verify your email</Text>

          {error ? (
            <View style={styles.errorBox}>
              <Ionicons name="alert-circle" size={20} color={COLORS.expense} />
              <Text style={styles.errorText}>{error}</Text>
              <TouchableOpacity onPress={() => setError("")}>
                <Ionicons name="close" size={20} color={COLORS.textLight} />
              </TouchableOpacity>
            </View>
          ) : null}

          <TextInput
            style={[styles.verificationInput, error && styles.errorInput]}
            value={code}
            placeholder="Enter your verification code"
            placeholderTextColor="#9A8478"
            onChangeText={(code) => setCode(code)}
          />

          <TouchableOpacity onPress={onVerifyPress} style={styles.button}>
            <Text style={styles.buttonText}>Verify</Text>
          </TouchableOpacity>
        </Animatable.View>
      </KeyboardAwareScrollView>
    );
  }

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid
      enableAutomaticScroll
    >
      <Animatable.View
        animation="fadeInUp"
        duration={600}
        style={styles.container}
      >
        <Animatable.View animation="fadeInDown" duration={600} delay={100}>
          <Image
            source={require("../../assets/images/revenue-i2.png")}
            style={styles.illustration}
          />
        </Animatable.View>

        <Animatable.Text
          animation="fadeInDown"
          duration={600}
          delay={200}
          style={styles.title}
        >
          Create Account
        </Animatable.Text>

        {error ? (
          <Animatable.View
            animation="fadeIn"
            duration={600}
            delay={300}
            style={styles.errorBox}
          >
            <Ionicons name="alert-circle" size={20} color={COLORS.expense} />
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity onPress={() => setError("")}>
              <Ionicons name="close" size={20} color={COLORS.textLight} />
            </TouchableOpacity>
          </Animatable.View>
        ) : null}

        <Animatable.View animation="fadeInUp" duration={600} delay={400}>
          <TextInput
            style={[styles.input, error && styles.errorInput]}
            autoCapitalize="none"
            value={emailAddress}
            placeholderTextColor="#9A8478"
            placeholder="Enter email"
            onChangeText={(email) => setEmailAddress(email)}
          />
        </Animatable.View>

        <Animatable.View animation="fadeInUp" duration={600} delay={500}>
          <TextInput
            style={[styles.input, error && styles.errorInput]}
            value={password}
            placeholder="Enter password"
            placeholderTextColor="#9A8478"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />
        </Animatable.View>

        <Animatable.View animation="fadeInUp" duration={600} delay={600}>
          <TouchableOpacity style={styles.button} onPress={onSignUpPress}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </Animatable.View>

        <Animatable.View
          animation="fadeInUp"
          duration={600}
          delay={700}
          style={styles.footerContainer}
        >
          <Text style={styles.footerText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.linkText}>Sign in</Text>
          </TouchableOpacity>
        </Animatable.View>
      </Animatable.View>
    </KeyboardAwareScrollView>
  );
}
