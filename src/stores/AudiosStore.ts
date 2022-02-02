import { action, observable } from 'mobx';
import { AudiosList } from '../helpers/interfaces';
import {
  showErrorNotification,
  showSuccessNotification,
} from '../helpers/notification';
import { RootStore } from './RootStore';
import api from '../api';

export class AudiosStore {
  @observable
  public audiosList: AudiosList | null = null;

  protected rootStore: RootStore;

  public constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @action
  private setAudiosList(audios: AudiosList | null) {
    this.audiosList = audios;
  }

  @action
  public async getAudiosList(
    page?: number,
    pageSize?: number,
    searchName?: string,
  ) {
    try {
      const audiosList = (
        await api.get(`/audios`, {
          params: {
            page,
            pageSize,
            searchName,
          },
        })
      ).data;
      this.setAudiosList(audiosList);
    } catch (error) {
      showErrorNotification('error.response.data.message');
    }
  }

  public async addAudio(audio: FormData) {
    try {
      await api.post(`/audios`, audio, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      showSuccessNotification('Áudio adicionado com sucesso!');
    } catch (error) {
      showErrorNotification('Erro ao adicionar áudio');
    }
  }

  @action
  public async editAudio(audioId: string, audio: FormData) {
    try {
      await api.patch(`audios/${audioId}`, audio, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      showSuccessNotification('Áudio editado com sucesso!');
    } catch (error) {
      showErrorNotification('Erro ao editar áudio!');
    }
  }

  @action
  public async getAudio(audioId: string) {
    try {
      await api.get(`audios/${audioId}`);
    } catch (error) {
      showErrorNotification('Erro ao buscar áudio');
    }
  }

  public async deleteAudio(audioId: string) {
    try {
      await api.delete(`audios/${audioId}`);
      showSuccessNotification('Áudio deletado com sucesso!');
    } catch (error) {
      showErrorNotification('Erro ao excluir áudio!');
    }
  }
}
