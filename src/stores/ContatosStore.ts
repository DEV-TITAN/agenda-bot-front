import { action, observable } from 'mobx';
import { ContatosList } from '../helpers/interfaces';
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
    page?: number,
    pageSize?: number,
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
      showErrorNotification('error.response.data.message');
    }
  }

  @action
  public async addContato(name: string, phoneNumber: string) {
    try {
      await api.post('contacts', {
        name,
        phoneNumber,
      });
      showSuccessNotification('Contato adicionado com sucesso!');
    } catch (error) {
      showErrorNotification('Erro ao adicionar contato!');
    }
  }

  @action
  public async editContato(
    contatoId: string,
    name: string,
    phoneNumber: string,
  ) {
    try {
      await api.post(`contacts/${contatoId}`, {
        name,
        phoneNumber,
      });
      showSuccessNotification('Contato editado com sucesso!');
    } catch (error) {
      showErrorNotification('Erro ao editar contato!');
    }
  }

  @action
  public async getContato(contatoId: string) {
    try {
      await api.get(`contacts/${contatoId}`);
    } catch (error) {
      showErrorNotification('Erro ao buscar contato');
    }
  }

  public async deleteContato(contatoId: string) {
    try {
      await api.delete(`contacts/${contatoId}`);
      showSuccessNotification('Contato deletado com sucesso!');
    } catch (error) {
      showErrorNotification('Erro ao excluir contato!');
    }
  }
}
