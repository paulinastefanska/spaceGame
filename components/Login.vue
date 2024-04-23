<template>
  <v-card :loading="loading" class="mt-5 pa-5" width="460">
    <v-card-title class="text-primary"
      >Login to your space journey</v-card-title
    >

    <v-form v-model="valid" ref="form" lazy-validation @keyup.enter="loginUser">
      <v-container>
        <v-alert
          v-show="errorMsg"
          color="error"
          variant="tonal"
          icon="$error"
          :text="errorMsg"
          class="mb-4"
        />
        <v-text-field
          label="Email"
          v-model="email"
          required
          :rules="emailRules"
          color="primary"
        />
        <v-text-field
          label="Password"
          v-model="password"
          type="password"
          required
          :rules="passwordRules"
          color="primary"
          class="mt-2"
        />
      </v-container>
    </v-form>

    <v-card-actions class="px-4">
      <v-btn
        variant="elevated"
        color="primary"
        @click="loginUser"
        :disabled="!valid || loading"
        class="w-100"
        >Login</v-btn
      >
    </v-card-actions>
  </v-card>
</template>
<script setup lang="ts">
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { useRouter } from "vue-router";

const router = useRouter();
const loading = ref(false);
const valid = computed(() => !!email.value && !!password.value);
const auth = getAuth();
const email = ref("");
const password = ref("");
const emailRules = computed(() => [
  (v: string) => !!v || "E-mail is required",
  (v: string) => /.+@.+\..+/.test(v) || "E-mail must be valid",
]);
const passwordRules = computed(() => [
  (v: string) => !!v || "Password is required",
]);
const errorMsg = ref("");

async function loginUser() {
  loading.value = true;
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value);
    router.push("/game");
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      console.error(`Error code: ${error.code}, message: ${error.message}`);
      switch (error.code) {
        case "auth/invalid-email":
          errorMsg.value = "The email address is invalid.";
          break;
        case "auth/wrong-password":
          errorMsg.value = "The password is incorrect.";
          break;
        case "auth/invalid-credential":
          errorMsg.value =
            "The provided credentials are invalid. Please check your email and password.";
          break;
        default:
          errorMsg.value = "Unexpected Error. Please try again later.";
      }
    } else if (error instanceof Error) {
      console.error(error.message);
      errorMsg.value = "We are working on it. Please try again later.";
    }
  }
  loading.value = false;
}
</script>
