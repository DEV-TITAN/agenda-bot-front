import { action, observable } from 'mobx';
import {
  Essay,
  DraftList,
  PendingList,
  PostList,
  CorrectedList,
  EssayCorrected,
} from '../helpers/interfaces';
import {
  showErrorNotification,
  showSuccessNotification,
} from '../helpers/notification';
import { RootStore } from './RootStore';
import api from '../api';
import {
  LOCAL_STORAGE_CORRECTED,
  LOCAL_STORAGE_CREDITS,
  LOCAL_STORAGE_DRAFTS,
  LOCAL_STORAGE_PENDING,
  LOCAL_STORAGE_VALIDITY,
} from '../helpers/localStorage';

export class AudiosStore {
  @observable
  public postsList: PostList | null = null;

  @observable
  public draftsList: DraftList | null = null;

  @observable
  public pendingList: PendingList | null = null;

  @observable
  public correctedList: CorrectedList | null = null;

  @observable
  public draftId: Essay | null = null;

  @observable
  public correctedEssay: EssayCorrected | null = null;

  @observable
  public urlCheckout: string | null = null;

  protected rootStore: RootStore;

  public constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @action
  public setDraft(draft: Essay | null) {
    this.draftId = draft;
  }

  @action
  private setDraftsList(drafts: DraftList | null) {
    this.draftsList = drafts;
  }

  @action
  private setPendingList(pending: PendingList | null) {
    this.pendingList = pending;
  }

  @action
  private setPostList(posts: PostList | null) {
    this.postsList = posts;
  }

  @action
  private setCorrectedList(corrected: CorrectedList | null) {
    this.correctedList = corrected;
  }

  @action
  private setCorrectedEssay(correctedEssay: EssayCorrected | null) {
    this.correctedEssay = correctedEssay;
  }

  @action
  public async getCredits() {
    try {
      const creditsAndCredits = (await api.get(`users/my/credits`)).data;

      localStorage.setItem(
        LOCAL_STORAGE_CREDITS,
        JSON.stringify(creditsAndCredits.credits),
      );

      localStorage.setItem(
        LOCAL_STORAGE_VALIDITY,
        JSON.stringify(creditsAndCredits.validity),
      );
    } catch (error) {
      showErrorNotification(error.response.data.message);
    }
  }

  @action
  public async getPosts(page: number, pageSize: number, searchName?: string) {
    try {
      const postsList = (
        await api.get(`posts`, {
          params: {
            page,
            pageSize,
            searchName,
          },
        })
      ).data;

      this.setPostList(postsList);
      this.getCredits();
    } catch (error) {
      showErrorNotification(error.response.data.message);
    }
  }

  @action
  public async getTotalDrafts() {
    try {
      const totalDrafts = await api.get(`essays/drafts/count/total`);

      localStorage.setItem(
        LOCAL_STORAGE_DRAFTS,
        JSON.stringify(totalDrafts.data.totalDrafts),
      );
      this.getCredits();
    } catch (error) {
      console.log(error.response.data.error);
    }
  }

  @action
  public async getDraftsEssays(title?: string) {
    try {
      const draftsList = (
        await api.get(`essays/drafts`, {
          params: {
            title,
          },
        })
      ).data;

      this.setDraftsList(draftsList);
      this.getTotalDrafts();
      this.getCredits();
    } catch (error) {
      showErrorNotification(error.response.data.message);
    }
  }

  public async draft(draft: string, themeId: string) {
    try {
      await api.post(`essays/drafts`, { draft, themeId });
    } catch (error) {
      showErrorNotification(error.response.data.data.draft);
    }
  }

  public async getDraftId(draftId: string) {
    try {
      const draft = (await api.get(`essays/drafts/${draftId}`)).data;
      this.setDraft(draft.data.draft);
    } catch (error) {
      console.log(error.response.data.draft);
    }
  }

  public async editDraft(draftId: string, draft: string) {
    try {
      await api.patch(`essays/drafts/${draftId}`, { draft });
      showSuccessNotification('Rascunho editado com sucesso');
    } catch (error) {
      showErrorNotification(error.response.data.error);
    }
  }

  public async deleteDraft(draftId: string) {
    try {
      await api.delete(`essays/drafts/${draftId}`);
      showSuccessNotification('Rascunho deletado com sucesso!');
    } catch (error) {
      showErrorNotification(error.response.data.message);
    }
  }

  @action
  public async getTotalPending() {
    try {
      const totalPending = await api.get(`essays/pending/count/total`);

      localStorage.setItem(
        LOCAL_STORAGE_PENDING,
        JSON.stringify(totalPending.data.totalEssays),
      );
      this.getCredits();
    } catch (error) {
      console.log(error.response.data.error);
    }
  }

  @action
  public async getPendingsEssays(title?: string) {
    try {
      const pendingList = (
        await api.get(`essays`, {
          params: {
            title,
          },
        })
      ).data;

      this.setPendingList(pendingList);
      this.getTotalPending();
      this.getCredits();
    } catch (error) {
      showErrorNotification(error.response.data.message);
    }
  }

  public async newEssay(file: FormData) {
    try {
      await api.post(`essays`, file, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      showSuccessNotification('Redação enviada com sucesso!');
    } catch (error) {
      showErrorNotification(error.response.data.message);
    }
  }

  public async newEssayByDraft(draftId: string, file: FormData) {
    try {
      await api.patch(`essays/${draftId}`, file, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      showSuccessNotification('Redação enviada com sucesso!');
    } catch (error) {
      showErrorNotification(error.response.data.message);
    }
  }

  @action
  public async getTotalCorrecteds() {
    try {
      const totalCorrecteds = await api.get(
        `essays/corrected-essays/count/total`,
      );

      localStorage.setItem(
        LOCAL_STORAGE_CORRECTED,
        JSON.stringify(totalCorrecteds.data.totalCorrecteds),
      );
      this.getCredits();
    } catch (error) {
      console.log(error.response.data.error);
    }
  }

  @action
  public async getCorrected(title?: string) {
    try {
      const correctedList = (
        await api.get(`essays/corrected-essays`, {
          params: {
            title,
          },
        })
      ).data;

      this.setCorrectedList(correctedList);
      this.getTotalCorrecteds();
      this.getCredits();
    } catch (error) {
      showErrorNotification(error.response.data.message);
    }
  }

  @action
  public async getCorrectedEssayId(essayId?: string) {
    try {
      const correctedEssay = (
        await api.get(`essays/essay-correction/${essayId}`)
      ).data.data;
      this.setCorrectedEssay(correctedEssay[0]);
    } catch (error) {
      showErrorNotification(error.response.data.message);
    }
  }

  public async getCheckout(id: string, description: string, amount: string) {
    try {
      const urlCheckout = await api.post(`transaction/checkout`, {
        id,
        description,
        amount,
      });

      this.urlCheckout = urlCheckout.data.data.urlCheckout;
      window.open(urlCheckout.data.data.urlCheckout);
    } catch (error) {
      showErrorNotification('Erro na pagseguro, tente novamente em 5 minutos.');
    }
  }
}
