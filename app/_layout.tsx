import { useEffect } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

function useFrameworkReady() {
  // Minimal local hook implementation to replace missing module.
  // Put framework-specific initialization here if needed.
  useEffect(() => {
    // no-op initialization placeholder
  }, []);
}

export default function RootLayout() {
  useFrameworkReady();

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
