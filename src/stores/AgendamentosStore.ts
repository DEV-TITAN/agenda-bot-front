import { action, observable } from 'mobx';
import api from '../api';
import { AgendamentosList } from '../helpers/interfaces';
import {
  showErrorNotification,
  showSuccessNotification,
} from '../helpers/notification';
import { RootStore } from './RootStore';

export class AgendamentosStore {
  @observable
  public agendamentosList: AgendamentosList | null = null;

  protected rootStore: RootStore;

  public constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @action
  private setAgendamentosList(agendamentos: AgendamentosList | null) {
    this.agendamentosList = agendamentos;
  }

  @action
  public async getAgendamentosList(
    page: number,
    pageSize: number,
    searchName?: string,
  ) {
    try {
      const agendamentosList = (
        await api.get(`/schedules`, {
          params: {
            page,
            pageSize,
            searchName,
          },
        })
      ).data;
      this.setAgendamentosList(agendamentosList);
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
