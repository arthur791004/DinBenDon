import Loadable from 'react-loadable';

const DummyLoading = () => null;

export default ({ loader, loading = DummyLoading }) => Loadable({
  loader,
  loading,
});