export interface User {
  id: number;
  name: string;
  email: string;
  phone: number;
  create_at: number;
  update_at: number;
}

export interface UserData {
  users: User[];
  data: DataForUser[];
}

export interface FinallyUser {
  id?: number;
  name: string;
  email: string;
  phone: number;
  create_at: number;
  update_at: number;
  role: boolean;
  isEcp: boolean;
  status: string;
}

export interface DataForUser {
  user_id: number;
  is_admin: boolean;
  is_ecp: boolean;
  status: string;
}

export interface FilterUser {
  name: string | null;
  tel: string | null;
  email: string | null;
  role: 'user';
  creationDate: string | null;
  changeDate: string | null;
  status: 'active';
}
