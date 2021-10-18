import { action, observable } from 'mobx';
import { UsersList } from '../helpers/interfaces';
import api from '../api';
import {
  showErrorNotification,
  showSuccessNotification,
} from '../helpers/notification';
import { RootStore } from './RootStore';

export class ContatosStore {
  @observable
  public adminsList: UsersList | null = null;

  protected rootStore: RootStore;

  public constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @action
  private setAdminsList(users: UsersList | null) {
    this.adminsList = users;
  }

  @action
  public async getAdminsList(
    role: string,
    page: number,
    pageSize: number,
    searchName?: string,
  ) {
    try {
      const adminsList = (
        await api.get(`users/superAdmin/management`, {
          params: {
            role,
            page,
            pageSize,
            searchName,
          },
        })
      ).data;
      this.setAdminsList(adminsList);
    } catch (error) {
      showErrorNotification(error.response.data.message);
    }
  }

  public async editAdmin(userId: string, file: FormData, message: string) {
    try {
      await api.put(`users/SuperAdmin/${userId}`, file, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      showSuccessNotification(message);
    } catch (error) {
      showErrorNotification(error.response.data.error);
      showErrorNotification('Erro ao editar usuário');
    }
  }

  public async deleteAdmin(userId: string) {
    try {
      await api.delete(`users/SuperAdmin/management/${userId}`);
      showSuccessNotification('Administrador/a deletado/a com sucesso!');
    } catch (error) {
      showErrorNotification(error.response.data.error);
    }
  }
}
