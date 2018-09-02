import Loadable from '@/components/loadable';

export default Loadable({
  loader: () => import(/* Home */ './'),
});