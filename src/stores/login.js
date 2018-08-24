import { autorun, observable, action } from 'mobx';
import axios from 'axios';
import { getAccessURL } from '@/services/slack/utils';

class LoginStore {
  @observable isLoading = false;
  @observable error = null;
  @observable accessToken = null;
  @observable user = null;

  constructor() {
    autorun(() => console.log('autorun', this));
  }

  @action.bound
  getLoginInfo(code) {
    if (!code) {
      return;
    }

    const accessURL = getAccessURL(code);

    this.setIsLoading(true);

    axios.get(accessURL)
      .then(rs => rs.data)
      .then(({ ok, error, ...results }) => {
        this.setIsLoading(false);

        if (!ok) {
          return this.setError(error);
        }

        return this.setLoginInfo(results);
      });
  };

  @action.bound
  setIsLoading(isLoading) {
    this.isLoading = isLoading;
  }

  @action.bound
  setLoginInfo({ access_token, user }) {
    this.accessToken = access_token;
    this.user = user;
  }

  @action.bound
  setError(error) {
    this.error = error;
  }
}

export default new LoginStore();