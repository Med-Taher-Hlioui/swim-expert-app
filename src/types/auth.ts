// Define who can use the app
export type UserRole = 'athlete' | 'coach' | 'parent' | null;

export interface UserProfile {
  id: string;
  name: string;
  role: UserRole;
  xp?: number;
  linkedAthletes?: string[]; // For Coaches and Parents
}