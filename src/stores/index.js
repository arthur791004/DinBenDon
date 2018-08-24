import { configure } from 'mobx';
import loginStore from './login';

configure({ enforceActions: true });

const stores = {
  loginStore,
};

export default stores;