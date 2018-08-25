import { autorun, observable, action } from 'mobx';
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

    autorun(() => console.log('autorun', this));
  }

  @action.bound
  getLoginInfo(code) {
    this.setIsLoading(true);

    SlackService.getLoginInfo(code)
      .then(results => this.setLoginInfo(results))
      .then(() => SlackService.getUserProfile(this.userID))
      .then(results => this.setLoginProfile(results))
      .catch(error => this.setError(error))
      .then(() => this.setIsLoading(false));
  };

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