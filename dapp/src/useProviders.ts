import { useSyncExternalStore } from 'react';
import {
  type EIP6963ProviderDetail,
  type EIP6963ProviderResponse,
  type EIP6963ProvidersMapUpdateEvent,
  Web3,
  web3ProvidersMapUpdated,
} from 'web3';

// initial empty list of providers
let providerList: EIP6963ProviderDetail[] = [];

/**
 * External store for subscribing to EIP-6963 providers
 */
const providerStore = {
  // get current list of providers
  getSnapshot: () => providerList,
  // subscribe to EIP-6963 provider events
  subscribe: (callback: () => void) => {
    // update the list of providers
    function setProviders(response: EIP6963ProviderResponse) {
      providerList = [];
      response.forEach((provider: EIP6963ProviderDetail) => {
        providerList.push(provider);
      });

      // notify subscribers that the list of providers has been updated
      callback();
    }

    // Web3.js helper function to request EIP-6963 providers
    Web3.requestEIP6963Providers().then(setProviders);

    // handler for newly discovered providers
    function updateProviders(providerEvent: EIP6963ProvidersMapUpdateEvent) {
      setProviders(providerEvent.detail);
    }

    // register handler for newly discovered providers with Web3.js helper function
    Web3.onNewProviderDiscovered(updateProviders);

    // return a function that unsubscribes from the created event listener
    return () =>
      window.removeEventListener(
        web3ProvidersMapUpdated as any,
        updateProviders
      );
  }
};

// export the provider store as a React hook
export const useProviders = () =>
  useSyncExternalStore(providerStore.subscribe, providerStore.getSnapshot);
