import { action, observable } from 'mobx';
import { UsersList, UserData, ContatosList } from '../helpers/interfaces';
import api from '../api';
import {
  showErrorNotification,
  showSuccessNotification,
} from '../helpers/notification';
import { RootStore } from './RootStore';

export class ContatosStore {
  @observable
  public contatosList: ContatosList | null = null;

  protected rootStore: RootStore;

  public constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @action
  private setContatosList(contatos: ContatosList | null) {
    this.contatosList = contatos;
  }

  @action
  public async getContatosList(
    page: number,
    pageSize: number,
    searchName?: string,
  ) {
    try {
      const contatosList = (
        await api.get(`/contacts`, {
          params: {
            page,
            pageSize,
            searchName,
          },
        })
      ).data;
      this.setContatosList(contatosList);
    } catch (error) {
      showErrorNotification(error.response.data.message);
    }
  }

  // @action
  // public async addUser(firstName: string, phone: string, message: string) {
  //   try {
  //     await api.post('users', {
  //       firstName,
  //       phone,
  //     });
  //     showSuccessNotification(message);
  //   } catch (error) {
  //     showErrorNotification(error.response.data.message);
  //     showErrorNotification('Erro ao adicionar corretor/a');
  //   }
  // }

  // @action
  // public async getUserId(userId: string) {
  //   try {
  //     const user = (await api.get(`users/${userId}`)).data;
  //   } catch (error) {
  //     showErrorNotification('Erro ao buscar usuário');
  //   }
  // }

  // public async editContato(userId: string, file: FormData, message: string) {
  //   try {
  //     await api.put(`users/Contato/${userId}`, file, {
  //       headers: { 'Content-Type': 'multipart/form-data' },
  //     });
  //     showSuccessNotification(message);
  //   } catch (error) {
  //     showErrorNotification(error.response.data.error);
  //     showErrorNotification('Erro ao editar contato');
  //   }
  // }

  // public async deleteContato(userId: string) {
  //   try {
  //     await api.delete(`users/Contato/management/${userId}`);
  //     showSuccessNotification('Contato deletado com sucesso!');
  //   } catch (error) {
  //     showErrorNotification(error.response.data.error);
  //   }
  // }
}
