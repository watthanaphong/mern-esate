// client/src/types/user.ts
export interface User {
  _id: string;
  username: string;
  email: string;
  avatar: string;
  avatarPublicId?: string; // 👈 เพิ่ม
}
