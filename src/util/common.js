import RootStore from 'src/store/root';

/**
 * @returns {RootStore}
 */
export function getRootStore() {
  return RootStore.getSingleInstance();
}
