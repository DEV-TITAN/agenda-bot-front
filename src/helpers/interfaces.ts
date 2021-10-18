export type Permissions = 'super admin' | 'admin' | 'teacher' | 'student';

export type TypeCriteria =
  | 'Domínio da Norma Culta'
  | 'Compreensão da Proposta'
  | 'Atendimento ao Gênero Textual'
  | 'Argumentação'
  | 'Coesão e Coerência Textual'
  | 'Intervenção';

export type Grade = 0 | 40 | 80 | 120 | 160 | 200;

export type ContentType = 'pdf' | 'video';

export type Status = 'draft' | 'pending' | 'progress' | 'corrected';

export type TagComment = 'Elogio' | 'Problema';

export interface SuperAdminLocalStorageKeys {
  firstToken: string | null;
  superAdminId: string | null;
  permission: string | null;
  user: string | null;
}

export interface AdminLocalStorageKeys {
  firstToken: string | null;
  adminId: string | null;
  permission: string | null;
  user: string | null;
  students: string | null;
  teachers: string | null;
  posts: string | null;
}

export interface TeacherLocalStorageKeys {
  firstToken: string | null;
  teacherId: string | null;
  permission: string | null;
  user: string | null;
}

export interface StudentLocalStorageKeys {
  firstToken: string | null;
  studentId: string | null;
  permission: string | null;
  user: string | null;
  themes: string | null;
  'theme-selected': string | null;
  themeId: string | null;
  draftId: string | null;
  essayId: string | null;
  drafts: string | null;
  plan: string | null;
  pending: string | null;
  corrected: string | null;
  credits: string | null;
  validity: string | null;
}

export interface DraftList {
  data: Essay[];
}

export interface PendingList {
  data: Essay[];
}

export interface ProgressList {
  data: Essay[];
}

export interface UserData {
  id: string;
  firstName: string;
  surname: string;
  role?: Permissions;
  email: string;
  password?: string;
  birthDate: string;
  avatar?: string | null;
  phone: string | null;
  validityCredits?: string | null;
  totalCredits?: number | null;
  totalDrafts?: number | null;
  totalPendingCorrections?: number | null;
  totalEssaysCorrected?: number | null;
}

export interface Content {
  url: string;
  type: ContentType;
}

export interface Themes {
  id: string;
  title: string;
  category: string;
  supportContents: Content[];
  image: string | null;
}

export interface ThemesList {
  count: number;
  rows: Themes[];
}

export interface ThemesAdminList {
  data: Themes[];
  page: number;
  pageSize: number;
  pageCount: number;
  rowCount: number;
  searchName: string | null;
}

export interface Essay {
  id: string;
  title: string;
  status: Status;
  category: string;
  image?: string | null;
  essayImage: string | null;
  essayText: string | null;
  sentAt?: string;
  studentId?: string | null;
  studentName?: string | null;
  themeId: string | null;
  themeTitle: string | null;
  themeImage: string | null;
}

export interface GradeContent {
  grade: number;
  description: string;
}

export interface CommentsEssay {
  tag: TagComment;
  type: TypeCriteria;
  comment: string;
}

export interface EssayCorrected {
  category: string;
  correctedAt: string;
  createdAt: string;
  essayImage: string;
  essayText: string | null;
  finalGrade: number;
  id: string;
  sentAt: string;
  status: string;
  studentId: string;
  studentName: string;
  themeId: string;
  themeImage: string;
  themeTitle: string;
  updatedAt: string;
  commentFinal: string;
  comments: CommentsEssay[];
  grades: GradeContent[];
}

export interface CorrectedList {
  data: EssayCorrected[];
}

export interface UsersList {
  data: UserData[];
  page: number;
  pageSize: number;
  pageCount: number;
  rowCount: number;
  searchName: string | null;
}

export interface Post {
  id: string;
  title: string;
  describe: string;
  image: string;
  urlPost: string;
  typePostContent: string;
}

export interface PostList {
  data: Post[];
  page: number;
  pageSize: number;
  pageCount: number;
  rowCount: number;
  searchName: string | null;
}
