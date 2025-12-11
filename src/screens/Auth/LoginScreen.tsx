// src/screens/Auth/LoginScreen.tsx
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import CustomButton from "../../components/CustomButton";
import { loginUser, verifyLoginOtp } from "../../api/auth";
import { STORAGE_KEYS } from "../../utils/constants";

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [otpStep, setOtpStep] = useState(false);
  const [otp, setOtp] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  // track mount for safe alerts
  const mounted = useRef(true);
  useEffect(() => {
    return () => {
      mounted.current = false;
    };
  }, []);

  // safe alert wrapper (avoids "not attached to activity")
  const safeAlert = (title: string, msg: string) => {
    requestAnimationFrame(() => {
      if (mounted.current && navigation.isFocused()) {
        Alert.alert(title, msg);
      }
    });
  };

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
  };

  useEffect(() => {
    if (otpStep && timer > 0) {
      const t = setTimeout(() => setTimer((prev) => prev - 1), 1000);
      return () => clearTimeout(t);
    }
    if (timer === 0) setCanResend(true);
  }, [otpStep, timer]);

  const getErrorMessage = (err: any) => {
    const msg = err?.response?.data?.message;
    if (!msg) return "Something went wrong";
    if (typeof msg === "string") return msg;
    if (Array.isArray(msg)) return msg[0];
    if (msg?.message) return msg.message;
    return "Unexpected error";
  };

  const saveSession = async (data: any) => {
    await AsyncStorage.multiSet([
      [STORAGE_KEYS.TOKEN, data.access_token],
      [STORAGE_KEYS.ROLE, data.role],
      [STORAGE_KEYS.USER_NAME, data.user?.name || ""],
    ]);

    navigation.reset({
      index: 0,
      routes: [
        {
          name:
            data.role === "SUPER_ADMIN"
              ? "SuperAdminHome"
              : data.role === "CLUB_ADMIN"
              ? "ClubAdminHome"
              : "CoachHome",
        },
      ],
    });
  };

  // ---------- LOGIN (SEND OTP) ----------
  const handleLogin = async () => {
    if (!email || !password)
      return safeAlert("Error", "Email & Password are required");

    if (!isValidEmail(email))
      return safeAlert(
        "Invalid Email",
        "Enter a valid email (example@gmail.com)"
      );

    try {
      setLoading(true);

      const res = await loginUser({ email, password });

      if (res.needOtp) {
        setOtpStep(true);
        setTimer(30);
        setCanResend(false);
        safeAlert("OTP Sent", "Please check your email");
        return;
      }

      safeAlert("Error", "Unexpected server response");
    } catch (err: any) {
      // <-- NEW: map common auth failures to a single friendly message
      const status = err?.response?.status;
      const serverMsg = getErrorMessage(err).toLowerCase();

      const indicatesInvalidCred =
        status === 401 ||
        serverMsg.includes("user not found") ||
        serverMsg.includes("invalid password") ||
        serverMsg.includes("invalid credentials") ||
        serverMsg.includes("invalid username") ||
        serverMsg.includes("invalid email or password");

      if (indicatesInvalidCred) {
        safeAlert("Invalid Credentials", "Invalid username or password");
      } else {
        safeAlert("Login Failed", getErrorMessage(err));
      }
    } finally {
      setLoading(false);
    }
  };

  // ---------- VERIFY OTP ----------
  const handleVerifyOtp = async () => {
    if (!otp.trim()) return safeAlert("Error", "Please enter the OTP");

    try {
      setLoading(true);
      const res = await verifyLoginOtp({ email, otp });

      if (!res?.access_token) return safeAlert("Error", "Invalid login response");

      await saveSession(res);
    } catch (err: any) {
      // if server says user not found / invalid OTP -> show helpful message
      const serverMsg = getErrorMessage(err).toLowerCase();
      if (serverMsg.includes("invalid") || serverMsg.includes("expired")) {
        safeAlert("OTP Error", "OTP is invalid or expired");
      } else {
        safeAlert("OTP Error", getErrorMessage(err));
      }
    } finally {
      setLoading(false);
    }
  };

  // ---------- RESEND OTP ----------
  const handleResendOtp = async () => {
    if (!canResend) return;

    try {
      const res = await loginUser({ email, password });
      if (res.needOtp) {
        setTimer(30);
        setCanResend(false);
        safeAlert("OTP Resent", "A new OTP has been sent to your email");
      }
    } catch (err: any) {
      safeAlert("Error", getErrorMessage(err));
    }
  };

  return (
    <View style={styles.root}>
      <View style={styles.card}>
        <Text style={styles.heading}>Welcome Back 👋</Text>
        <Text style={styles.subtitle}>
          {otpStep ? "Enter your OTP" : "Login to continue"}
        </Text>

        {/* EMAIL */}
        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#9CA3AF"
          editable={!otpStep}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {/* PASSWORD */}
        {!otpStep && (
          <>
            <View style={styles.passwordRow}>
              <TextInput
                placeholder="Password"
                secureTextEntry={!showPassword}
                style={styles.passwordInput}
                value={password}
                onChangeText={setPassword}
                placeholderTextColor="#9CA3AF"
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.iconBtn}
              >
                <Ionicons
                  name={showPassword ? "eye-outline" : "eye-off-outline"}
                  size={22}
                  color="#9CA3AF"
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => navigation.navigate("ForgotPassword")}
            >
              <Text style={styles.forgot}>Forgot Password?</Text>
            </TouchableOpacity>

            <CustomButton
              title={loading ? "Please wait..." : "Login"}
              onPress={handleLogin}
            />
          </>
        )}

        {/* OTP STEP */}
        {otpStep && (
          <>
            <TextInput
              placeholder="Enter OTP"
              style={styles.input}
              value={otp}
              onChangeText={setOtp}
              maxLength={6}
              keyboardType="number-pad"
              placeholderTextColor="#9CA3AF"
            />

            <TouchableOpacity onPress={handleResendOtp} disabled={!canResend}>
              <Text
                style={[
                  styles.resendText,
                  { color: canResend ? "#60A5FA" : "#475569" },
                ]}
              >
                {canResend ? "Resend OTP" : `Resend in ${timer}s`}
              </Text>
            </TouchableOpacity>

            <CustomButton
              title={loading ? "Please wait..." : "Verify OTP"}
              onPress={handleVerifyOtp}
            />

            <TouchableOpacity
              onPress={() => {
                setOtp("");
                setOtpStep(false);
                setTimer(30);
                setCanResend(false);
              }}
              style={styles.backBtnBottom}
            >
              <Text style={styles.backTextBottom}>← Back to Login</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}

// -------------------- STYLES --------------------
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#0A0F1F",
    justifyContent: "center",
    paddingHorizontal: 28,
  },
  card: {
    backgroundColor: "#0F1629",
    padding: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#1E293B",
  },
  heading: {
    color: "#F8FAFC",
    fontSize: 26,
    fontWeight: "700",
  },
  subtitle: {
    color: "#94A3B8",
    marginVertical: 12,
  },
  input: {
    backgroundColor: "#020617",
    borderWidth: 1,
    borderColor: "#1E293B",
    borderRadius: 10,
    padding: 12,
    color: "#E5E7EB",
    marginTop: 14,
  },
  passwordRow: {
    backgroundColor: "#020617",
    borderWidth: 1,
    borderColor: "#1E293B",
    borderRadius: 10,
    paddingHorizontal: 12,
    marginTop: 14,
    flexDirection: "row",
    alignItems: "center",
  },
  passwordInput: {
    flex: 1,
    color: "#E5E7EB",
    paddingVertical: 12,
  },
  iconBtn: {
    paddingLeft: 10,
  },
  forgot: {
    color: "#60A5FA",
    textAlign: "right",
    marginTop: 8,
  },
  resendText: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 14,
  },
  backBtnBottom: {
    marginTop: 14,
    alignSelf: "center",
  },
  backTextBottom: {
    color: "#60A5FA",
    fontSize: 15,
  },
});
