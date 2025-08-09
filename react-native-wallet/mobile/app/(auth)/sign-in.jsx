import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { Text, TextInput, TouchableOpacity, View, Image } from "react-native";
import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { styles } from "../../assets/styles/auth.styles";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/colors";
import * as Animatable from "react-native-animatable";

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Handle the submission of the sign-in form
  const onSignInPress = async () => {
    if (!isLoaded) return;

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      if (err.errors?.[0]?.code === "form_password_incorrect") {
        setError("Password is incorrect. Please try again.");
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid={true}
      enableAutomaticScroll={true}
      extraScrollHeight={30}
    >
      <Animatable.View
        animation="fadeInUp"
        duration={800}
        style={styles.container}
      >
        <Animatable.Image
          animation="fadeInDown"
          duration={1000}
          source={require("../../assets/images/revenue-i4.png")}
          style={styles.illustration}
        />
        <Animatable.Text animation="fadeIn" delay={400} style={styles.title}>
          Welcome Back
        </Animatable.Text>

        {error ? (
          <Animatable.View
            animation="shake"
            duration={500}
            style={styles.errorBox}
          >
            <Ionicons name="alert-circle" size={20} color={COLORS.expense} />
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity onPress={() => setError("")}>
              <Ionicons name="close" size={20} color={COLORS.textLight} />
            </TouchableOpacity>
          </Animatable.View>
        ) : null}

        <Animatable.View animation="fadeInUp" delay={500}>
          <TextInput
            style={[styles.input, error && styles.errorInput]}
            autoCapitalize="none"
            value={emailAddress}
            placeholder="Enter email"
            placeholderTextColor="#9A8478"
            onChangeText={setEmailAddress}
          />
        </Animatable.View>

        <Animatable.View animation="fadeInUp" delay={600}>
          <TextInput
            style={[styles.input, error && styles.errorInput]}
            value={password}
            placeholder="Enter password"
            placeholderTextColor="#9A8478"
            secureTextEntry={true}
            onChangeText={setPassword}
          />
        </Animatable.View>

        <Animatable.View animation="fadeInUp" delay={700}>
          <TouchableOpacity style={styles.button} onPress={onSignInPress}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
        </Animatable.View>

        <Animatable.View animation="fadeIn" delay={900}>
          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>Don&apos;t have an account?</Text>
            <Link href="/sign-up" asChild>
              <TouchableOpacity>
                <Text style={styles.linkText}>Sign up</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </Animatable.View>
      </Animatable.View>
    </KeyboardAwareScrollView>
  );
}
