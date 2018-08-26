import { observable, action, computed } from 'mobx';
import * as SlackService from '@/services/Slack';
import StorageService from '@/services/Storage';
import { STORAGES } from '@/services/Storage/constants';

const { ACCESS_TOKEN, CURRENT_USER_ID, CURRENT_USER_PROFILE } = STORAGES;

class LoginStore {
  @observable isLoading = false;
  @observable error = null;
  @observable accessToken = null;
  @observable userID = null;
  @observable userProfile = null;

  constructor() {
    this.accessToken = StorageService.getItem(ACCESS_TOKEN);
    this.userID = StorageService.getItem(CURRENT_USER_ID);
    this.userProfile = StorageService.getItem(CURRENT_USER_PROFILE);
  }

  @computed get isLoggedIn() {
    return this.accessToken && this.userID && this.userProfile;
  }

  @action.bound
  getLoginInfo(code) {
    this.setIsLoading(true);

    SlackService.getLoginInfo(code, this.logout)
      .then(results => this.setLoginInfo(results))
      .then(() => SlackService.getUserProfile(this.userID))
      .then(results => this.setLoginProfile(results))
      .then(() => {
        window.location.href = window.location.href.split('?')[0];
      })
      .catch(error => this.setError(error))
      .then(() => this.setIsLoading(false));
  };

  @action.bound
  logout() {
    StorageService.removeItem(ACCESS_TOKEN);
    StorageService.removeItem(CURRENT_USER_ID);
    StorageService.removeItem(CURRENT_USER_PROFILE);

    this.accessToken = null;
    this.userID = null;
    this.userProfile = null;
  }

  @action.bound
  setIsLoading(isLoading) {
    this.isLoading = isLoading;
  }

  @action.bound
  setLoginInfo({ access_token, user_id }) {
    StorageService.setItem(ACCESS_TOKEN, access_token);
    StorageService.setItem(CURRENT_USER_ID, user_id);

    this.accessToken = access_token;
    this.userID = user_id;
  }

  @action.bound
  setLoginProfile({ profile }) {
    StorageService.setItem(CURRENT_USER_PROFILE, profile);

    this.userProfile = profile;
  }

  @action.bound
  setError(error) {
    this.error = error.message;
  }
}

export default new LoginStore();