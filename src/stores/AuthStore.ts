import { action, computed, observable } from 'mobx';
import api from '../api';
import { LOCAL_STORAGE_ACCESS_TOKEN } from '../helpers/localStorage';

import { showErrorNotification } from '../helpers/notification';
import type { RootStore } from './RootStore';

export class AuthStore {
  @observable
  public accessToken: string | null = null;

  public rootStore: RootStore;

  @observable
  public authLoading = false;

  public constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    const localStorageAcessToken = localStorage.getItem(
      LOCAL_STORAGE_ACCESS_TOKEN,
    );

    if (localStorageAcessToken) {
      this.accessToken = localStorageAcessToken;
    }
  }

  @computed
  public get loading() {
    return this.authLoading;
  }

  @computed
  public get isUserLoggedIn() {
    return Boolean(this.accessToken);
  }

  @action
  public setAccessToken(token: string | null) {
    this.accessToken = token;
  }

  @action
  public async signIn(email: string, password: string) {
    try {
      const user = await api.post('/auth', { email, password });

      const { accessToken } = user.data.data;

      localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN, accessToken);
      this.setAccessToken(accessToken);
    } catch (error) {
      showErrorNotification(error.response.data.message);
    }
  }

  public logout() {
    this.setAccessToken(null);

    localStorage.clear();
    this.rootStore.routerStore.push('/login');
  }
}
