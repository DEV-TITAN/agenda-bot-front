import type {
  AdminLocalStorageKeys,
  TeacherLocalStorageKeys,
  StudentLocalStorageKeys,
  SuperAdminLocalStorageKeys,
} from './interfaces';

const LOCAL_STORAGE_FIRST_ACCESS = 'isFirstAccess';

export const LOCAL_STORAGE_USER = 'user';
export const LOCAL_STORAGE_THEMES = 'themes';
export const LOCAL_STORAGE_STUDENTS = 'students';
export const LOCAL_STORAGE_TEACHERS = 'teachers';
export const LOCAL_STORAGE_POSTS = 'posts';
export const LOCAL_STORAGE_THEME_SELECTED = 'theme-selected';
export const LOCAL_STORAGE_THEME_ID = 'themeId';
export const LOCAL_STORAGE_DRAFT_ID = 'draftId';
export const LOCAL_STORAGE_ESSAY_ID = 'essayId';
export const LOCAL_STORAGE_UPLOAD = 'upload';
export const LOCAL_STORAGE_PLAN = 'plan';
export const LOCAL_STORAGE_DRAFTS = 'drafts';
export const LOCAL_STORAGE_PENDING = 'pending';
export const LOCAL_STORAGE_CORRECTED = 'corrected';
export const LOCAL_STORAGE_CREDITS = 'credits';
export const LOCAL_STORAGE_VALIDITY = 'validity';
export const LOCAL_STORAGE_TOKEN = 'token';
export const LOCAL_STORAGE_PERMISSION = 'permission';
export const LOCAL_STORAGE_SUPER_ADMIN_ID = 'superAdminId';
export const LOCAL_STORAGE_ADMIN_ID = 'adminId';
export const LOCAL_STORAGE_TEACHER_ID = 'teacherId';
export const LOCAL_STORAGE_STUDENT_ID = 'studentId';

export const localStorageKeysToRemoveOnLogout = [
  LOCAL_STORAGE_USER,
  LOCAL_STORAGE_TOKEN,
  LOCAL_STORAGE_PERMISSION,
  LOCAL_STORAGE_SUPER_ADMIN_ID,
  LOCAL_STORAGE_ADMIN_ID,
  LOCAL_STORAGE_TEACHER_ID,
  LOCAL_STORAGE_STUDENT_ID,
];

export function isFirstUserAccess() {
  const isFirstAccess = !localStorage.getItem(LOCAL_STORAGE_FIRST_ACCESS);

  if (isFirstAccess) {
    localStorage.setItem(LOCAL_STORAGE_FIRST_ACCESS, 'Has accessed');
  }

  return isFirstAccess;
}

export function getSuperAdminLocalStorageKeys() {
  const keys: SuperAdminLocalStorageKeys = {
    user: localStorage.getItem(LOCAL_STORAGE_USER),
    firstToken: localStorage.getItem(LOCAL_STORAGE_TOKEN),
    permission: localStorage.getItem(LOCAL_STORAGE_PERMISSION),
    superAdminId: localStorage.getItem(LOCAL_STORAGE_SUPER_ADMIN_ID),
  };

  return keys;
}

export function getAdminLocalStorageKeys() {
  const keys: AdminLocalStorageKeys = {
    user: localStorage.getItem(LOCAL_STORAGE_USER),
    firstToken: localStorage.getItem(LOCAL_STORAGE_TOKEN),
    permission: localStorage.getItem(LOCAL_STORAGE_PERMISSION),
    adminId: localStorage.getItem(LOCAL_STORAGE_ADMIN_ID),
    students: localStorage.getItem(LOCAL_STORAGE_STUDENTS),
    teachers: localStorage.getItem(LOCAL_STORAGE_TEACHERS),
    posts: localStorage.getItem(LOCAL_STORAGE_POSTS),
  };

  return keys;
}

export function getTeacherLocalStorageKeys() {
  const keys: TeacherLocalStorageKeys = {
    user: localStorage.getItem(LOCAL_STORAGE_USER),
    firstToken: localStorage.getItem(LOCAL_STORAGE_TOKEN),
    permission: localStorage.getItem(LOCAL_STORAGE_PERMISSION),
    teacherId: localStorage.getItem(LOCAL_STORAGE_TEACHER_ID),
  };

  return keys;
}

export function getStudentLocalStorageKeys() {
  const keys: StudentLocalStorageKeys = {
    user: localStorage.getItem(LOCAL_STORAGE_USER),
    themes: localStorage.getItem(LOCAL_STORAGE_THEMES),
    'theme-selected': localStorage.getItem(LOCAL_STORAGE_THEME_SELECTED),
    themeId: localStorage.getItem(LOCAL_STORAGE_THEME_ID),
    draftId: localStorage.getItem(LOCAL_STORAGE_DRAFT_ID),
    essayId: localStorage.getItem(LOCAL_STORAGE_ESSAY_ID),
    drafts: localStorage.getItem(LOCAL_STORAGE_DRAFTS),
    pending: localStorage.getItem(LOCAL_STORAGE_PENDING),
    corrected: localStorage.getItem(LOCAL_STORAGE_CORRECTED),
    credits: localStorage.getItem(LOCAL_STORAGE_CREDITS),
    validity: localStorage.getItem(LOCAL_STORAGE_VALIDITY),
    firstToken: localStorage.getItem(LOCAL_STORAGE_TOKEN),
    permission: localStorage.getItem(LOCAL_STORAGE_PERMISSION),
    studentId: localStorage.getItem(LOCAL_STORAGE_STUDENT_ID),
    plan: localStorage.getItem(LOCAL_STORAGE_PLAN),
  };

  return keys;
}
