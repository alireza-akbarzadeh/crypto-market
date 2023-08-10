export interface UserInterface {
  firstName: string;
  lastName: string;
  fullName: string;
  fatherName?: string;
  phoneNumber: string;
  nationalCode?: string;
  birthDate?: string;
  avatar: string;
  avatarId: string;
  rate: number;
  kycSim: boolean;
  joinedAt: Date | string | number;
}
