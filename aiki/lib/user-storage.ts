// Types for user data
export interface UserData {
  address: string;
  email: string;
  walletName: string;
  walletIcon: string;
  role: "admin" | "instructor" | "student";
  isOnboarded: boolean;
}


// Demo users for testing
export const demoUsers: Record<string, UserData> = {
  // Admin user
  "0x1234567890123456789012345678901234567890": {
    address: "0x1234567890123456789012345678901234567890",
    email: "admin@aiki.com",
    walletName: "MetaMask",
    walletIcon: "/wallets/metamask.svg",
    role: "admin",
    isOnboarded: true,
  },
  // Instructor user
  "0x2345678901234567890123456789012345678901": {
    address: "0x2345678901234567890123456789012345678901",
    email: "instructor@aiki.com",
    walletName: "WalletConnect",
    walletIcon: "/wallets/walletconnect.svg",
    role: "instructor",
    isOnboarded: true,
  },
  // Student user
  "0x3456789012345678901234567890123456789012": {
    address: "0x3456789012345678901234567890123456789012",
    email: "student@aiki.com",
    walletName: "MetaMask",
    walletIcon: "/wallets/metamask.svg",
    role: "student",
    isOnboarded: true,
  },
};

// Storage keys
const USER_DATA_KEY = "aiki_user_data";
const CONNECTED_ADDRESSES_KEY = "aiki_connected_addresses";

// Save user data to localStorage
export const saveUserData = (userData: UserData): void => {
  if (typeof window === "undefined") return;

  try {
    // Store in the users map
    const usersJson = localStorage.getItem(USER_DATA_KEY);
    const users: Record<string, UserData> = usersJson
      ? JSON.parse(usersJson)
      : { ...demoUsers };
    users[userData.address] = userData;

    // Save back to localStorage
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(users));

    // Add to connected addresses list
    const addressesJson = localStorage.getItem(CONNECTED_ADDRESSES_KEY);
    const addresses: string[] = addressesJson ? JSON.parse(addressesJson) : [];
    if (!addresses.includes(userData.address)) {
      addresses.push(userData.address);
      localStorage.setItem(CONNECTED_ADDRESSES_KEY, JSON.stringify(addresses));
    }
  } catch (error) {
    console.error("Error saving user data:", error);
  }
};

// Get user data from localStorage
export const getUserData = (address: string): UserData | null => {
  if (typeof window === "undefined") return null;

  try {
    const usersJson = localStorage.getItem(USER_DATA_KEY);
    const users: Record<string, UserData> = usersJson
      ? JSON.parse(usersJson)
      : { ...demoUsers };
    return users[address] || null;
  } catch (error) {
    console.error("Error getting user data:", error);
    return null;
  }
};

// Check if a user has already connected before
export const hasConnectedBefore = (address: string): boolean => {
  if (typeof window === "undefined") return false;

  try {
    const userData = getUserData(address);
    return userData !== null;
  } catch (error) {
    console.error("Error checking connection status:", error);
    return false;
  }
};

// Update user role
export const updateUserRole = (
  address: string,
  role: UserData["role"]
): void => {
  const userData = getUserData(address);
  if (userData) {
    userData.role = role;
    saveUserData(userData);
  }
};

// // Get user role
// export const getUserRole = (address: string): UserData["role"] | null => {
//   const userData = getUserData(address);
//   return userData?.role || null;
// };

// Function to determine user role
export const getUserRole = (address?: string) => {
  // If address is provided, try to get the role from storage
  if (address) {
    const userData = getUserData(address);
    if (userData) {
      return userData.role;
    }
  }

  // Default role if no user data found
  return "student";
};

// Mark user as onboarded
export const markUserAsOnboarded = (address: string): void => {
  const userData = getUserData(address);
  if (userData) {
    userData.isOnboarded = true;
    saveUserData(userData);
  }
};
